import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Utility function to hash passwords
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

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
      // Hash the password
      const hashedPassword = await hashPassword(data.password);

      // Process a POST request
      await db.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          roles: data.roles,
          active: true
        }
      });

      res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
