"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";
import content from "@/data/content.json";

const questions = [
  {
    id: "audience",
    label: "Who is this for?",
    options: [
      { id: "corporate", text: "A Corporate Team", icon: "/media/icons/corporate.png" },
      { id: "individual", text: "Just Me (Individual)", icon: "/media/icons/individual.png" }
    ]
  },
  {
    id: "goal",
    label: "What is your primary goal?",
    options: [
      { id: "confidence", text: "Mastering Confidence & Public Speaking", icon: "/media/icons/confidence.png" },
      { id: "branding", text: "Personal Branding & LinkedIn Strategy", icon: "/media/icons/branding.png" },
      { id: "team", text: "Team Building & Collaboration", icon: "/media/icons/team.png" },
      { id: "meditation", text: "Creativity & Mindset Reset", icon: "/media/icons/meditation.png" }
    ]
  },
  {
    id: "duration",
    label: "Preferred duration?",
    options: [
      { id: "1day", text: "One-day Workshop", icon: "/media/icons/1day.png" },
      { id: "multi", text: "Multi-day Immersion (2-3 days)", icon: "/media/icons/multi.png" },
      { id: "ongoing", text: "Ongoing Coaching", icon: "/media/icons/ongoing.png" }
    ]
  }
];


export default function EventDiscovery() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [questions[step].id]: optionId };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    const { audience, goal, duration } = finalAnswers;
    
    let recommendation = content.services.items[0]; // Default

    if (audience === "corporate") {
      if (goal === "team" || goal === "meditation") {
        recommendation = content.services.items[1]; // Team Excellence
      } else {
        recommendation = content.services.items[0]; // Corporate Immersion
      }
    } else {
      recommendation = content.services.items[2]; // Individual Coaching
    }

    setResult(recommendation);
    setStep(questions.length);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section id="quiz" className="section-padding bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
      <div className="container-width max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Event Discovery</p>
          <h2 className="text-4xl md:text-5xl">Let's tailor your experience.</h2>
        </div>

        <div className="bg-[var(--bg-primary)] p-8 md:p-16 rounded-sm border border-[var(--color-border-subtle)] shadow-sm relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          {step < questions.length ? (
            <div className="fade-in">
              <div className="flex justify-between items-end mb-12">
                <div className="flex flex-col gap-2">
                  {step > 0 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="text-[10px] uppercase tracking-widest text-[var(--accent-soft)] hover:text-[var(--accent-strong)] transition-colors flex items-center gap-1 mb-2"
                    >
                      <ArrowLeft size={10} /> Back
                    </button>
                  )}
                  <span className="text-xs font-sans uppercase tracking-widest text-[var(--accent-strong)]">Question {step + 1} of {questions.length}</span>
                </div>
                <div className="flex gap-2">

                  {questions.map((_, i) => (
                    <div key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= step ? "bg-[var(--accent-strong)]" : "bg-[var(--color-border-subtle)]"}`} />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif mb-10">{questions[step].label}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className="flex items-center gap-4 p-6 text-left border border-[var(--color-border-subtle)] rounded-sm hover:border-[var(--accent-strong)] hover:bg-[var(--bg-secondary)] transition-all group"
                  >
                    <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <img src={opt.icon} alt={opt.text} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-sans text-lg leading-tight">{opt.text}</span>
                  </button>

                ))}
              </div>
            </div>
          ) : (
            <div className="text-center fade-in py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--accent-soft)]/10 text-[var(--accent-strong)] mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-serif mb-4">Recommended for you:</h3>
              <p className="text-xl text-[var(--accent-strong)] font-serif mb-8">{result?.title}</p>
              
              <div className="max-w-md mx-auto bg-[var(--bg-secondary)] p-8 border border-[var(--color-border-subtle)] rounded-sm mb-12 text-left">
                <p className="text-sm uppercase tracking-widest text-[var(--text-secondary)] mb-4">What to expect:</p>
                <ul className="space-y-3">
                  {result?.details.map((detail: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="text-[var(--accent-strong)]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a 
                  href={content.personal.linkedin}
                  target="_blank"
                  className="bg-[var(--accent-strong)] text-[var(--bg-primary)] px-10 py-5 rounded-sm font-sans uppercase tracking-widest text-xs hover:bg-[var(--text-primary)] transition-colors flex items-center justify-center gap-2"
                >
                  Request a Quote <ArrowRight size={16} />
                </a>
                <button 
                  onClick={reset}
                  className="px-10 py-5 rounded-sm font-sans uppercase tracking-widest text-xs border border-[var(--color-border-subtle)] hover:bg-[var(--bg-secondary)] transition-colors flex items-center justify-center gap-2"
                >
                  Start Over <RotateCcw size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-center mt-12 text-sm text-[var(--text-secondary)] italic">
          {content.services.pricing}
        </p>
      </div>
    </section>
  );
}
