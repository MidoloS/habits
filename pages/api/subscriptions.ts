import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const prisma = generatePrismaClient();

  const subs = await prisma.subscriptions.findMany({
    where: {
      user: {
        email: session.user?.email,
      },
    },
    include: {
      habit: true,
    },
  });

  return res.status(200).json(subs);
}
