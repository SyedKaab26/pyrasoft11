import React, { useState, useEffect } from 'react';
import { ArrowRight, Code2, Terminal as TerminalIcon, Play, RefreshCw, CheckCircle2, Server, Shield } from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject }) => {
  const [activeTab, setActiveTab] = useState<'status' | 'benchmark' | 'deploy'>('status');
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memoryUsage, setMemoryUsage] = useState(4.2);
  const [customCommand, setCustomCommand] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Running pyrasoft build-production...',
    'Compiling Next.js 15 App Router & API routes... [Done in 1.4s]',
    'Optimizing image assets & WordPress headless sync... [OK]',
    'Core Web Vitals check: LCP 0.6s, CLS 0.00, INP 18ms [PASSED]'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Dynamic realistic fluctuation of CPU & memory
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const delta = (Math.random() * 4 - 2);
        return Math.min(Math.max(Math.round(prev + delta), 8), 34);
      });
      setMemoryUsage((prev) => {
        const delta = (Math.random() * 0.2 - 0.1);
        return parseFloat(Math.min(Math.max(prev + delta, 3.8), 5.4).toFixed(1));
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleRunCommand = (cmd: string) => {
    setIsSimulating(true);
    const timeStr = new Date().toLocaleTimeString();
    
    if (cmd === 'benchmark') {
      setActiveTab('benchmark');
      setTerminalLogs([
        `[${timeStr}] $ npm run test:performance`,
        '» Lighthouse Audit Score: 100/100 (Performance, SEO, Best Practices)',
        '  - Time to First Byte (TTFB): 48ms (Edge cached)',
        '  - Largest Contentful Paint (LCP): 0.68s',
        '  - Total Blocking Time (TBT): 0ms',
        '✔ Sub-second page delivery across mobile & desktop.'
      ]);
    } else if (cmd === 'deploy') {
      setActiveTab('deploy');
      setTerminalLogs([
        `[${timeStr}] $ git push origin main && deploy`,
        '» Running automated test suite (all tests passing)...',
        '» Synthesizing serverless edge bundle on Vercel & AWS...',
        '» Security headers & SSL certificate validated (Grade A+)...',
        '✔ Production release live with zero downtime.'
      ]);
    } else {
      setActiveTab('status');
      setTerminalLogs([
        `[${timeStr}] $ pyrasoft --version`,
        'Pyrasoft Engineering Suite v4.2.0',
        'Stack: Next.js 15 • TypeScript • Node.js • WordPress • PostgreSQL',
        'All client production clusters operational (99.99% uptime).'
      ]);
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCommand.trim()) return;
    const cmd = customCommand.trim().toLowerCase();
    setCustomCommand('');

    if (cmd.includes('bench') || cmd.includes('speed')) {
      handleRunCommand('benchmark');
    } else if (cmd.includes('deploy') || cmd.includes('build')) {
      handleRunCommand('deploy');
    } else if (cmd.includes('clear')) {
      setTerminalLogs(['$ terminal cleared. Ready for input.']);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `[Pyrasoft CLI] Executed "${cmd}". All systems running smoothly.`
      ]);
    }
  };

  return (
    <section className="relative min-h-[860px] flex items-center justify-center pt-28 pb-20 px-5 md:px-12 overflow-hidden">
      {/* Decorative ambient radial gold & white glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[750px] h-[550px] md:h-[750px] bg-[#F4C852]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-[#FDE047]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Hero Text & CTAs */}
        <div className="lg:col-span-7 text-left space-y-7">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F4C852]/30 bg-[#F4C852]/10 text-[#F4C852] text-xs font-mono tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ACCEPTING NEW PROJECTS &bull; Q1/Q2</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-tight text-white leading-[1.08]">
            Crafting High-Performance Web Apps,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C852] via-[#FFF08A] to-white">
              WordPress &amp; Growth Engines.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            We partner with ambitious startups, brands, and businesses to build lightning-fast web applications, bespoke WordPress ecosystems, and conversion-driven digital marketing pipelines.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              id="btn-hero-start-project"
              onClick={onStartProject}
              className="btn-primary px-8 py-4 font-bold text-base md:text-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              id="btn-hero-view-portfolio"
              href="#portfolio"
              className="btn-secondary px-8 py-4 font-bold text-base md:text-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Our Work</span>
              <Code2 className="w-5 h-5 text-[#F4C852]" />
            </a>
          </div>
        </div>

        {/* Right Column: Terminal Visual Component */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-panel rounded-2xl p-3 md:p-4 shadow-2xl border border-white/15 relative group">
            {/* Terminal Inner Frame */}
            <div className="w-full bg-[#0d1017] rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-inner min-h-[460px]">
              
              {/* Terminal Title Bar */}
              <div className="h-11 border-b border-white/10 flex items-center justify-between px-4 bg-[#141923]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F4C852]/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#F4C852]" />
                    developer-workspace ~ zsh
                  </span>
                </div>

                {/* Preset Commands switch */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleRunCommand('status')}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'status' ? 'bg-[#F4C852]/20 text-[#F4C852] border border-[#F4C852]/40' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    status
                  </button>
                  <button
                    onClick={() => handleRunCommand('benchmark')}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'benchmark' ? 'bg-[#F4C852]/20 text-[#F4C852] border border-[#F4C852]/40' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    audit
                  </button>
                  <button
                    onClick={() => handleRunCommand('deploy')}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      activeTab === 'deploy' ? 'bg-[#F4C852]/20 text-[#F4C852] border border-[#F4C852]/40' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    deploy
                  </button>
                </div>
              </div>

              {/* Terminal Logs & Output */}
              <div className="p-5 font-mono text-xs md:text-sm text-slate-200 flex-grow flex flex-col justify-between space-y-3 min-h-[300px]">
                <div className="space-y-2">
                  <div className="text-slate-400 text-[11px] flex items-center justify-between pb-1 border-b border-white/5">
                    <span>Pyrasoft Dev Environment [node v22.x]</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      ONLINE
                    </span>
                  </div>

                  {terminalLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`leading-relaxed ${
                        log.includes('OK') || log.includes('SUCCESSFUL') || log.includes('PASSED') || log.includes('passing')
                          ? 'text-emerald-300'
                          : log.includes('Done') || log.includes('live')
                          ? 'text-yellow-200'
                          : log.startsWith('$') || log.startsWith('[')
                          ? 'text-[#F4C852] font-semibold'
                          : 'text-slate-300'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>

                {/* Interactive CLI Input line */}
                <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-white/10 flex items-center gap-2">
                  <span className="text-[#F4C852] font-bold">$</span>
                  <input
                    type="text"
                    value={customCommand}
                    onChange={(e) => setCustomCommand(e.target.value)}
                    placeholder="Type command (e.g., audit, deploy, status)..."
                    className="bg-transparent border-none text-white text-xs font-mono focus:outline-none flex-grow placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-[#F4C852]/20 hover:bg-[#F4C852]/35 text-[#F4C852] text-[11px] rounded border border-[#F4C852]/40 font-mono font-bold"
                  >
                    RUN
                  </button>
                </form>
              </div>

              {/* Status Meter Bar Footer */}
              <div className="p-3 bg-[#090a0f] border-t border-white/10 font-mono text-[11px] md:text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-500">Node Load:</span>{' '}
                    <span className="text-white font-bold">{cpuUsage}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Memory:</span>{' '}
                    <span className="text-white font-bold">{memoryUsage}GB</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Uptime:</span>{' '}
                  <span className="text-emerald-400 font-bold">99.99%</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
