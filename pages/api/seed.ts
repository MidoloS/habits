import { generatePrismaClient } from "@/prisma/client";
import { Habit } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  const DATA = [
    {
      name: "TIDY",
      minutes: 10,
      isPro: false,
    },
    {
      name: "WALK",
      minutes: 20,
      isPro: false,
    },
    {
      name: "EAT",
      minutes: 30,
      isPro: false,
    },
    {
      name: "PRO_HABIT_EXAMPLE",
      minutes: 5,
      isPro: true,
    },
  ] as Habit[];
  const promises = DATA.map((habit) =>
    prisma.habit.upsert({
      where: {
        name: habit.name,
      },
      update: {
        name: habit.name,
        minutes: habit.minutes,
      },
      create: {
        name: habit.name,
        minutes: habit.minutes,
      },
    })
  );
  const habits = await Promise.all(promises);

  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: "midolo.1912@gmail.com",
      name: "Sebastian Modolo",
      subscriptions: {
        createMany: {
          data: [{ habitName: "tidy" }, { habitName: "talk" }],
        },
      },
    },
  });

  return res.status(200).json({ habits });
}
