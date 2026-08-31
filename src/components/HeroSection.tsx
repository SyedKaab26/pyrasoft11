import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative min-h-[720px] flex items-center justify-center pt-32 pb-24 px-5 md:px-12 overflow-hidden">
      {/* Decorative ambient radial gold & white glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[850px] h-[600px] md:h-[850px] bg-[#F4C852]/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#FDE047]/8 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-[1000px] w-full mx-auto text-center relative z-10 flex flex-col items-center space-y-8">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F4C852]/30 bg-[#F4C852]/10 text-[#F4C852] text-xs font-mono tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ACCEPTING NEW PROJECTS &bull; Q1/Q2</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
          Crafting High-Performance Web Apps,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C852] via-[#FFF08A] to-white">
            WordPress &amp; Growth Engines.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
          We partner with ambitious startups, brands, and businesses to build lightning-fast web applications, bespoke WordPress ecosystems, and conversion-driven digital marketing pipelines.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            id="btn-hero-start-project"
            onClick={onStartProject}
            className="btn-primary px-8 py-4 font-bold text-base md:text-lg inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F4C852]/10 hover:shadow-[#F4C852]/25 transition-all"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            id="btn-hero-view-portfolio"
            href="#portfolio"
            className="btn-secondary px-8 py-4 font-bold text-base md:text-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Our Work</span>
            <Code2 className="w-5 h-5 text-[#F4C852]" />
          </a>
        </div>
      </div>
    </section>
  );
};
