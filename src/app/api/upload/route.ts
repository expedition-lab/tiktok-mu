// src/app/api/upload/route.ts
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: "Missing file" }), { status: 400 });
    }

    // public = generates a public URL. Use private storage later if needed.
    const blob = await put(`proofs/${Date.now()}-${file.name}`, file, { access: "public" });

    return Response.json({ url: blob.url });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
  }
}
