/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { YouTubeShowcase } from './components/YouTubeShowcase';
import { MiniGame } from './components/MiniGame';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { IntroScreen } from './components/IntroScreen';
import { DownloadRepoModal } from './components/DownloadRepoModal';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [accentTheme, setAccentTheme] = useState<'purple' | 'red' | 'cyan'>('purple');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#07070b] text-[#e2e8f0] selection:bg-purple-600/30 selection:text-purple-200 theme-${accentTheme}`}>
      
      {/* Cinematic Entrance Screen (Skippable) */}
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* Primary Fixed Navigation (Strict 3-Zone Contract) */}
      <Navbar
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        accentTheme={accentTheme}
        setAccentTheme={setAccentTheme}
      />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero Landing Section */}
        <Hero
          onScrollTo={scrollToSection}
          accentTheme={accentTheme}
        />

        {/* 2. About Creator Section (Strictly Authentic Facts) */}
        <About />

        {/* 3. Minecraft Skills Breakdown */}
        <Skills />

        {/* 4. Gaming Portfolio & Progress Chronicles */}
        <Portfolio />

        {/* 5. YouTube Channel Showcase */}
        <YouTubeShowcase />

        {/* 6. Playable Browser Mini-Game (Nether Blade Runner) */}
        <MiniGame />

        {/* 7. Contact Hub & Email Outreach */}
        <Contact />
      </main>

      {/* Footer with Widgets, Clock & Socials */}
      <Footer />

      {/* GitHub Repository Download Modal (One-click ZIP Generator) */}
      <DownloadRepoModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

    </div>
  );
}
