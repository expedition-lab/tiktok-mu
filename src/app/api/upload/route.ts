import { put } from '@vercel/blob';
export const runtime = 'edge'; // or remove this line to use the Node.js runtime

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });

  const blob = await put(`proofs/${Date.now()}-${file.name}`, file, {
    access: 'private', // change to 'public' if you want a public URL
  });

  return Response.json({ url: blob.url });
}
