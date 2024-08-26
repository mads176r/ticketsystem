"use server";

import { db } from "../../../lib/db";
import { revalidatePath } from "next/cache";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  name: string;
  email: string;
};

type ResponseData = {
  tickets: any[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    // Extract data from the request body
    const data: Data = req.body;

    try {
      // Process a POST request
      const tickets = await db.tickets.findMany();

      res.status(200).json({ tickets: tickets, message: 'Tickets retrieved successfully' });
    } catch (error) {
      res.status(500).json({ tickets: [], message: 'Error retrieving tickets' });
    }
  } else {
    res.status(405).json({ tickets: [], message: 'Method not allowed' });
  }
}
