import React, { useState } from 'react';
import { TECH_STACK_ITEMS } from '../data/mockData';

export const TechStackMarquee: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <section className="py-5 border-y border-white/10 bg-[#0b0e16] overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5b842]"></span>
          <span>Core Technology Stack</span>
        </div>
        {selectedTech && (
          <div className="text-xs font-mono text-slate-300">
            <span className="text-slate-500">Selected:</span> <span className="text-white font-medium">{selectedTech}</span>
          </div>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Continuous Marquee Track */}
        <div className="animate-marquee flex items-center space-x-6 py-1">
          {[...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              onMouseEnter={() => setSelectedTech(`${item.name} (${item.role})`)}
              onMouseLeave={() => setSelectedTech(null)}
              className="flex items-center gap-2.5 cursor-pointer group px-3.5 py-1.5 rounded-lg bg-[#0e121b] hover:bg-[#141926] border border-white/5 hover:border-white/20 transition-all duration-150"
            >
              <span className="font-headline text-sm font-semibold tracking-normal text-slate-300 group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/5 text-slate-400 group-hover:text-slate-300 transition-colors">
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
