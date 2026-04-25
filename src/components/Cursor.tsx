"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Check if device has a mouse
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Hide native cursor for the entire site to prevent "double cursor"
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleHover = () => {
      gsap.to(follower, {
        scale: 1.8, // Reduced scale
        backgroundColor: "rgba(169, 152, 132, 0.2)",
        borderColor: "transparent",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleHoverOut = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(169, 152, 132, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer, [role='button']");
      interactiveElements.forEach((el) => {
        // Force hide native pointer on interactive elements
        (el as HTMLElement).style.cursor = "none";
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    };

    updateInteractiveElements();

    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1 h-1 bg-[var(--accent-strong)] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-6 h-6 border border-[var(--accent-soft)]/40 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
