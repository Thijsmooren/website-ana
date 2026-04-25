"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const LINT_ICONS = [
  { id: 1, pos: "0% center" },
  { id: 2, pos: "33% center" },
  { id: 3, pos: "66% center" },
  { id: 4, pos: "100% center" },
];

export default function FloatingLint() {
  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {LINT_ICONS.map((icon, i) => (
        <DraggableIcon key={icon.id} icon={icon} index={i} />
      ))}
    </div>
  );
}

function DraggableIcon({ icon, index }: { icon: any; index: number }) {
  const [position, setPosition] = useState({ 
    x: 10 + (index * 20), 
    y: 20 + (Math.sin(index) * 15) 
  });
  const iconRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initial entrance animation
    if (iconRef.current) {
      gsap.fromTo(iconRef.current, 
        { opacity: 0, scale: 0, rotation: -20 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0, 
          duration: 1.5, 
          delay: 2.5 + (index * 0.2), 
          ease: "back.out(1.7)" 
        }
      );

      // Subtle floating animation
      gsap.to(iconRef.current, {
        y: "+=15",
        rotation: "+=5",
        duration: 2 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    const touch = e.touches[0];
    startPos.current = { 
      x: touch.clientX - (position.x * window.innerWidth / 100), 
      y: touch.clientY - (position.y * window.innerHeight / 100) 
    };
    
    gsap.to(iconRef.current, { scale: 1.2, duration: 0.3 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    const newX = ((touch.clientX - startPos.current.x) / window.innerWidth) * 100;
    const newY = ((touch.clientY - startPos.current.y) / window.innerHeight) * 100;
    
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    gsap.to(iconRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <div
      ref={iconRef}
      className="absolute w-16 h-16 pointer-events-auto cursor-grab active:cursor-grabbing touch-none select-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        backgroundImage: 'url("/media/lint-emoticons.png")',
        backgroundSize: '400% 100%',
        backgroundPosition: icon.pos,
        backgroundRepeat: 'no-repeat',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
}
