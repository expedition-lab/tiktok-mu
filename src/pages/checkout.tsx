import PayWithJuice from "../../src/components/PayWithJuice"; 
// If your PayWithJuice is at src/components/PayWithJuice.tsx, this relative import works from pages/*. 
// If you put it at components/ (root), change to: import PayWithJuice from "../components/PayWithJuice";

export default function CheckoutPage() {
  const amountMUR = 1300;
  const merchantQrUrl = "/juice-qr.png"; // ensure public/juice-qr.png exists
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <PayWithJuice amountMUR={amountMUR} merchantQrUrl={merchantQrUrl} />
    </main>
  );
}
