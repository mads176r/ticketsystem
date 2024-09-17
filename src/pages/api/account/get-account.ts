import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/db";
import { parseCookies } from "nookies";

type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  active: boolean;
  // Include other necessary fields
};

type ResponseData = {
  user?: User;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      // Parse cookies
      const cookies = parseCookies({ req });
      const userData = cookies.userData ? JSON.parse(decodeURIComponent(cookies.userData)) : null;

      if (userData && userData.userID) {
        // Fetch user from the database
        const user = await db.users.findUnique({
          where: { id: userData.userID },
          include: {
            ticketsRequested: true,
            ticketsOwned: true,
          },
        });

        if (user) {
          res.status(200).json({ user });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(401).json({ message: "User not authenticated" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
