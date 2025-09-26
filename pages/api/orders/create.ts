import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { redis } from "../../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const orderId = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;
  const order = { orderId, amountMUR: 0, status: "pending", createdAt: new Date().toISOString() };

  await redis.hset(`order:${orderId}`, order);
  await redis.lpush("orders:index", orderId);

  res.status(200).json({ orderId });
}
