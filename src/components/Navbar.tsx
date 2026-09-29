import React, { useState, useEffect } from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { LiveClock } from './LiveClock';
import { Menu, X, ExternalLink, Download, Play, Youtube } from 'lucide-react';

interface NavbarProps {
  onOpenDownloadModal?: () => void;
  accentTheme: 'purple' | 'red' | 'cyan';
  setAccentTheme: (theme: 'purple' | 'red' | 'cyan') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDownloadModal, 
  accentTheme, 
  setAccentTheme 
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active indicator
      const sections = ['about', 'skills', 'portfolio', 'youtube', 'minigame', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 150) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'YouTube', href: '#youtube', id: 'youtube' },
    { label: 'Mini-Game', href: '#minigame', id: 'minigame' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const cycleTheme = () => {
    const order: Array<'purple' | 'red' | 'cyan'> = ['purple', 'red', 'cyan'];
    const nextIndex = (order.indexOf(accentTheme) + 1) % order.length;
    setAccentTheme(order[nextIndex]);
  };

  const getThemeColorClass = () => {
    if (accentTheme === 'red') return 'text-red-400 border-red-500/30';
    if (accentTheme === 'cyan') return 'text-cyan-400 border-cyan-500/30';
    return 'text-purple-400 border-purple-500/30';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#07070b]/90 backdrop-blur-md border-b border-white/[0.08] py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark with diamond sword motif */}
          <div className="flex items-center gap-3">
            <a 
              href="#hero" 
              className="flex items-center gap-2 group text-white font-display text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
              aria-label="SwordGamer959 Home"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-indigo-600 to-rose-600 p-[1px] flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-105 transition-transform">
                <span className="w-full h-full bg-[#0b0b12] rounded-[7px] flex items-center justify-center">
                  {/* Stylized Pixel Sword Icon */}
                  <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.7 4.3c-.4-.4-1-.4-1.4 0L14 8.6l-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3-4.6 4.6-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3-2.6 2.6c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l2.6-2.6 1.3 1.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1.3-1.3 4.6-4.6 1.3 1.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1.3-1.3 4.3-4.3c.4-.4.4-1 0-1.4z"/>
                  </svg>
                </span>
              </span>
              <span className="tracking-tight font-extrabold text-white text-lg">
                {CREATOR_PROFILE.brandName}
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Live Clock Header Widget */}
            <div className="hidden md:block">
              <LiveClock compact />
            </div>

            {/* Accent Theme Switcher */}
            <button
              onClick={cycleTheme}
              className={`p-1.5 rounded-md border text-xs font-mono transition-colors flex items-center gap-1 ${getThemeColorClass()}`}
              title={`Switch Theme Accent (Current: ${accentTheme})`}
              aria-label="Cycle Accent Color"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />
              <span className="hidden xl:inline capitalize text-[11px]">{accentTheme}</span>
            </button>

            {/* Primary Action Button */}
            <a
              href={CREATOR_PROFILE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 rounded-lg shadow-md shadow-red-950/40 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>Watch YouTube</span>
            </a>

            {/* Download/Export Repo Button */}
            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-colors whitespace-nowrap"
                title="Download complete GitHub Pages project ZIP"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>GitHub ZIP</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-3">
          <div className="py-2 border-b border-white/[0.05] flex items-center justify-between">
            <LiveClock compact />
            <button
              onClick={cycleTheme}
              className={`p-1.5 rounded-md border text-xs font-mono transition-colors flex items-center gap-1 ${getThemeColorClass()}`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-current inline-block" />
              <span className="capitalize text-[11px]">{accentTheme} mode</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={CREATOR_PROFILE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch YouTube Channel ({CREATOR_PROFILE.youtubeHandle})</span>
            </a>

            {onOpenDownloadModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadModal();
                }}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 text-xs font-medium text-slate-300 bg-white/[0.05] border border-white/[0.1] rounded-lg hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Download GitHub Pages ZIP</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
