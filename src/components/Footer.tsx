import React from 'react';
import { ArrowUp, Activity } from 'lucide-react';
import { PyrasoftLogo } from './PyrasoftLogo';

interface FooterProps {
  onOpenTelemetry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTelemetry }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#090a0f] border-t border-white/10 font-sans text-sm pt-16 pb-12 px-5 md:px-12 relative z-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#F4C852]/20 rounded-full blur-md"></div>
                <PyrasoftLogo className="w-8 h-8 relative z-10 drop-shadow-[0_2px_8px_rgba(244,200,82,0.3)]" />
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white">
                PYRASOFT
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Full-stack web engineering, custom WordPress architectures, digital performance marketing, content writing, and scalable digital solutions for high-growth brands.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenTelemetry}
                className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0f172a] border border-white/10 text-[#F4C852] hover:bg-[#1e2433] hover:border-[#F4C852]/50 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>System Status: All Services Operational</span>
                <Activity className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold font-headline text-sm tracking-wider uppercase">
                Quick Links
              </h4>
              <a
                href="#services"
                className="text-slate-400 hover:text-[#F4C852] transition-colors text-sm"
              >
                Services &amp; Capabilities
              </a>
              <a
                href="#portfolio"
                className="text-slate-400 hover:text-[#F4C852] transition-colors text-sm"
              >
                Featured Portfolio
              </a>
              <a
                href="#testimonials"
                className="text-slate-400 hover:text-[#F4C852] transition-colors text-sm"
              >
                Client Reviews
              </a>
              <a
                href="#contact"
                className="text-slate-400 hover:text-[#F4C852] transition-colors text-sm"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-mono text-center sm:text-left">
            &copy; {new Date().getFullYear()} PYRASOFT. Digital Craftsmanship &amp; Engineering. All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            id="button-back-to-top"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f172a] hover:bg-[#F4C852] text-[#F4C852] hover:text-black border border-white/10 hover:border-[#F4C852] text-xs font-mono font-bold transition-all duration-300 shadow-sm group cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
