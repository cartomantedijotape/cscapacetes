import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Planeta Atacados",
  description: "Finalize sua compra na Planeta Atacados com pagamento via PIX.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
