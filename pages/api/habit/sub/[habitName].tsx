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

  console.log({ cookies: req.cookies });

  console.log("subs", { session });

  console.log({ session });

  console.log("COSA MAGICA BOLADORA");

  const { habitName } = req.query;

  if (!session?.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("wea1", req.method);

  switch (req.method) {
    case "POST":
      await createSubscriptions({
        // @ts-ignore
        habitName,
        email: session?.user?.email,
      });
      res
        .status(200)
        .json({ error: null, data: null, message: "Successfully Subscribed" });
      break;
    case "DELETE":
      await deleteSubscriptions({
        // @ts-ignore
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
      console.log("----------------------- 1 ---------------");

      console.log("entre");

      const sub = await getSubscription({
        // @ts-ignore
        habitName,
        email: session?.user?.email,
      });
      console.log("wea2", sub);

      res.status(200).json({ error: null, data: sub, message: "" });
      break;
    default:
      res
        .status(405)
        .json({ error: "Method not allowed", data: null, message: "" });
      break;
  }
}
