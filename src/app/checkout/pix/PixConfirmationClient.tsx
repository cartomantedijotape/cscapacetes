"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, QrCode, Clock, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { checkPaymentStatus } from "@/lib/miuse";
import QRCode from "qrcode";

interface OrderItem {
  title: string;
  size?: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderData {
  paymentId: string;
  pixCode: string; // pix_copia_e_cola
  amount: number;
  items: OrderItem[];
  customer: {
    nome: string;
    email: string;
  };
}

export function PixConfirmationClient() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(1800); // 30 min expiry
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  // Load order from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("cs-pix-order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // No order data
    }
  }, []);

  // Generate QR code image from the PIX copia-e-cola string
  useEffect(() => {
    if (!order?.pixCode) return;

    QRCode.toDataURL(order.pixCode, {
      width: 256,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch(() => setQrCodeDataUrl(null));
  }, [order?.pixCode]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(
      () => setCountdown((c) => (c > 0 ? c - 1 : 0)),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  // Poll Miuse for payment status every 5 seconds
  const pollPayment = useCallback(async () => {
    if (!order?.paymentId || confirmed) return;

    const status = await checkPaymentStatus(order.paymentId);
    if (status && status.status === "approved") {
      setConfirmed(true);
    }
  }, [order?.paymentId, confirmed]);

  useEffect(() => {
    if (!order?.paymentId) return;

    // Initial check after a short delay
    const initialTimeout = setTimeout(pollPayment, 3000);

    // Then poll every 5 seconds
    const interval = setInterval(pollPayment, 5000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [order?.paymentId, pollPayment]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  const handleCopy = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = order.pixCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-xl font-bold text-foreground">
          Nenhum pedido encontrado
        </h1>
        <Link
          href="/"
          className="bg-cs-primary hover:bg-cs-primary-hover text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-colors"
        >
          Voltar à loja
        </Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center gap-4 px-6">
        <div className="bg-white rounded-2xl border border-border p-8 max-w-md w-full text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-cs-green/10 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-cs-green" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Pagamento confirmado!
          </h1>
          <p className="text-sm text-muted-foreground">
            Obrigado, <span className="font-semibold">{order.customer.nome}</span>!
            Seu pedido foi confirmado e será processado em breve.
          </p>
          <p className="text-xs text-muted-foreground">
            Enviamos os detalhes para <span className="font-medium">{order.customer.email}</span>
          </p>

          {/* Items */}
          <div className="border-t border-border pt-4 space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-left">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-0.5"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-foreground line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Qtd: {item.quantity}
                    {item.size ? ` • Tam: ${item.size}` : ""}
                  </p>
                </div>
                <p className="text-xs font-bold text-cs-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="text-sm font-bold">Total pago</span>
              <span className="text-lg font-extrabold text-cs-primary">
                {formatPrice(order.amount)}
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full bg-cs-primary hover:bg-cs-primary-hover text-white text-sm font-bold py-3 px-4 rounded-xl transition-colors"
          >
            Voltar à loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl border border-border p-6 max-w-md w-full space-y-5">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-cs-primary/10 flex items-center justify-center mx-auto">
            <QrCode className="h-6 w-6 text-cs-primary" />
          </div>
          <h1 className="text-xl font-extrabold text-foreground">
            Pague com PIX
          </h1>
          <p className="text-sm text-muted-foreground">
            Escaneie o QR code ou copie o código
          </p>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-cs-star" />
          <span className="text-muted-foreground">Expira em</span>
          <span className="font-mono font-bold text-foreground">
            {mins.toString().padStart(2, "0")}:
            {secs.toString().padStart(2, "0")}
          </span>
        </div>

        {/* QR Code */}
        <div className="bg-muted/30 rounded-xl p-6 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="QR Code PIX"
                className="h-48 w-48"
              />
            ) : (
              <div className="h-48 w-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-cs-primary/30 border-t-cs-primary rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Valor</p>
          <p className="text-2xl font-extrabold text-cs-primary">
            {formatPrice(order.amount)}
          </p>
        </div>

        {/* PIX code */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            Código PIX Copia e Cola:
          </p>
          <div className="bg-muted/50 rounded-lg p-3 text-[10px] font-mono text-muted-foreground break-all leading-relaxed">
            {order.pixCode}
          </div>

          <button
            onClick={handleCopy}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              copied
                ? "bg-cs-green text-white"
                : "bg-cs-primary hover:bg-cs-primary-hover text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar código PIX
              </>
            )}
          </button>
        </div>

        {/* Waiting */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="h-3 w-3 border-2 border-cs-primary/30 border-t-cs-primary rounded-full animate-spin" />
          <span>Aguardando pagamento...</span>
        </div>

        {/* Trust */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground border-t border-border pt-3">
          <ShieldCheck className="h-3.5 w-3.5 text-cs-green" />
          <span>Pagamento seguro e protegido</span>
        </div>
      </div>
    </div>
  );
}
