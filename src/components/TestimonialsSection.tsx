import React from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, ShieldCheck, Quote, Layers } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-5 md:px-12 bg-transparent relative" id="testimonials">
      <div className="max-w-[1280px] mx-auto text-center mb-14">
        <div className="text-xs font-mono tracking-widest text-[#F4C852] uppercase mb-2">
          Client Feedback &amp; Partnerships
        </div>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Trusted by Ambitious Teams
        </h2>
        <p className="font-sans text-base text-slate-300 max-w-xl mx-auto mt-3">
          Direct words from founders, executives, and leaders who trusted Pyrasoft to build and scale their digital products.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="glass-panel p-8 rounded-2xl relative group hover:border-[#F4C852]/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Stars, Project Badge & Quote Icon */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#F4C852]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F4C852] text-[#F4C852]" />
                    ))}
                  </div>
                  {t.projectName && (
                    <a
                      href="#portfolio"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4C852]/10 hover:bg-[#F4C852]/20 border border-[#F4C852]/30 text-[#F4C852] text-[11px] font-mono transition-colors"
                    >
                      <Layers className="w-3 h-3 text-[#F4C852]" />
                      <span>Project: {t.projectName}</span>
                    </a>
                  )}
                </div>
                <Quote className="w-7 h-7 text-[#F4C852]/20 group-hover:text-[#F4C852]/40 transition-colors" />
              </div>

              {/* Quote text */}
              <p className="font-sans text-base sm:text-lg text-slate-200 mb-8 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            {/* Author Profile Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5 gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F4C852]/30 shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div>
                  <div className="text-white font-bold text-base flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Client" />
                  </div>
                  <div className="text-slate-400 font-mono text-xs">
                    {t.role}, <span className="text-white font-semibold">{t.company}</span>
                  </div>
                </div>
              </div>

              {/* Tag pills */}
              <div className="hidden sm:flex flex-wrap gap-1.5 max-w-[160px] justify-end">
                {t.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4C852]/10 text-[#F4C852]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
