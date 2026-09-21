import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RecordingMetadata {
  ch: string;
  start: string;
  end: string;
  res: string;
  fps: number;
  status: 'Active' | 'Archived' | 'Damaged';
  size: string;
}

export default function MetadataExtraction(): React.JSX.Element {
  const [extracting, setExtracting] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setExtracting(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const mockRecordings: RecordingMetadata[] = [
    { ch: '01', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1920x1080', fps: 15, status: 'Active', size: '142 GB' },
    { ch: '02', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1920x1080', fps: 15, status: 'Active', size: '150 GB' },
    { ch: '03', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1280x720', fps: 30, status: 'Active', size: '95 GB' },
    { ch: '04', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1280x720', fps: 30, status: 'Active', size: '98 GB' },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none">

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 08 / Inode Ingestion
              </span>
              <span className="text-sm text-zinc-300 font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${extracting ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {extracting ? 'UNPACKING INDEX TIMESTAMPS...' : 'METADATA EXTRACTED'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Recording & Metadata Extraction
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              De-serializing channel stream headers, frame-rates, resolution profiles, and temporal bounds from parsed index maps.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-xs bg-zinc-950/90 border border-zinc-800 px-4 py-2.5 rounded-xl self-start sm:self-auto">
            <span className="text-zinc-400 uppercase tracking-wider">Channel Status</span>
            <span className="text-emerald-400 font-bold text-sm">16 / 16 PARSED</span>
            <span className="text-zinc-400">Time-Index Synchronized</span>
          </div>
        </div>
      </div>

      {/* Main Metadata Panel */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col gap-5">

        {extracting ? (
          /* Live Extraction Loader */
          <div className="flex flex-col items-center justify-center py-16 gap-4 bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-zinc-800 rounded-full" />
              <div className="w-12 h-12 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin absolute inset-0" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-sm sm:text-base font-bold text-zinc-100 font-mono">
                Extracting Time-Index Extents...
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Parsing frame headers, FPS signatures, and stream boundaries
              </span>
            </div>
          </div>
        ) : (
          /* Extracted Data Dashboard */
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">

            {/* Table Header Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Extracted Channel Sessions
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-zinc-400">TOTAL IDENTIFIED:</span>
                <span className="text-cyan-300 font-bold bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                  16 CHANNELS (485 GB ACTIVE)
                </span>
              </div>
            </div>

            {/* High-Contrast Forensic Table */}
            <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/80">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Stream Start (UTC)</th>
                    <th className="py-3 px-4">Stream End (UTC)</th>
                    <th className="py-3 px-4">Resolution</th>
                    <th className="py-3 px-4">Frame Rate</th>
                    <th className="py-3 px-4">Allocated Size</th>
                    <th className="py-3 px-4 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 font-mono">
                  {mockRecordings.map((r, i) => (
                    <tr key={i} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-cyan-400">
                        <span className="bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                          CH {r.ch}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-300 font-mono text-xs">{r.start}</td>
                      <td className="py-3.5 px-4 text-zinc-300 font-mono text-xs">{r.end}</td>
                      <td className="py-3.5 px-4 font-semibold text-zinc-200">{r.res}</td>
                      <td className="py-3.5 px-4 text-zinc-300">{r.fps} FPS</td>
                      <td className="py-3.5 px-4 font-bold text-zinc-100">{r.size}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-zinc-950/40 text-zinc-500 text-xs font-mono">
                    <td colSpan={7} className="py-3 px-4 text-center">
                      + 12 additional camera channels indexed and verified in session ledger
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tactical Recovery Warning & CTA */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-950/30 via-zinc-950 to-amber-950/20 border-2 border-amber-500/40 p-5 mt-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 shadow-xl shadow-amber-950/20">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-amber-500/20">
                  !
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-amber-300 uppercase tracking-tight">
                      Deleted / Overwritten Video Fragments Detected
                    </h4>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                      SLACK GAP DETECTED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                    Index analysis revealed 398 GB of expired metadata pointers and orphaned stream sectors. Launch deep carved recovery to salvage unindexed frame chunks.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('../recovery-engine')}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Launch Recovery Engine →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}