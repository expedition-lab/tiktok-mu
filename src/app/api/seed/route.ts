// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import { randomUUID as id } from "crypto";

export async function POST() {
  await kv.hset(`products:white-tshirt`, {
    id: id(), title: "White Tee — MU Edition",
    slug: "white-tshirt", price_mur: 799, image_url: "/tee.jpg", stock: 999,
  });
  await kv.hset(`creators:aisha`, {
    id: id(), handle: "aisha", name: "Aisha", phone: "", commission_percent: 15,
  });
  await kv.hset(`links:W1A2B3`, { code:"W1A2B3", product_slug:"white-tshirt", creator_handle:"aisha" });
  return NextResponse.json({ ok:true });
}
