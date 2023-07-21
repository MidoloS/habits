import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  await prisma.subscriptions.updateMany({
    where: {
      completedAt: null,
    },
    data: {
      streak: 0,
    },
  });

  await prisma.subscriptions.updateMany({
    data: {
      completedAt: null,
    },
  });

  return res.status(200).json({ message: "OK" });
}
