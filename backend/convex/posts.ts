import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Get all published posts
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();
  },
});

// 2. Generate a temporary URL for image uploads
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 3. Get the real image URL to display it on the frontend
export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// 4. Create a new post (Now accepts category, price, and imageId)
export const create = mutation({
  args: {
    title: v.string(),
    subtitle: v.optional(v.string()),
    content: v.string(),
    author: v.string(),
    imageId: v.optional(v.id("_storage")),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    category: v.optional(v.string()), // Added category
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      title: args.title,
      subtitle: args.subtitle,
      content: args.content,
      author: args.author,
      published: true,
      imageId: args.imageId,
      price: args.price,
      currency: args.currency,
      category: args.category, // Saving category
    });
  },
});

// 5. Get Post By ID (WITH PAYWALL LOGIC)
export const getPostById = query({
  args: { 
    id: v.id("posts"),
    userId: v.optional(v.string()), 
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;

    // If free, send everything
    if (!post.price || post.price <= 0) {
      return { ...post, isLocked: false };
    }

    // If paid, check if they own it
    let hasPaid = false;
    const userId = args.userId;
    if (userId) {
      const purchase = await ctx.db
        .query("purchases")
        .withIndex("by_user_and_post", (q) => 
          q.eq("userId", userId).eq("postId", post._id)
        )
        .first();
      hasPaid = !!purchase;
    }

    // If they own it, send everything
    if (hasPaid) {
      return { ...post, isLocked: false };
    }

    // If they haven't paid, send only the first 500 characters
    const teaserContent = post.content.substring(0, 500) + "...";
    return { 
      ...post, 
      content: teaserContent,
      isLocked: true
    };
  },
});

// 6. Record a Purchase
export const recordPurchase = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    // Prevent duplicate purchases
    const existing = await ctx.db
      .query("purchases")
      .withIndex("by_user_and_post", (q) => 
        q.eq("userId", args.userId).eq("postId", args.postId)
      )
      .first();
      
    if (existing) return;

    await ctx.db.insert("purchases", {
      postId: args.postId,
      userId: args.userId,
      amount: args.amount,
      purchasedAt: Date.now(),
    });
  },
});