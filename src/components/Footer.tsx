import React, { useState, useEffect } from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { LiveClock } from './LiveClock';
import { VisitorCounter } from './VisitorCounter';
import { Youtube, Instagram, MessageSquare, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050508] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Tier: Brand, Socials & Widgets */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand lockup */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-xl font-bold text-white font-display">
              {CREATOR_PROFILE.brandName}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Minecraft survival grinds, tactical combat sparring, starter bases, and community gameplay.
            </p>
          </div>

          {/* Social Icons Strip */}
          <div className="flex items-center gap-3">
            <a
              href={CREATOR_PROFILE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-red-600/20 hover:text-red-400 border border-white/[0.08] hover:border-red-500/30 flex items-center justify-center transition-colors"
              aria-label="YouTube Channel (@SwordGamer8682)"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a
              href={CREATOR_PROFILE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-pink-600/20 hover:text-pink-400 border border-white/[0.08] hover:border-pink-500/30 flex items-center justify-center transition-colors"
              aria-label="Instagram Profile (@SwordGamer959)"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={CREATOR_PROFILE.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-indigo-600/20 hover:text-indigo-400 border border-white/[0.08] hover:border-indigo-500/30 flex items-center justify-center transition-colors"
              aria-label="Discord Server"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${CREATOR_PROFILE.contactEmail}`}
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-purple-600/20 hover:text-purple-400 border border-white/[0.08] hover:border-purple-500/30 flex items-center justify-center transition-colors"
              aria-label="Email SwordGamer959"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Widgets Container */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <LiveClock />
            <VisitorCounter />
          </div>

        </div>

        {/* Bottom Tier: Navigation links & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#youtube" className="hover:text-white transition-colors">YouTube</a>
            <a href="#minigame" className="hover:text-white transition-colors">Mini-Game</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            <span>© {new Date().getFullYear()} {CREATOR_PROFILE.brandName}. All rights reserved.</span>
            <span className="block text-[11px] text-slate-400 mt-0.5">Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</span>
          </div>
        </div>

      </div>

      {/* Floating Back to Top Control with circular progress ring */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-[#12121c] border border-white/[0.15] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all group"
        aria-label="Back to top"
      >
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-white/10"
          />
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={119.38}
            strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
            className="text-purple-500 transition-all duration-150"
          />
        </svg>
        <ArrowUp className="w-4 h-4 text-purple-300 group-hover:-translate-y-0.5 transition-transform" />
      </button>

    </footer>
  );
};
