import React, { useState, useEffect } from 'react';
import { X, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

interface SystemTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemTelemetryModal: React.FC<SystemTelemetryModalProps> = ({ isOpen, onClose }) => {
  const [pingTimes, setPingTimes] = useState([
    { region: 'us-east-1 (N. Virginia)', latency: 18, status: 'OPTIMAL', load: '14%' },
    { region: 'us-west-2 (Oregon)', latency: 32, status: 'OPTIMAL', load: '19%' },
    { region: 'eu-central-1 (Frankfurt)', latency: 45, status: 'OPTIMAL', load: '22%' },
    { region: 'ap-southeast-1 (Singapore)', latency: 68, status: 'OPTIMAL', load: '16%' },
    { region: 'ap-northeast-1 (Tokyo)', latency: 74, status: 'OPTIMAL', load: '12%' },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setPingTimes((prev) =>
        prev.map((item) => ({
          ...item,
          latency: Math.max(12, item.latency + Math.floor(Math.random() * 5 - 2)),
          load: `${Math.min(45, Math.max(10, parseInt(item.load) + Math.floor(Math.random() * 4 - 2)))}%`
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

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

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#F4C852]/15 border border-[#F4C852]/30 text-[#F4C852]">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-headline text-2xl font-bold text-white flex items-center gap-2">
              <span>PYRASOFT System Monitor</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                ALL SYSTEMS OPERATIONAL
              </span>
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Global Anycast Edge Network &bull; 99.999% SLA Verified
            </p>
          </div>
        </div>

        {/* High level health metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-center">
          <div className="p-3 rounded-xl bg-[#0f172a] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase">Global Uptime</div>
            <div className="text-base sm:text-lg font-bold text-[#F4C852]">99.99%</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0f172a] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase">Avg TTFB</div>
            <div className="text-base sm:text-lg font-bold text-white">28ms</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0f172a] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase">Active Nodes</div>
            <div className="text-base sm:text-lg font-bold text-white">320+</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0f172a] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase">Security State</div>
            <div className="text-base sm:text-lg font-bold text-emerald-400">PROTECTED</div>
          </div>
        </div>

        {/* Region Ping List */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1 border-b border-white/10">
            <span>EDGE CLUSTER REGION</span>
            <div className="flex items-center gap-4">
              <span>CLUSTER LOAD</span>
              <span>PING LATENCY</span>
            </div>
          </div>

          {pingTimes.map((node, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#0f172a]/70 border border-white/5 flex items-center justify-between font-mono text-xs hover:border-[#F4C852]/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-white font-medium">{node.region}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-slate-300">{node.load}</span>
                <span className="text-[#F4C852] font-bold w-12 text-right">{node.latency}ms</span>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Certificate status */}
        <div className="p-4 rounded-xl bg-[#0f172a] border border-white/10 font-mono text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>TLS 1.3 &bull; ECC 256-bit &bull; HSTS Preloaded &bull; Automated mTLS</span>
          </div>
          <button
            onClick={handleRefresh}
            className="text-[#F4C852] hover:text-white flex items-center gap-1 cursor-pointer font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>

        {/* Footer close */}
        <div className="pt-6 mt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary px-6 py-2.5 text-xs font-mono cursor-pointer"
          >
            Dismiss Monitor
          </button>
        </div>

      </div>
    </div>
  );
};
