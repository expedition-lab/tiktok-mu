// Simple in-memory store (resets on redeploy). We'll swap to KV/Supabase later.
export type Order = {
  orderId: string;
  amountMUR: number;
  proofUrl?: string;
  payerPhone?: string;
  status: "pending" | "awaiting_review" | "paid" | "rejected";
  createdAt: string;
};

const g = globalThis as any;
if (!g.__ORDERS__) g.__ORDERS__ = new Map<string, Order>();

export function saveOrder(o: Order) {
  g.__ORDERS__.set(o.orderId, o);
}
export function updateOrder(orderId: string, patch: Partial<Order>) {
  const cur = g.__ORDERS__.get(orderId);
  if (!cur) return null;
  const next = { ...cur, ...patch };
  g.__ORDERS__.set(orderId, next);
  return next;
}
export function getOrder(orderId: string) {
  return g.__ORDERS__.get(orderId) as Order | undefined;
}
export function listOrders() {
  return Array.from(g.__ORDERS__.values()) as Order[];
}
