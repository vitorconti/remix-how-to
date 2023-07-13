import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient()

const seed = async () => {
    const quantity = 12
    Array.from(Array(quantity).keys()).forEach(async () => {
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                city: faker.location.city(),
                state: faker.location.state(),
            }
        })
    })
}

seed().finally(() => prisma.$disconnect())