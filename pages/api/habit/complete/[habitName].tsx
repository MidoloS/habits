import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generatePrismaClient } from "@/prisma/client";
import { completeHabit } from "@/prisma/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed", data: null });
  }

  const prisma = generatePrismaClient();

  const session = await getServerSession(req, res, authOptions);

  const { habitName } = req.query;

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log(req.body, habitName, 1);

  console.log("habit completed");

  const wea = await completeHabit({
    email: session.user.email,
    habitName: habitName as string,
  });

  console.log(wea);

  res.status(200).json({ data: {}, error: null, message: "" });
}
