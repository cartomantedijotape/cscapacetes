import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
}

export function ProductGrid({ id, title, subtitle, products }: ProductGridProps) {
  return (
    <section id={id} className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
