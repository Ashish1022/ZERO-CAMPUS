import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    student: defineTable({
        user: v.id('users'),

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
    })
        .searchIndex("by_firstname", { searchField: 'firstname' })
        .searchIndex("by_lastname", { searchField: 'lastname' })
        .searchIndex("by_studentId", { searchField: 'studentId' })
    ,

    teacher: defineTable({
        user: v.id('users'),

        teacherId: v.string(),
        imageUrl: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        contact: v.string(),
        salary: v.string(),
        address: v.string(),
        password: v.string(),
    })
        .searchIndex("by_name", { searchField: 'name' })
        .searchIndex("by_subject", { searchField: 'subject' })
        .searchIndex("by_teacherId", { searchField: 'teacherId' })
    ,
    users: defineTable({
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string()
    })
})