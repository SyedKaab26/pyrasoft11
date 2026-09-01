import React from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative border-t border-white/10" id="testimonials">
      <div className="max-w-[1280px] mx-auto text-left mb-12 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-mono tracking-wider text-[#e5b842] uppercase mb-2">
            Client Testimonials
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Endorsements &amp; Verified Results
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
          Direct statements from founders, engineering leaders, and operations executives whose platforms Pyrasoft architected.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="glass-panel p-7 sm:p-8 rounded-xl relative hover:border-white/20 transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              {/* Top Context Row */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/5 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-300">Verified Client Delivery</span>
                </div>
                {t.projectName && (
                  <span className="text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5 text-[11px]">
                    {t.projectName}
                  </span>
                )}
              </div>

              {/* Quote text */}
              <p className="font-sans text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            {/* Author Profile Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/15"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-slate-400 font-mono text-xs">
                    {t.role}, <span className="text-slate-300">{t.company}</span>
                  </div>
                </div>
              </div>

              {/* Tag pills */}
              <div className="hidden sm:flex flex-wrap gap-1 max-w-[160px] justify-end">
                {t.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/5">
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
