const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.Category.createMany(
            {
                data: [
                    { name: 'Famous People' },
                    { name: 'Movies & TV' },
                    { name: 'Animals' },
                    { name: 'Musicians' },
                    { name: 'Games' },
                    { name: 'Philosophy' },
                    { name: 'Scientists' },
                ]
            }
        )

    } catch (error) {
        console.log('ERROR SEEDING CATEGORY TABLE', error);
    }
}

async function deleteAll() {
    try {
        await db.Category.deleteMany();
    } catch (error) {
        console.log('ERROR DELETING CATEGORY TABLE', error);
    }
}

main()