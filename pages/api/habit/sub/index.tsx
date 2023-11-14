import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSubscriptions } from "@/prisma/helpers";
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

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed", data: null });
  }

  const subs = await getSubscriptions({
    email: session?.user?.email,
  });

  console.log({ subs });

  res.status(200).json({ error: null, data: subs, message: "" });
}
