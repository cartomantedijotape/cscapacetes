"use client";

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { getDiscountPercentage } from "@/lib/products";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercentage(product);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.priceNumber,
      oldPrice: product.oldPriceNumber,
      size: product.sizes?.[0],
    });
  };

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group relative bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Discount badge */}
      <div className="absolute top-2 left-2 z-10 price-gradient text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
        -{discount}%
      </div>

      {/* Product image */}
      <div className="relative aspect-square bg-muted/50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        {/* Brand */}
        <span className="text-[10px] font-semibold text-cs-primary uppercase tracking-wider">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="text-[13px] font-semibold text-foreground leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating + Sold */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-cs-star text-cs-star" />
            <span className="text-[11px] font-medium text-muted-foreground">
              {product.rating}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">•</span>
          <span className="text-[10px] text-muted-foreground">
            {product.sold} vendidos
          </span>
        </div>

        {/* Old price */}
        <div className="text-[11px] text-muted-foreground line-through">
          {product.oldPrice}
        </div>

        {/* Current price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-extrabold text-cs-primary">
            {product.price}
          </span>
          <span className="text-[10px] text-cs-green font-semibold">
            {" "}
            no PIX
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-1 bg-cs-primary hover:bg-cs-primary-hover text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors active:scale-[0.97] flex items-center justify-center gap-1.5"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Adicionar ao Carrinho
        </button>
      </div>
    </Link>
  );
}
