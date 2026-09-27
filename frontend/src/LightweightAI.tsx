import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface AISummaryItem {
  id: string;
  status: 'Processing' | 'Analyzed';
  activity: 'Motion & Object Detected' | 'Sparse / No Interest';
  samplingRate: string;
  confidence: string;
}

export default function LightweightAIAnalysis(): React.JSX.Element {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId?: string }>();
  const activeCase = caseId || 'CASE-001';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Simulated list of fragments ramping up to fragment-152
  const fragmentsList = [
    { id: 'FRG-0101', activity: 'Motion & Object Detected', samplingRate: '60 FPS (High Density)', confidence: '98.4%' },
    { id: 'FRG-0102', activity: 'Motion & Object Detected', samplingRate: '60 FPS (High Density)', confidence: '99.1%' },
    { id: 'FRG-0106', activity: 'Motion & Object Detected', samplingRate: '60 FPS (High Density)', confidence: '97.8%' },
    { id: 'FRG-0112', activity: 'Motion & Object Detected', samplingRate: '60 FPS (High Density)', confidence: '99.5%' },
    { id: 'FRG-0045', activity: 'Sparse / No Interest', samplingRate: '5 FPS (Skipped / Low)', confidence: '12.0%' },
    { id: 'FRG-0089', activity: 'Sparse / No Interest', samplingRate: '5 FPS (Skipped / Low)', confidence: '8.4%' },
    { id: 'FRG-0152', activity: 'Motion & Object Detected', samplingRate: '60 FPS (High Density)', confidence: '96.2%' }
  ];

  useEffect(() => {
    if (currentIndex < fragmentsList.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex]);

  const handleProceedToEvents = () => {
    navigate(`/case/${activeCase}/candidate-events`);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-12">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Phase 16 / Lightweight AI & Adaptive Sampling
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-teal-400 animate-ping'}`} />
                {isCompleted ? 'ADAPTIVE SAMPLING COMPLETE' : 'AI INFERENCE RUNNING...'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Lightweight AI Analysis & Frame Optimization
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Applying adaptive frame sampling. Allocating high sampling rates (60 FPS) to high-interest motion zones while dropping frame density in sparse background areas to optimize processing speed.
            </p>
          </div>

          {isCompleted && (
            <button
              onClick={handleProceedToEvents}
              className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap animate-in fade-in zoom-in-95 duration-300"
            >
              <span>Proceed to Candidate Event Detection →</span>
            </button>
          )}
        </div>
      </div>

      {/* Adaptive Sampling Concept Explainer Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex items-start gap-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center text-lg font-black shrink-0">
            ⚡
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              High Interest Region (Motion / Object)
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Transition → <strong className="text-teal-300">More Frames (60 FPS)</strong>. Deep feature extraction triggered to accurately log person/vehicle interactions.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex items-start gap-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg font-black shrink-0">
            💤
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              Sparse Region (No Activity)
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Transition → <strong className="text-indigo-300">Less Frames (5 FPS)</strong>. Bypasses redundant spatial analysis to accelerate compute throughput up to 5x.
            </p>
          </div>
        </div>
      </div>

      {/* Live Simulation Progress Panel */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono">
              Fragment Ingestion & Inference Stream
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Processing carved fragments up to <strong className="text-teal-400">fragment-152</strong>
            </p>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-teal-300 font-bold">
            {isCompleted ? '152 / 152 Analyzed' : `Processing Index: FRG-01${currentIndex < 10 ? '0' + currentIndex : currentIndex}`}
          </span>
        </div>

        {/* Fragment Processing Simulation List */}
        <div className="flex flex-col gap-3 font-mono text-xs max-h-80 overflow-y-auto pr-2">
          {fragmentsList.slice(0, currentIndex).map((frag, idx) => {
            const isHighInterest = frag.activity === 'Motion & Object Detected';
            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  isHighInterest 
                    ? 'bg-teal-950/20 border-teal-500/40 text-zinc-100' 
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded font-bold ${isHighInterest ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>
                    {frag.id}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{frag.activity}</span>
                    <span className="text-[11px] text-zinc-400">Confidence Score: {frag.confidence}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className={`px-3 py-1 rounded font-bold ${
                    isHighInterest ? 'bg-teal-400 text-zinc-950 shadow-md shadow-teal-500/20' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {frag.samplingRate}
                  </span>
                </div>
              </div>
            );
          })}

          {!isCompleted && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 border-dashed flex items-center justify-center gap-3 text-zinc-500 animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
              <span>Scanning subsequent fragments up to fragment-152 with adaptive sampling...</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dispatch Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          <span>{isCompleted ? 'Lightweight AI filtering completed successfully.' : 'Executing adaptive frame sampling pipeline...'}</span>
        </div>

        <button
          onClick={handleProceedToEvents}
          disabled={!isCompleted}
          className={`w-full sm:w-auto font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg transition-all whitespace-nowrap font-mono text-xs ${
            isCompleted 
              ? 'bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 text-zinc-950 hover:brightness-110 cursor-pointer shadow-teal-500/20' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
          }`}
        >
          Proceed to Candidate Event Detection →
        </button>
      </div>

    </div>
  );
}