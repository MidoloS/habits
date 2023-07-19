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
      minutes: 5,
      isPro: false,
      title: "Tidy up",
      subtitle: "Tidy Bed",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/tidy?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGlkeSIsImlhdCI6MTY4OTc3NjM5MCwiZXhwIjoxNzIxMzEyMzkwfQ.vY28I3haXuM3ApBsbV3vpYgGjVHnPFgimXnKJx5X_Kc&t=2023-07-19T14%3A19%3A50.529Z",
    },
    {
      name: "walk",
      minutes: 20,
      isPro: false,
      title: "Take a Walk",
      subtitle: "Go for a walk in the park",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/walk?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2FsayIsImlhdCI6MTY4OTc3NjM3OCwiZXhwIjoxNzIxMzEyMzc4fQ.ITeHStCrTwaTqIaU3dHdvnE1XD2OlocGeruTVFX_kug&t=2023-07-19T14%3A19%3A38.412Z",
    },
    {
      name: "eat",
      minutes: 30,
      isPro: false,
      title: "Healthy Meal",
      subtitle: "Eat a healthy meal",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meal?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVhbCIsImlhdCI6MTY4OTc3NjM2MiwiZXhwIjoxNzIxMzEyMzYyfQ.Q--BilVvNGTJigh6r9ILmfWXZOwjSSKe7xMP047kM2Y&t=2023-07-19T14%3A19%3A22.852Z",
    },
    {
      name: "read",
      minutes: 20,
      isPro: false,
      title: "Read",
      subtitle: "Read a book",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/read.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcmVhZC5wbmciLCJpYXQiOjE2ODk3NzYzNDAsImV4cCI6MTcyMTMxMjM0MH0.DqoRFuuhF5aLR-sapN0joVIHS6qHuMAm-lXLKE1RmGc&t=2023-07-19T14%3A19%3A00.495Z",
    },
    {
      name: "wakeup",
      minutes: 1,
      isPro: false,
      title: "Wake up Early",
      subtitle: "Wake up early in the morning",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/wake?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2FrZSIsImlhdCI6MTY4OTc3NjMxNiwiZXhwIjoxNzIxMzEyMzE2fQ.Jqvt1aW9znmE_jMPVLy-vYn_qf6teX3chzMmwMBsRjs&t=2023-07-19T14%3A18%3A36.294Z",
    },
    {
      name: "train",
      minutes: 30,
      isPro: false,
      title: "Train",
      subtitle: "Train your body",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/train?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdHJhaW4iLCJpYXQiOjE2ODk3NzYzMDIsImV4cCI6MTcyMTMxMjMwMn0.2YLQNp9zSpHRE_8zl0xglnJ_dApo31xzXUvaqMiUn9o&t=2023-07-19T14%3A18%3A22.599Z",
    },
    {
      name: "brush",
      minutes: 3,
      isPro: false,
      title: "Brush Teeth",
      subtitle: "Brush your teeth",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/brush.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYnJ1c2gucG5nIiwiaWF0IjoxNjg5Nzc2MjczLCJleHAiOjE3MjEzMTIyNzN9.Kw1CaU9JNIbMUVosYwHlZ15U_Yb_lNiSmCoXmqWlqcs&t=2023-07-19T14%3A17%3A53.608Z",
    },
    {
      name: "meditate",
      minutes: 10,
      isPro: false,
      title: "Meditate",
      subtitle: "Meditate for 10 minutes",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meditate.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVkaXRhdGUucG5nIiwiaWF0IjoxNjg5Nzc2MjU5LCJleHAiOjE3MjEzMTIyNTl9.TVN4gz4d2kIHHzYmj1cD3H2fdvQoSwq8Map4XMm8I28&t=2023-07-19T14%3A17%3A39.186Z",
    },
    {
      name: "laundry",
      minutes: 5,
      isPro: false,
      title: "Do the Laundry",
      subtitle: "Do the laundry",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/laundry?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbGF1bmRyeSIsImlhdCI6MTY4OTc3NjIzMywiZXhwIjoxNzIxMzEyMjMzfQ.CR4bMScvoLOzwA5Ja4XF0kYIZX6l3COujYMvfq9pGHM&t=2023-07-19T14%3A17%3A14.100Z",
    },
    {
      name: "drink",
      minutes: 1,
      isPro: false,
      title: "Keep Hydrated",
      subtitle: "Drinking water",
      img: "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/drink.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZHJpbmsucG5nIiwiaWF0IjoxNjg5Nzc3MzIxLCJleHAiOjE3MjEzMTMzMjF9._iggAG835jFwx9EYNNWEO9r19ST7IKYlv0kGmyXz1iw&t=2023-07-19T14%3A35%3A21.583Z",
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

  res.status(200).json({ habits });
}
