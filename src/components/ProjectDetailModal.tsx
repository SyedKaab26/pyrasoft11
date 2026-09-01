import React from 'react';
import { PortfolioProject } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0e121b] max-w-3xl w-full rounded-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>

        {/* Hero Image Preview */}
        <div className="relative h-60 sm:h-64 w-full rounded-lg overflow-hidden mb-6 border border-white/10">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-[#090b11]/50 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, idx) => (
                <span key={idx} className="tech-chip px-2 py-0.5 text-[10px] font-mono rounded">
                  {t}
                </span>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 border border-white/15 transition-all"
              >
                <span>Live Deployment</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-6">
          <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Performance Stats Bar */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#141926] border border-white/10 mb-6 font-mono text-center">
          {project.stats.map((st, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase">{st.label}</span>
              <span className="text-white font-semibold text-sm sm:text-base">{st.value}</span>
            </div>
          ))}
        </div>

        {/* Architecture & Tech Stack Details */}
        <div className="space-y-4 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider mb-2 font-semibold">
              Technical Implementation
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#141926]/50 p-3.5 rounded-lg border border-white/5 font-mono">
              {project.architectureOverview}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider mb-2 font-semibold">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
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
            className="btn-primary w-full sm:w-auto px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Similar Project</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto px-5 py-2.5 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Open Deployment</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
