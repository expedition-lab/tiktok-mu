import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId, proofUrl, payerPhone, amountMUR } = req.body || {};
  if (!orderId || !amountMUR) return res.status(400).json({ ok: false, error: "Missing fields" });

  const key = `order:${orderId}`;
  if (!(await redis.exists(key))) return res.status(404).json({ ok: false, error: "Order not found" });

  await redis.hset(key, {
    amountMUR: Number(amountMUR),
    proofUrl: proofUrl || "",
    payerPhone: payerPhone || "",
    status: "awaiting_review",
  });

  res.status(200).json({ ok: true, orderId, status: "awaiting_review" });
}
