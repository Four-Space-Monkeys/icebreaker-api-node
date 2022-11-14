import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getInterests() {
  return prisma.interest.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export function addUser(data: {
  stytchId: string;
  firstName: string;
  lastName: string;
  interestIds: number[];
}) {
  const {
    stytchId,
    firstName,
    lastName,
    interestIds,
  } = data;

  return prisma.user.create({
    data: {
      firstName,
      lastName,
      stytchId,
      interests: {
        createMany: {
          data: interestIds.map((id) => ({ interestId: id })),
        },
      },
    },
  });
}

export function getUserByStytchId(stytchId: string) {
  return prisma.user.findUnique({
    where: {
      stytchId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      interests: {
        select: {
          interest: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          interest: {
            name: 'asc',
          },
        },
      },
    },
  });
}
