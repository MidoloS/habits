import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  const habits = await prisma.habit.findMany({});

  return res.status(200).json(habits);
}
