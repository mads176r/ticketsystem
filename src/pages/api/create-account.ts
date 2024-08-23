// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    res.status(405);
  }

  
}
