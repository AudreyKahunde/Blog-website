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

// 4. Create a new post
export const create = mutation({
  args: {
    title: v.string(),
    subtitle: v.optional(v.string()),
    content: v.string(),
    author: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      title: args.title,
      subtitle: args.subtitle,
      content: args.content,
      author: args.author,
      published: true,
      imageId: args.imageId,
    });
  },
});

// 5. Publish an existing post
export const publish = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { published: true });
  },
});

// 6. Get a single post by ID
export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});