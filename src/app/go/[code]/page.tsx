// src/app/go/[code]/page.tsx
import { redirect } from "next/navigation";

// TEMP mapping — replace with DB/KV later
const MAP: Record<string, { product_slug: string; creator_handle: string }> = {
  W1A2B3: { product_slug: "white-tshirt", creator_handle: "aisha" },
  // add more codes here:
  // "X9Y8Z7": { product_slug: "blue-cap", creator_handle: "kevin" },
};

export default async function Go({ params }: { params: { code: string } }) {
  const link = MAP[params.code];
  if (!link) redirect("/"); // unknown code → home
  // Relative redirect (no env needed)
  redirect(`/p/${link.product_slug}?c=${link.creator_handle}`);
}
