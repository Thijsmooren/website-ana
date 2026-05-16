"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function CompoundNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 transition-all duration-500 z-[9000] ${
        scrolled ? "bg-[rgba(246,241,232,0.9)] backdrop-blur-md border-b border-[var(--color-border-subtle)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/compound" className="font-serif text-2xl tracking-tighter z-50 relative font-semibold uppercase">
          Compound
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="#approach" className="text-xs font-sans uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            The System
          </Link>
          <Link href="#metrics" className="text-xs font-sans uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Measurement
          </Link>

          <Link href="#apply" className="text-xs font-sans uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Apply
          </Link>
          <a href="https://www.linkedin.com/in/anaontoria/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 border border-[var(--text-primary)] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all">
            Connect
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden z-50 relative p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Nav Menu */}
        <div className={`fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <nav className="flex flex-col items-center gap-10 text-center">
            <Link href="#approach" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif">
              The System
            </Link>
            <Link href="#apply" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif">
              Apply
            </Link>
            <a href="https://www.linkedin.com/in/anaontoria/" target="_blank" rel="noopener noreferrer" className="text-lg font-sans uppercase tracking-[0.2em] mt-4">
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
