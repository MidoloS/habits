import { generatePrismaClient } from "@/prisma/client";
import { HabitName } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  const subscribe = async ({
    email,
    habitName,
  }: {
    email: string;
    habitName: HabitName;
  }) => {
    return prisma.subscriptions.create({
      data: {
        user: {
          connect: {
            email,
          },
        },
        habit: {
          connect: {
            name: habitName,
          },
        },
      },
    });
  };

  const unsubscribe = async ({
    email,
    habitName,
  }: {
    email: string;
    habitName: HabitName;
  }) => {
    return prisma.subscriptions.delete({
      where: {
        userEmail_habitName: {
          habitName,
          userEmail: email,
        },
      },
    });
  };

  console.log(req.body);

  const { email = "midolo.1912@gmail.com", habitName } = JSON.parse(
    JSON.stringify(req.body)
  );

  console.log(1);

  (async () => {
    switch (req.method) {
      case "POST":
        await subscribe({ email, habitName });
        return res.status(200).json({ message: "Subscribed!" });
      case "DELETE":
        await unsubscribe({ email, habitName });
        return res.status(200).json({ message: "Unsubscribed!" });
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  })();
}
