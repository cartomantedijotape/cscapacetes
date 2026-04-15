"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";
import { bumpProducts, formatPrice } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
  discount: number;
  brandDescription?: string;
}

export function ProductDetailClient({
  product,
  discount,
  brandDescription,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedBumps, setAddedBumps] = useState<Set<string>>(new Set());
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    // Add main product
    addItem(
      {
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.priceNumber,
        oldPrice: product.oldPriceNumber,
        size: selectedSize,
      },
      quantity
    );

    // Add bump products
    addedBumps.forEach((slug) => {
      const bump = bumpProducts.find((b) => b.slug === slug);
      if (bump) {
        addItem({
          productId: `bump-${bump.slug}`,
          name: bump.name,
          image: bump.image,
          price: bump.price,
          oldPrice: bump.price * 2,
        });
      }
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const toggleBump = (slug: string) => {
    setAddedBumps((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const installmentPrice = (product.priceNumber / 3).toFixed(2).replace(".", ",");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Image */}
      <div className="relative">
        <div className="relative aspect-square bg-muted/30 rounded-2xl overflow-hidden border border-border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Discount badge */}
          <div className="absolute top-4 left-4 price-gradient text-white text-sm font-bold px-3 py-1 rounded-full">
            -{discount}%
          </div>
        </div>
      </div>

      {/* Right: Info */}
      <div className="space-y-4">
        {/* Brand */}
        <span className="text-xs font-bold text-cs-primary uppercase tracking-widest">
          {product.brand}
        </span>

        {/* Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
          {product.name}
        </h1>

        {/* Rating + Sold */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-cs-star text-cs-star"
              />
            ))}
            <span className="text-sm font-semibold text-muted-foreground ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.sold} vendidos
          </span>
        </div>

        {/* Price */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-1">
          <div className="text-sm text-muted-foreground line-through">
            {product.oldPrice}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cs-primary">
              {product.price}
            </span>
            <span className="text-sm text-cs-green font-bold">no PIX</span>
          </div>
          <p className="text-xs text-muted-foreground">
            ou 3x de R$ {installmentPrice} sem juros
          </p>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              Tamanho
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    selectedSize === size
                      ? "border-cs-primary bg-cs-primary/5 text-cs-primary ring-1 ring-cs-primary"
                      : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            Quantidade
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="h-10 w-14 rounded-lg border border-border flex items-center justify-center text-sm font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bump products */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Aproveite e leve também:
          </p>
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
                {addedBumps.has(bump.slug) && <Check className="h-3 w-3" />}
              </div>
            </button>
          ))}
        </div>

        {/* Add to cart CTA */}
        <button
          onClick={handleAddToCart}
          disabled={product.sizes && !selectedSize}
          className={`w-full py-4 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            justAdded
              ? "bg-cs-green text-white"
              : "bg-cs-primary hover:bg-cs-primary-hover text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {justAdded ? (
            <>
              <Check className="h-5 w-5" />
              Adicionado ao carrinho!
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Adicionar ao Carrinho — {formatPrice(product.priceNumber * quantity)}
            </>
          )}
        </button>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <ShieldCheck className="h-5 w-5 text-cs-green" />
            <span className="text-[10px] text-muted-foreground leading-tight">
              Compra segura
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Truck className="h-5 w-5 text-cs-green" />
            <span className="text-[10px] text-muted-foreground leading-tight">
              Entrega garantida
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <RefreshCw className="h-5 w-5 text-cs-green" />
            <span className="text-[10px] text-muted-foreground leading-tight">
              Trocas e devoluções
            </span>
          </div>
        </div>

        {/* Brand description */}
        {brandDescription && (
          <div className="bg-muted/30 rounded-xl p-4 mt-4">
            <h3 className="text-sm font-bold text-foreground mb-1">
              Sobre a marca
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {brandDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
