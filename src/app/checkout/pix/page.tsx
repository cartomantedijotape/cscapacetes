import type { Metadata } from "next";
import { PixConfirmationClient } from "./PixConfirmationClient";

export const metadata: Metadata = {
  title: "Pagamento PIX — Planeta Atacados",
  description: "Escaneie o QR code ou copie o código PIX para finalizar seu pagamento.",
};

export default function PixPage() {
  return <PixConfirmationClient />;
}
