import { createSubscriptions, deleteSubscriptions } from "@/prisma/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email = "midolo.1912@gmail.com", habitName } = JSON.parse(
    JSON.stringify(req.body)
  );

  switch (req.method) {
    case "POST":
      await createSubscriptions({ email, habitName });
      return res.status(200).json({ message: "Subscribed!" });
    case "DELETE":
      await deleteSubscriptions({ email, habitName });
      return res.status(200).json({ message: "Unsubscribed!" });
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
