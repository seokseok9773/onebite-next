import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const time = new Date().toLocaleString();
  return (
    res.status(200).json({ data : time })
  )
}
