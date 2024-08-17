import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),        
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl,
            clerkId: args.clerkId,
        });
    }
});