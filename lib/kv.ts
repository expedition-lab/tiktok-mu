// lib/kv.ts
import { kv } from "@vercel/kv";
export { kv };
// Keys we'll use:
// products:{slug} -> { id, title, price_mur, image_url, stock }
// creators:{handle} -> { id, handle, name, phone, commission_percent }
// links:{code} -> { code, product_slug, creator_handle }
// orders:{order_no} -> {...}
