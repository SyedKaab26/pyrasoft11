import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'content' | 'marketing' | 'growth'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const getTaxonomyBadge = (service: ServiceItem) => {
    switch (service.category) {
      case 'web':
        return 'ENGINEERING';
      case 'content':
        return 'EDITORIAL';
      case 'marketing':
        return 'PERFORMANCE';
      case 'growth':
        return 'OPTIMIZATION';
      default:
        return 'CORE';
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative" id="services">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="text-left">
            <div className="text-xs font-mono tracking-wider text-[#e5b842] uppercase mb-2">
              Capabilities &amp; Solutions
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Engineering &amp; Growth Services
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl mt-2 leading-relaxed">
              Precision web development, custom CMS architectures, and data-backed digital marketing. Select any capability to inspect technical deliverables.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0e121b] border border-white/10 rounded-xl">
            {[
              { id: 'all', label: `All (${SERVICES_DATA.length})` },
              { id: 'web', label: `Engineering (${SERVICES_DATA.filter(s => s.category === 'web').length})` },
              { id: 'content', label: `Content & Media (${SERVICES_DATA.filter(s => s.category === 'content').length})` },
              { id: 'marketing', label: `Marketing (${SERVICES_DATA.filter(s => s.category === 'marketing').length})` },
              { id: 'growth', label: `CRO & SEO (${SERVICES_DATA.filter(s => s.category === 'growth').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as 'all' | 'web' | 'content' | 'marketing' | 'growth')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#e5b842] text-[#090b11] font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Structural Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((service, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const taxonomy = getTaxonomyBadge(service);

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="glass-panel p-5 sm:p-6 rounded-xl hover:border-white/20 hover:bg-[#121724] transition-all duration-150 group cursor-pointer flex flex-col justify-between min-h-[220px] relative"
              >
                <div>
                  {/* Structural Index & Taxonomy Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 font-mono text-[11px]">
                    <span className="text-[#e5b842] font-semibold">
                      {indexStr}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[10px] tracking-wider uppercase">
                      {taxonomy}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-headline font-bold text-white text-base md:text-lg mb-1.5 group-hover:text-slate-100 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Core Tech Stack */}
                  <p className="font-mono text-slate-400 text-xs mb-3 line-clamp-1">
                    {service.tech}
                  </p>

                  {/* Short Description */}
                  <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Metric & Action Bar */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-300 text-[11px] font-medium bg-[#141926] px-2 py-0.5 rounded border border-white/5">
                    {service.metrics}
                  </span>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors text-[11px]">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Details</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
