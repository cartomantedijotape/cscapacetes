import { ShieldCheck, Truck, Package } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-cs-primary/5 via-white to-cs-accent/5 py-12 px-4 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-cs-primary/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cs-accent/10 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 bg-cs-primary/10 text-cs-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          🏍️ Oferta por tempo limitado
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-3">
          Capacetes e Acessórios
          <br />
          <span className="text-cs-primary">com até 87% OFF</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
          As melhores marcas — NORISK, LS2, AGV e Alpinestars — com preços que você nunca viu. Aproveite antes que acabe!
        </p>

        {/* Trust badges inline */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-cs-green" />
            <span>Compra Segura</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-cs-green" />
            <span>Entrega para todo Brasil</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package className="h-4 w-4 text-cs-green" />
            <span>Qualidade garantida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
