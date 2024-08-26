"use server";

import { db } from "../../../../lib/db";
import { revalidatePath } from "next/cache";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  email: string;
  password: string;
  roles: string[];
};

type ResponseData = {
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
      await db.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          roles: data.roles,
          active: true
        }
      });

      res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
