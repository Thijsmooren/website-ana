"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InteractivePipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // Circles popping in
      const circles = circlesRef.current?.children;
      if (circles) {
        gsap.fromTo(
          Array.from(circles),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container-width px-6">
        <div className="text-center mb-20">
          <h2 className="mb-4">From Post to Pipeline</h2>
          <p className="text-[var(--text-secondary)]">The compounding effect of strategic narrative.</p>
        </div>

        <div className="relative h-[200px] flex items-center justify-between">
          {/* Connecting Line */}
          <div 
            ref={lineRef}
            className="absolute h-[2px] bg-[var(--accent-strong)] left-0 right-0 origin-left z-0 opacity-20"
          />

          {/* Steps */}
          <div ref={circlesRef} className="flex justify-between w-full relative z-10">
            {[
              { label: "Executive Post", sub: "Authentic Voice" },
              { label: "Account Engagement", sub: "Decision Makers" },
              { label: "Narrative Echo", sub: "Team Amplification" },
              { label: "Sales Pipeline", sub: "Measurable ROI" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-strong)] flex items-center justify-center mb-6 shadow-xl">
                  <span className="font-serif text-xl">{i + 1}</span>
                </div>
                <h4 className="text-sm font-sans uppercase tracking-widest font-semibold text-center">{step.label}</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
