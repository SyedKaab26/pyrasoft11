import React, { useState } from 'react';
import { TECH_STACK_ITEMS } from '../data/mockData';
import { Layers } from 'lucide-react';

export const TechStackMarquee: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <section className="py-8 border-y border-white/10 bg-[#0d1017]/80 backdrop-blur-md overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
          <Layers className="w-3.5 h-3.5 text-[#F4C852]" />
          <span>Core Technologies &amp; Frameworks</span>
        </div>
        {selectedTech && (
          <div className="text-xs font-mono text-[#F4C852] animate-in fade-in">
            Inspecting: <span className="text-white font-bold">{selectedTech}</span>
          </div>
        )}
      </div>

      <div className="relative w-full overflow-hidden mask-fade">
        {/* Continuous Marquee Track */}
        <div className="animate-marquee flex items-center space-x-12 py-2">
          {/* Double map for infinite seamless loop */}
          {[...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              onMouseEnter={() => setSelectedTech(`${item.name} — ${item.role}`)}
              onMouseLeave={() => setSelectedTech(null)}
              className="flex items-center gap-3 cursor-pointer group px-4 py-2 rounded-lg bg-[#0f172a]/60 hover:bg-[#1e2433] border border-white/10 hover:border-[#F4C852]/50 transition-all"
            >
              <span className="font-headline text-lg sm:text-xl font-bold tracking-wider uppercase text-slate-400 group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4C852]/15 text-[#F4C852] opacity-0 group-hover:opacity-100 transition-opacity">
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
