/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import KineticGrid from './components/ui/kinetic-grid';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechStackMarquee } from './components/TechStackMarquee';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ServiceItem, PortfolioProject } from './types';

function AppContent() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestCapability = (serviceTitle: string) => {
    scrollToContact();
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
    <KineticGrid className="min-h-screen flex flex-col relative text-slate-100 font-sans antialiased selection:bg-[#e5b842] selection:text-black">
      {/* Global Navigation Header */}
      <Navbar onOpenContact={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection onStartProject={scrollToContact} />

        {/* Core Technologies */}
        <TechStackMarquee />

        {/* Capabilities & Services Grid */}
        <ServicesSection onSelectService={(service) => setSelectedService(service)} />

        {/* Working Methodology & 4-Step Process */}
        <ProcessSection />

        {/* Featured Case Studies (Portfolio) */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* Contact Form & Project Brief Submission */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenContact={scrollToContact} />

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
    </KineticGrid>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

