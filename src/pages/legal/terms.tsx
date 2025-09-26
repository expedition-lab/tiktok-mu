export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose prose-invert">
      <h1>Terms of Service</h1>
      <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
      <p>TokMarket connects brands (“Clients”) and TikTok creators (“Creators”). Clients pay creator fee + 15% service fee. Creators keep 85%. We hold funds until delivery. Disputes handled via the order.</p>
    </main>
  );
}
