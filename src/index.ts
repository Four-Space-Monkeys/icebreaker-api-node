/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const port = 8080;

app.use(express.json());

app.get('/interests', async (req, res) => {
  try {
    const interests = await prisma.interest.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    res.status(200).json(interests);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post('/users', async (req, res) => {
  const {
    stytchId,
    firstName,
    lastName,
    interestIds,
  }: {
    stytchId: string,
    firstName: string,
    lastName: string,
    interestIds: number[],
  } = req.body;

  try {
    await prisma.user.create({
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
    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/users/:stytchId', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        stytchId: req.params.stytchId,
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

    if (user === null) {
      res.status(404).end();
      return;
    }

    const userFormatted = {
      ...user,
      interests: user.interests.map(({ interest }) => ({ id: interest.id, name: interest.name })),
    };

    res.status(200).json(userFormatted);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port *:${port}`);
});
