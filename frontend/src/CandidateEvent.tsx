import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface CandidateEventItem {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  status: 'Processing' | 'Clipped';
}

export default function CandidateEvents(): React.JSX.Element {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId?: string }>();
  const activeCase = caseId || 'CASE-001';

  const [processedCount, setProcessedCount] = useState<number>(0);

  const eventsList: CandidateEventItem[] = [
    { id: 'EVT-01', startTime: '02:10:15', endTime: '02:26:34', description: 'Multiple persons detected in restricted sector', status: 'Clipped' },
    { id: 'EVT-02', startTime: '03:05:10', endTime: '03:12:35', description: 'Multiple persons & vehicle detected near perimeter gate', status: 'Clipped' },
    { id: 'EVT-03', startTime: '04:18:40', endTime: '04:25:00', description: 'Unidentified thermal motion anomaly in corridor', status: 'Clipped' },
    { id: 'EVT-04', startTime: '05:42:00', endTime: '05:50:12', description: 'Vehicle transit detected without license plate match', status: 'Clipped' },
    { id: 'EVT-05', startTime: '06:15:30', endTime: '06:22:45', description: 'Forced entry vibration signature & person loitering', status: 'Clipped' },
    { id: 'EVT-06', startTime: '07:01:12', endTime: '07:10:00', description: 'Multiple persons carrying heavy equipment containers', status: 'Clipped' }
  ];

  useEffect(() => {
    if (processedCount < eventsList.length) {
      const timer = setTimeout(() => {
        setProcessedCount(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [processedCount]);

  const handleProceedToIndex = () => {
    navigate(`/case/${activeCase}/evidence-index`);
  };

  const isAllComplete = processedCount >= eventsList.length;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-12">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Phase 17 / Candidate Event Isolation
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isAllComplete ? 'bg-emerald-400' : 'bg-teal-400 animate-ping'}`} />
                {isAllComplete ? 'CLIPPING PROTOCOL COMPLETE' : 'PROCESSING CLIPPING RANGES...'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Candidate Event Detection & Automated Clipping
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Isolating critical temporal windows based on adaptive AI detections. Automatically generating verified video clips for high-interest suspect activities.
            </p>
          </div>

          {isAllComplete && (
            <button
              onClick={handleProceedToIndex}
              className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap animate-in fade-in zoom-in-95 duration-300"
            >
              <span>Proceed to Evidence Intelligence Index →</span>
            </button>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-mono font-bold text-base">
            ✂️
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              Automated Event-Based Clipping Engine
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              Extracting time-bounded video segments with zero re-encoding loss.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-teal-300 font-bold">
            Processed: {processedCount} / {eventsList.length} Events
          </span>
        </div>
      </div>

      {/* Events Ledger Container */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4 font-mono">
        <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-4 uppercase">
          Extracted Candidate Event Clips
        </h2>

        <div className="flex flex-col gap-3">
          {eventsList.slice(0, processedCount).map((evt, idx) => (
            <div 
              key={idx}
              className="bg-zinc-950 border border-teal-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-md shadow-teal-950/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 w-fit">
                  {evt.id}
                </span>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                  <strong className="text-white font-mono bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                    {evt.startTime}
                  </strong>
                  <span className="text-zinc-500">to</span>
                  <strong className="text-white font-mono bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                    {evt.endTime}
                  </strong>
                  <span className="text-zinc-600 mx-1">•</span>
                  <span className="text-zinc-300 font-sans">{evt.description}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono self-end sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg">
                  Event-based clipping done
                </span>
              </div>
            </div>
          ))}

          {!isAllComplete && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 border-dashed flex items-center justify-center gap-3 text-zinc-500 animate-pulse text-xs">
              <div className="w-4 h-4 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
              <span>Isolating and clipping subsequent candidate timeline intervals...</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dispatch Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className={`w-2 h-2 rounded-full ${isAllComplete ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          <span>{isAllComplete ? 'All candidate event clips secured.' : 'Clipping sequence in progress...'}</span>
        </div>

        <button
          onClick={handleProceedToIndex}
          disabled={!isAllComplete}
          className={`w-full sm:w-auto font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg transition-all whitespace-nowrap font-mono text-xs ${
            isAllComplete 
              ? 'bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 text-zinc-950 hover:brightness-110 cursor-pointer shadow-teal-500/20' 
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
          }`}
        >
          Proceed to Evidence Intelligence Index →
        </button>
      </div>

    </div>
  );
}