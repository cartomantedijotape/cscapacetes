import type { Metadata } from "next";
import { PixConfirmationClient } from "./PixConfirmationClient";

export const metadata: Metadata = {
  title: "Pagamento PIX — CS Capacetes",
  description: "Escaneie o QR code ou copie o código PIX para finalizar seu pagamento.",
};

export default function PixPage() {
  return <PixConfirmationClient />;
}
