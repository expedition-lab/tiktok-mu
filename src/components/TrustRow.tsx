export default function TrustRow() {
  const items = ["Local payouts (JUICE)", "Secure checkout (PayPal)", "Same-day bookings", "0% to list"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-300">
      {items.map((t) => (
        <div key={t} className="rounded-lg border border-white/10 px-3 py-2">
          {t}
        </div>
      ))}
    </div>
  );
}
