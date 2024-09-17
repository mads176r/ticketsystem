import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from 'cookie';

type ResponseData = {
  tickets: any[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      // Parse the cookies from the request header
      const cookies = req.headers.cookie ? parse(req.headers.cookie) : null;
      if (!cookies || !cookies.userData) {
        return res.status(401).json({ tickets: [], message: "Unauthorized" });
      }

      // Parse the user data from the cookie
      const userData = JSON.parse(decodeURIComponent(cookies.userData));

      // Fetch tickets where the user is the Requester or Owner
      const tickets = await db.tickets.findMany({
        where: {
          OR: [
            { RequesterID: userData.userID },
            { OwnerID: userData.userID },
          ],
        },
        include: {
          Requester: true,
          Owner: true,
        },
      });

      res.status(200).json({ tickets });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(400).json({ tickets: [], message: 'Error fetching tickets' });
    }
  } else {
    res.status(405).json({ tickets: [], message: 'Method not allowed' });
  }
}
