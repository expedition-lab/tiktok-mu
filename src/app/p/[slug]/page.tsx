// src/app/p/[slug]/page.tsx
export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>
        Demo product: {params.slug}
      </h1>
      <p style={{ marginTop: 8 }}>
        Creator cookie: reads from <code>document.cookie</code> on client or from
        headers in your API when you place the order.
      </p>
      <p style={{ marginTop: 8, color: "#666" }}>
        Replace this page with your real product UI later.
      </p>
    </div>
  );
}
