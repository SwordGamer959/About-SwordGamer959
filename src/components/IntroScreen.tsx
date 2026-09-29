import React, { useState, useEffect } from 'react';
import { Swords, Play, FastForward } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already saw intro this session
    const seen = sessionStorage.getItem('swordgamer_intro_seen');
    if (seen === 'true') {
      onComplete();
      return;
    }

    // Auto-advance after 2 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleDismiss = () => {
    setFading(true);
    sessionStorage.setItem('swordgamer_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#07070b] flex flex-col items-center justify-center p-4 transition-opacity duration-400 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Animated Sword Emblem */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-rose-600 p-[1px] shadow-2xl shadow-purple-600/30 animate-pulse">
            <div className="w-full h-full bg-[#0b0b14] rounded-[15px] flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.7 4.3c-.4-.4-1-.4-1.4 0L14 8.6l-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3-4.6 4.6-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3-2.6 2.6c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l2.6-2.6 1.3 1.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1.3-1.3 4.6-4.6 1.3 1.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-1.3-1.3 4.3-4.3c.4-.4.4-1 0-1.4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight mb-1">
          SWORDGAMER959
        </h1>
        <p className="text-xs text-purple-400 font-medium mb-6 font-mono">
          @SwordGamer8682 · MINECRAFT HUB
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/[0.1] rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-rose-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>

        {/* Skip button */}
        <button
          onClick={handleDismiss}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-xl border border-white/[0.08] transition-colors"
          aria-label="Skip Entrance Screen"
        >
          <span>Enter Website</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
