import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!;
const token = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!;

if (!url || !token) {
  throw new Error("Missing Upstash Redis env vars");
}

export const redis = new Redis({ url, token });
