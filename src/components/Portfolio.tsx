import React, { useState } from 'react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolioData';
import { ExternalLink, X, Calendar, Tag, Play, CheckCircle } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Survival & Grinds', 'PvP Practice', 'Building Logs', 'Shorts'];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      
      {/* Section Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-2">
          <span>Gameplay Chronicles</span>
          <span aria-hidden="true">·</span>
          <span>Minecraft Highlights</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">
          Gaming Portfolio & Progress Logs
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Curated gameplay chronicles, survival milestones, PvP duel logs, and starter architectural builds from our ongoing Minecraft journey.
        </p>
      </div>

      {/* Interactive Category Segmented Tabs (Functional Buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between border border-white/[0.08]"
          >
            {/* Visual Thumbnail with Zero-Broken-Image Fallback */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Category & Date Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-purple-300">{item.category}</span>
                <span className="font-mono-numbers text-slate-400">{item.date}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              {/* Unboxed Tags & Trigger */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx}>
                      #{tag}
                      {tIdx < 2 && <span className="text-slate-600 ml-1.5" aria-hidden="true">·</span>}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View Log <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Detail Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          <div className="w-full max-w-2xl glass-panel rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header Media */}
            <div className="relative aspect-[16/9] w-full bg-black/60 shrink-0">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-transparent" />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-purple-400 font-semibold">{activeItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-numbers">{activeItem.date}</span>
                {activeItem.milestoneNote && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">{activeItem.milestoneNote}</span>
                  </>
                )}
              </div>

              <h3 id="portfolio-modal-title" className="text-2xl font-bold text-white font-display">
                {activeItem.title}
              </h3>

              <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                <p>{activeItem.fullDescription}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.08]">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Topic Tags:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-purple-300">
                  {activeItem.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <a
                  href={activeItem.externalUrl || 'https://www.youtube.com/@SwordGamer8682'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on YouTube</span>
                </a>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 text-xs font-medium transition-colors"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
