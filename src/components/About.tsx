import React from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { Shield, Sparkles, Youtube, Instagram, MessageSquare, Mail, Award, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-2">
          <span>Behind The Blade</span>
          <span aria-hidden="true">·</span>
          <span>Authentic Gaming</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
          Meet {CREATOR_PROFILE.brandName}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Real Minecraft gameplay, true survival endurance, and unfiltered passion for the game.
        </p>
      </div>

      {/* Main Grid: Avatar & Bio split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Creator Visual Column (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-rose-600/30 rounded-3xl blur-2xl opacity-70" />
            
            {/* Visual Container */}
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/[0.12] shadow-2xl p-2.5">
              <div className="aspect-square rounded-xl overflow-hidden bg-black/60 relative">
                <img
                  src="/src/assets/images/avatar_swordgamer_creator_1790659521821.jpg"
                  alt={`${CREATOR_PROFILE.creatorName} 3D Minecraft Gamer Avatar`}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge for authentic channel identifier */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">SwordGamer959</span>
                    <span className="text-[11px] text-purple-400">{CREATOR_PROFILE.youtubeHandle}</span>
                  </div>
                  <span className="text-[11px] font-mono-numbers text-slate-400">Minecraft Edition</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Traits Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I run the YouTube channel <strong className="text-white">{CREATOR_PROFILE.youtubeHandle}</strong>, dedicated to sharing unpretentious, genuine Minecraft gameplay. Whether diving into high-stakes caves, grinding resources for hours, or recording snappy YouTube Shorts, every video reflects real, unscripted gameplay.
            </p>
            <p>
              My gaming style centers around two core values: <span className="text-purple-300 font-medium">patience during the grind</span> and <span className="text-purple-300 font-medium">continuous growth</span>. Rather than exaggerating skills, I pride myself on transparency—I have average PvP mechanics, but I practice diligently to master attack cooldowns and shield defense.
            </p>
            <p>
              As a beginner builder, every survival base I construct starts with function and survivability, before pushing boundaries into complex aesthetics. And above all, I absorb game mechanics and updates rapidly, translating what I learn into tips and enjoyable content for the community.
            </p>
          </div>

          {/* Core Player Attributes - 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
            {CREATOR_PROFILE.attributes.map((attr, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 transition-all hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white">{attr.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  {attr.description}
                </p>
              </div>
            ))}
          </div>

          {/* Social Quick Links */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={CREATOR_PROFILE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-300 border border-red-500/20 text-xs font-semibold transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube: {CREATOR_PROFILE.youtubeHandle}</span>
            </a>

            <a
              href={CREATOR_PROFILE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-pink-600/10 hover:bg-pink-600/20 text-pink-300 border border-pink-500/20 text-xs font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram: @SwordGamer959</span>
            </a>

            <a
              href={CREATOR_PROFILE.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 text-xs font-semibold transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join Discord</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};
