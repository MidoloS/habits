import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  const users = await prisma.user.findMany({
    take: 100,
    orderBy: {
      points: "desc",
    },
  });

  return res.status(200).json({ data: users, error: null, message: "" });
}
