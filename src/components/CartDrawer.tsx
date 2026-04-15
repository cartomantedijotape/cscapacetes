"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export function CartDrawer() {
  const {
    items,
    itemCount,
    totalPrice,
    totalOldPrice,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  const formatPrice = (value: number) =>
    `R$ ${value.toFixed(2).replace(".", ",")}`;

  const savings = totalOldPrice - totalPrice;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-[80] h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-cs-primary" />
            <h2 className="text-base font-bold text-foreground">
              Carrinho ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground text-center">
              Seu carrinho está vazio
            </p>
            <button
              onClick={closeCart}
              className="text-sm font-semibold text-cs-primary hover:underline"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size ?? "default"}`}
                  className="flex gap-3 bg-muted/30 rounded-xl p-3"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-white border border-border shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Tamanho: {item.size}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="h-6 w-6 rounded-md bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="h-6 w-6 rounded-md bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-cs-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size)
                          }
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-4 space-y-3">
              {/* Savings */}
              {savings > 0 && (
                <div className="bg-cs-green/10 text-cs-green text-xs font-semibold px-3 py-2 rounded-lg text-center">
                  🎉 Você está economizando {formatPrice(savings)}!
                </div>
              )}

              {/* Totals */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="line-through">{formatPrice(totalOldPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">Total</span>
                  <span className="text-lg font-extrabold text-cs-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-cs-green font-medium text-right">
                  no PIX
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-cs-primary hover:bg-cs-primary-hover text-white text-sm font-bold py-3 px-4 rounded-xl text-center transition-colors active:scale-[0.98]"
              >
                Finalizar Compra
              </Link>

              <button
                onClick={closeCart}
                className="w-full text-xs text-muted-foreground hover:text-foreground text-center py-1 transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
