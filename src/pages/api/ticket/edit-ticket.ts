import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/db"; // Assuming you're using Prisma for your database

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  try {
    const updatedTicket = await db.tickets.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        RequesterID: data.RequesterID, // Ensure this matches your database schema
        OwnerID: data.OwnerID,         // Ensure this matches your database schema
      },
    });

    res.status(200).json({ finalTickets: updatedTicket });
  } catch (error) {
    console.error("Error in ticket updating", error);
    res.status(400).json({ finalTickets: null, message: 'Error in ticket updating', error });
  }
}
