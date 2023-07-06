import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generatePrismaClient } from "@/prisma/client";
import { createSubscriptions } from "@/prisma/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { habitName } = req.query;
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const prisma = generatePrismaClient();

  const habit = await prisma.subscriptions.findUnique({
    where: {
      userEmail_habitName: {
        // @ts-ignore
        habitName,
        userEmail: session.user.email,
      },
    },
  });

  return habit;
}
