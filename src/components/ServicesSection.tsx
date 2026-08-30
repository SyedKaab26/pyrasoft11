import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import {
  Globe,
  Layers,
  Smartphone,
  Search,
  Filter,
  Server,
  LayoutDashboard,
  TrendingUp,
  UserPlus,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Code2,
  Megaphone,
  Share2,
  PenTool,
  Newspaper,
  Feather
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'content' | 'marketing' | 'growth'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'web':
        return <Globe className="w-6 h-6 text-[#F4C852]" />;
      case 'wordpress':
        return <Code2 className="w-6 h-6 text-[#F4C852]" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-[#F4C852]" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-[#F4C852]" />;
      case 'megaphone':
        return <Megaphone className="w-6 h-6 text-[#F4C852]" />;
      case 'share_2':
        return <Share2 className="w-6 h-6 text-[#F4C852]" />;
      case 'pen_tool':
        return <PenTool className="w-6 h-6 text-[#F4C852]" />;
      case 'newspaper':
        return <Newspaper className="w-6 h-6 text-[#F4C852]" />;
      case 'feather':
        return <Feather className="w-6 h-6 text-[#F4C852]" />;
      case 'search':
        return <Search className="w-6 h-6 text-[#F4C852]" />;
      case 'filter_alt':
        return <Filter className="w-6 h-6 text-[#F4C852]" />;
      case 'database':
        return <Server className="w-6 h-6 text-[#F4C852]" />;
      case 'dashboard':
        return <LayoutDashboard className="w-6 h-6 text-[#F4C852]" />;
      case 'insights':
        return <TrendingUp className="w-6 h-6 text-[#F4C852]" />;
      case 'group_add':
        return <UserPlus className="w-6 h-6 text-[#F4C852]" />;
      case 'shopping_cart':
        return <ShoppingCart className="w-6 h-6 text-[#F4C852]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#F4C852]" />;
    }
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-transparent relative" id="services">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="text-xs font-mono tracking-widest text-[#F4C852] uppercase mb-2">
              Capabilities &amp; Solutions
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Our Core Services &amp; Capabilities
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              From bespoke software engineering &amp; WordPress ecosystems to performance marketing, journalism, and conversion copywriting. Click any module to view technical deliverables.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0f172a]/90 border border-white/10 rounded-xl backdrop-blur-md">
            {[
              { id: 'all', label: `All (${SERVICES_DATA.length})` },
              { id: 'web', label: `Web & CMS (${SERVICES_DATA.filter(s => s.category === 'web').length})` },
              { id: 'content', label: `Content & Media (${SERVICES_DATA.filter(s => s.category === 'content').length})` },
              { id: 'marketing', label: `Marketing (${SERVICES_DATA.filter(s => s.category === 'marketing').length})` },
              { id: 'growth', label: `SEO & CRO (${SERVICES_DATA.filter(s => s.category === 'growth').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as 'all' | 'web' | 'content' | 'marketing' | 'growth')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#F4C852] text-black font-bold shadow-md shadow-[#F4C852]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="glass-panel p-5 md:p-6 rounded-xl hover:border-[#F4C852]/50 hover:bg-[#1a170e]/70 transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[175px] relative overflow-hidden"
            >
              {/* Corner accent glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4C852]/5 rounded-full blur-xl group-hover:bg-[#F4C852]/20 transition-all pointer-events-none"></div>

              <div>
                <div className="mb-4 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="font-bold text-white mb-1.5 text-sm md:text-base group-hover:text-[#F4C852] transition-colors">
                  {service.title}
                </h3>
                <p className="font-mono text-slate-400 text-xs opacity-80 group-hover:opacity-100 transition-opacity line-clamp-1">
                  {service.tech}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-[#F4C852] transition-colors">
                <span>{service.metrics}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
