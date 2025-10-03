export default function HowItWorks() {
  const steps = [
    { title: "Pick a creator", body: "Filter by niche, budget, and audience." },
    { title: "Set your brief", body: "What to say, when to go LIVE, links to include." },
    { title: "Pay & go LIVE", body: "Secure checkout (JUICE / PayPal). Payouts in 24–48h." },
  ];
  return (
    <section className="bg-slate-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">How it works</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl p-6 bg-slate-900 border border-white/10">
              <div className="text-cyan-300 text-sm">Step {i + 1}</div>
              <div className="mt-2 text-white font-semibold">{s.title}</div>
              <div className="mt-1 text-slate-300">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
