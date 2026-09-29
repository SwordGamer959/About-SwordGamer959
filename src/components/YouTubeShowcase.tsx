import React, { useState } from 'react';
import { CREATOR_PROFILE, YOUTUBE_SHOWCASE_ITEMS, YouTubeVideoItem } from '../data/portfolioData';
import { Youtube, Play, ExternalLink, Settings, Sparkles, X, Info, ShieldCheck, Film } from 'lucide-react';

export const YouTubeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'short' | 'stream'>('all');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoItem | null>(null);
  const [showApiModal, setShowApiModal] = useState<boolean>(false);

  const filteredVideos = activeTab === 'all'
    ? YOUTUBE_SHOWCASE_ITEMS
    : YOUTUBE_SHOWCASE_ITEMS.filter((item) => item.type === activeTab);

  const subscribeUrl = `${CREATOR_PROFILE.youtubeUrl}?sub_confirmation=1`;

  return (
    <section id="youtube" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      
      {/* Channel Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/[0.1] p-6 sm:p-10 mb-12 shadow-2xl">
        {/* Subtle red/purple ambient gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            {/* Channel Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 p-1 flex items-center justify-center shadow-lg shadow-red-900/40 shrink-0">
              <Youtube className="w-10 h-10 text-white" />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white font-display">
                  {CREATOR_PROFILE.youtubeChannelName}
                </h3>
                <span className="text-xs text-red-400 font-semibold font-mono">
                  {CREATOR_PROFILE.youtubeHandle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mb-3">
                Official YouTube channel showcasing Minecraft survival grinds, combat sparring, Shorts, and community streams.
              </p>
              
              {/* Unboxed Status Note */}
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Active Creator Channel</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Maintained Content</span>
              </div>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CREATOR_PROFILE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold border border-white/[0.12] transition-colors flex items-center gap-1.5"
            >
              <span>Visit Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-950/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe Free</span>
            </a>

            <button
              onClick={() => setShowApiModal(true)}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
              title="Connect YouTube Data API v3 (Optional)"
              aria-label="YouTube API Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Showcase Filter Tabs */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h3 className="text-xl font-bold text-white font-display">
            Featured Videos & Streams
          </h3>
          <p className="text-xs text-slate-400">
            Browse episodes, shorts, and live sessions
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({YOUTUBE_SHOWCASE_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'video'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gameplay Videos
          </button>
          <button
            onClick={() => setActiveTab('short')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'short'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Shorts
          </button>
          <button
            onClick={() => setActiveTab('stream')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'stream'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Streams
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group rounded-2xl overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between border border-white/[0.08]"
          >
            {/* Thumbnail */}
            <div 
              className="relative aspect-video w-full overflow-hidden bg-black/60 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Video type & duration overlay */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono-numbers text-white font-medium">
                {video.duration || 'Video'}
              </div>

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[11px] text-purple-300 font-semibold uppercase">
                {video.type}
              </div>
            </div>

            {/* Video Meta */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-mono-numbers block mb-1">
                  {video.uploadDate}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2 font-display">
                  {video.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Preview</span>
                </button>
                <a
                  href={CREATOR_PROFILE.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl glass-panel rounded-2xl overflow-hidden border border-red-500/30 shadow-2xl relative">
            <div className="relative aspect-video w-full bg-black">
              {/* Media viewer / simulation with graceful external jump */}
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl mb-4">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="text-xl font-bold text-white max-w-xl mb-2 font-display">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-slate-300 max-w-md mb-6">
                  {selectedVideo.description}
                </p>
                <a
                  href={CREATOR_PROFILE.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg transition-colors flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Watch on YouTube (@SwordGamer8682)</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                aria-label="Close video preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Data API Setup Guide Modal (Optional Integration) */}
      {showApiModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-white/[0.12] shadow-2xl relative">
            <button
              onClick={() => setShowApiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Youtube className="w-5 h-5 text-red-500" />
              <h3 className="text-base font-bold text-white font-display">
                Optional: Connect YouTube Data API v3
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/20 text-red-200">
                <span className="font-semibold block mb-1">Owner-Maintained Data Architecture:</span>
                This portfolio currently uses manually maintained video logs in <code className="bg-black/50 px-1 py-0.5 rounded text-red-300">src/data/portfolioData.ts</code>. This allows instant zero-latency loading and zero API rate limits on GitHub Pages without requiring a backend server.
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">Connecting Dynamic Public YouTube Data:</h4>
                <p className="text-slate-400 mb-2">
                  To automatically pull subscriber counts and newly uploaded videos:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>Visit Google Cloud Console & enable the <strong>YouTube Data API v3</strong>.</li>
                  <li>Create a client-restricted API key (restrict by HTTP referrer to your GitHub Pages domain).</li>
                  <li>
                    <em>Security Rule:</em> Never expose non-restricted keys in client repositories. Alternatively, use a free cloud serverless function proxy (like Cloudflare Workers or Vercel Edge).
                  </li>
                </ol>
              </div>

              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Static configuration active & optimal.</span>
                <button
                  onClick={() => setShowApiModal(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
