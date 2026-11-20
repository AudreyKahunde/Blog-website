import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    subtitle: v.optional(v.string()),
    content: v.string(),
    author: v.string(),
    published: v.boolean(),
    imageId: v.optional(v.id("_storage")),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    category: v.optional(v.string()), 
  }).index("by_published", ["published"]),

  purchases: defineTable({
    postId: v.id("posts"),
    userId: v.string(),
    amount: v.number(),
    purchasedAt: v.number(),
  }).index("by_user_and_post", ["userId", "postId"]),
});