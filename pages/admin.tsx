"use client";
import { useEffect, useState } from "react";

type Order = {
  orderId: string;
  amountMUR: number;
  proofUrl?: string;
  payerPhone?: string;
  status: "pending" | "awaiting_review" | "paid" | "rejected";
  createdAt: string;
};

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  async function load() {
    const res = await fetch("/api/orders/list");
    const data = await res.json();
    setOrders(data.orders || []);
  }
  useEffect(() => { load(); }, []);

  async function mark(orderId: string, status: "paid" | "rejected") {
    await fetch("/api/orders/settle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    load();
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Admin — Payments Review</h1>
      <p style={{ opacity: 0.7 }}>This demo uses in-memory storage. We’ll swap to a real DB next.</p>
      <div style={{ marginTop: 16 }}>
        {orders.length === 0 && <div>No orders yet.</div>}
        {orders.map((o) => (
          <div key={o.orderId} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <div><b>{o.orderId}</b> — Rs {o.amountMUR} — <i>{o.status}</i></div>
            <div>Created: {new Date(o.createdAt).toLocaleString()}</div>
            {o.payerPhone && <div>Phone: {o.payerPhone}</div>}
            {o.proofUrl && <div>Proof: <a href={o.proofUrl} target="_blank">Open</a></div>}
            {o.status === "awaiting_review" && (
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button onClick={() => mark(o.orderId, "paid")}>Mark Paid</button>
                <button onClick={() => mark(o.orderId, "rejected")}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
