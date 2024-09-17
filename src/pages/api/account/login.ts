import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

type Data = {
  email: string;
  password: string;
};

type CookieData = {
  userID: string;
  name: string;
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

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const data: Data = req.body;

    try {
      const user = await GetUser(data);

      if (user && await comparePassword(data.password, user.password)) {
        const cookieData: CookieData = {
          userID: user.id,
          name: user.name,
        };

        console.log("Setting cookie:", cookieData); // Debug: Log cookie data

        res.setHeader(
          "Set-Cookie",
          `userData=${encodeURIComponent(
            JSON.stringify(cookieData)
          )}; Path=/; HttpOnly; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        );

        res.status(200).json({ message: "Cookie set" });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

async function GetUser(data: Data): Promise<User | null> {
  try {
    const user = await db.users.findUnique({
      where: { email: data.email },
      include: {
        ticketsRequested: true,
        ticketsOwned: true,
      },
    });

    return user as User | null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
