import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative min-h-[640px] flex items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-transparent">
      {/* Soft, minimal ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-[960px] w-full mx-auto text-center relative z-10 flex flex-col items-center space-y-8">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0e121b] text-slate-300 text-xs font-mono tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Accepting New Client Projects &bull; 2025</span>
        </div>

        {/* Authoritative Typography Headline */}
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl">
          Engineering Scalable Web Systems,{' '}
          <span className="text-white">WordPress Architectures &amp; Digital Growth.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-normal">
          We partner with ambitious founders, enterprises, and growing brands to architect resilient web applications, bespoke WordPress platforms, and high-conversion growth funnels.
        </p>

        {/* Key Operational Highlights */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[#e5b842] font-semibold">01.</span>
            <span>Full-Stack Development</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-2">
            <span className="text-[#e5b842] font-semibold">02.</span>
            <span>Enterprise CMS</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-2">
            <span className="text-[#e5b842] font-semibold">03.</span>
            <span>Growth &amp; CRO</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            id="btn-hero-start-project"
            onClick={onStartProject}
            className="btn-primary px-6 py-3 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="btn-hero-view-portfolio"
            href="#portfolio"
            className="btn-secondary px-6 py-3 font-medium text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Selected Work</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
