import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PyrasoftLogo } from './PyrasoftLogo';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['services', 'process', 'portfolio', 'testimonials', 'contact'];
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
    { label: 'Capabilities', href: '#services', id: 'services' },
    { label: 'Methodology', href: '#process', id: 'process' },
    { label: 'Selected Work', href: '#portfolio', id: 'portfolio' },
    { label: 'Client Feedback', href: '#testimonials', id: 'testimonials' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#090b11]/90 backdrop-blur-md border-b border-white/10 shadow-sm py-3'
          : 'bg-[#090b11]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center h-12">
        {/* Brand Logo */}
        <a
          id="brand-logo"
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <PyrasoftLogo className="w-7 h-7" />
          <span className="font-headline text-lg font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
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
              className={`text-xs font-mono tracking-wider transition-colors duration-150 ${
                activeSection === link.id
                  ? 'text-white font-medium relative after:content-[""] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-[#e5b842]'
                  : 'text-slate-400 hover:text-slate-200'
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
            className="btn-primary px-4 py-2 text-xs font-semibold hidden md:inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start a Project</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]" />
          </button>

          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 p-2 hover:bg-[#141926] rounded-lg border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FontAwesomeIcon icon={faXmark} className="text-base" /> : <FontAwesomeIcon icon={faBars} className="text-base" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090b11]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono text-slate-300 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-slate-500">0{navLinks.indexOf(link) + 1}</span>
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="btn-primary w-full py-2.5 text-center font-semibold text-xs"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

