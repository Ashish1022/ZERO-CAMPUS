import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createStudent = mutation({
    args: {
        firstname: v.string(),
        lastname: v.string(),
        fathername: v.string(),
        fathercontact: v.string(),
        studentId: v.string(),
        class: v.string(),
        address: v.string(),
        imageUrl: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
        ip: v.number(),
        adsa: v.number(),
        eeb: v.number(),
        se: v.number(),
        cns: v.number(),
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

        return await ctx.db.insert("student", {
            user: user[0]._id,
            firstname: args.firstname,
            lastname: args.lastname,
            fathername: args.fathername,
            fathercontact: args.fathercontact,
            studentId: args.studentId,
            class: args.class,
            address: args.address,
            imageUrl: args.imageUrl,
            ip: args.ip,
            adsa: args.adsa,
            eeb: args.eeb,
            se: args.se,
            cns: args.cns,
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

export const getStudentBySearch = query({
    args: {
        search: v.string()
    },
    handler: async (ctx, args) => {
        // if (args.search === "") {
        //     return await ctx.db.query("student").order("desc").collect();
        // }

        const firstnameSearch = await ctx.db.query("student").withSearchIndex("by_firstname", (q) => q.search("firstname", args.search)).collect()

        if (firstnameSearch.length > 0) {
            return firstnameSearch;
        }

        const lastnameSearch = await ctx.db.query("student").withSearchIndex("by_lastname", (q) => q.search("lastname", args.search)).collect()

        if (lastnameSearch.length > 0) {
            return lastnameSearch;
        }

        const studentIdSearch = await ctx.db.query("student").withSearchIndex("by_studentId", (q) => q.search("studentId", args.search)).collect()

        if (studentIdSearch.length > 0) {
            return studentIdSearch;
        }

    }
});

export const getAllStudents = query({
    handler: async (ctx) => {
        const students = await ctx.db.query("student").collect();

        return students;
    },
});

export const getStudentById = query({
    args:{
        studentId: v.id('student')
    },
    handler: async(ctx, args) => {
        return await ctx.db.get(args.studentId)
    }
})

export const markAttendance = mutation({
    args:{
        studentId: v.id('student'),
    },
    handler: async(ctx, args) => {

        const student = await ctx.db.get(args.studentId);

        await ctx.db.patch(args.studentId, {
            ip: student?.ip! + 1,
            cns: student?.cns! + 1,
            se: student?.se! + 1,
            adsa: student?.adsa! + 1,
            eeb: student?.eeb! + 1,
        })
    }
})

export const cancelAttendance = mutation({
    args:{
        studentId: v.id('student'),
    },
    handler: async(ctx, args) => {

        const student = await ctx.db.get(args.studentId);

        await ctx.db.patch(args.studentId, {
            ip: student?.ip! - 1,
            cns: student?.cns! - 1,
            se: student?.se! - 1,
            adsa: student?.adsa! - 1,
            eeb: student?.eeb! - 1,
        })
    }
})