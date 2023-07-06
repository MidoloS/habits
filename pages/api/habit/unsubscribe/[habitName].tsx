import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteSubscriptions } from "@/prisma/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { habitName } = req.query;

  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("weador");

  await deleteSubscriptions({
    // @ts-ignore
    habitName,
    email: session?.user?.email,
  });
  res.status(200).json({ message: "Unsubscribed!" });
}
