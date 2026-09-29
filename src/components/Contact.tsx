import React, { useState } from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { Mail, Copy, Check, Send, AlertCircle, ExternalLink, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CREATOR_PROFILE.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill out all required fields (Name, Email, Message).'
      });
      return;
    }

    // Build mailto URI for honest, real-world client dispatch
    const subjectEncoded = encodeURIComponent(`[SwordGamer959 Contact] ${formData.subject || 'New Message from ' + formData.name}`);
    const bodyEncoded = encodeURIComponent(
      `Sender Name: ${formData.name}\n` +
      `Sender Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `-- Sent via SwordGamer959 Portfolio Form`
    );

    const mailtoUrl = `mailto:${CREATOR_PROFILE.contactEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Provide completely honest notification
    setStatusMessage({
      type: 'info',
      text: 'Opening your default email application to deliver your message directly to swordgamer8682@gmail.com...'
    });

    // Launch email application
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-2">
          <span>Direct Inquiries</span>
          <span aria-hidden="true">·</span>
          <span>Community Outreach</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
          Connect With {CREATOR_PROFILE.brandName}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Have a question about survival builds, gameplay collabs, or channel feedback? Send an email directly or join our community Discord server.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct channels & Quick Copy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-6">
            <h3 className="text-lg font-bold text-white font-display">
              Direct Contact Details
            </h3>

            {/* Email Card with Copy Affordance */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs text-slate-400 block mb-1">Official Email</span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${CREATOR_PROFILE.contactEmail}`}
                  className="text-sm font-mono text-purple-300 hover:text-purple-200 transition-colors truncate"
                >
                  {CREATOR_PROFILE.contactEmail}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy Email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                  ✓ Copied to clipboard!
                </span>
              )}
            </div>

            {/* Community Discord */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
              <span className="text-xs text-indigo-300 font-semibold block mb-1">Discord Community</span>
              <p className="text-xs text-slate-300 mb-3">
                Join our gaming server to talk Minecraft, share building screenshots, and get notified when streams go live.
              </p>
              <a
                href={CREATOR_PROFILE.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Join Discord Server</span>
              </a>
            </div>

            {/* Honest Static Site Architecture Note */}
            <div className="text-xs text-slate-500 leading-normal border-t border-white/[0.06] pt-4">
              <p>
                <strong>Delivery Notice:</strong> As a static site hosted via GitHub Pages, submitting the contact form initiates your system’s email client (<code className="text-slate-400">mailto:</code>) with formatted parameters to guarantee message delivery without third-party middleman servers.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-5"
          >
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              All messages route directly to {CREATOR_PROFILE.contactEmail}.
            </p>

            {/* Status Notice */}
            {statusMessage && (
              <div 
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  statusMessage.type === 'error'
                    ? 'bg-rose-950/40 border border-rose-500/30 text-rose-200'
                    : 'bg-purple-950/40 border border-purple-500/30 text-purple-200'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{statusMessage.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Minecraft Collaboration / Channel Feedback"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your note, idea, or questions here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Compose Email via Client</span>
            </button>
          </form>
        </div>

      </div>

    </section>
  );
};
