import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email: string;
  password: string;
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  RequesterID: string;
  OwnerID: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date | null;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
  ticketsRequested: Ticket[];
  ticketsOwned: Ticket[];
};

type ResponseData = {
  user?: User;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    // Extract data from the request body
    const data: Data = req.body;

    try {
      const user = await GetUser(data);

      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function GetUser(data: Data): Promise<User | null> {
  try {
    // Find the user with the given email and include related tickets
    const user = await db.users.findUnique({
      where: { email: data.email },
      include: {
        ticketsRequested: true,
        ticketsOwned: true,
      },
    });

    // Check if the password matches
    if (user && user.password === data.password) {
      return user as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}
