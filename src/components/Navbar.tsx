import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, ArrowUpRight } from 'lucide-react';
import { PyrasoftLogo } from './PyrasoftLogo';

interface NavbarProps {
  onOpenTelemetry: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTelemetry, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['services', 'portfolio', 'architecture', 'testimonials', 'contact'];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060913]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-[#060913]/60 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 flex justify-between items-center h-14">
        {/* Brand Logo */}
        <a
          id="brand-logo"
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            {/* Ambient Gold Glow */}
            <div className="absolute inset-0 bg-[#F4C852]/25 rounded-full blur-md group-hover:bg-[#F4C852]/40 transition-colors"></div>
            <PyrasoftLogo className="w-9 h-9 relative z-10 drop-shadow-[0_2px_12px_rgba(244,200,82,0.4)]" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-white group-hover:text-[#F4C852] transition-colors">
            PYRASOFT
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={`nav-link-${link.id}`}
              className={`text-sm font-medium transition-all duration-200 hover:text-[#F4C852] ${
                activeSection === link.id
                  ? 'text-[#F4C852] font-semibold relative after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#F4C852]'
                  : 'text-slate-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="btn-nav-get-started"
            onClick={onOpenContact}
            className="btn-primary px-5 py-2 text-sm font-bold hidden md:inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-200 p-2 hover:bg-[#141923] rounded-lg border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060913]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-200 hover:text-[#F4C852] py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-slate-500">0{navLinks.indexOf(link) + 1}</span>
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTelemetry();
              }}
              className="w-full py-2.5 px-4 bg-[#0f172a] border border-white/10 rounded-lg text-sm font-mono text-slate-300 flex items-center justify-center gap-2 hover:border-[#F4C852]/40"
            >
              <Activity className="w-4 h-4 text-[#F4C852]" />
              <span>Live System Telemetry</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="btn-primary w-full py-3 text-center font-bold text-base"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

