import { NextRequest } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs"; // or "edge" works too

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  // Your current @vercel/blob types only allow "public"
  const blob = await put(`proofs/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return Response.json({ url: blob.url });
}
