import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ParserSubsystem {
  name: string;
  subsystem: string;
  doneLabel: string;
}

export default function VendorParser(): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const subsystems: ParserSubsystem[] = [
    {
      name: 'Format-specific signature dictionaries',
      subsystem: 'SIG_TABLE',
      doneLabel: 'LOADED'
    },
    {
      name: 'DHFS partition & block structure definitions',
      subsystem: 'BLK_MAP',
      doneLabel: 'LOADED'
    },
    {
      name: 'Inode & timestamp metadata translation matrix',
      subsystem: 'META_LUT',
      doneLabel: 'MAPPED'
    },
    {
      name: 'Video-data stream decoders (H.264 / H.265 / HEVC)',
      subsystem: 'CODEC_ENG',
      doneLabel: 'READY'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 06 / Parser Binding
              </span>
              <span className="text-sm text-zinc-300 font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {loading ? 'INITIALIZING DECODER...' : 'SUBSYSTEMS ARMED'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Vendor-Specific Parser Selection
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Instantiating Dahua DHFS specialized schema parser, stream demuxers, and codec decoders for frame extraction.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-xs bg-zinc-950/90 border border-zinc-800 px-4 py-2.5 rounded-xl self-start sm:self-auto">
            <span className="text-zinc-400 uppercase tracking-wider">Target Profile</span>
            <span className="text-cyan-400 font-bold text-sm">DAHUA_DHFS_V4</span>
            <span className="text-zinc-400">Strict Forensic Mode</span>
          </div>
        </div>
      </div>

      {/* Main Parser Panel */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col gap-5">

        {/* Module Spec Banner */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-base shrink-0 shadow-inner">
              DH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Dahua DHFS Parser Module
                </h3>
                <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-semibold">
                  v2.4.1
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Proprietary File-System Engine • H.264 / H.265 Frame Carving Pipeline
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
            <span>ISOLATION:</span>
            <span className="text-emerald-400 font-semibold">SANDBOXED</span>
          </div>
        </div>

        {/* Subsystem Pipeline Rows */}
        <div className="flex flex-col gap-2.5">
          {subsystems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-300 ${loading
                  ? 'border-zinc-800 bg-zinc-950/50'
                  : 'border-emerald-500/30 bg-zinc-950/80 shadow-md shadow-black/20'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center font-bold transition-colors ${loading
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                  {loading ? '…' : '✓'}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <span className={`text-sm sm:text-base font-medium tracking-tight ${loading ? 'text-zinc-300' : 'text-zinc-100'
                    }`}>
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    [{item.subsystem}]
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 pl-2">
                {loading ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    COMPILING
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.doneLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Row */}
        {!loading && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-zinc-800 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>All 4 kernel routines bound to Dahua stream un-packer.</span>
            </div>

            <button
              onClick={() => navigate('../storage-structure')}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-sm uppercase tracking-wider px-7 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Begin Storage Analysis →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}