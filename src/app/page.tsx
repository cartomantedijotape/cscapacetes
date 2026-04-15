import { Header } from "@/components/Header";
import { CountdownTimer } from "@/components/CountdownTimer";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterableProductGrid } from "@/components/FilterableProductGrid";
import { BrandsSection } from "@/components/BrandsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SocialProofToast } from "@/components/SocialProofToast";
import { products, getProductsByBrand, getProductsByCategory } from "@/lib/products";

export default function HomePage() {
  const allCapacetes = products.filter((p) => p.category === "capacete");
  const jaquetas = getProductsByCategory("jaqueta");
  const acessorios = getProductsByCategory("acessorio");

  return (
    <>
      <Header />
      <CountdownTimer />

      <main className="flex-1">
        <HeroSection />

        {/* All Capacetes with brand filter */}
        <FilterableProductGrid
          id="capacetes"
          title="Capacetes em Promoção"
          subtitle="As melhores marcas com preços imbatíveis"
          products={allCapacetes}
          filterKey="brand"
        />

        {/* Divider */}
        <div className="h-px bg-border max-w-7xl mx-auto" />

        {/* Jaquetas */}
        <div id="jaquetas" className="bg-muted/30">
          <ProductGrid
            title="Jaquetas"
            subtitle="Proteção e estilo para o motociclista"
            products={jaquetas}
          />
        </div>

        {/* Acessórios */}
        <ProductGrid
          id="acessorios"
          title="Acessórios"
          subtitle="Complementos essenciais para sua pilotagem"
          products={acessorios}
        />

        {/* Brands */}
        <div className="bg-muted/30">
          <BrandsSection />
        </div>

        {/* Reviews */}
        <ReviewsSection />
      </main>

      <Footer />
      {/*<WhatsAppButton />*/}
      <SocialProofToast />
    </>
  );
}
