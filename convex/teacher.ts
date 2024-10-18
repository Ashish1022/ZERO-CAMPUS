import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTeacher = mutation({
    args: {
        name: v.string(),
        teacherId: v.string(),
        subject: v.string(),
        contact: v.string(),
        salary: v.string(),
        password: v.string(),
        email: v.string(),
        address: v.string(),
        imageUrl: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("User not authenticated")
        }

        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect();

        if (user.length === 0) {
            throw new ConvexError("User not found")
        }

        return await ctx.db.insert("teacher", {
            user: user[0]._id,
            name: args.name,
            email: args.email,
            teacherId: args.teacherId,
            subject: args.subject,
            address: args.address,
            imageUrl: args.imageUrl,
            contact: args.contact,
            salary: args.salary,
            password: args.password
        })
    }
})

export const getUrl = mutation({
    args: {
        storageId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const getTeacherBySearch = query({
    args: {
        search: v.string()
    },
    handler: async (ctx, args) => {
        // if (args.search === "") {
        //     return await ctx.db.query("student").order("desc").collect();
        // }

        const nameSearch = await ctx.db.query("teacher").withSearchIndex("by_name", (q) => q.search("name", args.search)).collect()

        if (nameSearch.length > 0) {
            return nameSearch;
        }

        const subjectSearch = await ctx.db.query("teacher").withSearchIndex("by_subject", (q) => q.search("subject", args.search)).collect()

        if (subjectSearch.length > 0) {
            return subjectSearch;
        }

        const teacherIdSearch = await ctx.db.query("teacher").withSearchIndex("by_teacherId", (q) => q.search("teacherId", args.search)).collect()

        if (teacherIdSearch.length > 0) {
            return teacherIdSearch;
        }

    }
});