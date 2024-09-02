// pages/api/account/search.ts
import { db } from "../../../../lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  users: { id: string; name: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const query = req.query.query as string;

  if (req.method === 'GET') {
    try {
      const users = await db.users.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ users: [] });
    }
  } else {
    res.status(405).json({ users: [] });
  }
}
