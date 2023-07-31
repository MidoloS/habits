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
      points: 100,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/tidy_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGlkeV93aWRlIiwiaWF0IjoxNjkwNzY2NDUwLCJleHAiOjE3MjIzMDI0NTB9.nFlkvSo5rVgS3bVnOGxbgdF6zNovIE0Jcn6n_0y3fSs&t=2023-07-31T01%3A20%3A51.048Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/tidy_tall?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGlkeV90YWxsIiwiaWF0IjoxNjkwNzY5ODEwLCJleHAiOjE3MjIzMDU4MTB9.MDCZsBY5pDz1jqBXOTemnF4vSzSjvycubdeWIyGn0R0&t=2023-07-31T02%3A16%3A50.453Z",
    },
    {
      name: "walk",
      minutes: 20,
      isPro: false,
      title: "Take a Walk",
      subtitle: "Go for a walk in the park",
      points: 200,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/walk_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2Fsa193aWRlIiwiaWF0IjoxNjkwNzY2MDU3LCJleHAiOjE3MjIzMDIwNTd9.JJSHwDOAWZrVWbQWB9EQ0mW4px3AcHdT9MH7j1m2Vzs&t=2023-07-31T01%3A14%3A17.542Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/walk?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2FsayIsImlhdCI6MTY4OTc3NjM3OCwiZXhwIjoxNzIxMzEyMzc4fQ.ITeHStCrTwaTqIaU3dHdvnE1XD2OlocGeruTVFX_kug&t=2023-07-19T14%3A19%3A38.412Z",
    },
    {
      name: "eat",
      minutes: 30,
      isPro: false,
      title: "Healthy Meal",
      subtitle: "Eat a healthy meal",
      points: 200,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meal_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVhbF93aWRlIiwiaWF0IjoxNjkwNzY2MDQ1LCJleHAiOjE3MjIzMDIwNDV9.uHz3406nWJaeK9yjC1rkV3RCKX3jn3uoCHG8KaSiUq0&t=2023-07-31T01%3A14%3A05.900Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meal_tall?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVhbF90YWxsIiwiaWF0IjoxNjkwNzY5Nzc3LCJleHAiOjE3MjIzMDU3Nzd9.QgtCXArc-Ejo-HlA-Yxl88BGrxNnBE7pbSkW-D7ka14&t=2023-07-31T02%3A16%3A17.366Z",
    },
    {
      name: "read",
      minutes: 20,
      isPro: false,
      title: "Read",
      subtitle: "Read a book",
      points: 0,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/read_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcmVhZF93aWRlIiwiaWF0IjoxNjkwNzY2MDMxLCJleHAiOjE3MjIzMDIwMzF9.c4UjdLkG01WgBkSBGkoef8c7dref3NhJIweYAnKXgMM&t=2023-07-31T01%3A13%3A51.974Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/read_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcmVhZF90YWxsLnBuZyIsImlhdCI6MTY5MDc2OTc5OSwiZXhwIjoxNzIyMzA1Nzk5fQ.c8LJ4YiLm8NeYMH71ebXBvMfEwlJbTv9CH2Mlhud5LU&t=2023-07-31T02%3A16%3A40.033Z",
    },
    {
      name: "wakeup",
      minutes: 1,
      isPro: false,
      title: "Wake up Early",
      subtitle: "Wake up early in the morning",
      points: 100,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/wake_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2FrZV93aWRlIiwiaWF0IjoxNjkwNzcxNTQyLCJleHAiOjE3MjIzMDc1NDJ9.PZytDaegtW1Yz3V2-u6Y92sj_5cK_P1zh5WDoFbRW1w&t=2023-07-31T02%3A45%3A43.092Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/walk_tall?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2Fsa190YWxsIiwiaWF0IjoxNjkwNzY5ODQzLCJleHAiOjE3MjIzMDU4NDN9.DofSOcQSDJBogTLIEZFp37vjm4ZfvxwgWmBUrsgS8ds&t=2023-07-31T02%3A17%3A24.043Z",
    },
    {
      name: "train",
      minutes: 30,
      isPro: false,
      title: "Train",
      subtitle: "Train your body",
      points: 300,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/train_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdHJhaW5fd2lkZSIsImlhdCI6MTY5MDc2NjAxMCwiZXhwIjoxNzIyMzAyMDEwfQ.4DJJ-UeBnXCifrhURNG8GA54HiZ8l1Az82M_1xqMx64&t=2023-07-31T01%3A13%3A31.012Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/tidy_tall?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGlkeV90YWxsIiwiaWF0IjoxNjkwNzY5ODEwLCJleHAiOjE3MjIzMDU4MTB9.MDCZsBY5pDz1jqBXOTemnF4vSzSjvycubdeWIyGn0R0&t=2023-07-31T02%3A16%3A50.453Z",
    },
    {
      name: "brush",
      minutes: 3,
      isPro: false,
      title: "Brush Teeth",
      subtitle: "Brush your teeth",
      points: 50,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/brush_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYnJ1c2hfd2lkZSIsImlhdCI6MTY5MDc2NTM0OCwiZXhwIjoxNzIyMzAxMzQ4fQ.6fYTmJT7RmkjcgMVBRYyT_HI6B-z9DGX3NJ4iWYbSY4&t=2023-07-31T01%3A02%3A28.689Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/brush.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYnJ1c2gucG5nIiwiaWF0IjoxNjg5OTQ2MTQ1LCJleHAiOjE3MjE0ODIxNDV9.7wjdab2n5mLZqPOf9wSpXgRL9PXsqI6_wwryCfvPZdg&t=2023-07-21T13%3A29%3A07.077Z",
    },
    {
      name: "meditate",
      minutes: 10,
      isPro: false,
      title: "Meditate",
      subtitle: "Meditate for 10 minutes",
      points: 0,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meditate_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVkaXRhdGVfd2lkZSIsImlhdCI6MTY5MDc2NTk5NSwiZXhwIjoxNzIyMzAxOTk1fQ.Q-Zc4kvvEX-brapYFTMOmsOgqxqXM1WiCa1zUMWYNmU&t=2023-07-31T01%3A13%3A15.764Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meditate_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVkaXRhdGVfdGFsbC5wbmciLCJpYXQiOjE2OTA3Njk3ODgsImV4cCI6MTcyMjMwNTc4OH0.HPikD6ATvwPRH9zmuNGS4YCkcj5PMqtnJtjNB5BGO_c&t=2023-07-31T02%3A16%3A28.658Z",
    },
    {
      name: "laundry",
      minutes: 5,
      isPro: false,
      title: "Do the Laundry",
      subtitle: "Do the laundry",
      points: 50,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/laundry_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbGF1bmRyeV93aWRlIiwiaWF0IjoxNjkwNzY1OTM5LCJleHAiOjE3MjIzMDE5Mzl9.24P-GTfIQo15buTXdLvYGf04ttatP_YmF409vD3cdVw&t=2023-07-31T01%3A12%3A20.272Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/laundry_tall?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbGF1bmRyeV90YWxsIiwiaWF0IjoxNjkwNzY5NzY2LCJleHAiOjE3MjIzMDU3NjZ9.rvZzH_t8qwtuhnYpvh5N44Y5KBYIcIqbnMTSqhhQeIE&t=2023-07-31T02%3A16%3A06.573Z",
    },
    {
      name: "drink",
      minutes: 1,
      isPro: false,
      title: "Keep Hydrated",
      subtitle: "Drinking water",
      points: 30,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/drink_wide?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZHJpbmtfd2lkZSIsImlhdCI6MTY5MDc2NTQ0MiwiZXhwIjoxNzIyMzAxNDQyfQ.LdrsEPMASF2xZ15wc9pNF46Z3VI5VOUKLBuVjuBoexA&t=2023-07-31T01%3A04%3A02.458Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/drink_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZHJpbmtfdGFsbC5wbmciLCJpYXQiOjE2OTA3Njk3NDMsImV4cCI6MTcyMjMwNTc0M30.Y8Tqu0lYp80kQ92ezW3Kwk6sX15ULXQ5V9ugrKKLSCY&t=2023-07-31T02%3A15%3A43.452Z",
    },
  ] as Habit[];
  const promises = DATA.map((habit) =>
    prisma.habit.upsert({
      where: {
        name: habit.name,
      },
      update: {
        tallImage: habit.tallImage,
        wideImage: habit.wideImage,
        subtitle: habit.subtitle,
        title: habit.title,
        name: habit.name,
        minutes: habit.minutes,
        points: habit.points,
      },
      create: {
        tallImage: habit.tallImage,
        wideImage: habit.wideImage,
        subtitle: habit.subtitle,
        title: habit.title,
        name: habit.name,
        minutes: habit.minutes,
        points: habit.points,
      },
    })
  );
  const habits = await Promise.all(promises);

  res.status(200).json({ habits });
}
