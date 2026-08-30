import React, { useState } from 'react';
import { GitCommit, RefreshCw, ShieldCheck, Zap, Globe2, Play } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'building' | 'deploying' | 'synced'>('idle');
  const [activeCommit] = useState('feat: optimize edge caching & web vitals [a8f93e]');
  const [deployLogs, setDeployLogs] = useState<string>('Pipeline standby. Ready to trigger deployment test.');

  const runPipelineSimulation = () => {
    if (pipelineState === 'building' || pipelineState === 'deploying') return;

    setPipelineState('building');
    setDeployLogs('1/3 Compiling production bundle with strict TypeScript validation...');

    setTimeout(() => {
      setPipelineState('deploying');
      setDeployLogs('2/3 Running automated test suite (142 unit + E2E tests passed). Synthesizing edge distribution...');
      
      setTimeout(() => {
        setPipelineState('synced');
        setDeployLogs('3/3 Global sync complete. Vercel, AWS (us-east-1) and Cloudflare edge nodes running revision #a8f93e with 0ms downtime.');
      }, 1400);
    }, 1200);
  };

  return (
    <section className="py-24 px-5 md:px-12 border-y border-white/10 bg-transparent relative" id="architecture">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Interactive Deployment Pipeline Diagram */}
        <div className="order-2 lg:order-1 relative min-h-[520px] glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

          {/* Top Bar with Pipeline Status and Trigger Button */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#F4C852] tracking-wider flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  pipelineState === 'idle' ? 'bg-[#F4C852]' : pipelineState === 'synced' ? 'bg-emerald-400' : 'bg-[#F4C852] animate-ping'
                }`}></span>
                Pipeline Status: {pipelineState.toUpperCase()}
              </span>
            </div>

            <button
              onClick={runPipelineSimulation}
              disabled={pipelineState === 'building' || pipelineState === 'deploying'}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4C852]/15 hover:bg-[#F4C852]/25 border border-[#F4C852]/40 text-[#F4C852] text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all font-semibold"
            >
              <Play className="w-3.5 h-3.5 text-[#F4C852]" />
              <span>Simulate Deploy</span>
            </button>
          </div>

          {/* Pipeline Flow Stages */}
          <div className="relative z-10 flex flex-col gap-5 my-6">
            
            {/* Step 1: Source Code */}
            <div className="flex items-center gap-4 bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 relative group hover:border-[#F4C852]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#020617] border border-white/10 flex items-center justify-center text-[#F4C852]">
                <GitCommit className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="text-white font-bold text-sm flex items-center justify-between">
                  <span>Source Repository</span>
                  <span className="text-[11px] font-mono text-slate-400">main branch</span>
                </div>
                <div className="text-slate-300 font-mono text-xs truncate max-w-[280px] sm:max-w-md">
                  {activeCommit}
                </div>
              </div>
              {/* Connector line */}
              <div className="absolute -bottom-5 left-9 w-0.5 h-5 bg-[#F4C852]/40"></div>
            </div>

            {/* Step 2: CI/CD Runner */}
            <div className={`flex items-center gap-4 bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-xl border relative ml-6 sm:ml-8 transition-all ${
              pipelineState === 'building' || pipelineState === 'deploying'
                ? 'border-[#F4C852] shadow-[0_0_20px_rgba(244,200,82,0.35)] bg-[#1a170e]'
                : 'border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-[#020617] border border-white/10 flex items-center justify-center text-[#F4C852]">
                <RefreshCw className={`w-5 h-5 ${pipelineState === 'building' || pipelineState === 'deploying' ? 'animate-spin text-[#F4C852]' : ''}`} />
              </div>
              <div className="flex-grow">
                <div className="text-white font-bold text-sm flex items-center justify-between">
                  <span>Automated CI/CD Pipeline</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    pipelineState === 'building' ? 'bg-[#F4C852]/20 text-[#F4C852] font-bold' : 'bg-emerald-500/10 text-emerald-400 font-bold'
                  }`}>
                    {pipelineState === 'building' ? 'COMPILING (SSR/SSG)' : 'PASSED'}
                  </span>
                </div>
                <div className="text-slate-300 font-mono text-xs">
                  Automated Testing, Linter &amp; Edge Bundling
                </div>
              </div>
              {/* Connector line */}
              <div className="absolute -bottom-5 left-9 w-0.5 h-5 bg-[#F4C852]/40"></div>
            </div>

            {/* Step 3: Edge Targets */}
            <div className="grid grid-cols-3 gap-3 ml-10 sm:ml-16">
              {[
                { name: 'Vercel Edge', region: 'Global Anycast', latency: '18ms' },
                { name: 'AWS Cloud', region: 'us-east-1', latency: '24ms' },
                { name: 'Cloudflare', region: 'Central Edge', latency: '16ms' },
              ].map((node, i) => (
                <div
                  key={i}
                  className={`bg-[#0f172a]/80 backdrop-blur-md p-3 rounded-xl text-center border transition-all ${
                    pipelineState === 'synced'
                      ? 'border-[#F4C852]/60 bg-[#1a170e]'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
                    <span className="text-white font-bold text-xs">{node.name}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">{node.region}</div>
                  <div className="text-[10px] font-mono text-[#F4C852] mt-0.5 font-bold">{node.latency}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Live Log Box */}
          <div className="relative z-10 p-3 bg-[#020617] rounded-xl border border-white/10 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
              <span>PIPELINE LOG STREAM</span>
              <span>TLS 1.3 &bull; ENCRYPTED</span>
            </div>
            <p className="text-yellow-200 leading-relaxed">{deployLogs}</p>
          </div>

        </div>

        {/* Right Column: Architectural Highlights */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="text-xs font-mono tracking-widest text-[#F4C852] uppercase">
            Performance &amp; Scalability
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Launch-Ready Architecture.
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
            We engineer web platforms designed to withstand traffic surges without slowing down. By combining Server-Side Rendering (SSR), intelligent edge caching, and headless WordPress architectures, we deliver sub-second performance.
          </p>

          <ul className="space-y-4 pt-2">
            {[
              {
                title: 'Zero-Downtime Deployments',
                desc: 'Continuous delivery across global edge networks with atomic canary rollouts and instant rollback protection.',
                icon: <Zap className="w-5 h-5 text-[#F4C852]" />,
              },
              {
                title: 'High-Concurrency Scaling',
                desc: 'Cloud-native infrastructure optimized to scale effortlessly from early traction to hundreds of thousands of concurrent users.',
                icon: <Globe2 className="w-5 h-5 text-[#F4C852]" />,
              },
              {
                title: 'Hardened Security & Compliance',
                desc: 'Strict SSL/TLS configurations, Content Security Policies, rate-limiting, and sanitized inputs built into every project.',
                icon: <ShieldCheck className="w-5 h-5 text-[#F4C852]" />,
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 glass-panel p-4 rounded-xl border-white/10 hover:border-[#F4C852]/50 transition-colors">
                <div className="mt-0.5 p-2 rounded-lg bg-[#F4C852]/10 border border-[#F4C852]/20 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <strong className="text-white font-bold text-base block mb-0.5">
                    {item.title}
                  </strong>
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};
