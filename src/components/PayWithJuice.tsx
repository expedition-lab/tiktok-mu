


"use client";
import { useState } from "react";

export default function PayWithJuice({
  amountMUR,
  merchantQrUrl,
}: { amountMUR: number; merchantQrUrl: string }) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createOrder() {
    setError(null);
    try {
      const res = await fetch("/api/orders/create", { method: "POST" });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      const data = await res.json();
      if (!data.orderId) throw new Error("No orderId in response");
      setOrderId(data.orderId);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to create order");
    }
  }

  async function confirm() {
    if (!orderId || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, proofUrl, payerPhone, amountMUR }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || `Confirm failed: ${res.status}`);
      }
      alert("Thanks! Your payment is awaiting review.");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to confirm payment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-xl">
      <h3 className="text-lg font-semibold">Pay with MCB Juice</h3>

      {error && (
        <div className="text-red-600 text-sm border border-red-300 rounded p-2">
          {error}
        </div>
      )}

      {!orderId ? (
        <button onClick={createOrder} className="rounded-lg px-4 py-2 border">
          Generate Order
        </button>
      ) : (
        <div className="space-y-3">
          <div className="text-sm">
            <div>Order ID: <b>{orderId}</b></div>
            <div>Amount: <b>Rs {amountMUR}</b></div>
          </div>

          <div className="flex items-start gap-4">
            <img src={merchantQrUrl} alt="Juice QR" className="w-40 h-40 object-contain border rounded-lg" />
            <div className="text-sm opacity-80">
              1) Open Juice app<br />
              2) Scan QR & pay Rs {amountMUR}<br />
              3) Use reference: <b>{orderId}</b><br />
              4) Upload payment proof below
            </div>
          </div>

          <input
            type="url"
            placeholder="Proof image URL"
            className="w-full border rounded-lg px-3 py-2"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Your phone (for confirmation)"
            className="w-full border rounded-lg px-3 py-2"
            value={payerPhone}
            onChange={(e) => setPayerPhone(e.target.value)}
          />

          <button
            onClick={confirm}
            disabled={submitting}
            className="rounded-lg px-4 py-2 border disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "I’ve Paid — Submit Proof"}
          </button>
        </div>
      )}
    </div>
  );
}
