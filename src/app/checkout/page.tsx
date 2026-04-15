import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — CS Capacetes",
  description: "Finalize sua compra na CS Capacetes com pagamento via PIX.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
