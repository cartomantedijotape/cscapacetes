"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/types/product";

interface ProductReviewsProps {
  reviews: Review[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <section className="py-10 px-4" id="avaliacoes">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            Avaliações dos Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "fill-cs-star text-cs-star"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({reviews.length} avaliações)
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Avaliações reais de clientes verificados
          </p>
        </div>

        {/* Summary bar */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold text-green-800">
              {reviews.filter((r) => r.verified).length} avaliações verificadas
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-extrabold text-green-700">
                {Math.round(
                  (reviews.filter((r) => r.rating >= 4).length /
                    reviews.length) *
                    100
                )}
                %
              </p>
              <p className="text-[10px] text-green-600 font-medium">
                Recomendam
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-extrabold text-green-700">
                {averageRating.toFixed(1)}
              </p>
              <p className="text-[10px] text-green-600 font-medium">
                Nota média
              </p>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Top: Avatar + Name + Date */}
              <div className="flex items-start gap-3 mb-3">
                {review.image ? (
                  <button
                    onClick={() => setSelectedImage(review.image ?? null)}
                    className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 ring-2 ring-cs-primary/20 hover:ring-cs-primary/50 transition-all cursor-pointer"
                  >
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cs-primary to-cs-primary-hover flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-foreground truncate">
                      {review.name}
                    </p>
                    {review.verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    )}
                  </div>
                  {review.date && (
                    <p className="text-[11px] text-muted-foreground">
                      {review.date}
                    </p>
                  )}
                  {review.productBought && (
                    <p className="text-[10px] text-cs-primary font-medium truncate">
                      Comprou: {review.productBought}
                    </p>
                  )}
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating
                        ? "fill-cs-star text-cs-star"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-foreground leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Review photo thumbnail */}
              {review.image && (
                <button
                  onClick={() => setSelectedImage(review.image ?? null)}
                  className="mt-3 relative h-20 w-20 rounded-lg overflow-hidden border border-border hover:border-cs-primary transition-colors cursor-pointer"
                >
                  <Image
                    src={review.image}
                    alt={`Foto de ${review.name}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Show more */}
        {reviews.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {showAll
                ? "Ver menos avaliações"
                : `Ver todas as ${reviews.length} avaliações`}
            </button>
          </div>
        )}
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="relative max-w-lg w-full aspect-square rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Foto do cliente"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
        </div>
      )}
    </section>
  );
}
