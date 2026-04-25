"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
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
        <Link href="/" className="font-serif text-2xl tracking-tight z-50 relative">
          Ana Ontoria Briones
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-sans uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            About
          </Link>
          <Link href="#services" className="text-sm font-sans uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Services
          </Link>
          <Link href="#quiz" className="text-sm font-sans uppercase tracking-[0.2em] font-medium text-[var(--accent-strong)] hover:opacity-70 transition-opacity">
            Discovery Quiz
          </Link>
          <Link href="#experience" className="text-sm font-sans uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Experience
          </Link>
          <Link href="#stories" className="text-sm font-sans uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Stories
          </Link>
          <a href="https://www.linkedin.com/in/anaontoria/" target="_blank" rel="noopener noreferrer" className="custom-button text-sm font-sans uppercase tracking-widest">
            LinkedIn
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden z-50 relative p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Menu */}
        <div className={`fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <nav className="flex flex-col items-center gap-8 text-center">
            <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">
              About
            </Link>
            <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">
              Services
            </Link>
            <Link href="#quiz" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-[var(--accent-strong)]">
              Discovery Quiz
            </Link>
            <Link href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">
              Experience
            </Link>
            <Link href="#stories" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif">
              Stories
            </Link>
            <a href="https://www.linkedin.com/in/anaontoria/" target="_blank" rel="noopener noreferrer" className="text-2xl font-serif custom-button mt-4">
              LinkedIn
            </a>
          </nav>
        </div>

      </div>
    </header>
  );
}
