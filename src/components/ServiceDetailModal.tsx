import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[#11141d] max-w-2xl w-full rounded-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F4C852]/10 border border-[#F4C852]/30 text-xs font-mono text-[#F4C852] mb-3 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>{service.tech}</span>
          </div>
          <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white mb-2">
            {service.title}
          </h3>
          <p className="text-base text-slate-300 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Performance Metric Banner */}
        <div className="p-4 rounded-xl bg-[#1a170e] border border-[#F4C852]/20 mb-6 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-[#F4C852]" />
            <span>Target Benchmark Performance:</span>
          </div>
          <span className="text-[#F4C852] font-bold text-sm">{service.metrics}</span>
        </div>

        {/* Features & Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase text-[#F4C852] tracking-wider mb-3 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Scope</span>
            </h4>
            <ul className="space-y-2.5">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C852] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5 font-semibold">
              <Layers className="w-4 h-4" />
              <span>Concrete Deliverables</span>
            </h4>
            <ul className="space-y-2.5">
              {service.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4C852] shrink-0 mt-2"></span>
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
            className="btn-primary w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request This Capability</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="btn-secondary w-full sm:w-auto px-5 py-3 text-xs font-mono cursor-pointer"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};
