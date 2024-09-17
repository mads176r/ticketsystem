import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    title: string | null;
    description: string | null;
    RequesterID: string | null;
    OwnerID: string | null;
    status: string | null;
    closedAt?: Date | null;
};

type Ticket = {
    id: string;
    title: string | null;
    description: string | null;
    RequesterID: string | null;
    OwnerID: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
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
    if (req.method === 'PATCH') {
        const data: Data = req.body;

        console.log(data)

        try {
            const ticket: Ticket = await db.tickets.update({
                data: data as any,
                where: {id: req.body.id as string}
            });

            console.log("Succesfully created ticket")
            res.status(200).json({ finalTickets: ticket, message: 'Ticket created successfully' });
        } catch (error) {
            console.log("Error in ticket creation")
            res.status(400).json({ finalTickets: null, message: 'Error creating ticket' });
        }
    } else {
            console.log("Error in ticket creation")
            res.status(405).json({ finalTickets: null, message: 'Method not allowed' });
    }
}
