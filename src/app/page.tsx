"use client";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import RecommendationCard from "@/components/RecommendationCard";
import EventDiscovery from "@/components/EventDiscovery";
import { ArrowUpRight, CheckCircle2, Star, X } from "lucide-react";
import content from "@/data/content.json";
import { useState, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const { hero, about, experience, values, stories, speaking, services, recommendations, footer } = content;
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Reverted hero drag
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Reverted hero drag
  };

  const handleTouchEnd = () => {
    // Reverted hero drag
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <Loader />
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/media/walk-by-sea.png"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 brightness-90 transition-opacity duration-1000 scale-110 origin-top"
        >
          <source src={hero.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--bg-primary)]/40 z-0"></div>
        
        <div className="relative z-30 max-w-5xl translate-x-0 md:-translate-x-24">
          <FadeUp delay={1.5}>
            <p className="eyebrow mb-6 text-[var(--bg-primary)] mix-blend-difference">{hero.eyebrow}</p>
          </FadeUp>
          <FadeUp delay={1.7}>
            <h1 className="mb-8 text-[var(--olive)] leading-[1.1]">
              Transformative experiences<br />
              in Málaga.
            </h1>
          </FadeUp>
          <FadeUp delay={1.9}>
            <p className="max-w-2xl mx-auto text-xl text-[var(--text-primary)] font-light">
              {hero.subheadline}
            </p>
          </FadeUp>
        </div>

        <div 
          ref={portraitRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-64 z-40 h-[70vh] md:h-[90vh] transition-all duration-1000 cursor-pointer group"
          onClick={() => setIsBubbleOpen(!isBubbleOpen)}
        >
          <FadeUp delay={2.2} className="h-full pointer-events-none">
            <img 
              src="/media/ana/ana-profile-no-background.png" 
              alt="Ana Ontoria" 
              className="h-full w-auto object-contain object-bottom opacity-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:scale-[1.02] transition-transform duration-500"
            />
          </FadeUp>

          {isBubbleOpen && (
            <div className="absolute bottom-[70%] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[60%] z-50 w-[280px] md:w-[320px]">
              <div className="speech-bubble glass-card text-left relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsBubbleOpen(false); }}
                  className="absolute top-4 right-4 text-[var(--accent-soft)] hover:text-[var(--accent-strong)] transition-colors"
                >
                  <X size={16} />
                </button>
                <p className="text-xs font-sans mb-3 text-[var(--accent-strong)] font-medium uppercase tracking-widest">Ana Ontoria</p>
                <p className="text-xl font-serif mb-6 text-[var(--text-primary)] leading-tight">
                  Ola! I love to connect, let's chat about your next experience in Málaga.
                </p>
                <a 
                  href={content.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--accent-strong)] border-b border-[var(--accent-strong)] pb-1 text-xs uppercase tracking-widest font-sans hover:opacity-60 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  Connect on LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[var(--bg-primary)] border-b border-[var(--color-border-subtle)] overflow-hidden">
        <div className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-6">
          <div className="flex whitespace-nowrap animate-marquee md:animate-marquee">
            <div className="flex gap-12 md:gap-20">
              {values.map((v, i) => (
                <div key={`v1-${i}`} className="border-l border-[var(--color-border-subtle)] pl-6 md:pl-8 py-4 min-w-[260px] md:min-w-[300px]">
                  <h4 className="eyebrow mb-4 text-[var(--accent-strong)]">{v.label}</h4>
                  <p className="text-sm font-sans text-[var(--text-secondary)] whitespace-normal">{v.desc}</p>
                </div>
              ))}
            </div>
            {/* Duplicate for marquee effect */}
            <div className="flex gap-12 md:gap-20">
              {values.map((v, i) => (
                <div key={`v2-${i}`} className="border-l border-[var(--color-border-subtle)] pl-6 md:pl-8 py-4 min-w-[260px] md:min-w-[300px]">
                  <h4 className="eyebrow mb-4 text-[var(--accent-strong)]">{v.label}</h4>
                  <p className="text-sm font-sans text-[var(--text-secondary)] whitespace-normal">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative aspect-video overflow-hidden rounded-sm border border-[var(--color-border-subtle)]">
                <img 
                  src={about.image} 
                  alt="Ana Ontoria" 
                  className="w-full h-full object-cover scale-110 object-[center_30%] hover:scale-115 transition-transform duration-1000"
                />
              </div>
            </FadeUp>
            <div>
              <FadeUp>
                <p className="eyebrow mb-6">{about.eyebrow}</p>
                <h2 className="mb-8">{about.headline}</h2>
                <div className="space-y-6 text-lg">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-width">
          <FadeUp>
            <p className="eyebrow mb-6">Our Services</p>
            <h2 className="mb-8">{services.headline}</h2>
            <p className="text-xl max-w-2xl mb-16 text-[var(--text-secondary)]">{services.description}</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.items.map((service, i) => (
              <FadeUp key={service.id} delay={i * 0.1}>
                <div className="bg-[var(--bg-primary)] p-12 h-full border border-[var(--color-border-subtle)] rounded-sm group hover:border-[var(--accent-strong)] transition-all duration-500">
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-xs font-sans uppercase tracking-widest text-[var(--accent-strong)]">{service.audience}</span>
                    <span className="text-xs font-sans text-[var(--text-secondary)] italic">{service.duration}</span>
                  </div>
                  <h3 className="text-3xl font-serif mb-8 group-hover:text-[var(--accent-strong)] transition-colors">{service.title}</h3>
                  <ul className="space-y-4 mb-10">
                    {service.details.map((detail, j) => (
                      <li key={j} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 size={16} className="text-[var(--accent-soft)] shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <a href="#quiz" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans border-b border-[var(--accent-strong)] pb-1 hover:opacity-60 transition-opacity mt-auto">
                    Learn More
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Quiz Section */}
      <EventDiscovery />

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-width">
          <FadeUp>
            <p className="eyebrow mb-6">Expertise & Background</p>
            <h2 className="mb-16">The bridge between strategy and people.</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-5">
              <FadeUp>
                <h3 className="text-2xl font-serif mb-4 text-[var(--accent-strong)]">A decade in Dublin Tech</h3>
                <p className="text-lg">
                  Mastering the art of professional communication and B2B strategy at LinkedIn. Combining data-driven insights with a passion for diversity, equity, and inclusion.
                </p>
                <div className="mt-8 aspect-video rounded-sm overflow-hidden border border-[var(--color-border-subtle)]">
                   <img src="/media/ana/ana-presentation-madrid.jpg" className="w-full h-full object-cover" alt="Ana presenting in Madrid" />
                </div>
              </FadeUp>
            </div>
            
            <div className="md:col-span-7 space-y-12">
              {experience.map((item, i) => (
                <FadeUp key={i}>
                  <div className="border-t border-[var(--color-border-subtle)] pt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-medium font-sans">{item.role}</h4>
                      <span className="text-sm font-sans text-[var(--text-secondary)]">{item.period}</span>
                    </div>
                    <p className="text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-width">
          <FadeUp>
            <p className="eyebrow mb-6">Philosophy</p>
            <h2 className="mb-16">Insights from the field.</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story, i) => (
              <FadeUp key={story.id} delay={i * 0.1}>
                <div className="bg-[var(--bg-primary)] h-full flex flex-col md:flex-row border border-[var(--color-border-subtle)] hover:border-[var(--accent-soft)] transition-colors duration-500 group overflow-hidden">
                  <div className="md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
                     <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-10 md:w-1/2 flex flex-col justify-center">
                    <span className="text-xs font-sans uppercase tracking-widest text-[var(--accent-strong)] mb-6">{story.category}</span>
                    <h3 className="text-2xl font-serif mb-6 leading-tight group-hover:text-[var(--accent-strong)] transition-colors">{story.title}</h3>
                    <p className="text-base mb-8 italic font-light">"{story.content}"</p>
                    <div className="pt-6 border-t border-[var(--color-border-subtle)]">
                      <p className="text-sm font-serif text-[var(--accent-strong)]">{story.quote}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--bg-primary)] overflow-hidden">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative aspect-[9/16] md:aspect-video rounded-sm overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--bg-secondary)]">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                >
                  <source src="/media/ana/ana-presentation-madrid-2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </FadeUp>
            <div>
              <FadeUp>
                <p className="eyebrow mb-6">Social Proof</p>
                <h2 className="mb-8">Energy that transforms.</h2>
                <p className="text-xl text-[var(--text-secondary)] mb-8">
                  Whether it's a corporate stage or an intimate workshop, the goal is always the same: building the confidence to be understood and the strategy to be heard.
                </p>
                <div className="flex gap-12">
                  <div>
                    <div className="text-4xl font-serif mb-2 text-[var(--accent-strong)]">50+</div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">Recommendations</p>
                  </div>
                  <div>
                    <div className="text-4xl font-serif mb-2 text-[var(--accent-strong)]">10Y</div>
                    <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">Tech Expertise</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-32 px-6 bg-[var(--bg-primary)] border-t border-[var(--color-border-subtle)] overflow-hidden">
        <div className="container-width">
           <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
              <FadeUp>
                <p className="eyebrow mb-6">Testimonials</p>
                <h2 className="text-5xl md:text-7xl max-w-2xl text-[var(--text-primary)]">Trust built in tech.</h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="flex items-center gap-4 text-[var(--accent-strong)]">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="var(--accent-strong)" className="text-[var(--accent-strong)]" />)}
                  </div>
                  <span className="font-sans text-sm tracking-widest uppercase text-[var(--text-secondary)]">Top Rated</span>
                </div>
              </FadeUp>
           </div>
           
           <div className="flex flex-col border-t border-[var(--color-border-subtle)]">
              {recommendations.map((rec, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <RecommendationCard {...rec} />
                </FadeUp>
              ))}
           </div>

           <FadeUp delay={0.4}>
             <div className="mt-20 text-center">
               <a 
                 href={content.personal.linkedin} 
                 target="_blank" 
                 className="inline-flex items-center gap-3 text-[var(--text-primary)] border border-[var(--color-border-subtle)] px-12 py-6 rounded-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all uppercase tracking-widest text-xs font-sans"
               >
                 {footer.linkedin_cta} <ArrowUpRight size={18} />
               </a>
             </div>
           </FadeUp>
        </div>
      </section>

      {/* Speaking Section */}
      <section id="speaking" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <FadeUp>
                <p className="eyebrow mb-6">{speaking.eyebrow}</p>
                <h2 className="mb-8">{speaking.headline}</h2>
                <div className="space-y-6 text-lg mb-8">
                  {speaking.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <a href="#quiz" className="bg-[var(--accent-strong)] text-[var(--bg-primary)] px-10 py-5 rounded-sm font-sans uppercase tracking-widest text-xs hover:bg-[var(--text-primary)] transition-colors inline-block">
                  Discover Your Format
                </a>
              </FadeUp>
            </div>
            <FadeUp className="order-1 md:order-2">
              <div className="relative aspect-square rounded-sm overflow-hidden border border-[var(--color-border-subtle)]">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  poster="/media/laptop-notebook-on-table.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src={speaking.video} type="video/mp4" />
                </video>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={footer.image} className="w-full h-full object-cover opacity-20" alt="Footer background" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <p className="eyebrow mb-4 opacity-60">Integrated Event Coordination</p>
            <div className="font-serif text-5xl md:text-8xl mb-8 tracking-tighter">
              Let's connect.
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <p className="text-sm font-sans text-[var(--text-secondary)] uppercase tracking-widest">© 2026 {content.personal.location}</p>
              <a href={content.personal.linkedin} target="_blank" rel="noopener noreferrer" className="custom-button flex items-center gap-2 text-sm uppercase tracking-widest">
                LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="font-serif text-2xl opacity-40">
            {content.personal.name}
          </div>
        </div>
      </footer>
    </main>
  );
}
