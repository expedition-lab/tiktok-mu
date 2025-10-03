const faqs = [
  ["How do payouts work?", "Sellers get paid via JUICE or PayPal after the LIVE is confirmed."],
  ["What are the fees?", "Sellers: 0% to list. Buyers: small checkout fee at payment."],
  ["Can I refund?", "Yes, if the LIVE wasn’t delivered as agreed. Contact support."],
];

export default function FAQ() {
  return (
    <section className="bg-slate-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">FAQ</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {faqs.map(([q, a]) => (
            <div key={q} className="rounded-2xl p-6 bg-slate-900 border border-white/10">
              <div className="text-white font-semibold">{q}</div>
              <div className="text-slate-300 mt-2">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
