/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  await prisma.interest.createMany({
    data: [
      { name: 'Cooking' },
      { name: 'Software Engineering' },
      { name: 'Aerospace' },
      { name: 'Politics' },
    ],
  });
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
