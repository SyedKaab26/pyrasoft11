import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { PortfolioProject } from '../types';
import { ArrowRight, ExternalLink, Eye } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  return (
    <section className="py-24 px-5 md:px-12 bg-[#090a0f]/40 relative border-t border-white/5" id="portfolio">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#F4C852] uppercase mb-2">
              Case Studies &amp; Proven Impact
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Featured Client Deployments
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Real-world software architectures, WordPress portals, and growth campaigns delivering measurable results.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 hidden md:inline-block">
              {PORTFOLIO_PROJECTS.length} Systems Deployed &bull; 100% Production Ready
            </span>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`${
                project.id === 'agri-bot' || project.id === 'galaxy-pharma'
                  ? 'md:col-span-2 lg:col-span-2'
                  : 'md:col-span-1 lg:col-span-1'
              } glass-panel rounded-2xl overflow-hidden relative group cursor-pointer min-h-[380px] sm:min-h-[420px] flex flex-col justify-end transition-all duration-300 hover:border-[#F4C852]/60 hover:shadow-2xl`}
            >
              {/* Background Hotlinked Image with Cover & Vignette */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url('${project.imageUrl}')` }}
              ></div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/85 to-transparent"></div>

              {/* Top Quick Actions */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-full bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-slate-200 hover:text-[#F4C852] hover:border-[#F4C852]/50 transition-all shadow-lg"
                    title="Open Live Deployment"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <div className="p-2.5 rounded-full bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-[#F4C852] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="relative p-6 sm:p-8 w-full z-20">
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="tech-chip px-2.5 py-1 text-[11px] font-mono rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#F4C852] transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowRight className="w-5 h-5 text-[#F4C852] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Quick Performance Metric Pills */}
                <div className="flex items-center gap-6 pt-3 border-t border-white/15 text-xs font-mono">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-slate-400 text-[10px] uppercase">{stat.label}</span>
                      <span className="text-[#F4C852] font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
