"use client";

import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // Show initial after 3 seconds
    const showTimer = setTimeout(() => {
      setViewerCount(Math.floor(Math.random() * 30) + 15);
      setVisible(true);
    }, 3000);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 11000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 animate-in slide-in-from-left-full duration-300">
      <div className="bg-white rounded-lg shadow-xl border border-border p-3 max-w-[260px] flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-cs-primary/10 flex items-center justify-center shrink-0">
          <Users className="h-4 w-4 text-cs-primary" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-foreground">
            🔥 {viewerCount} pessoas estão visitando
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Eye className="h-3 w-3 text-cs-green" />
            <p className="text-[10px] text-muted-foreground">
              ao vivo agora
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
