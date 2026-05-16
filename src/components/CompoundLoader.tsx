"use client";

import { useEffect, useState } from "react";

interface CompoundLoaderProps {
  onComplete: () => void;
}

export default function CompoundLoader({ onComplete }: CompoundLoaderProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000); // Wait for fade animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter animate-pulse uppercase font-semibold">
          Compound
        </h1>
        <div className="mt-6 w-12 h-[1px] bg-[var(--text-primary)] animate-[scaleX_1.5s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes scaleX {
          0%, 100% { transform: scaleX(0.5); opacity: 0.3; }
          50% { transform: scaleX(2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
