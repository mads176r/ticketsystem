import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { userID } = req.query;

    if (typeof userID !== "string") {
      return res.status(400).json({ message: "Invalid userID" });
    }

    try {
      const user = await db.users.findUnique({
        where: { id: userID },
        select: { id: true, name: true, email: true },
      });

      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
