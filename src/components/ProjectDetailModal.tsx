import React from 'react';
import { PortfolioProject } from '../types';
import { X, ExternalLink, Code, Activity, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestQuote: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestQuote
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#11141d] max-w-3xl w-full rounded-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-[#141923] hover:bg-[#1f293d] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Preview */}
        <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-6 border border-white/10 shadow-lg">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/95 via-[#060913]/40 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, idx) => (
                <span key={idx} className="tech-chip px-2.5 py-1 text-[10px] font-mono text-[#F4C852] rounded font-semibold">
                  {t}
                </span>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#F4C852] hover:bg-[#ffe17d] text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,200,82,0.4)] transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-base text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Verified Stats Bar */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#141923] border border-white/10 mb-6 font-mono text-center shadow-sm dark:shadow-none">
          {project.stats.map((st, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">{st.label}</span>
              <span className="text-[#F4C852] font-bold text-base sm:text-lg">{st.value}</span>
            </div>
          ))}
        </div>

        {/* Architecture & Tech Stack Details */}
        <div className="space-y-4 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase text-[#F4C852] tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
              <Activity className="w-4 h-4" />
              <span>Engineering Implementation</span>
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#141923]/60 p-4 rounded-xl border border-white/5">
              {project.architectureOverview}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
              <Code className="w-4 h-4" />
              <span>Integrated Technologies</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-[#1a202d] border border-white/10 text-xs font-mono text-white font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onRequestQuote();
            }}
            className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Build Similar System</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto px-5 py-3 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Visit Deployment URL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
