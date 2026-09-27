import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EnhancedFragment {
  id: string;
  actionType: string;
  status: 'Enhanced';
}

export default function EnhancementReview(): React.JSX.Element {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId?: string }>();
  const activeCase = caseId || 'CASE-001';

  const [activeModalFrag, setActiveModalFrag] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'previous' | 'improved' | null>(null);

  const fragments: EnhancedFragment[] = [
    { id: 'FRG-0102', actionType: 'Bluriness removed and night vision improved', status: 'Enhanced' },
    { id: 'FRG-0112', actionType: 'Bluriness removed & sharpened', status: 'Enhanced' },
    { id: 'FRG-0106', actionType: 'Night vision luminance enhanced', status: 'Enhanced' },
    { id: 'FRG-0111', actionType: 'Bluriness removed and night vision improved', status: 'Enhanced' }
  ];

  const handleOpenComparison = (fragId: string, type: 'previous' | 'improved') => {
    setActiveModalFrag(fragId);
    setModalType(type);
  };

  const handleProceedToAI = () => {
    navigate(`/case/${activeCase}/lightweight-ai`);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-12">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Phase 15 / Optical Enhancement Module
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                OPTICAL STABILIZER ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Blurriness Removal & Night Vision Correction
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Scanned for blurriness and low vision detection. Enhancing low-light thermal/IR noise and stabilizing motion-blurred frames without altering core evidence integrity.
            </p>
          </div>

          <button
            onClick={handleProceedToAI}
            className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap"
          >
            <span>Proceed to Lightweight AI Analysis →</span>
          </button>
        </div>
      </div>

      {/* Scanner Status Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono font-bold text-base">
            🔍
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              Scanned for blurriness and low vision detection
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              4 total carved fragments processed via Laplacian variance calculation and IR histogram equalization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-emerald-400 font-bold">
            Status: Optimization Complete
          </span>
        </div>
      </div>

      {/* Fragment List Container */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
        <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-4">
          Enhanced Video Fragment Ledger
        </h2>

        <div className="flex flex-col gap-3">
          {fragments.map((frag, idx) => (
            <div 
              key={idx}
              className="bg-zinc-950 border border-zinc-800 hover:border-teal-500/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-500/30">
                  {frag.id}
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium text-zinc-200">
                  {frag.actionType}
                </span>
              </div>

              {/* Action Buttons for Comparison */}
              <div className="flex items-center gap-2.5 font-mono text-xs w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleOpenComparison(frag.id, 'previous')}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Show previous video
                </button>
                <button
                  onClick={() => handleOpenComparison(frag.id, 'improved')}
                  className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 px-3.5 py-2 rounded-lg transition-colors cursor-pointer font-bold"
                >
                  Show improved video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Dispatch Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Optical enhancements locked. Ready for lightweight AI anomaly and tracking detection.</span>
        </div>

        <button
          onClick={handleProceedToAI}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          Proceed to Lightweight AI Analysis →
        </button>
      </div>

      {/* Modal Video Comparison Player */}
      {activeModalFrag && (
        <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-2xl w-full flex flex-col gap-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 font-mono">
              <span className="text-teal-400 font-bold text-sm">
                {activeModalFrag} — {modalType === 'previous' ? 'Raw Blurred Feed (blur.mp4)' : 'Stabilized & Enhanced Feed (improved.mp4)'}
              </span>
              <button 
                onClick={() => setActiveModalFrag(null)}
                className="text-zinc-400 hover:text-white cursor-pointer font-bold text-base"
              >
                ✕
              </button>
            </div>

            <div className="w-full bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden flex flex-col items-center justify-center relative aspect-video">
              {activeModalFrag === 'FRG-0102' ? (
                <video
                  key={modalType}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  src={modalType === 'previous' ? '/blur.mp4' : '/improved.mp4'}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                  <span className="text-3xl">✨</span>
                  <span className="font-mono text-xs text-zinc-400">
                    Comparison preview available for FRG-0102. Showing simulated enhancement stream for {activeModalFrag}.
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-mono text-[11px] text-zinc-500">
                {modalType === 'previous' ? 'Source: Unprocessed motion platter slice' : 'Source: Laplacian deconvolution + IR gain equalization'}
              </span>
              <button
                onClick={() => setActiveModalFrag(null)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}