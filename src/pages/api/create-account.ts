"use server";

import { db } from "../../../lib/db";
import { revalidatePath } from "next/cache";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
};

type ResponseData = {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
  data: Data
) {
  if (req.method === 'POST') {
    // Process a POST request
    

    res.status(200).json({ message: 'test' })
  } else {
    res.status(405);
  }
}
