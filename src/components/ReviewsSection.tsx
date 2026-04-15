"use client";

import { Star } from "lucide-react";
import { reviews } from "@/lib/products";

export function ReviewsSection() {
  return (
    <section className="py-12 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-center text-foreground mb-2">
          O que nossos clientes dizem
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Avaliações reais de quem já comprou
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-cs-star text-cs-star"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
