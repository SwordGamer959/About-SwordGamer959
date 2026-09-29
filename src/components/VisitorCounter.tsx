import React, { useState, useEffect } from 'react';
import { Eye, Info, X, ExternalLink, Code2 } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [localVisits, setLocalVisits] = useState<number>(1);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      const STORAGE_KEY = 'swordgamer_local_visits';
      const stored = localStorage.getItem(STORAGE_KEY);
      const count = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem(STORAGE_KEY, count.toString());
      setLocalVisits(count);
    } catch {
      setLocalVisits(1);
    }
  }, []);

  const formattedCount = localVisits.toString().padStart(4, '0');

  return (
    <>
      <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs">
        <div className="flex items-center gap-1.5 text-purple-400">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Device Visits:</span>
        </div>
        <div className="flex items-center gap-1 font-mono-numbers">
          {formattedCount.split('').map((digit, idx) => (
            <span
              key={idx}
              className="inline-block w-4 h-5 leading-5 text-center bg-black/60 border border-purple-500/20 rounded text-purple-300 font-bold text-[12px]"
            >
              {digit}
            </span>
          ))}
        </div>
        <button
          onClick={() => setShowConfigModal(true)}
          className="text-slate-400 hover:text-white transition-colors p-0.5 rounded"
          title="About this counter / Connect Shared Counter"
          aria-label="Counter Information"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Integration Guide Modal */}
      {showConfigModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="counter-modal-title"
        >
          <div className="w-full max-w-lg glass-panel rounded-xl p-6 border border-purple-500/30 shadow-2xl relative">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-5 h-5 text-purple-400" />
              <h3 id="counter-modal-title" className="text-base font-bold text-white font-display">
                Visitor Counter Architecture & Shared Service Guide
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/20 text-purple-200">
                <span className="font-semibold block mb-1">Honest Architecture Notice:</span>
                This widget currently displays your local device visits stored in <code className="bg-black/40 px-1 py-0.5 rounded text-purple-300">localStorage</code>. Because this portfolio runs as a static site on GitHub Pages with no backend server, tracking global cross-visitor counts requires connecting a shared external service.
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">How to connect a Real Global Visitor Counter:</h4>
                <p className="text-slate-400 mb-2">
                  To turn this into a live counter that increments whenever anyone in the world visits:
                </p>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
                  <li>
                    <strong>Free Counter API:</strong> Use services like <span className="text-purple-300 font-mono">CountAPI</span> or <span className="text-purple-300 font-mono">KCounter</span> with a fetch call in <code className="bg-black/40 px-1 py-0.5 rounded text-purple-300">VisitorCounter.tsx</code>.
                  </li>
                  <li>
                    <strong>Serverless Database:</strong> Connect a free Supabase or Firebase Firestore document that increments an atomic counter on page view.
                  </li>
                </ol>
              </div>

              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Zero tracking cookies or personal data collected.</span>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
