"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navCategories } from "@/lib/products";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      {/* Top promotional bar */}
      <div className="bg-cs-primary text-white text-center py-1.5 px-4 text-xs font-medium tracking-wide">
        🔥 OFERTA RELÂMPAGO — até <span className="font-bold">87% OFF</span> em
        capacetes e jaquetas!
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo-planeta-atacados.jpeg"
            alt="Planeta Atacados"
            width={160}
            height={45}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-cs-primary text-white text-[10px] font-bold rounded-full h-[18px] min-w-[18px] flex items-center justify-center px-1 animate-in zoom-in duration-200">
                {itemCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white pb-4">
          <nav className="flex flex-col px-4 pt-2 gap-1">
            {navCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
