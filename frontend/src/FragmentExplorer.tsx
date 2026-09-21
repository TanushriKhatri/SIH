import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FragmentItem {
  id: string;
  ch: string;
  start: string;
  end: string;
  size: string;
  offset: string;
  confidence: number;
}

export default function FragmentExplorer(): React.JSX.Element {
  const navigate = useNavigate();
  const [selectedFrag, setSelectedFrag] = useState<number | null>(null);

  const fragments: FragmentItem[] = [
    { id: 'FRG-9921', ch: '01', start: '2026-09-15 14:22:10', end: '2026-09-15 14:45:00', size: '1.2 GB', offset: '0x1A2B3C00', confidence: 98 },
    { id: 'FRG-9922', ch: '01', start: '2026-09-15 14:45:00', end: '2026-09-15 15:10:33', size: '1.4 GB', offset: '0x1A8D4F00', confidence: 95 },
    { id: 'FRG-9923', ch: '04', start: '2026-09-15 14:25:00', end: '2026-09-15 15:00:00', size: '2.1 GB', offset: '0x2B1A9900', confidence: 89 },
    { id: 'FRG-9924', ch: 'Unknown', start: 'Corrupted Timestamp', end: '---', size: '0.4 GB', offset: '0x3C88AA00', confidence: 42 },
  ];

  const active = selectedFrag !== null ? fragments[selectedFrag] : null;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4 text-zinc-100 font-sans select-none">

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 10 / Carve Audit
              </span>
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                4 CARVED SLICES ISOLATED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Recovered Fragment Explorer
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
              Inspect reconstructed PES stream fragments, verify PTS boundaries, and evaluate forensic confidence scores before timeline splicing.
            </p>
          </div>

          <button
            onClick={() => navigate('../video-reconstruction')}
            className="self-start sm:self-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Proceed to Reconstruction →
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Left Column: Fragment List Table (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-zinc-950/80 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Carved Fragment Manifest
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {fragments.length} Slices Cached
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-zinc-950 text-zinc-300 font-mono uppercase text-xs border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Fragment ID</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Start Bound (UTC)</th>
                    <th className="py-3 px-4 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 font-mono">
                  {fragments.map((f, i) => {
                    const isSelected = selectedFrag === i;
                    const isHigh = f.confidence > 90;
                    const isMed = f.confidence > 70 && f.confidence <= 90;

                    return (
                      <tr
                        key={i}
                        onClick={() => setSelectedFrag(i)}
                        className={`cursor-pointer transition-all duration-150 ${isSelected
                          ? 'bg-cyan-950/40 border-l-4 border-l-cyan-400'
                          : 'hover:bg-zinc-800/50'
                          }`}
                      >
                        <td className="py-3.5 px-4 font-bold">
                          <span className={`px-2.5 py-1 rounded text-sm ${isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-cyan-400'
                            }`}>
                            {f.id}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded text-xs font-semibold ${f.ch === 'Unknown'
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            : 'bg-zinc-800 text-zinc-200'
                            }`}>
                            {f.ch === 'Unknown' ? 'UNKNOWN' : `CH ${f.ch}`}
                          </span>
                        </td>
                        <td className={`py-3.5 px-4 text-sm ${f.start === 'Corrupted Timestamp' ? 'text-rose-400 font-sans italic' : 'text-zinc-200'
                          }`}>
                          {f.start}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${isHigh ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' :
                                  isMed ? 'bg-amber-400' :
                                    'bg-rose-500'
                                  }`}
                                style={{ width: `${f.confidence}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold ${isHigh ? 'text-emerald-400' : isMed ? 'text-amber-300' : 'text-rose-400'
                              }`}>
                              {f.confidence}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-4 py-3 bg-zinc-950/60 border-t border-zinc-800 text-xs font-mono text-zinc-400 flex justify-between items-center">
            <span>Click any fragment row to populate forensic inspector.</span>
            <span>INDEX: PTS/DTS</span>
          </div>
        </div>

        {/* Right Column: Forensic Fragment Inspector (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
                  Forensic Inspector
                </h3>
              </div>
              {active && (
                <span className="text-xs font-mono bg-zinc-950 border border-zinc-800 px-2.5 py-0.5 rounded text-zinc-300">
                  SECTOR: 512B
                </span>
              )}
            </div>

            {active ? (
              <div className="flex flex-col gap-3.5 animate-in fade-in duration-200">

                {/* ID & Offset Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-0.5">Fragment ID</span>
                    <span className="font-mono text-lg font-bold text-cyan-400">{active.id}</span>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-0.5">Physical LBA Offset</span>
                    <span className="font-mono text-sm font-bold text-zinc-200">{active.offset}</span>
                  </div>
                </div>

                {/* Size & Channel */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-0.5">Recovered Size</span>
                    <span className="font-mono text-base font-bold text-white">{active.size}</span>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-0.5">Channel Target</span>
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {active.ch === 'Unknown' ? 'Orphaned Slice' : `Camera CH ${active.ch}`}
                    </span>
                  </div>
                </div>

                {/* Timestamp Bounds */}
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 flex flex-col gap-1.5 font-mono text-sm">
                  <span className="text-xs uppercase text-zinc-400">Presentation Temporal Span</span>
                  <div className="flex justify-between items-center text-zinc-300 pt-0.5">
                    <span className="text-xs text-zinc-400">START:</span>
                    <span className={active.start === 'Corrupted Timestamp' ? 'text-rose-400 italic font-sans' : 'text-zinc-100 font-semibold'}>
                      {active.start}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="text-xs text-zinc-400">END:</span>
                    <span className="text-zinc-100 font-semibold">{active.end}</span>
                  </div>
                </div>

                {/* Mini Hex Header Signature Preview */}
                <div className="bg-black/90 p-3 rounded-xl border border-zinc-800/80 font-mono text-xs flex flex-col gap-1.5">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">Stream Header Magic</span>
                  <div className="flex items-center gap-2.5 text-zinc-300 font-medium">
                    <span className="text-cyan-400 font-bold">{active.offset}:</span>
                    <span className="text-emerald-400 font-bold">44 48 41 56</span>
                    <span className="text-amber-400">00 00 01 BA</span>
                    <span className="text-zinc-500">E0 01</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-2.5 text-zinc-400">
                <div className="w-9 h-9 rounded-full border border-dashed border-zinc-700 flex items-center justify-center text-sm font-mono">
                  ?
                </div>
                <p className="text-xs sm:text-sm font-mono max-w-[220px]">
                  Select a fragment row from the list to display forensic details.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <button
              disabled={!active}
              className="w-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-zinc-200 py-2.5 rounded-xl transition-colors text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer disabled:cursor-not-allowed border border-zinc-700/60"
            >
              Preview Full Hex Dump
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}