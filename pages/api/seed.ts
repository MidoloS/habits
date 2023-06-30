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
      subtitle: "Tidy up your room",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2058.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTgucG5nIiwiaWF0IjoxNjg4MTAzMzA2LCJleHAiOjE3MTk2MzkzMDZ9.-Ne2aptbayq0zHxC3FcqIlxImLL9LtDpAikzw-DWZIk&t=2023-06-30T05%3A35%3A07.435Z",
    },
    {
      name: "walk",
      minutes: 20,
      isPro: false,
      title: "Go for a walk",
      subtitle: "Go for a walk in the park",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2057.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTcucG5nIiwiaWF0IjoxNjg4MTAzMjkyLCJleHAiOjE3MTk2MzkyOTJ9.d-M5l0HvqOnPP-j4GLraYBTQmaxAaNQWRxgt-8VpyUc&t=2023-06-30T05%3A34%3A53.892Z",
    },
    {
      name: "eat",
      minutes: 30,
      isPro: false,
      title: "Healthy meal",
      subtitle: "Eat a healthy meal",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2061.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjEucG5nIiwiaWF0IjoxNjg4MTAzMzQ1LCJleHAiOjE3MTk2MzkzNDV9.XKD73DedlTPO6PZM9C5qmZcLPk5adWoDPydwUqpA9KQ&t=2023-06-30T05%3A35%3A46.237Z",
    },
    {
      name: "pro_habit_example",
      minutes: 5,
      isPro: true,
      title: "Pro habit example",
      subtitle: "This is a pro habit example",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2061.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjEucG5nIiwiaWF0IjoxNjg4MTAzMzQ1LCJleHAiOjE3MTk2MzkzNDV9.XKD73DedlTPO6PZM9C5qmZcLPk5adWoDPydwUqpA9KQ&t=2023-06-30T05%3A35%3A46.237Z",
    },
    {
      name: "read",
      minutes: 20,
      isPro: false,
      title: "Read",
      subtitle: "Read a book",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2056.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTYucG5nIiwiaWF0IjoxNjg4MTAzMjgyLCJleHAiOjE3MTk2MzkyODJ9.FSrLzvksHrCeoEn1nCi4rIBmoG8Nq4HYqIbeFd4KoQw&t=2023-06-30T05%3A34%3A43.137Z",
    },
    {
      name: "wakeup",
      minutes: 10,
      isPro: false,
      title: "Wake up early",
      subtitle: "Wake up early in the morning",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2054.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTQucG5nIiwiaWF0IjoxNjg4MTAzMjQ5LCJleHAiOjE3MTk2MzkyNDl9.RwesWwc3PBxDjNb4AkD-z3NYFPU3RjTYkVxMNYuFRKc&t=2023-06-30T05%3A34%3A10.266Z",
    },
    {
      name: "train",
      minutes: 30,
      isPro: false,
      title: "Train",
      subtitle: "Train your body",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2062.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjIucG5nIiwiaWF0IjoxNjg4MTAzMzU1LCJleHAiOjE3MTk2MzkzNTV9.1bWG4rkN0SKWze7vdwyIAEIPqdKRTvTjejRhVM6tX24&t=2023-06-30T05%3A35%3A56.466Z",
    },
    {
      name: "brush",
      minutes: 5,
      isPro: false,
      title: "Brush your teeth",
      subtitle: "Brush your teeth",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2063.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjMucG5nIiwiaWF0IjoxNjg4MTAzMzY1LCJleHAiOjE3MTk2MzkzNjV9.eK3wmkqX0QKv2cLwFENXd_Fme4WUcjeq_pr2_ITlpok&t=2023-06-30T05%3A36%3A06.395Z",
    },
    {
      name: "meditate",
      minutes: 10,
      isPro: false,
      title: "Meditate",
      subtitle: "Meditate for 10 minutes",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2059.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNTkucG5nIiwiaWF0IjoxNjg4MTAzMzIyLCJleHAiOjE3MTk2MzkzMjJ9.Gu_zUxFMSv0CF0gukjPFDlV4_64ZrHfMq-eeQW8LQgs&t=2023-06-30T05%3A35%3A23.906Z",
    },
    {
      name: "laundry",
      minutes: 10,
      isPro: false,
      title: "Do the laundry",
      subtitle: "Do the laundry",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/Image%2060.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvSW1hZ2UgNjAucG5nIiwiaWF0IjoxNjg4MTAzMzM1LCJleHAiOjE3MTk2MzkzMzV9.RsRc637FjdD9xtPFEeypnJrDOzri2fI5CnPkvIE2YVw&t=2023-06-30T05%3A35%3A36.742Z",
    },
  ] as Habit[];
  const promises = DATA.map((habit) =>
    prisma.habit.upsert({
      where: {
        name: habit.name,
      },
      update: {
        img: habit.img,
        subtitle: habit.subtitle,
        title: habit.title,
        name: habit.name,
        minutes: habit.minutes,
      },
      create: {
        img: habit.img,
        subtitle: habit.subtitle,
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
