// pages/p/[slug].tsx
import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();
  return (
    <div style={{ padding: 24 }}>
      <h1>Product: {query.slug}</h1>
      <p>Creator cookie will be read in your order API.</p>
    </div>
  );
}
