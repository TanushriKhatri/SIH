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

  // Hex matrix visualization items representing carving clusters
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
    <div className="max-w-5xl mx-auto flex flex-col gap-4 text-zinc-100 font-sans select-none">

      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Phase 09 / Deep Video Carving
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
              {isCompleted ? 'EXCAVATION COMPLETE' : `CARVING STAGE 0${Math.min(step + 1, 5)} OF 05`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Recovery & Carving Engine
          </h1>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-mono">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Carved Chunks</span>
            <span className="text-amber-400 font-bold text-sm">{carvedCount.toLocaleString()}</span>
          </div>
          <div className="w-px h-6 bg-zinc-800" />
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Slack Carved</span>
            <span className="text-emerald-400 font-bold text-sm">398.0 GB</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Left Column: Bitstream Laser Scanner Animation (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between gap-3.5 shadow-xl">

          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              Bitstream Laser Scanner
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
              LBA STREAM
            </span>
          </div>

          {/* Laser Sweep & Cluster Re-assembly Canvas */}
          <div className="relative overflow-hidden rounded-xl bg-black border border-zinc-800 p-3.5 flex flex-col justify-between gap-3 min-h-[220px]">

            {/* Animated Laser Scanning Bar (Horizontal Sweep) */}
            {!isCompleted && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-bounce pointer-events-none z-10" />
            )}

            {/* Audio/Video Waveform Oscilloscope Graphic */}
            <div className="flex items-end justify-between gap-1 h-12 px-1 border-b border-zinc-800/80 pb-1">
              {[40, 65, 30, 85, 95, 45, 70, 35, 60, 90, 50, 80, 65, 30, 75, 45].map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t transition-all duration-300 ${(i / 16) * 5 <= step
                      ? 'bg-emerald-400/90 shadow-sm shadow-emerald-400/50'
                      : !isCompleted
                        ? 'bg-amber-400/60 animate-pulse'
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
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-600'
                    }`}
                >
                  <span className="text-[9px] text-zinc-500">{cell.label}</span>
                  <span className={`text-xs font-bold ${cell.found ? 'text-emerald-300 font-mono' : 'text-zinc-600'}`}>
                    {cell.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Stream Telemetry Bar */}
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/60">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-cyan-400 animate-ping'}`} />
                {isCompleted ? 'PARITY VERIFIED' : 'SCANNING RAW EXTENTS...'}
              </span>
              <span className="text-zinc-500">SECTOR: 512B</span>
            </div>
          </div>

          {/* Excavation Progress Bar */}
          <div className="flex flex-col gap-1.5 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">CARVING CAPACITY</span>
              <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400'
                  }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Execution Steps Pipeline (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-xl">

          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-mono font-bold uppercase text-zinc-400">
              Reconstruction Pipeline
            </span>
            <span className="text-xs font-mono text-zinc-500">
              Step {Math.min(step, 5)} / 05
            </span>
          </div>

          {/* Compact Step Rows */}
          <div className="space-y-2">
            {steps.map((s, idx) => {
              const isDone = idx < step;
              const isCurrent = idx === step;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${isCurrent
                      ? 'border-amber-500/60 bg-amber-500/[0.08] shadow-sm'
                      : isDone
                        ? 'border-emerald-500/30 bg-zinc-950/60'
                        : 'border-zinc-800/60 bg-zinc-950/30 opacity-40'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Status Pip */}
                    <div className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center font-bold shrink-0 ${isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isCurrent
                          ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/40'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}>
                      {isDone ? '✓' : `0${idx + 1}`}
                    </div>

                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isCurrent ? 'text-amber-200' : isDone ? 'text-zinc-100' : 'text-zinc-500'
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
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isCurrent
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        : isDone
                          ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
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
            <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3 animate-in fade-in duration-300">
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>14,392 video blocks carved & reconstructed.</span>
              </div>
              <button
                onClick={() => navigate('../fragment-explorer')}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                Explore Recovered Fragments →
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-zinc-800 text-center text-xs font-mono text-zinc-500">
              Carving engine scanning unallocated slack sectors...
            </div>
          )}

        </div>

      </div>
    </div>
  );
}