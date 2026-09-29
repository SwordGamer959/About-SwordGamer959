import React from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { Youtube, Play, ArrowDown, Sparkles, Shield, Compass, Gamepad2 } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
  accentTheme: 'purple' | 'red' | 'cyan';
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo, accentTheme }) => {
  const getAccentGradient = () => {
    if (accentTheme === 'red') return 'from-rose-500 via-red-500 to-amber-500';
    if (accentTheme === 'cyan') return 'from-cyan-400 via-sky-500 to-indigo-500';
    return 'from-purple-400 via-indigo-400 to-pink-500';
  };

  const subscribeUrl = `${CREATOR_PROFILE.youtubeUrl}?sub_confirmation=1`;

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Cinematic Background with Measured Scrim for 4.5:1 Text Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_swordgamer_cinematic_1790659510190.jpg"
          alt="Cinematic Minecraft voxel landscape with glowing twilight portals"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Deep layered gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/80 to-[#07070b]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07070b]/50 to-[#07070b]/90" />
        <div className="absolute inset-0 bg-gaming-grid opacity-30 pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Zero-Pill Clean Metadata Strip with Typographic Separators */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium tracking-wide mb-6">
          <span>Minecraft Creator</span>
          <span className="text-purple-400" aria-hidden="true">·</span>
          <span>Survival Grinds</span>
          <span className="text-purple-400" aria-hidden="true">·</span>
          <span>PvP & Builds</span>
          <span className="text-purple-400" aria-hidden="true">·</span>
          <span className="text-purple-300 font-semibold">{CREATOR_PROFILE.youtubeHandle}</span>
        </div>

        {/* Brand Display Headline with text-wrap: balance */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white mb-6 max-w-4xl text-balance">
          THE GRIND NEVER STOPS. <br className="hidden sm:inline" />
          <span className={`bg-gradient-to-r ${getAccentGradient()} bg-clip-text text-transparent`}>
            EVERY BLOCK, EVERY BATTLE.
          </span>
        </h1>

        {/* Subtitle / Value Proposition with honest creator facts */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Welcome to the official home of <strong className="text-white font-semibold">{CREATOR_PROFILE.brandName}</strong>. 
          Follow deep underground mining journeys, honest PvP sparring, beginner fortress builds, and fast-paced gameplay on YouTube.
        </p>

        {/* Primary Call-to-Action Group */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14 w-full max-w-xl">
          <a
            href={CREATOR_PROFILE.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[160px] sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Youtube className="w-4 h-4" />
            <span>Watch on YouTube</span>
          </a>

          <a
            href={subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[160px] sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-950/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Subscribe Channel</span>
          </a>

          <button
            onClick={() => onScrollTo('minigame')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.12] rounded-xl transition-all transform hover:-translate-y-0.5"
          >
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span>Play Browser Mini-Game</span>
          </button>
        </div>

        {/* Honest Highlights Strip (No fabricated numbers, genuine gameplay pillars) */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/[0.08] text-left">
          <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs text-slate-400 block mb-1">Focus Mode</span>
            <span className="text-sm font-semibold text-white block">Dedicated Grinding</span>
            <span className="text-[11px] text-slate-400">Mining & Resource Vaults</span>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs text-slate-400 block mb-1">Combat Approach</span>
            <span className="text-sm font-semibold text-white block">Honest PvP Growth</span>
            <span className="text-[11px] text-slate-400">Tactical Practice & Shields</span>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs text-slate-400 block mb-1">Building Style</span>
            <span className="text-sm font-semibold text-white block">Beginner Architect</span>
            <span className="text-[11px] text-slate-400">Functional Survival Bases</span>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <span className="text-xs text-slate-400 block mb-1">Channel Pace</span>
            <span className="text-sm font-semibold text-white block">Fast-Adapting</span>
            <span className="text-[11px] text-slate-400">Videos, Shorts & Streams</span>
          </div>
        </div>

        {/* Gentle Scroll Prompt */}
        <div className="mt-12 text-slate-400 flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onScrollTo('about')}
            className="p-2 text-xs flex items-center gap-1.5 hover:text-white transition-colors"
            aria-label="Scroll to creator details"
          >
            <span>Explore Creator Profile</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
