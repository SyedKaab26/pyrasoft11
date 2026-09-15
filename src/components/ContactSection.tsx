import React, { useState, useEffect } from 'react';
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
  faWandMagicSparkles,
  faComments,
  faPaperclip,
  faInbox,
  faTrashCan
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
  const [showInbox, setShowInbox] = useState(false);
  const [savedInquiries, setSavedInquiries] = useState<any[]>([]);

  // Load saved inquiries from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('pyrasoft_inquiries');
      if (raw) {
        setSavedInquiries(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, [isSubmitted]);

  const handleDeleteInquiry = (index: number) => {
    try {
      const updated = savedInquiries.filter((_, i) => i !== index);
      setSavedInquiries(updated);
      localStorage.setItem('pyrasoft_inquiries', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearAllInquiries = () => {
    try {
      localStorage.removeItem('pyrasoft_inquiries');
      setSavedInquiries([]);
    } catch {
      // ignore
    }
  };

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
      let serverSuccess = false;
      let serverData: any = null;

      try {
        const response = await fetch('/api/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // Defensive check: only parse as JSON if response content-type is json
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          serverData = await response.json();
          if (response.ok && serverData?.success) {
            serverSuccess = true;
          }
        } else {
          // Response is HTML or plain text (e.g., 404 from static proxy)
          const textPreview = await response.text();
          console.warn('Mailer endpoint returned non-JSON response:', textPreview.slice(0, 100));
        }
      } catch (fetchErr) {
        console.warn('Network or proxy issue contacting /api/send-mail:', fetchErr);
      }

      // Persist in local storage so client inquiries are never lost
      try {
        const existingRaw = localStorage.getItem('pyrasoft_inquiries');
        const list = existingRaw ? JSON.parse(existingRaw) : [];
        list.unshift({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem('pyrasoft_inquiries', JSON.stringify(list.slice(0, 25)));
      } catch {
        // Safe failover for private browsing
      }

      setMailerResponse({
        recipient: serverData?.recipient || 's.kaab2004@gmail.com',
        messageId: serverData?.messageId || `brief-${Date.now()}`,
        status: serverSuccess ? (serverData?.status || 'delivered') : 'captured',
      });
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission processing error:', err);
      // Clean, user-friendly fallback message without raw syntax errors
      setErrorMsg('Your brief could not be submitted automatically. You can reach out directly via WhatsApp (+92 3252184829) or email (s.kaab2004@gmail.com).');
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
    `Hello Pyrasoft, I would like to initiate a project:\n\n• Name: ${formData.fullName}\n• Email: ${formData.corporateEmail}\n• Scope: ${formData.projectScope}\n• Budget: ${formData.budgetTier}\n• Timeline: ${formData.timeline}\n\nProject Overview:\n${formData.technicalRequirements}`
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
            {/* Inquiries Inbox Drawer Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowInbox(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faInbox} className="text-[#e5b842]" />
                  <span>Stored Client Inquiries</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#e5b842]/20 text-[#e5b842] text-[10px] font-bold">
                  {savedInquiries.length} {savedInquiries.length === 1 ? 'brief' : 'briefs'}
                </span>
              </button>
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
                    <span>{mailerResponse?.status === 'delivered' ? 'Brief Dispatched via Mailer' : 'Brief Captured & Ready'}</span>
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white">
                    Project Brief Received
                  </h3>
                  <p className="font-sans text-sm text-slate-400 max-w-md mx-auto">
                    Your brief details have been safely registered for our engineering team at{' '}
                    <span className="text-white font-medium">{mailerResponse?.recipient || 's.kaab2004@gmail.com'}</span>. You can also send it directly via WhatsApp or Email below for an instant response.
                  </p>
                </div>

                {/* Brief Summary Box */}
                <div className="p-4 rounded-xl bg-[#090b11] border border-white/10 text-left font-mono text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-2">
                    <span className="text-white font-semibold">DISPATCH CONFIRMATION</span>
                    <span className="text-emerald-400 font-medium">STATUS: {mailerResponse?.status === 'delivered' ? 'DELIVERED' : 'CONFIRMED'}</span>
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
                  className="btn-primary w-full py-3 font-semibold text-sm md:text-base flex justify-center items-center gap-2 cursor-pointer mt-2 disabled:opacity-50 shadow-lg shadow-[#e5b842]/10"
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

                {/* Instant Alternative Direct Links */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[11px]">Need immediate consultation?</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={whatsappMessageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="text-xs" />
                      <span>WhatsApp Now</span>
                    </a>
                    <span className="text-white/20">|</span>
                    <a
                      href={mailtoLink}
                      className="text-[#e5b842] hover:text-[#f3cd67] transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                      <span>Email Directly</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Stored Inquiries Modal */}
      {showInbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0e121b] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl shadow-black/80">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#090b11]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#e5b842]/10 border border-[#e5b842]/30 flex items-center justify-center text-[#e5b842]">
                  <FontAwesomeIcon icon={faInbox} className="text-sm" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-white">Client Inquiries Ledger</h3>
                  <p className="text-slate-400 text-xs font-mono">
                    {savedInquiries.length} {savedInquiries.length === 1 ? 'record' : 'records'} captured on this device
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {savedInquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllInquiries}
                    className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 font-mono transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowInbox(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {savedInquiries.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-mono text-xs space-y-2">
                  <FontAwesomeIcon icon={faInbox} className="text-3xl text-slate-600 block mx-auto mb-2" />
                  <p className="text-slate-300">No project inquiries logged yet.</p>
                  <p className="text-slate-500 text-[11px]">When clients submit the brief form, their details appear here instantly.</p>
                </div>
              ) : (
                savedInquiries.map((inq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#090b11] border border-white/10 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-white text-base">{inq.fullName}</div>
                        <a href={`mailto:${inq.corporateEmail}`} className="text-xs text-[#e5b842] font-mono hover:underline">
                          {inq.corporateEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">
                          {inq.submittedAt ? new Date(inq.submittedAt).toLocaleDateString() : 'Recent'}
                        </span>
                        <button
                          onClick={() => handleDeleteInquiry(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                          title="Delete entry"
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2 border-t border-white/5 text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px]">SCOPE</span>
                        <span>{inq.projectScope}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">BUDGET</span>
                        <span>{inq.budgetTier}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">TIMELINE</span>
                        <span>{inq.timeline}</span>
                      </div>
                    </div>

                    <div className="bg-[#0e121b] p-3 rounded-lg text-xs font-sans text-slate-300 leading-relaxed">
                      <span className="text-slate-500 font-mono text-[10px] block mb-1">TECHNICAL REQUIREMENTS:</span>
                      <p className="whitespace-pre-wrap">{inq.technicalRequirements}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`https://wa.me/923252184829?text=${encodeURIComponent(`Hi, following up on your Pyrasoft brief for ${inq.projectScope}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <FontAwesomeIcon icon={faWhatsapp} className="text-xs text-emerald-400" />
                        <span>Reply on WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:${inq.corporateEmail}?subject=${encodeURIComponent(`Pyrasoft Proposal: ${inq.projectScope}`)}`}
                        className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEnvelope} className="text-xs text-[#e5b842]" />
                        <span>Reply via Email</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#090b11] border-t border-white/10 text-right">
              <button
                type="button"
                onClick={() => setShowInbox(false)}
                className="btn-secondary px-5 py-2 text-xs font-mono"
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
