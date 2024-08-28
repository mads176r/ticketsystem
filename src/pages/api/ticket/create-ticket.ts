import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    title: string;
    description: string;
    RequesterID: string;
    OwnerID: string;
    status?: string;
    closedAt?: Date | null;
};

type Ticket = {
    id: string;
    title: string;
    description: string;
    RequesterID: string;
    OwnerID: string;
    status: string;
    createdAt: Date;
    updatedAt: Date ;
    closedAt?: Date | null;
};

type ResponseData = {
    finalTickets: Ticket | null;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const data: Data = req.body;

        data.status = data.status ?? "Open";

        console.log(data)

        try {
            const ticket: Ticket = await db.tickets.create({
                data: data as any
            });

            console.log("Succesfully created ticket")
            res.status(200).json({ finalTickets: ticket, message: 'Ticket created successfully' });
        } catch (error) {
            console.log("Error in ticket creation")
            res.status(400).json({ finalTickets: null, message: 'Error creating ticket' });
        }
    } else {
        res.status(405).json({ finalTickets: null, message: 'Method not allowed' });
    }
}
