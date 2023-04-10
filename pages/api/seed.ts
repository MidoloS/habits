import { generatePrismaClient } from "@/prisma/client";
import { HabitName, Habit } from "@prisma/client";
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
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/TIDY.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvVElEWS5wbmciLCJpYXQiOjE2ODExMzkxNjIsImV4cCI6MTcxMjY3NTE2Mn0.vtfoXtvhI1Ke2Hui2B0gExSliwBD9LugqvzYhrsRJXI&t=2023-04-10T15%3A06%3A21.588Z",
    },
    {
      name: "WALK",
      minutes: 20,
      isPro: false,
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/WALK.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvV0FMSy5wbmciLCJpYXQiOjE2ODExMzkxMzIsImV4cCI6MTcxMjY3NTEzMn0.P4HIvu7rgunZ8mKAJZwjELi2GQa8oszmqAC85qxxJpg&t=2023-04-10T15%3A05%3A52.011Z",
    },
    {
      name: "EAT",
      minutes: 30,
      isPro: false,
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/EAT.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRUFULnBuZyIsImlhdCI6MTY4MTEzOTA0NiwiZXhwIjoxNzEyNjc1MDQ2fQ.PB8iUU43mMbAB2e1ZLHnEqrMRZ5HYv-iy_7TK04IWd8&t=2023-04-10T15%3A04%3A25.947Z",
    },
    {
      name: "PRO_HABIT_EXAMPLE",
      minutes: 5,
      isPro: true,
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/EAT.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRUFULnBuZyIsImlhdCI6MTY4MTEzOTA0NiwiZXhwIjoxNzEyNjc1MDQ2fQ.PB8iUU43mMbAB2e1ZLHnEqrMRZ5HYv-iy_7TK04IWd8&t=2023-04-10T15%3A04%3A25.947Z",
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
        img: habit.img,
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
          data: [{ habitName: HabitName.TIDY }, { habitName: HabitName.WALK }],
        },
      },
    },
  });

  return res.status(200).json({ habits });
}
