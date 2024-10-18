const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
    try{
        await database.category.createMany({
            data: [
                {name: "Internet Programming"},
                {name: "Artificial Intelligence"},
                {name: "Nanotechnology"},
                {name: "Software Engineering"},
                {name: "Buisness Analytics"},
                {name: "Soft Skills"},
                {name: "Music"},
                {name: "Engineering"},
                {name: "Photogrpahy"},
                {name: "Fitness"},
                {name: "Accounting"},
                {name: "Filming"},
            ]
        });
        console.log("Success")
    }catch(error){
        console.log("Error seeding the database categories", error)
    }finally{
        await database.$disconnect();
    }
}
main();