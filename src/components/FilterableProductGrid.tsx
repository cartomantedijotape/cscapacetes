"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface FilterableProductGridProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  filterKey?: "brand" | "category";
}

export function FilterableProductGrid({
  id,
  title,
  subtitle,
  products,
  filterKey = "brand",
}: FilterableProductGridProps) {
  const allFilters = Array.from(new Set(products.map((p) => p[filterKey])));
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p[filterKey] === activeFilter);

  return (
    <section id={id} className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        {/* Filter tabs */}
        {allFilters.length > 1 && (
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === "all"
                  ? "bg-cs-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Todos
            </button>
            {allFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === filter
                    ? "bg-cs-primary text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
