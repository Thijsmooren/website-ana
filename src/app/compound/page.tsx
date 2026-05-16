"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CompoundNavbar from "@/components/CompoundNavbar";
import CompoundLoader from "@/components/CompoundLoader";

import FadeUp from "@/components/FadeUp";
import InteractivePipeline from "@/components/InteractivePipeline";
import { ArrowRight } from "lucide-react";


export default function CompoundLandingPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {loading && <CompoundLoader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <CompoundNavbar />
          
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/30 z-10" />
              {/* Fallback color if no image, but ideally we'd have a premium background */}
              <div className="absolute inset-0 bg-[var(--accent-strong)]/10" />
            </div>
            
            <div className="container-width px-6 relative z-20 text-center">
              <FadeUp>
                <span className="eyebrow block mb-6 text-[var(--accent-strong)]">Executive Content Studio</span>
                <h1 className="mb-8 max-w-4xl mx-auto">
                  Thought leadership that compounds into pipeline.
                </h1>
                <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-[var(--text-secondary)]">
                  We turn your executives into industry voices—and use intent data to prove it drives measurable revenue.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a href="#apply" className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-none hover:opacity-90 transition-opacity font-sans uppercase tracking-widest text-sm">
                    Apply for Partnership
                  </a>
                  <a href="#approach" className="custom-button flex items-center gap-2 group">
                    Our Approach <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </FadeUp>
            </div>
          </section>

          {/* Hook Section */}
          <section className="section-padding bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
            <div className="container-width px-6">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <FadeUp>
                  <h2 className="mb-6">99% of ghostwriting agencies sell engagement. We sell pipeline.</h2>
                </FadeUp>
                <FadeUp>
                  <p className="text-lg">
                    In the Series B-D world, a "viral" post is a vanity metric unless it triggers a sales conversation. 
                    Compound is built for the CRO who needs proof, not just likes. 
                    We bridge the gap between human storytelling and B2B intent data.
                  </p>
                </FadeUp>
              </div>
            </div>
          </section>

          <InteractivePipeline />

          {/* Pillars Section */}
          <section id="approach" className="section-padding">
            <div className="container-width px-6">
              <FadeUp>
                <span className="eyebrow block mb-12">The Compound Effect</span>
              </FadeUp>
              <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
                <FadeUp delay={0.1}>
                  <div className="flex flex-col h-full">
                    <span className="font-serif text-4xl mb-6 text-[var(--accent-strong)]">01</span>
                    <h3 className="text-2xl mb-4">Voice Extraction</h3>
                    <p className="text-[var(--text-secondary)]">
                      No generic templates. We use 30-minute weekly interviews to extract your genuine insights, 
                      processing them through our Voice Profiling system to ensure every word sounds exactly like you.
                    </p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <div className="flex flex-col h-full">
                    <span className="font-serif text-4xl mb-6 text-[var(--accent-strong)]">02</span>
                    <h3 className="text-2xl mb-4">Strategic Distribution</h3>
                    <p className="text-[var(--text-secondary)]">
                      The "Echo" layer. We coach your senior employees to amplify corporate narratives in their own voice, 
                      multiplying your reach across the key accounts that matter.
                    </p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <div className="flex flex-col h-full">
                    <span className="font-serif text-4xl mb-6 text-[var(--accent-strong)]">03</span>
                    <h3 className="text-2xl mb-4">Attribution Intelligence</h3>
                    <p className="text-[var(--text-secondary)]">
                      We track engagement at the account level. You'll receive monthly reports showing exactly 
                      which target companies are leaning in, directly mapping content to your CRM pipeline.
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>

          <section id="metrics" className="section-padding bg-[var(--bg-secondary)] overflow-hidden">
            <div className="container-width px-6">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <FadeUp>
                  <span className="eyebrow block mb-6">Measurement</span>
                  <h2 className="mb-8">Stop guessing. Start attributing.</h2>
                  <p className="text-lg mb-8">
                    We don't just report on likes and comments. We track **Account Intent**. 
                    Our system identifies when decision-makers from your target list are engaging with your narrative.
                  </p>
                  <ul className="space-y-6">
                    {[
                      { title: "Target Account Penetration", desc: "See which companies on your ABM list are consuming your content." },
                      { title: "Pipeline Attribution", desc: "Directly map LinkedIn engagement to opened opportunities in your CRM." },
                      { title: "Executive Benchmarking", desc: "Compare your voice's authority against industry competitors." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full border border-[var(--accent-strong)] flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-[var(--accent-strong)] rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </FadeUp>

                <FadeUp delay={0.2} className="relative">
                  <div className="glass-card p-8 md:p-12 border border-[var(--color-border-subtle)] relative z-10">
                    <h4 className="font-sans uppercase tracking-widest text-xs mb-8 opacity-50">Recent Intent Signals</h4>
                    <div className="space-y-8">
                      {[
                        { company: "Stripe", activity: "3 Executives engaged", intent: "High" },
                        { company: "Intercom", activity: "Director of Product leaning in", intent: "Medium" },
                        { company: "Revolut", activity: "New narrative echo detected", intent: "High" },
                        { company: "Zendesk", activity: "Recurrent visits to long-form", intent: "Medium" }
                      ].map((signal, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="font-serif text-xl">{signal.company}</p>
                            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{signal.activity}</p>
                          </div>
                          <span className={`text-[10px] px-2 py-1 uppercase tracking-tighter border ${signal.intent === 'High' ? 'border-red-200 text-red-500 bg-red-50' : 'border-blue-200 text-blue-500 bg-blue-50'}`}>
                            {signal.intent} Intent
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-[var(--accent-strong)]/5 rounded-full blur-3xl -z-0" />
                </FadeUp>
              </div>
            </div>
          </section>

          {/* Pricing/Qualification Section */}
          <section id="apply" className="section-padding bg-[var(--text-primary)] text-[var(--bg-primary)]">

            <div className="container-width px-6 text-center">
              <FadeUp>
                <h2 className="text-[var(--bg-primary)] mb-8">Ready to scale your voice?</h2>
                <p className="max-w-2xl mx-auto mb-12 text-[rgba(246,241,232,0.7)]">
                  Compound is a boutique partnership. We only work with 10 executives at a time to ensure 
                  the highest fidelity of voice and measurement. Partnerships start at $4,000/month.
                </p>
                <a href="https://linkedin.com/in/anaontoria/" className="px-12 py-6 border border-[var(--bg-primary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all font-sans uppercase tracking-[0.2em] text-sm">
                  Apply for Partnership
                </a>
              </FadeUp>
            </div>
          </section>

          <footer className="py-12 border-t border-[var(--color-border-subtle)] bg-[var(--bg-secondary)]">
            <div className="container-width px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <span className="font-serif text-xl uppercase tracking-tighter font-semibold">Compound</span>
              <div className="flex gap-8 text-xs font-sans uppercase tracking-widest text-[var(--text-secondary)]">
                <Link href="#approach" className="hover:text-[var(--text-primary)]">Approach</Link>
                <Link href="#apply" className="hover:text-[var(--text-primary)]">Apply</Link>
                <a href="https://linkedin.com/in/anaontoria/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">LinkedIn</a>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                © 2026 Compound Executive Studio. All Rights Reserved.
              </p>
            </div>
          </footer>
        </>
      )}
    </main>

  );
}
