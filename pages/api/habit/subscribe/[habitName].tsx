import { createSubscriptions } from "@/prisma/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { habitName } = req.query;
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  await createSubscriptions({
    // @ts-ignore
    habitName,
    email: "midolo.1912@gmail.com",
  });
  res.status(200).json({ message: "Subscribed!" });
}
