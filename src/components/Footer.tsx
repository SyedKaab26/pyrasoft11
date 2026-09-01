import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PyrasoftLogo } from './PyrasoftLogo';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#090b11] border-t border-white/10 font-sans text-sm pt-16 pb-12 px-6 md:px-12 relative z-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <PyrasoftLogo className="w-7 h-7" />
              <span className="font-headline text-xl font-bold tracking-tight text-white">
                PYRASOFT
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed font-normal">
              Specialized full-stack web engineering, custom WordPress architectures, digital growth marketing, and scalable software solutions.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#141926] border border-white/10 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Available for New Projects &bull; Worldwide</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-col gap-2.5">
              <h4 className="text-white font-semibold font-mono text-xs tracking-wider uppercase">
                Navigation
              </h4>
              <a
                href="#services"
                className="text-slate-400 hover:text-white transition-colors text-xs"
              >
                Services &amp; Capabilities
              </a>
              <a
                href="#process"
                className="text-slate-400 hover:text-white transition-colors text-xs"
              >
                Our Methodology
              </a>
              <a
                href="#portfolio"
                className="text-slate-400 hover:text-white transition-colors text-xs"
              >
                Selected Work
              </a>
              <a
                href="#testimonials"
                className="text-slate-400 hover:text-white transition-colors text-xs"
              >
                Client Reviews
              </a>
              <button
                onClick={onOpenContact}
                className="text-slate-400 hover:text-white transition-colors text-xs text-left md:text-right cursor-pointer"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-mono text-center sm:text-left">
            &copy; {new Date().getFullYear()} PYRASOFT. All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            id="button-back-to-top"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141926] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all duration-200 group cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

