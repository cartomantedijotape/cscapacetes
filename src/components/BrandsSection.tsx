import Image from "next/image";
import { brands } from "@/lib/products";

export function BrandsSection() {
  const brandKeys = ["NORISK", "LS2", "AGV", "Alpinestars", "Acessórios"];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-center text-foreground mb-2">
          Nossas Marcas
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Trabalhamos com as melhores marcas do mercado
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandKeys.map((key) => {
            const brand = brands[key];
            return (
              <div
                key={key}
                className="border border-border rounded-xl p-5 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-contain"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-cs-primary/10 flex items-center justify-center text-cs-primary font-bold text-sm">
                      {key.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-foreground">{brand.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {brand.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
