// pages/go/[code].tsx
import type { GetServerSideProps } from "next";

// TEMP map — replace with your DB later
const MAP: Record<string, { product_slug: string; creator_handle: string }> = {
  W1A2B3: { product_slug: "white-tshirt", creator_handle: "aisha" },
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.params as { code: string };
  const ttclid = (ctx.query.ttclid as string) || "";
  const link = MAP[code];

  const dest = link
    ? `/p/${link.product_slug}?c=${link.creator_handle}${ttclid ? `&ttclid=${ttclid}` : ""}`
    : "/";

  return { redirect: { destination: dest, permanent: false } };
};

export default function Go() {
  return null; // Never renders; we redirect on server
}
