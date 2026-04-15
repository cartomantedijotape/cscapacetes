import type { Metadata } from "next";
import { CartProvider } from "@/hooks/useCart";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planeta Atacados",
  description:
    "Planeta Atacados - Capacetes e acessórios para motociclistas com até 87% OFF. NORISK, LS2, AGV, Alpinestars.",
  openGraph: {
    title: "Planeta Atacados — Capacetes e Acessórios",
    description:
      "Capacetes e acessórios para motociclistas com até 87% de desconto. Marcas: NORISK, LS2, AGV, Alpinestars.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
