"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const tl = gsap.timeline();
    
    tl.to(".loader-logo", {
      opacity: 1,
      scale: 1.1,
      duration: 1.2,
      ease: "power3.out",
    }).to(".loader-container", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        document.querySelector(".loader-container")?.remove();
      }
    }, "+=0.2");
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="loader-container fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-[9999]">
      <div className="loader-logo opacity-0 scale-95 w-40 h-40">
        <img src="/media/opening-a.png" alt="A" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
