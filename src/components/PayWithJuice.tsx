"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  amountMUR: number;
  merchantQrUrl: string; // can be /local.png or a remote URL
};

type ConfirmResponse = { ok: true } | { ok: false; error?: string };

export default function PayWithJuice({ amountMUR, merchantQrUrl }: Props) {
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
      const data: { orderId?: string } = await res.json();
      if (!data.orderId) throw new Error("No orderId in response");
      setOrderId(data.orderId);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to create order");
    }
  }

  async function confirm() {
    if (!orderId || submitting) return;

    // quick client-side validation (keeps API clean)
    if (!proofUrl.startsWith("http")) {
      setError("Please paste a valid link to your payment proof image.");
      return;
    }
    if (payerPhone.trim().length < 6) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, proofUrl, payerPhone, amountMUR }),
      });

      const data: ConfirmResponse = await res.json().catch(
        (): ConfirmResponse => ({ ok: false, error: "Invalid server response" })
      );

      if (!res.ok || !data.ok) {
        throw new Error(("error" in data && data.error) || `Confirm failed: ${res.status}`);
      }
      alert("Thanks! Your payment is awaiting review.");
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to confirm payment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-xl">
      <h3 className="text-lg font-semibold">Pay with MCB Juice</h3>

      {error && (
        <div className="text-red-600 text-sm border border-red-300 rounded p-2" role="alert">
          {error}
        </div>
      )}

      {!orderId ? (
        <button
          onClick={createOrder}
          className="rounded-lg px-4 py-2 border"
          aria-label="Generate order"
        >
          Generate Order
        </button>
      ) : (
        <div className="space-y-3">
          <div className="text-sm">
            <div>
              Order ID: <b>{orderId}</b>
            </div>
            <div>
              Amount: <b>Rs {amountMUR}</b>
            </div>
          </div>

          <div className="flex items-start gap-4">
            {/* ✅ next/image instead of <img> */}
            <div className="border rounded-lg">
              <Image
                src={merchantQrUrl}
                alt="Juice QR"
                width={160}
                height={160}
                className="object-contain w-40 h-40"
                // remove "unoptimized" once remotePatterns are configured in next.config.ts
                unoptimized={merchantQrUrl.startsWith("http")}
                priority
              />
            </div>

            <div className="text-sm opacity-80">
              1) Open Juice app
              <br />
              2) Scan QR &amp; pay Rs {amountMUR}
              <br />
              3) Use reference: <b>{orderId}</b>
              <br />
              4) Upload payment proof below
            </div>
          </div>

          <input
            type="url"
            placeholder="Proof image URL"
            className="w-full border rounded-lg px-3 py-2"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
            aria-label="Proof image URL"
          />
          <input
            type="tel"
            placeholder="Your phone (for confirmation)"
            className="w-full border rounded-lg px-3 py-2"
            value={payerPhone}
            onChange={(e) => setPayerPhone(e.target.value)}
            aria-label="Payer phone"
          />

          <button
            onClick={confirm}
            disabled={submitting}
            className="rounded-lg px-4 py-2 border disabled:opacity-60"
            aria-busy={submitting}
          >
            {submitting ? "Submitting..." : "I’ve Paid — Submit Proof"}
          </button>
        </div>
      )}
    </div>
  );
}
