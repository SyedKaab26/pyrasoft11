/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundShader } from './components/BackgroundShader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechStackMarquee } from './components/TechStackMarquee';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SystemTelemetryModal } from './components/SystemTelemetryModal';
import { ServiceItem, PortfolioProject } from './types';

function AppContent() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestCapability = (serviceTitle: string) => {
    scrollToContact();
    // Pre-populate or scroll to contact section
    const scopeSelect = document.getElementById('select-contact-scope') as HTMLSelectElement | null;
    if (scopeSelect) {
      const match = Array.from(scopeSelect.options).find((opt) =>
        opt.text.toLowerCase().includes(serviceTitle.toLowerCase().split(' ')[0])
      );
      if (match) {
        scopeSelect.value = match.value;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 font-sans antialiased selection:bg-[#F4C852] selection:text-black">
      {/* Interactive WebGL Quantum Shader Background */}
      <BackgroundShader />

      {/* Global Navigation Header */}
      <Navbar
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section with Interactive Terminal */}
        <HeroSection onStartProject={scrollToContact} />

        {/* Tech Stack Infinite Marquee */}
        <TechStackMarquee />

        {/* 16 Core Engineering Capabilities Grid */}
        <ServicesSection onSelectService={(service) => setSelectedService(service)} />

        {/* Proven Deployments Bento Grid (Portfolio) */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Engineering Excellence, Verified (Testimonials) */}
        <TestimonialsSection />

        {/* Contact Protocol Brief Submission */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTelemetry={() => setIsTelemetryOpen(true)} />

      {/* Interactive Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={handleRequestCapability}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={scrollToContact}
      />

      <SystemTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

