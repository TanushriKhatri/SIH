import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoReconstruction(): React.JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 10;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const isCompleted = progress >= 100;
  const framesProcessed = Math.floor((progress / 100) * 18450);

  const gopFrames = [
    { num: 'FRM_00', type: 'IDR', desc: 'Keyframe Anchor' },
    { num: 'FRM_15', type: 'P-Frame', desc: 'Motion Delta' },
    { num: 'FRM_30', type: 'P-Frame', desc: 'Motion Delta' },
    { num: 'FRM_45', type: 'B-Frame', desc: 'Bidirectional' },
    { num: 'FRM_60', type: 'P-Frame', desc: 'Motion Delta' },
    { num: 'FRM_75', type: 'IDR', desc: 'Next Keyframe' }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 11 / Stream Re-assembly
              </span>
              <span className="text-sm text-zinc-300 font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                {isCompleted ? 'PIPELINE LOCKED' : `REMUXING STREAM (${progress}%)`}
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              Video Reconstruction
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Sequencing carved NAL units, filling PTS gaps, resolving timestamp collisions, and muxing raw H.264 bitstreams into forensic MP4 containers.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/90 border border-zinc-800 px-4 py-3 rounded-xl font-mono text-sm self-start sm:self-auto">
            <div>
              <span className="text-xs text-zinc-400 uppercase block font-semibold">Frames Muxed</span>
              <span className="text-cyan-400 font-bold text-base">{framesProcessed.toLocaleString()}</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div>
              <span className="text-xs text-zinc-400 uppercase block font-semibold">Target Codec</span>
              <span className="text-emerald-400 font-bold text-base">H.264 / AVC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reconstruction Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column: GOP Frame Pipeline & Filmstrip View (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xl">

          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <span className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-rose-500 animate-pulse'}`} />
              GOP Sequence Reconstitution (CH 01)
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 font-semibold">
              1080P @ 15 FPS
            </span>
          </div>

          {/* OSD Status Bar */}
          <div className="flex justify-between items-center bg-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-rose-400 font-bold uppercase tracking-wide">
                {isCompleted ? 'REASSEMBLED' : 'ACTIVE_MUXING'}
              </span>
            </div>
            <span className="text-zinc-300">2026-09-15 14:38:22 UTC</span>
            <span className="text-cyan-400 font-semibold">PTS +00:16:12.440</span>
          </div>

          {/* Filmstrip Frame Pipeline Cards */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Keyframe Anchor & Motion Delta Stitching
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {gopFrames.map((frame, idx) => {
                const isStitched = ((idx + 1) / 6) * 100 <= progress;
                const isKeyframe = frame.type === 'IDR';

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col justify-between gap-1 text-center font-mono transition-all duration-300 ${isStitched
                        ? isKeyframe
                          ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950/40'
                          : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                        : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-500'
                      }`}
                  >
                    <span className="text-xs text-zinc-400 font-semibold">{frame.num}</span>
                    <span className={`text-sm font-black ${isStitched
                        ? isKeyframe ? 'text-emerald-400' : 'text-cyan-300'
                        : 'text-zinc-500'
                      }`}>
                      {frame.type}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-sans truncate" title={frame.desc}>
                      {isStitched ? frame.desc : 'Waiting...'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Linear Progress Indicator */}
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">PTS Timeline Alignment</span>
                <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold'}>
                  {progress}% Synced
                </span>
              </div>
              <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Metric Bar */}
          <div className="grid grid-cols-3 gap-3 text-center font-mono pt-1">
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-xs text-zinc-400 uppercase block font-semibold">Bitrate</span>
              <span className="text-base font-bold text-zinc-100">4,120 kbps</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-xs text-zinc-400 uppercase block font-semibold">GOP Size</span>
              <span className="text-base font-bold text-cyan-400">M=3, N=15</span>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-xs text-zinc-400 uppercase block font-semibold">State</span>
              <span className={`text-base font-bold ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isCompleted ? 'LOCKED' : 'MUXING'}
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Dial Progress & Diagnostics Log (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xl">

          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <span className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
              Reconstruction Diagnostics
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Pass 01 / 01
            </span>
          </div>

          {/* Circular Progress Display */}
          <div className="flex items-center gap-5 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={isCompleted ? '#10b981' : '#06b6d4'}
                  strokeWidth="8"
                  strokeDasharray={`${progress * 2.64} 264`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-mono font-black text-white">{progress}%</span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">
                  {isCompleted ? 'DONE' : 'BUILD'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-sm sm:text-base font-bold text-zinc-100">
                {isCompleted ? 'Bitstream Packaging Finished' : 'De-duplicating Stream Slices'}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {isCompleted
                  ? 'Carved MPEG-PS chunks sanitized into standard MP4 containers with verified timestamps.'
                  : 'Resolving sector overlaps, marking time gaps, and writing container atom headers.'}
              </p>
            </div>
          </div>

          {/* Terminal Console Feed with Clear Line Height */}
          <div className="bg-black/95 border border-zinc-800 rounded-xl p-4 font-mono text-xs sm:text-sm h-48 overflow-hidden flex flex-col justify-end shadow-inner relative">
            <div className="space-y-2 text-zinc-300">
              <div className="text-zinc-500 font-semibold">// FORENSIC MULTIPLEXER ENGINE</div>
              {progress > 10 && (
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span>Reassembling sequence: CH01_15_1422...</span>
                </div>
              )}
              {progress > 30 && (
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span>Resolving overlap (Block 1A2B vs 1A2C)...</span>
                </div>
              )}
              {progress > 50 && (
                <div className="text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/40 flex items-center gap-2">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Detected 4s gap in CH01. Marking discontinuity...</span>
                </div>
              )}
              {progress > 70 && (
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span>Wrapping container (H.264 &rarr; MP4)...</span>
                </div>
              )}
              {progress >= 100 && (
                <div className="text-emerald-300 font-bold bg-emerald-950/50 px-2.5 py-1.5 rounded border border-emerald-500/50 flex items-center gap-2 mt-1">
                  <span>✓</span>
                  <span>Reconstruction complete. 12 files generated.</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button Row */}
          {isCompleted ? (
            <div className="pt-3 border-t border-zinc-800 flex justify-end animate-in fade-in duration-300">
              <button
                onClick={() => navigate('../recovery-validation')}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                Validate Recovered Video →
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-zinc-800 text-right text-xs font-mono text-zinc-500">
              Muxing PES stream into MP4 container...
            </div>
          )}

        </div>

      </div>
    </div>
  );
}