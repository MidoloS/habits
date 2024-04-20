import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generatePrismaClient } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = generatePrismaClient();

  const session = await getServerSession(req, res, authOptions);

  console.log("---------------DELETE------------------");

  if (!session) {
    return res.status(404).json({ message: "Session not started" });
  }

  console.log("deleting", session?.user?.email);

  await prisma.badgeOfUser.deleteMany({
    where: {
      userEmail: session?.user?.email,
    },
  });

  const user = await prisma.user.delete({
    where: {
      email: session?.user?.email,
    },
  });

  return res.status(200).json({ message: "User deleted", data: user });
}
