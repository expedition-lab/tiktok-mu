export default function Pricing() {
  return (
    <section className="bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Transparent pricing</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-slate-900 border border-white/10">
            <div className="text-white font-semibold">For Buyers</div>
            <p className="text-slate-300 mt-2">Small checkout fee shown at payment. Pay with JUICE or PayPal.</p>
          </div>
          <div className="rounded-2xl p-6 bg-slate-900 border border-white/10">
            <div className="text-white font-semibold">For Sellers</div>
            <p className="text-slate-300 mt-2">0% to list. Payouts in 24–48h after LIVE confirmation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
