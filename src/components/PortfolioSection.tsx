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

        {/* Bento Grid layout with Crisp Website Cover Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`${
                project.id === 'agri-bot' || project.id === 'galaxy-pharma'
                  ? 'md:col-span-2 lg:col-span-2'
                  : 'md:col-span-1 lg:col-span-1'
              } glass-panel rounded-xl overflow-hidden relative group cursor-pointer flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/60`}
            >
              {/* Website Mockup Browser Header & Cover Photo */}
              <div className="relative w-full overflow-hidden bg-[#090b11] border-b border-white/10">
                {/* Browser Mockup Window Bar */}
                <div className="px-4 py-2.5 bg-[#0e121b] border-b border-white/5 flex items-center justify-between z-10 relative">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block"></span>
                    <span className="ml-2 text-[10px] font-mono text-slate-400 truncate max-w-[170px] sm:max-w-xs">
                      {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${project.id}.pyrasoft.dev`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors text-[10px] font-mono flex items-center gap-1.5"
                        title="Open Live Deployment"
                      >
                        <span>Live Preview</span>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px]" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Case Study
                      </span>
                    )}
                  </div>
                </div>

                {/* Visible Website Cover Photo */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#090b11]">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} Cover Photo`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Shadow at bottom edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e121b] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
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
                </div>

                {/* Performance Metric Row */}
                <div className="flex items-center gap-6 pt-3 border-t border-white/10 text-xs font-mono mt-auto">
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
