"use client";

import { useEffect, useState } from "react";
import { Zap, Tag } from "lucide-react";
import { formatPrice } from "@/lib/products";

interface FlashSaleBarProps {
  discount: number;
  currentPrice: number;
  oldPrice: number;
}

export function FlashSaleBar({
  discount,
  currentPrice,
  oldPrice,
}: FlashSaleBarProps) {
  const [seconds, setSeconds] = useState(3495); // ~58 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 3495));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  const savings = oldPrice - currentPrice;

  return (
    <div className="flash-sale-bar rounded-xl overflow-hidden">
      {/* Top row: discount badge + price + flash sale timer */}
      <div className="flex items-center justify-between px-4 py-3 gap-3 flex-wrap">
        {/* Left: Discount + Price */}
        <div className="flex items-center gap-3">
          <span className="bg-[#e53e6b] text-white text-xs font-bold px-2.5 py-1 rounded-md">
            -{discount}%
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-white/70 font-medium">R$</span>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {currentPrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {/* Right: Flash sale timer */}
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-white fill-white animate-pulse" />
          <div className="text-right">
            <p className="text-xs font-bold text-white leading-tight">
              Oferta Relâmpago
            </p>
            <p className="text-[11px] text-white/80 leading-tight">
              Termina em{" "}
              <span className="font-mono font-bold text-white">
                {pad(hours)}:{pad(mins)}:{pad(secs)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Old price */}
      <div className="px-4 pb-1">
        <span className="text-sm text-white/50 line-through">
          {formatPrice(oldPrice)}
        </span>
      </div>

      {/* Bottom row: Two green savings buttons */}
      <div className="flex gap-2 px-4 pb-3 pt-1">
        <div className="flex items-center gap-1.5 bg-[#16a34a] text-white text-xs font-bold px-3 py-2 rounded-lg flex-1 justify-center">
          <Tag className="h-3.5 w-3.5" />
          Economize {formatPrice(savings)}
        </div>
        <div className="bg-[#16a34a] text-white text-xs font-bold px-3 py-2 rounded-lg flex-1 text-center">
          Economize {discount}% com bônus
        </div>
      </div>
    </div>
  );
}
