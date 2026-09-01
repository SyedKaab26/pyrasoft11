import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { PortfolioProject } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative border-t border-white/10" id="portfolio">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono tracking-wider text-[#e5b842] uppercase mb-2">
              Selected Work
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured Client Case Studies
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl mt-2 leading-relaxed">
              Production software systems, headless WordPress architectures, and high-performance automated growth funnels.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400">
              {PORTFOLIO_PROJECTS.length} Systems Shipped &bull; Live in Production
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
              } glass-panel rounded-xl overflow-hidden relative group cursor-pointer min-h-[380px] sm:min-h-[400px] flex flex-col justify-end transition-all duration-200 hover:border-white/20`}
            >
              {/* Background Image with Dark Gradient Scrim */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-102 transition-all duration-300 ease-out"
                style={{ backgroundImage: `url('${project.imageUrl}')` }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-[#090b11]/85 to-transparent"></div>

              {/* Top Quick Actions */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-[#0e121b]/90 backdrop-blur-sm border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                    title="Open Live Deployment"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                  </a>
                )}
              </div>

              {/* Bottom Card Content */}
              <div className="relative p-6 sm:p-7 w-full z-20">
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="tech-chip px-2 py-0.5 text-[10px] font-mono rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-headline text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs text-slate-400 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
                  {project.description}
                </p>

                {/* Performance Metric Row */}
                <div className="flex items-center gap-6 pt-3 border-t border-white/10 text-xs font-mono">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-slate-500 text-[10px] uppercase">{stat.label}</span>
                      <span className="text-slate-200 font-medium">{stat.value}</span>
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
