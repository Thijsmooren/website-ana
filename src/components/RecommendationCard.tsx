"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface RecommendationCardProps {
  name: string;
  role: string;
  summary: string;
  text: string;
}

export default function RecommendationCard({ name, role, summary, text }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="border-b border-[var(--color-border-subtle)] py-12 group transition-all duration-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col gap-6">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <h4 className="text-xl font-serif font-medium text-[var(--text-primary)]">{name}</h4>
            <span className="text-xs font-sans text-[var(--text-secondary)] uppercase tracking-widest">— {role}</span>
          </div>
          
          <div className="flex items-start gap-4">
            <p className={`text-2xl md:text-3xl font-serif italic text-[var(--text-secondary)] transition-all duration-500 leading-tight flex-grow ${isExpanded ? "mb-10" : ""}`}>
              "{summary}"
              <span className="inline-flex ml-4 align-middle opacity-30 group-hover:opacity-100 transition-opacity">
                {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </p>
          </div>

          <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
            <p className="text-lg font-sans text-[var(--text-secondary)] leading-relaxed max-w-3xl border-l border-[var(--color-border-subtle)] pl-8 ml-2">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
