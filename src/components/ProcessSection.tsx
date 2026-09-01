import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPenNib, faCode, faRocket } from '@fortawesome/free-solid-svg-icons';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Scope',
      icon: faMagnifyingGlass,
      description: 'We analyze your functional goals, target audience, and architecture requirements to outline a realistic timeline and transparent milestone budget.'
    },
    {
      number: '02',
      title: 'UI/UX & Architecture',
      icon: faPenNib,
      description: 'We design high-fidelity, responsive interface prototypes and plan scalable database schemas and API specifications before writing code.'
    },
    {
      number: '03',
      title: 'Full-Stack Development',
      icon: faCode,
      description: 'Clean, type-safe development across modern stacks (React, Next.js, WordPress, Node) with automated testing and continuous code reviews.'
    },
    {
      number: '04',
      title: 'Launch & Handover',
      icon: faRocket,
      description: 'Zero-downtime production deployment, Google Core Web Vitals optimization, client documentation, and dedicated post-launch support.'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative border-t border-white/10" id="process">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-left pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono tracking-wider text-[#e5b842] uppercase mb-2">
              Working Methodology
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              How We Deliver Projects
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            A structured, collaborative development process designed to deliver high-performance software with zero guesswork.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            return (
              <div
                key={step.number}
                className="glass-panel p-6 sm:p-7 rounded-xl flex flex-col justify-between hover:border-white/20 transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/5 font-mono">
                    <span className="text-[#e5b842] font-semibold text-xs tracking-wider">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#141926] border border-white/10 flex items-center justify-center text-slate-300">
                      <FontAwesomeIcon icon={step.icon} className="text-xs text-[#e5b842]" />
                    </div>
                  </div>

                  <h3 className="font-headline font-bold text-white text-base md:text-lg mb-2">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
