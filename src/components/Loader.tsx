"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
      }).to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setIsComplete(true);
        }
      }, "+=0.2");
    });

    return () => ctx.revert();
  }, [isMounted]);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className={`loader-container fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-[9999] ${isComplete ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ display: isComplete ? "none" : "flex" }}
    >
      <div 
        ref={logoRef}
        className="loader-logo opacity-0 scale-95 w-40 h-40"
      >
        <img src="/media/opening-a.png" alt="A" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}


