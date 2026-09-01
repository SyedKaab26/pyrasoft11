import React from 'react';
import { ServiceItem } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0e121b] max-w-2xl w-full rounded-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-3">
            <span>{service.tech}</span>
          </div>
          <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white mb-2">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        {/* Performance Metric Banner */}
        <div className="p-3.5 rounded-lg bg-[#141926] border border-white/10 mb-6 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400">Target Benchmark:</span>
          <span className="text-white font-medium">{service.metrics}</span>
        </div>

        {/* Features & Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider mb-3 font-semibold">
              Technical Scope
            </h4>
            <ul className="space-y-2">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <FontAwesomeIcon icon={faCheck} className="text-xs text-[#e5b842] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider mb-3 font-semibold">
              Key Deliverables
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5"></span>
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.title);
            }}
            className="btn-primary w-full sm:w-auto px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request This Capability</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>

          <button
            onClick={onClose}
            className="btn-secondary w-full sm:w-auto px-5 py-2.5 text-xs font-mono cursor-pointer"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};
