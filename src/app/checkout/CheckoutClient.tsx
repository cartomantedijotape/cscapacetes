"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Timer,
  Trash2,
  Minus,
  Plus,
  Zap,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { bumpProducts, formatPrice } from "@/lib/products";
import { createPixSale } from "@/lib/miuse";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export function CheckoutClient() {
  const router = useRouter();
  const {
    items,
    itemCount,
    totalPrice,
    totalOldPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(14399);

  // Bump product add
  const { addItem } = useCart();
  const [addedBumps, setAddedBumps] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown((c) => (c > 0 ? c - 1 : 0)),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(countdown / 3600);
  const mins = Math.floor((countdown % 3600) / 60);
  const secs = countdown % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  const savings = totalOldPrice - totalPrice;

  const updateField = (field: keyof FormData, value: string) => {
    let v = value;
    if (field === "telefone") {
      v = v.replace(/\D/g, "");
      if (v.length <= 11) {
        v = v.replace(/^(\d{2})(\d{0,5})(\d{0,4})/, (_, a, b, c) =>
          c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ""
        );
      }
    }
    if (field === "cpf") {
      v = v.replace(/\D/g, "");
      if (v.length <= 11) {
        v = v.replace(
          /^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/,
          (_, a, b, c, d) =>
            d
              ? `${a}.${b}.${c}-${d}`
              : c
                ? `${a}.${b}.${c}`
                : b
                  ? `${a}.${b}`
                  : a
        );
      }
    }
    if (field === "cep") {
      v = v.replace(/\D/g, "");
      if (v.length <= 8) {
        v = v.replace(/^(\d{5})(\d{0,3})/, (_, a, b) =>
          b ? `${a}-${b}` : a
        );
      }
    }
    setForm((prev) => ({ ...prev, [field]: v }));
  };

  const handleCepLookup = async () => {
    const clean = form.cep.replace(/\D/g, "");
    if (clean.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          endereco: data.logradouro || prev.endereco,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          uf: data.uf || prev.uf,
        }));
      }
    } catch {
      // CEP lookup failed silently
    }
  };

  const isFormValid =
    form.nome &&
    form.email &&
    form.telefone &&
    form.cpf &&
    form.cep &&
    form.endereco &&
    form.numero &&
    form.bairro &&
    form.cidade &&
    form.uf;

  const handleSubmit = async () => {
    if (!isFormValid) {
      setTouched({
        nome: true,
        email: true,
        telefone: true,
        cpf: true,
        cep: true,
        endereco: true,
        numero: true,
        bairro: true,
        cidade: true,
        uf: true,
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      alert("E-mail inválido. Verifique e tente novamente.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const pixResult = await createPixSale({
        total: totalPrice,
        customer: { name: form.nome },
      });

      // Store order data in sessionStorage
      sessionStorage.setItem(
        "cs-pix-order",
        JSON.stringify({
          paymentId: pixResult.payment_id,
          pixCode: pixResult.pix_copia_e_cola,
          amount: totalPrice,
          items: items.map((i) => ({
            title: i.name,
            size: i.size,
            quantity: i.quantity,
            price: i.price,
            image: i.image,
          })),
          customer: form,
        })
      );

      clearCart();
      router.push("/checkout/pix");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao gerar PIX";
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  const toggleBump = (slug: string) => {
    const bump = bumpProducts.find((b) => b.slug === slug);
    if (!bump) return;

    if (addedBumps.has(slug)) {
      removeItem(`bump-${slug}`, undefined);
      setAddedBumps((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    } else {
      addItem({
        productId: `bump-${slug}`,
        name: bump.name,
        image: bump.image,
        price: bump.price,
        oldPrice: bump.price * 2,
      });
      setAddedBumps((prev) => new Set(prev).add(slug));
    }
  };

  if (itemCount === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-xl font-bold text-foreground">
          Seu carrinho está vazio
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Adicione produtos ao carrinho para continuar.
        </p>
        <Link
          href="/"
          className="bg-cs-primary hover:bg-cs-primary-hover text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-colors"
        >
          Voltar à loja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Timer bar */}
      <div className="bg-cs-timer-bg text-white py-2 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <Zap className="h-4 w-4 text-cs-star" />
          <span className="text-xs font-semibold">Oferta expira em</span>
          <div className="flex items-center gap-0.5 font-mono text-sm font-bold">
            <span className="bg-white/10 px-1.5 py-0.5 rounded">
              {pad(hours)}
            </span>
            <span className="text-cs-star">:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">
              {pad(mins)}
            </span>
            <span className="text-cs-star">:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">
              {pad(secs)}
            </span>
          </div>
          <Timer className="h-4 w-4 text-cs-star" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-white border border-border transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-extrabold text-foreground">
              Finalizar Compra
            </h1>
            <p className="text-xs text-muted-foreground">
              Preencha seus dados para gerar o PIX
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-4">
            {/* Personal data */}
            <div className="bg-white rounded-xl border border-border p-4 space-y-3">
              <h2 className="text-sm font-bold text-foreground">
                Dados pessoais
              </h2>

              <div className="space-y-2">
                <InputField
                  label="Nome completo"
                  value={form.nome}
                  onChange={(v) => updateField("nome", v)}
                  onBlur={() => setTouched((t) => ({ ...t, nome: true }))}
                  error={touched.nome && !form.nome ? "Obrigatório" : undefined}
                  placeholder="Seu nome completo"
                />
                <InputField
                  label="E-mail"
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  error={
                    touched.email && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                      ? "E-mail inválido"
                      : touched.email && !form.email
                        ? "Obrigatório"
                        : undefined
                  }
                  placeholder="seu@email.com"
                  type="email"
                />
                <div className="grid grid-cols-2 gap-2">
                  <InputField
                    label="Telefone"
                    value={form.telefone}
                    onChange={(v) => updateField("telefone", v)}
                    onBlur={() => setTouched((t) => ({ ...t, telefone: true }))}
                    error={
                      touched.telefone && !form.telefone
                        ? "Obrigatório"
                        : undefined
                    }
                    placeholder="(00) 00000-0000"
                  />
                  <InputField
                    label="CPF"
                    value={form.cpf}
                    onChange={(v) => updateField("cpf", v)}
                    onBlur={() => setTouched((t) => ({ ...t, cpf: true }))}
                    error={
                      touched.cpf && !form.cpf ? "Obrigatório" : undefined
                    }
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl border border-border p-4 space-y-3">
              <h2 className="text-sm font-bold text-foreground">Endereço</h2>

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <InputField
                      label="CEP"
                      value={form.cep}
                      onChange={(v) => updateField("cep", v)}
                      onBlur={() => {
                        setTouched((t) => ({ ...t, cep: true }));
                        handleCepLookup();
                      }}
                      error={
                        touched.cep && !form.cep ? "Obrigatório" : undefined
                      }
                      placeholder="00000-000"
                    />
                  </div>
                  <div className="col-span-2">
                    <InputField
                      label="Rua"
                      value={form.endereco}
                      onChange={(v) => updateField("endereco", v)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, endereco: true }))
                      }
                      error={
                        touched.endereco && !form.endereco
                          ? "Obrigatório"
                          : undefined
                      }
                      placeholder="Rua, Avenida..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <InputField
                    label="Número"
                    value={form.numero}
                    onChange={(v) => updateField("numero", v)}
                    onBlur={() => setTouched((t) => ({ ...t, numero: true }))}
                    error={
                      touched.numero && !form.numero
                        ? "Obrigatório"
                        : undefined
                    }
                    placeholder="123"
                  />
                  <InputField
                    label="Complemento"
                    value={form.complemento}
                    onChange={(v) => updateField("complemento", v)}
                    placeholder="Apto, Bloco..."
                  />
                  <InputField
                    label="Bairro"
                    value={form.bairro}
                    onChange={(v) => updateField("bairro", v)}
                    onBlur={() => setTouched((t) => ({ ...t, bairro: true }))}
                    error={
                      touched.bairro && !form.bairro
                        ? "Obrigatório"
                        : undefined
                    }
                    placeholder="Bairro"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <InputField
                      label="Cidade"
                      value={form.cidade}
                      onChange={(v) => updateField("cidade", v)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, cidade: true }))
                      }
                      error={
                        touched.cidade && !form.cidade
                          ? "Obrigatório"
                          : undefined
                      }
                      placeholder="Cidade"
                    />
                  </div>
                  <InputField
                    label="UF"
                    value={form.uf}
                    onChange={(v) => updateField("uf", v.toUpperCase().slice(0, 2))}
                    onBlur={() => setTouched((t) => ({ ...t, uf: true }))}
                    error={
                      touched.uf && !form.uf ? "Obrigatório" : undefined
                    }
                    placeholder="SP"
                  />
                </div>
              </div>
            </div>

            {/* Bump products */}
            <div className="bg-white rounded-xl border border-border p-4 space-y-3">
              <h2 className="text-sm font-bold text-foreground">
                🔥 Aproveite e leve também
              </h2>
              {bumpProducts.map((bump) => (
                <button
                  key={bump.slug}
                  onClick={() => toggleBump(bump.slug)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    addedBumps.has(bump.slug)
                      ? "border-cs-primary bg-cs-primary/5"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={bump.image}
                      alt={bump.name}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground line-clamp-1">
                      {bump.name}
                    </p>
                    <p className="text-xs font-bold text-cs-primary">
                      + {formatPrice(bump.price)}
                    </p>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      addedBumps.has(bump.slug)
                        ? "bg-cs-primary border-cs-primary text-white"
                        : "border-border"
                    }`}
                  >
                    {addedBumps.has(bump.slug) && (
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-border p-4 sticky top-4 space-y-3">
              <h2 className="text-sm font-bold text-foreground">
                Resumo do Pedido
              </h2>

              {/* Items */}
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size ?? "default"}`}
                    className="flex items-center gap-2 py-2 border-b border-border last:border-0"
                  >
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-0.5"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      {item.size && (
                        <p className="text-[10px] text-muted-foreground">
                          Tam: {item.size}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="h-5 w-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="text-[11px] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="h-5 w-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-cs-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-muted-foreground hover:text-destructive mt-0.5"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-3 space-y-1.5">
                {savings > 0 && (
                  <div className="bg-cs-green/10 text-cs-green text-[11px] font-semibold px-2.5 py-1.5 rounded-lg text-center">
                    🎉 Economia de {formatPrice(savings)}
                  </div>
                )}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="line-through">
                    {formatPrice(totalOldPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Total</span>
                  <span className="text-xl font-extrabold text-cs-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-cs-green font-medium text-right">
                  no PIX
                </p>
              </div>

              {/* CTA */}
              {submitError && (
                <div className="bg-destructive/10 text-destructive text-xs font-medium px-3 py-2 rounded-lg text-center">
                  {submitError}
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-cs-primary hover:bg-cs-primary-hover text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-colors active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gerando PIX...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pagar com PIX — {formatPrice(totalPrice)}
                  </>
                )}
              </button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-cs-green" />
                <span>Pagamento 100% seguro</span>
              </div>

              <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                Ao finalizar, você concorda com nossa{" "}
                <Link href="#" className="text-cs-primary hover:underline">
                  Política de privacidade
                </Link>{" "}
                para saber mais sobre como usamos suas informações pessoais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Input field component
function InputField({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors outline-none focus:ring-1 ${
          error
            ? "border-destructive focus:ring-destructive"
            : "border-border focus:border-cs-primary focus:ring-cs-primary"
        }`}
      />
      {error && <p className="text-[10px] text-destructive mt-0.5">{error}</p>}
    </div>
  );
}
