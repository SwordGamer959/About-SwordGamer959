import React from 'react';
import { MINECRAFT_SKILLS } from '../data/portfolioData';
import { Pickaxe, Swords, Compass, Video, Hammer, Zap, Check } from 'lucide-react';

export const Skills: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'pickaxe':
        return <Pickaxe className="w-5 h-5 text-amber-400" />;
      case 'swords':
        return <Swords className="w-5 h-5 text-rose-400" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-400" />;
      case 'hammer':
        return <Hammer className="w-5 h-5 text-orange-400" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <Pickaxe className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-2">
          <span>Core Capabilities</span>
          <span aria-hidden="true">·</span>
          <span>Gameplay Profile</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
          Minecraft Skills & Playstyle
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          An honest breakdown of game proficiencies, combat philosophy, and building milestones without inflated rankings or fabricated statistics.
        </p>
      </div>

      {/* Skills Grid - 6 Polished Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MINECRAFT_SKILLS.map((skill) => (
          <div
            key={skill.id}
            className="rounded-2xl p-6 glass-panel glass-panel-hover flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                  {getIcon(skill.icon)}
                </div>
                {/* Unboxed clean metadata (Zero-Pill compliant) */}
                <div className="text-xs text-slate-400 font-medium">
                  <span>{skill.category}</span>
                </div>
              </div>

              {/* Title & Level Indicator */}
              <h3 className="text-xl font-bold text-white mb-1 font-display">
                {skill.title}
              </h3>
              <p className="text-xs text-purple-300 font-semibold mb-3">
                {skill.levelDescription}
              </p>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {skill.summary}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Key Focus Areas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {skill.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-6 pt-3 border-t border-white/[0.04] text-[11px] text-slate-400 flex items-center justify-between">
              <span>Verified Playstyle</span>
              <span className="font-mono-numbers">Minecraft Java & Bedrock</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
