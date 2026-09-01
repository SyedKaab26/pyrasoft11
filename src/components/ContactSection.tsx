import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPaperPlane,
  faCircleCheck,
  faShieldHalved,
  faClock,
  faArrowUpRightFromSquare,
  faLock,
  faCopy,
  faCheck,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ProtocolBrief } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ProtocolBrief>({
    fullName: '',
    corporateEmail: '',
    projectScope: 'Custom Web Application',
    budgetTier: 'Rs. 100,000 – Rs. 300,000',
    timeline: 'Within 4-8 Weeks',
    technicalRequirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mailerResponse, setMailerResponse] = useState<{
    recipient?: string;
    messageId?: string;
    status?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please specify your name or company lead.');
      return;
    }
    if (!formData.corporateEmail.trim() || !formData.corporateEmail.includes('@')) {
      setErrorMsg('Please provide a valid business email address.');
      return;
    }
    if (!formData.technicalRequirements.trim()) {
      setErrorMsg('Please outline a brief description of your project goals.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMailerResponse({
          recipient: data.recipient || 's.kaab2004@gmail.com',
          messageId: data.messageId,
          status: data.status,
        });
        setIsSubmitted(true);
      } else {
        throw new Error(data.error || 'Failed to dispatch email via mailer');
      }
    } catch (err: any) {
      console.error('Mailer error:', err);
      // Even if network has issues, provide fallback
      setErrorMsg(err.message || 'Unable to reach the mailer service. You can also contact us directly at s.kaab2004@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    const summary = `Pyrasoft Project Brief:
Name: ${formData.fullName}
Email: ${formData.corporateEmail}
Scope: ${formData.projectScope}
Budget: ${formData.budgetTier}
Timeline: ${formData.timeline}
Requirements: ${formData.technicalRequirements}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoLink = `mailto:s.kaab2004@gmail.com?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.projectScope} - ${formData.fullName}`
  )}&body=${encodeURIComponent(
    `Client: ${formData.fullName}\nEmail: ${formData.corporateEmail}\nScope: ${formData.projectScope}\nBudget: ${formData.budgetTier}\nTimeline: ${formData.timeline}\n\nRequirements:\n${formData.technicalRequirements}`
  )}`;

  const whatsappMessageLink = `https://wa.me/923252184829?text=${encodeURIComponent(
    `Hello Pyrasoft, I have submitted a project brief:\n\nName: ${formData.fullName}\nScope: ${formData.projectScope}\nBudget: ${formData.budgetTier}\n\nRequirements: ${formData.technicalRequirements}`
  )}`;

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent border-t border-white/10" id="contact">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Direct channels & Security guarantee */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono tracking-wider text-[#e5b842] uppercase mb-2">
              Get in Touch
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Start a Project Conversation
            </h2>
            <p className="font-sans text-base text-slate-400 leading-relaxed font-normal">
              Have a project in mind, need to modernize an existing system, or looking for a dedicated engineering partner? Submit your brief for a direct technical review within 24 hours.
            </p>
          </div>

          <div className="space-y-3">
            {/* Direct Email */}
            <div className="flex items-center gap-4 glass-panel p-4 rounded-xl hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#090b11] flex items-center justify-center border border-white/10 text-slate-300 shrink-0">
                <FontAwesomeIcon icon={faEnvelope} className="text-sm text-[#e5b842]" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-mono uppercase">Direct Inquiries</div>
                <a
                  href="mailto:s.kaab2004@gmail.com"
                  className="text-white font-semibold text-sm sm:text-base hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <span>s.kaab2004@gmail.com</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px] text-slate-400" />
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-4 glass-panel p-4 rounded-xl hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#090b11] flex items-center justify-center border border-white/10 text-slate-300 shrink-0">
                <FontAwesomeIcon icon={faWhatsapp} className="text-base text-emerald-400" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-mono uppercase">WhatsApp Consultation</div>
                <a
                  href="https://wa.me/923252184829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold text-sm sm:text-base hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <span>+92 3252184829</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px] text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-5 rounded-xl bg-[#0e121b] border border-white/10 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <FontAwesomeIcon icon={faLock} className="text-xs text-slate-400" />
              <span>CONFIDENTIAL &amp; PROTECTED</span>
            </div>
            <p className="leading-relaxed text-slate-400 font-sans text-xs">
              All discussions and materials are handled under strict NDA standards. We review architecture requirements before formulating milestone proposals.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300 pt-1">
              <span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faClock} className="text-xs text-[#e5b842]" /> 24h Response Window</span>
              <span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faShieldHalved} className="text-xs text-emerald-400" /> Free Technical Assessment</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Brief Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-xl relative">
            {isSubmitted ? (
              <div className="py-8 px-2 sm:px-4 text-center space-y-5 animate-in fade-in duration-150">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
                </div>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono">
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xs text-[#e5b842]" />
                    <span>Brief Dispatched via Mailer</span>
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white">
                    Project Brief Received
                  </h3>
                  <p className="font-sans text-sm text-slate-400 max-w-md mx-auto">
                    Your brief has been forwarded to our engineering team at{' '}
                    <span className="text-white font-medium">{mailerResponse?.recipient || 's.kaab2004@gmail.com'}</span>. We will review your scope and get in touch within 24 hours.
                  </p>
                </div>

                {/* Brief Summary Box */}
                <div className="p-4 rounded-xl bg-[#090b11] border border-white/10 text-left font-mono text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-2">
                    <span className="text-white font-semibold">DISPATCH CONFIRMATION</span>
                    <span className="text-emerald-400 font-medium">STATUS: DELIVERED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px]">CLIENT</span>
                      <span className="text-white">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">EMAIL</span>
                      <span className="text-white truncate block">{formData.corporateEmail}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">SCOPE</span>
                      <span className="text-white">{formData.projectScope}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">BUDGET</span>
                      <span className="text-white">{formData.budgetTier}</span>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <button
                    onClick={handleCopySummary}
                    className="px-4 py-2 rounded-lg bg-[#090b11] hover:bg-[#141926] border border-white/10 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? <FontAwesomeIcon icon={faCheck} className="text-xs text-emerald-400" /> : <FontAwesomeIcon icon={faCopy} className="text-xs text-slate-400" />}
                    <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
                  </button>

                  <a
                    href={mailtoLink}
                    className="px-4 py-2 rounded-lg bg-[#090b11] hover:bg-[#141926] border border-white/10 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-xs text-[#e5b842]" />
                    <span>Open in Email App</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] text-slate-500" />
                  </a>

                  <a
                    href={whatsappMessageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-300 text-xs font-mono flex items-center gap-2 transition-colors"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-sm text-emerald-400" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMailerResponse(null);
                      setFormData({
                        fullName: '',
                        corporateEmail: '',
                        projectScope: 'Custom Web Application',
                        budgetTier: 'Rs. 100,000 – Rs. 300,000',
                        timeline: 'Within 4-8 Weeks',
                        technicalRequirements: ''
                      });
                    }}
                    className="btn-secondary px-5 py-2 text-xs font-mono cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                
                {/* Full Name & Corporate Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-medium">
                      Full Name *
                    </label>
                    <input
                      id="input-contact-name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-[#090b11] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-600 text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-medium">
                      Work Email *
                    </label>
                    <input
                      id="input-contact-email"
                      type="email"
                      required
                      value={formData.corporateEmail}
                      onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[#090b11] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-600 text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Project Scope Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-medium">
                    Service / Scope
                  </label>
                  <select
                    id="select-contact-scope"
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full bg-[#090b11] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm font-sans cursor-pointer"
                  >
                    <option value="Custom Web Application">Custom Web Application (Next.js / React / Node)</option>
                    <option value="WordPress & WooCommerce">WordPress &amp; WooCommerce Development</option>
                    <option value="Full-Stack SaaS Platform">Full-Stack SaaS Platform (MERN / Next.js)</option>
                    <option value="Mobile Application">Mobile Application (React Native / Expo)</option>
                    <option value="Digital Marketing & Performance Ads">Digital Marketing &amp; Paid Ad Campaigns</option>
                    <option value="Content & News Writing">SEO Content Writing &amp; News Journalism</option>
                    <option value="Brand Copywriting & Funnels">Brand Copywriting &amp; Conversion Funnels</option>
                    <option value="Headless E-commerce & Dashboards">Headless E-commerce &amp; Dashboards</option>
                    <option value="Technical SEO & Performance Growth">Technical SEO &amp; Performance Growth</option>
                  </select>
                </div>

                {/* Estimated Budget & Target Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-medium">
                      Target Budget (PKR)
                    </label>
                    <select
                      value={formData.budgetTier}
                      onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                      className="w-full bg-[#090b11] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm font-sans cursor-pointer"
                    >
                      <option value="Rs. 50,000 – Rs. 100,000">Rs. 50,000 – Rs. 100,000</option>
                      <option value="Rs. 100,000 – Rs. 300,000">Rs. 100,000 – Rs. 300,000</option>
                      <option value="Rs. 300,000 – Rs. 600,000">Rs. 300,000 – Rs. 600,000</option>
                      <option value="Rs. 600,000 – Rs. 1,500,000">Rs. 600,000 – Rs. 1,500,000</option>
                      <option value="Rs. 1,500,000+">Rs. 1,500,000+ (Enterprise Scale)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-medium">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#090b11] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm font-sans cursor-pointer"
                    >
                      <option value="Immediate (2-4 Weeks)">Immediate (2-4 Weeks)</option>
                      <option value="Standard (1-2 Months)">Standard (1-2 Months)</option>
                      <option value="Upcoming Strategic Roadmap">Upcoming Strategic Roadmap</option>
                    </select>
                  </div>
                </div>

                {/* Technical Requirements */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-medium">
                    Project Overview &amp; Requirements *
                  </label>
                  <textarea
                    id="textarea-contact-requirements"
                    rows={4}
                    required
                    value={formData.technicalRequirements}
                    onChange={(e) => setFormData({ ...formData, technicalRequirements: e.target.value })}
                    placeholder="Briefly describe your goals, desired features, tech preferences, or current challenges..."
                    className="w-full bg-[#090b11] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-600 text-sm font-sans resize-none"
                  ></textarea>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Action */}
                <button
                  id="btn-submit-brief"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3 font-semibold text-sm md:text-base flex justify-center items-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>Dispatching Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
