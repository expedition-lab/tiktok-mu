import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId, status } = req.body || {};
  if (!orderId || !["paid", "rejected"].includes(status)) {
    return res.status(400).json({ ok: false, error: "Invalid request" });
  }

  const key = `order:${orderId}`;
  if (!(await redis.exists(key))) return res.status(404).json({ ok: false, error: "Order not found" });

  await redis.hset(key, { status });
  res.status(200).json({ ok: true });
}
