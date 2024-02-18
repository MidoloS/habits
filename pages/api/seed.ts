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
      title: "Make the Bed",
      subtitle: "Tidy Bed",
      points: 100,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/tidy_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGlkeV93aWRlLnBuZyIsImlhdCI6MTcwODIzNzI4MCwiZXhwIjoxNzM5NzczMjgwfQ.NqxTlwFcPANZ22KaLKme4SK50Ply7gi7HmEa9yMgpEA&t=2024-02-18T06%3A21%3A19.520Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/tidy_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGlkeV90YWxsLnBuZyIsImlhdCI6MTcwODIzNzMwOSwiZXhwIjoxNzM5NzczMzA5fQ.WryApGlVypFjXWf_euRQvbFjdkRQqSCcEvHMiHyhVEI&t=2024-02-18T06%3A21%3A48.207Z",
    },
    {
      name: "walk",
      minutes: 20,
      isPro: false,
      title: "Take a Walk",
      subtitle: "Go to the Park",
      points: 200,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/walk_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2Fsa193aWRlLnBuZyIsImlhdCI6MTcwODIzNzMzMSwiZXhwIjoxNzM5NzczMzMxfQ.-NIKxgnTjRfExApIcQRyPfGjVLjvVTb665LDasuDhys&t=2024-02-18T06%3A22%3A10.005Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/walk_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2Fsa190YWxsLnBuZyIsImlhdCI6MTcwODIzNzMyMiwiZXhwIjoxNzM5NzczMzIyfQ.aUFi9VK4J4eq2xXB4wd_w1iUeF8eqwYx1gc4el2eNv4&t=2024-02-18T06%3A22%3A00.908Z",
    },
    {
      name: "eat",
      minutes: 30,
      isPro: false,
      title: "Eat fruit",
      subtitle: "Eat healthy",
      points: 200,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meal_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVhbF93aWRlLnBuZyIsImlhdCI6MTcwODIzNzM3OCwiZXhwIjoxNzM5NzczMzc4fQ.PLLm0nKYopjZ35eawXZwWCtWPCqktU9UHTeY9sWh2yM&t=2024-02-18T06%3A22%3A56.984Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meal_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVhbF90YWxsLnBuZyIsImlhdCI6MTcwODIzNzM1OCwiZXhwIjoxNzM5NzczMzU4fQ.aaB55cJrK3qlw4OcCvfTOCmdf3M0mLGF7oF2KMLnBHE&t=2024-02-18T06%3A22%3A37.144Z",
    },
    {
      name: "read",
      minutes: 20,
      isPro: false,
      title: "Read",
      subtitle: "10 Pages is a good start!",
      points: 0,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/read_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcmVhZF93aWRlLnBuZyIsImlhdCI6MTcwODIzNzM5MCwiZXhwIjoxNzM5NzczMzkwfQ.-wEYvHOpimHMw0vAy4lt0MSINisQbVYKJW6waPGbav4&t=2024-02-18T06%3A23%3A08.890Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/read_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcmVhZF90YWxsLnBuZyIsImlhdCI6MTcwODIzNzQwNCwiZXhwIjoxNzM5NzczNDA0fQ.MGHq0rUv_RhGGCfS2v1E_R2xQoXdQq9m_Vkw0y7bsUY&t=2024-02-18T06%3A23%3A23.086Z",
    },
    {
      name: "wakeup",
      minutes: 1,
      isPro: false,
      title: "Wake up Early",
      subtitle: "7 to 9AM",
      points: 100,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/wake_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2FrZV93aWRlLnBuZyIsImlhdCI6MTcwODIzNzQ3MSwiZXhwIjoxNzM5NzczNDcxfQ.ObSZrsxElzzv9RaVD0tgERL056dkOtJOhp6D9tMHvlI&t=2024-02-18T06%3A24%3A29.980Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/wake_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvd2FrZV90YWxsLnBuZyIsImlhdCI6MTcwODIzNzQ2MSwiZXhwIjoxNzM5NzczNDYxfQ.ER4LfZQTaZxEXi9nl_zOJ-hLhBA_o389tSdGkgEPx9M&t=2024-02-18T06%3A24%3A20.567Z",
    },
    {
      name: "brush",
      minutes: 3,
      isPro: false,
      title: "Brush Teeth",
      subtitle: "Smile!",
      points: 50,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/brush_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYnJ1c2hfd2lkZS5wbmciLCJpYXQiOjE3MDgyMzc0ODgsImV4cCI6MTczOTc3MzQ4OH0.Auu7UB-_BUuBBHphAceay8cN8fgacD0rEzE4SpXlngE&t=2024-02-18T06%3A24%3A47.608Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/brush_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYnJ1c2hfdGFsbC5wbmciLCJpYXQiOjE3MDgyMzc0OTcsImV4cCI6MTczOTc3MzQ5N30.UszJVB9-wahIakrF2fPalDZfRIqcnSt4yjgieU_x2xQ&t=2024-02-18T06%3A24%3A56.817Z",
    },
    {
      name: "meditate",
      minutes: 10,
      isPro: false,
      title: "Meditate",
      subtitle: "Breath Deeply",
      points: 0,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meditate_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVkaXRhdGVfd2lkZS5wbmciLCJpYXQiOjE3MDgyMzc2MTIsImV4cCI6MTczOTc3MzYxMn0.RLuSWvbQ0TomN35NbRkl2cvovlVdl7_oD17wyabaRUA&t=2024-02-18T06%3A26%3A50.892Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/meditate_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbWVkaXRhdGVfdGFsbC5wbmciLCJpYXQiOjE3MDgyMzc2MDAsImV4cCI6MTczOTc3MzYwMH0.9XV6wdCBnpoBV1Uzevn4dTJ3K1iaJcnAtfScijlrF6I&t=2024-02-18T06%3A26%3A39.731Z",
    },
    {
      name: "laundry",
      minutes: 5,
      isPro: false,
      title: "Do the Laundry",
      subtitle: "Do the laundry",
      points: 50,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/laundry_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbGF1bmRyeV93aWRlLnBuZyIsImlhdCI6MTcwODIzNzYyNSwiZXhwIjoxNzM5NzczNjI1fQ.8wOpBLHcYA-1SD5bsJ4wCqpsPkZPqfD4L-4tVQQRhjc&t=2024-02-18T06%3A27%3A04.071Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/laundry_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbGF1bmRyeV90YWxsLnBuZyIsImlhdCI6MTcwODIzNzYzNiwiZXhwIjoxNzM5NzczNjM2fQ.MuaG5rGBr5-1LwAtwDi4UXLl_fYAXK8O-yI0HmT4Ydk&t=2024-02-18T06%3A27%3A15.087Z",
    },
    {
      name: "drink",
      minutes: 1,
      isPro: false,
      title: "Keep Hydrated",
      subtitle: "Drinking water",
      points: 30,
      wideImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/drink_wide.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZHJpbmtfd2lkZS5wbmciLCJpYXQiOjE3MDgyMzc2NDksImV4cCI6MTczOTc3MzY0OX0.SLEjcitL6IYG-ONynqokedNNP9S4lSFl6VU6-151bLs&t=2024-02-18T06%3A27%3A28.371Z",
      tallImage:
        "https://mabfjyjbggqdwqtjdwip.supabase.co/storage/v1/object/sign/images/drink_tall.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZHJpbmtfdGFsbC5wbmciLCJpYXQiOjE3MDgyMzc2NTYsImV4cCI6MTczOTc3MzY1Nn0.PIaEcFaw6-beK0wjCs62ge0EmxNm6A0BAPJqy1n64mM&t=2024-02-18T06%3A27%3A35.404Z",
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
