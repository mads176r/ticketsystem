import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

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
      // Fetch tickets with their associated Requester and Owner user data
      const tickets = await db.tickets.findMany({
        include: {
          Requester: true, // Include related Requester user data
          Owner: true,     // Include related Owner user data
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
