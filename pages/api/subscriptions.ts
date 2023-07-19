import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  console.log({ sess2: session });

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log(4);

  const prisma = generatePrismaClient();

  console.log(5);

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

  console.log(6);

  console.log("weador", subs);

  return res.status(200).json(subs);
}
