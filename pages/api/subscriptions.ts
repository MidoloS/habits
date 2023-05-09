import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email = "midolo.1912@gmail.com" } = JSON.parse(
    JSON.stringify(req.body)
  );

  const prisma = generatePrismaClient();

  const subs = await prisma.subscriptions.findMany({
    where: {
      userEmail: email,
    },
    include: {
      habit: true,
    },
  });

  return res.status(200).json(subs);
}
