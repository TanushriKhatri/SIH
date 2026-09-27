import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CarveStep {
  name: string;
  desc: string;
  code: string;
  subsystem: string;
}

export default function RecoveryEngine(): React.JSX.Element {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        if (s < 5) return s + 1;
        clearInterval(timer);
        return s;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps: CarveStep[] = [
    { name: 'Recording Index Analysis', desc: 'Parsing damaged index nodes & mapping missing intervals.', code: 'LUT_DIFF', subsystem: 'Index LUT' },
    { name: 'Deleted-Region Isolation', desc: 'Identified 450 GB unreferenced payload across sectors.', code: 'GAP_MAP', subsystem: 'Slack Extent' },
    { name: 'Video Signature Carving', desc: 'Carving raw frame headers (0x00 00 01 BA / DHAV).', code: 'MAGIC_0xBA', subsystem: 'MPEG-PS Demux' },
    { name: 'Fragment Classification', desc: 'Restoring channel indices & PTS/DTS timecodes.', code: 'PTS_SORT', subsystem: 'PTS Sync' },
    { name: 'Fragment Sequence Splice', desc: 'De-duplicating overlapped slices into stream chunks.', code: 'STREAM_JOIN', subsystem: 'Cluster Splice' },
  ];

  const isCompleted = step >= 5;
  const carvedCount = Math.min(step * 2878 + (step === 5 ? 2 : 0), 14392);
  const progressPercent = Math.min(step * 20, 100);

  const hexCells = [
    { label: '0x00', found: step >= 1, val: step >= 1 ? 'DHAV' : '??' },
    { label: '0x04', found: step >= 2, val: step >= 2 ? '01BA' : '??' },
    { label: '0x08', found: step >= 2, val: step >= 2 ? 'E001' : '??' },
    { label: '0x0C', found: step >= 3, val: step >= 3 ? 'PTS0' : '??' },
    { label: '0x10', found: step >= 3, val: step >= 3 ? 'NALU' : '??' },
    { label: '0x14', found: step >= 4, val: step >= 4 ? 'CH01' : '??' },
    { label: '0x18', found: step >= 4, val: step >= 4 ? 'SEEK' : '??' },
    { label: '0x1C', found: step >= 5, val: step >= 5 ? 'SYNC' : '??' },
  ];

  return (
    <div className="relative max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none p-4 sm:p-6 bg-zinc-950/80 rounded-3xl border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-xl overflow-hidden">
      
      {/* Background Cybernetic Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Card */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)] tracking-wider">
              Phase 09 // Deep Video Carving
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded-md">
              <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 animate-ping'}`} />
              <span className={isCompleted ? 'text-emerald-300 font-semibold' : 'text-amber-300 font-semibold'}>
                {isCompleted ? 'EXCAVATION COMPLETE' : `CARVING STAGE 0${Math.min(step + 1, 5)} OF 05`}
              </span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 uppercase tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Recovery & Carving Engine
          </h1>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-5 bg-zinc-900/90 border border-cyan-500/30 px-5 py-2.5 rounded-2xl text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Carved Chunks</span>
            <span className="text-amber-300 font-extrabold text-base drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]">
              {carvedCount.toLocaleString()}
            </span>
          </div>
          <div className="w-px h-8 bg-cyan-500/20" />
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Slack Carved</span>
            <span className="text-emerald-400 font-extrabold text-base drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
              398.0 GB
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Cockpit */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column: Bitstream Laser Scanner Animation (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/80 border border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-2xl backdrop-blur-md">

          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]">
              Bitstream Laser Scanner
            </span>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              LBA STREAM
            </span>
          </div>

          {/* Laser Sweep & Cluster Re-assembly Canvas */}
          <div className="relative overflow-hidden rounded-xl bg-black/90 border border-zinc-800 p-4 flex flex-col justify-between gap-4 min-h-[240px] shadow-inner">

            {/* Glowing Laser Bar Animation */}
            {!isCompleted && (
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee] animate-[bounce_2s_infinite] pointer-events-none z-20" />
            )}

            {/* Audio/Video Waveform Oscilloscope Graphic */}
            <div className="flex items-end justify-between gap-1.5 h-14 px-1 border-b border-zinc-800/80 pb-2">
              {[40, 65, 30, 85, 95, 45, 70, 35, 60, 90, 50, 80, 65, 30, 75, 45].map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t transition-all duration-300 ${(i / 16) * 5 <= step
                      ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                      : !isCompleted
                        ? 'bg-amber-400/70 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'bg-zinc-800'
                    }`}
                  style={{ height: `${(i / 16) * 5 <= step ? h : Math.max(15, h * 0.3)}%` }}
                />
              ))}
            </div>

            {/* Hex Memory Deserialization Grid */}
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              {hexCells.map((cell, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border transition-all duration-300 flex flex-col gap-0.5 ${cell.found
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                      : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-600'
                    }`}
                >
                  <span className="text-[9px] text-zinc-500">{cell.label}</span>
                  <span className={`text-xs font-bold ${cell.found ? 'text-emerald-300 font-mono drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]' : 'text-zinc-600'}`}>
                    {cell.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Telemetry Bar */}
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/60">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-cyan-400 animate-ping'}`} />
                <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-cyan-400'}>
                  {isCompleted ? 'PARITY VERIFIED' : 'SCANNING RAW EXTENTS...'}
                </span>
              </span>
              <span className="text-zinc-500">SECTOR: 512B</span>
            </div>
          </div>

          {/* Excavation Progress Bar */}
          <div className="flex flex-col gap-2 bg-zinc-950/90 p-3.5 rounded-xl border border-zinc-800 shadow-inner">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400 tracking-wider">CARVING CAPACITY</span>
              <span className={isCompleted ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'}>
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div
                className={`h-full transition-all duration-500 ${isCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_#34d399]'
                    : 'bg-gradient-to-r from-amber-500 via-cyan-400 to-teal-300 shadow-[0_0_12px_#22d3ee]'
                  }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Execution Steps Pipeline (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-2xl backdrop-blur-md">

          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]">
              Reconstruction Pipeline
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Step <span className="text-cyan-300 font-bold">{Math.min(step, 5)}</span> / 05
            </span>
          </div>

          {/* Compact Step Rows */}
          <div className="space-y-2.5">
            {steps.map((s, idx) => {
              const isDone = idx < step;
              const isCurrent = idx === step;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isCurrent
                      ? 'border-amber-400/80 bg-amber-500/[0.12] shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.01]'
                      : isDone
                        ? 'border-emerald-500/40 bg-emerald-950/[0.15] shadow-[0_0_10px_rgba(16,185,129,0.08)]'
                        : 'border-zinc-800/80 bg-zinc-950/40 opacity-40'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Status Pip */}
                    <div className={`w-7 h-7 rounded-lg font-mono text-xs flex items-center justify-center font-black shrink-0 transition-all ${isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                        : isCurrent
                          ? 'bg-amber-400 text-zinc-950 shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-pulse'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                      }`}>
                      {isDone ? '✓' : `0${idx + 1}`}
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isCurrent
                          ? 'text-amber-200 drop-shadow-[0_0_8px_rgba(253,230,138,0.5)]'
                          : isDone
                            ? 'text-zinc-100'
                            : 'text-zinc-500'
                        }`}>
                        {s.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* Subsystem Code Tag */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md transition-all ${isCurrent
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)] animate-pulse'
                        : isDone
                          ? 'bg-zinc-800/80 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-900 text-zinc-600'
                      }`}>
                      {s.code}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          {isCompleted ? (
            <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>14,392 video blocks carved & reconstructed.</span>
              </div>
              <button
                onClick={() => navigate('../fragment-explorer')}
                className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 p-0.5 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.7)] cursor-pointer whitespace-nowrap"
              >
                <span className="block px-6 py-2.5 rounded-[10px] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 group-hover:bg-opacity-0 transition-all font-mono font-bold text-zinc-950">
                  Explore Recovered Fragments →
                </span>
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-zinc-800 text-center text-xs font-mono text-zinc-500 animate-pulse">
              Carving engine scanning unallocated slack sectors...
            </div>
          )}

        </div>

      </div>
    </div>
  );
}