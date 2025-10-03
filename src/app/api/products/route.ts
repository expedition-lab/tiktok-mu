import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server only
);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, category, price, stock, imageUrl } = body;

  const { error } = await supabase.from("products").insert([
    { name, category, price, stock, image_url: imageUrl }
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
