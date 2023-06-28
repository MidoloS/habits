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
      name: "tidy",
      minutes: 10,
      isPro: false,
      title: "Tidy up",
    },
    {
      name: "walk",
      minutes: 20,
      isPro: false,
      title: "Go for a walk",
    },
    {
      name: "eat",
      minutes: 30,
      isPro: false,
      title: "Healthy meal",
    },
    {
      name: "pro_habit_example",
      minutes: 5,
      isPro: true,
      title: "Pro habit example",
    },
    {
      name: "read",
      minutes: 20,
      isPro: false,
      title: "Read",
    },
    {
      name: "wakeup",
      minutes: 10,
      isPro: false,
      title: "Wake up early",
    },
    {
      name: "train",
      minutes: 30,
      isPro: false,
      title: "Train",
    },
    {
      name: "brush",
      minutes: 5,
      isPro: false,
      title: "Brush your teeth",
    },
    {
      name: "meditate",
      minutes: 10,
      isPro: false,
      title: "Meditate",
    },
    {
      name: "laundry",
      minutes: 10,
      isPro: false,
      title: "Do the laundry",
    },
  ] as Habit[];
  const promises = DATA.map((habit) =>
    prisma.habit.upsert({
      where: {
        name: habit.name,
      },
      update: {
        title: habit.title,
        name: habit.name,
        minutes: habit.minutes,
      },
      create: {
        title: habit.title,
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
        create: [
          {
            habit: {
              connect: {
                name: "tidy",
              },
            },
          },
          {
            habit: {
              connect: {
                name: "walk",
              },
            },
          },
        ],
      },
    },
  });

  res.status(200).json({ habits });
}
