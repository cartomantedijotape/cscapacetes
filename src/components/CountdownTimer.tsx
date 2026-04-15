"use client";

import { useEffect, useState } from "react";
import { Timer, Zap } from "lucide-react";

export function CountdownTimer() {
  const [seconds, setSeconds] = useState(14399); // ~4 hours

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="bg-cs-timer-bg text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <Zap className="h-4 w-4 text-cs-star animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Oferta Relâmpago
        </span>
        <div className="flex items-center gap-1">
          <Timer className="h-3.5 w-3.5 text-cs-star" />
          <div className="flex items-center gap-0.5 font-mono text-sm font-bold">
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(hours)}</span>
            <span className="text-cs-star">:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(mins)}</span>
            <span className="text-cs-star">:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(secs)}</span>
          </div>
        </div>
        <Zap className="h-4 w-4 text-cs-star animate-pulse" />
      </div>
    </div>
  );
}
