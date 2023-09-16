import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  createSubscriptions,
  deleteSubscriptions,
  getSubscription,
  getSubscriptions,
} from "@/prisma/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const habitName = req.query.habitName as string;

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "POST":
      await createSubscriptions({
        habitName,
        email: session?.user?.email,
      });
      res
        .status(200)
        .json({ error: null, data: null, message: "Successfully Subscribed" });
      break;
    case "DELETE":
      await deleteSubscriptions({
        habitName,
        email: session?.user?.email,
      });
      res.status(200).json({
        error: null,
        data: null,
        message: "Successfully Unsubscribed",
      });
      break;
    case "GET":
      const sub = await getSubscription({
        habitName,
        email: session?.user?.email,
      });

      res.status(200).json({ error: null, data: sub, message: "" });
      break;
    default:
      res
        .status(405)
        .json({ error: "Method not allowed", data: null, message: "" });
      break;
  }
}
