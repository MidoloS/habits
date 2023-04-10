import { generatePrismaClient } from "@/prisma/client";
import { HabitName, Habit } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  const { email = "midolo.1912@gmail.com", habitName } = JSON.parse(req.body);

  console.log(req.body, habitName, 1);

  const wea = await prisma.subscriptions.updateMany({
    where: {
      userEmail: email,
      habitName: habitName as HabitName,
      completedAt: null,
    },
    data: {
      completedAt: new Date(),
      streak: {
        increment: 1,
      },
    },
  });

  console.log(wea);

  return res.status(200).json(wea);
}
