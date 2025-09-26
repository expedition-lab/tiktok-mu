import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../lib/redis";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const ids = await redis.lrange<string>("orders:index", 0, 199);
  if (!ids?.length) return res.status(200).json({ orders: [] });

  const orders = (await Promise.all(ids.map(id => redis.hgetall<Record<string, any>>(`order:${id}`))))
    .filter(Boolean);

  res.status(200).json({ orders });
}
