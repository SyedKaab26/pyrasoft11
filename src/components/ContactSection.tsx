import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, ShieldCheck, Clock, ArrowUpRight, Lock } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section className="py-24 px-5 md:px-12 relative overflow-hidden bg-transparent" id="contact">
      {/* Decorative gold background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F4C852]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#FDE047]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Direct channels & Security guarantee */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#F4C852] uppercase mb-2">
              Let's Connect
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Start a Conversation.
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
              Have a project in mind, need to modernize an existing system, or looking for a long-term development partner? Send us your brief and we'll reply within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            {/* Direct Email */}
            <div className="flex items-center gap-4 glass-panel p-4 rounded-xl border-white/10 hover:border-[#F4C852]/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0f172a] flex items-center justify-center border border-white/10 text-[#F4C852] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-400 text-xs font-mono uppercase">Direct Inquiries</div>
                <a
                  href="mailto:s.kaab2004@gmail.com"
                  className="text-white font-bold text-base hover:text-[#F4C852] transition-colors flex items-center gap-1"
                >
                  <span>s.kaab2004@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-4 glass-panel p-4 rounded-xl border-white/10 hover:border-[#F4C852]/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0f172a] flex items-center justify-center border border-white/10 text-[#F4C852] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-400 text-xs font-mono uppercase">WhatsApp Business</div>
                <a
                  href="https://wa.me/923252184829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-base hover:text-[#F4C852] transition-colors flex items-center gap-1"
                >
                  <span>+92 3252184829</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-5 rounded-xl bg-[#0f172a]/80 border border-white/10 font-mono text-xs text-slate-300 space-y-3 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 text-white font-bold">
              <Lock className="w-4 h-4 text-[#F4C852]" />
              <span>CONFIDENTIAL &amp; PROMPT</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              All project briefs are protected by standard non-disclosure agreements. We provide direct access to senior engineers from day one.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-[#F4C852] font-semibold">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#F4C852]" /> 24h Response Guarantee</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free Architecture Consultation</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Brief Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white">
                    Project Brief Received!
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. We have logged your request and our engineering team will get back to you with next steps within 24 hours.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        corporateEmail: '',
                        projectScope: 'Custom Web Application',
                        budgetTier: 'Rs. 100,000 – Rs. 300,000',
                        timeline: 'Within 4-8 Weeks',
                        technicalRequirements: ''
                      });
                    }}
                    className="btn-secondary px-6 py-2.5 text-xs font-mono"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                
                {/* Full Name & Corporate Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                      Full Name *
                    </label>
                    <input
                      id="input-contact-name"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-[#090e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#F4C852] focus:ring-1 focus:ring-[#F4C852] transition-all placeholder:text-slate-500 text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                      Work Email *
                    </label>
                    <input
                      id="input-contact-email"
                      type="email"
                      required
                      value={formData.corporateEmail}
                      onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[#090e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#F4C852] focus:ring-1 focus:ring-[#F4C852] transition-all placeholder:text-slate-500 text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Project Scope Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                    Service / Scope
                  </label>
                  <select
                    id="select-contact-scope"
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full bg-[#090e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#F4C852] focus:ring-1 focus:ring-[#F4C852] transition-all text-sm font-sans cursor-pointer"
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
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                      Target Budget (PKR)
                    </label>
                    <select
                      value={formData.budgetTier}
                      onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                      className="w-full bg-[#090e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#F4C852] focus:ring-1 focus:ring-[#F4C852] transition-all text-sm font-sans cursor-pointer"
                    >
                      <option value="Rs. 50,000 – Rs. 100,000">Rs. 50,000 – Rs. 100,000</option>
                      <option value="Rs. 100,000 – Rs. 300,000">Rs. 100,000 – Rs. 300,000</option>
                      <option value="Rs. 300,000 – Rs. 600,000">Rs. 300,000 – Rs. 600,000</option>
                      <option value="Rs. 600,000 – Rs. 1,500,000">Rs. 600,000 – Rs. 1,500,000</option>
                      <option value="Rs. 1,500,000+">Rs. 1,500,000+ (Enterprise &amp; Custom Scale)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#090e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#F4C852] focus:ring-1 focus:ring-[#F4C852] transition-all text-sm font-sans cursor-pointer"
                    >
                      <option value="Immediate (2-4 Weeks)">Immediate (2-4 Weeks)</option>
                      <option value="Standard (1-2 Months)">Standard (1-2 Months)</option>
                      <option value="Q1/Q2 Strategic Project">Upcoming Strategic Roadmap</option>
                    </select>
                  </div>
                </div>

                {/* Technical Requirements */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                    Project Overview &amp; Goals *
                  </label>
                  <textarea
                    id="textarea-contact-requirements"
                    rows={4}
                    required
                    value={formData.technicalRequirements}
                    onChange={(e) => setFormData({ ...formData, technicalRequirements: e.target.value })}
                    placeholder="Briefly describe your goals, required features, or current challenges..."
                    className="w-full bg-[#090e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#F4C852] focus:ring-1 focus:ring-[#F4C852] transition-all placeholder:text-slate-500 text-sm font-sans resize-none"
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
                  className="btn-primary w-full py-4 font-bold text-base md:text-lg flex justify-center items-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>Sending Your Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <Send className="w-4 h-4" />
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
