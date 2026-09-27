import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TimeIntervalFilter(): React.JSX.Element {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId?: string }>();
  const activeCase = caseId || 'CASE-001';

  const [startTime, setStartTime] = useState<string>('2026-09-15T14:20:00');
  const [endTime, setEndTime] = useState<string>('2026-09-15T14:40:00');
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'interval' | 'full' | null>(null);

  const handleAnalyze = (analysisMode: 'interval' | 'full') => {
    setMode(analysisMode);
    setLoading(true);

    // Simulate optimized vs full processing time
    const delay = analysisMode === 'interval' ? 1500 : 3500;

    setTimeout(() => {
      setLoading(false);
      // Navigate to timeline or AI analytics page after processing
      navigate(`/case/${activeCase}/enhancement-review`);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col select-none pb-16">

      {/* Cybernetic Header Navbar */}
      <header className="flex justify-between items-center p-6 lg:px-10 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 shadow-lg shadow-teal-500/20 flex items-center justify-center font-mono font-black text-zinc-950 text-sm">
            TV
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-white">TRACEVAULT</span>
            <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase">Temporal Analysis Module</span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
        >
          ← Back to Workspace
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 flex flex-col gap-8 pt-10">
        
        {/* Title & Context */}
        <div className="border-b border-zinc-800 pb-5">
          <div className="inline-block px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
            INVESTIGATION WINDOW CONFIGURATION • {activeCase}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Specify Doubtful Time Interval
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
            Define target timestamps to isolate search parameters, or bypass to execute a comprehensive full-footage analysis.
          </p>
        </div>

        {/* Informational Advantage Callout */}
        <div className="bg-gradient-to-r from-teal-950/30 via-zinc-900 to-indigo-950/20 border border-teal-500/30 rounded-2xl p-5 flex items-start gap-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center text-lg font-black shrink-0 mt-0.5">
            ⚡
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">
              Performance Optimization Notice
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Entering a specific <strong className="text-teal-300">doubtful time interval</strong> allows the AI engine to skip irrelevant gigabytes of continuous footage. This <strong className="text-teal-300">reduces processing time significantly</strong> and delivers investigative findings up to <strong className="text-white">4x faster</strong>.
            </p>
          </div>
        </div>

        {/* Time Interval Input Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Start Time */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase font-bold text-zinc-400">
                Interval Start Timestamp (UTC)
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-teal-300 font-bold focus:outline-none focus:border-teal-400 transition-colors"
              />
              <span className="text-[10px] font-mono text-zinc-500">
                Beginning of suspicious incident window.
              </span>
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase font-bold text-zinc-400">
                Interval End Timestamp (UTC)
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-teal-300 font-bold focus:outline-none focus:border-teal-400 transition-colors"
              />
              <span className="text-[10px] font-mono text-zinc-500">
                Conclusion of suspicious incident window.
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-zinc-800">
            
            {/* Fast Interval Scan */}
            <button
              onClick={() => handleAnalyze('interval')}
              disabled={loading}
              className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black font-mono text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading && mode === 'interval' ? (
                <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Analyze Selected Interval (Fast Scan)</span>
                  <span>⚡</span>
                </>
              )}
            </button>

            {/* Full Footage Comprehensive Scan */}
            <button
              onClick={() => handleAnalyze('full')}
              disabled={loading}
              className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all cursor-pointer disabled:opacity-50 text-center"
            >
              {loading && mode === 'full' ? 'Processing Full Dataset...' : 'Analyze Full Footage'}
            </button>

          </div>

          {loading && (
            <div className="bg-zinc-950 border border-teal-500/30 rounded-xl p-4 flex items-center justify-between font-mono text-xs animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-400 animate-ping" />
                <span className="text-zinc-200">
                  {mode === 'interval' ? 'Executing Targeted Temporal Scan...' : 'Executing Comprehensive Full-Disk Carving & AI Scan...'}
                </span>
              </div>
              <span className="text-teal-400 font-bold">Please Wait</span>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}