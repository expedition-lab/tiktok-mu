export const metadata = {
title: "Privacy Policy | TokMarket",
description: "How TokMarket collects, uses, and protects data.",
};


export default function PrivacyPage() {
return (
<main className="max-w-3xl mx-auto px-6 py-12 prose">
<h1>Privacy Policy</h1>
<p>Last updated: October 2025</p>
<p>
We collect account details (name, email), marketplace content, and payment
metadata to operate TokMarket. We never sell personal data. We use
analytics to improve service. You can request deletion by emailing
<a href="mailto:hello@tokmarket.live">hello@tokmarket.live</a>.
</p>
<h2>Data We Process</h2>
<ul>
<li>Account & authentication data</li>
<li>Order & checkout metadata (handled by payment providers)</li>
<li>Logs & analytics (performance and abuse prevention)</li>
</ul>
<h2>Your Rights</h2>
<p>You may access, update, or request deletion of your data.</p>
</main>
);
}
