/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { addUser, getInterests, getUserByStytchId } from '../prisma/functions';

const app = express();
const port = 8080;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/interests', async (req, res) => {
  try {
    const interests = await getInterests();
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
  } = req.body.data;

  try {
    await addUser({
      stytchId,
      firstName,
      lastName,
      interestIds,
    });
    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/users/:stytchId', async (req, res) => {
  try {
    const user = await getUserByStytchId(req.params.stytchId);

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
