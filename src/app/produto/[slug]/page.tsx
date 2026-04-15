import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductCard } from "@/components/ProductCard";
import { ProductReviews } from "@/components/ProductReviews";
import {
  getProductBySlug,
  getAllSlugs,
  getRelatedProducts,
  getDiscountPercentage,
  brands,
  reviews,
} from "@/lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} — Planeta Atacados`,
    description: `Compre ${product.name} por apenas ${product.price} no PIX. Era ${product.oldPrice}. Frete para todo o Brasil. Planeta Atacados.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const discount = getDiscountPercentage(product);
  const related = getRelatedProducts(product, 4);
  const brand = brands[product.brand];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
            <a href="/" className="hover:text-foreground transition-colors">Início</a>
            <span>/</span>
            <a href={`/#${product.category === "capacete" ? "capacetes" : product.category === "jaqueta" ? "jaquetas" : "acessorios"}`} className="hover:text-foreground transition-colors capitalize">
              {product.category === "capacete" ? "Capacetes" : product.category === "jaqueta" ? "Jaquetas" : "Acessórios"}
            </a>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>

          <ProductDetailClient
            product={product}
            discount={discount}
            brandDescription={brand?.description}
          />
        </div>

        {/* Customer Reviews */}
        <div className="bg-muted/30">
          <ProductReviews reviews={reviews} />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="bg-white py-10 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl font-extrabold text-foreground text-center mb-6">
                Produtos relacionados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      {/*<WhatsAppButton />*/}
    </>
  );
}
