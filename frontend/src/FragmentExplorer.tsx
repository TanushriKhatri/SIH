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
  const [selectedFrag, setSelectedFrag] = useState<number | null>(0);

  const fragments: FragmentItem[] = [
    { id: 'FRG-9921', ch: '01', start: '2026-09-15 14:22:10', end: '2026-09-15 14:45:00', size: '1.2 GB', offset: '0x1A2B3C00', confidence: 98 },
    { id: 'FRG-9922', ch: '01', start: '2026-09-15 14:45:00', end: '2026-09-15 15:10:33', size: '1.4 GB', offset: '0x1A8D4F00', confidence: 95 },
    { id: 'FRG-9923', ch: '04', start: '2026-09-15 14:25:00', end: '2026-09-15 15:00:00', size: '2.1 GB', offset: '0x2B1A9900', confidence: 89 },
    { id: 'FRG-9924', ch: 'Unknown', start: 'Corrupted Timestamp', end: '---', size: '0.4 GB', offset: '0x3C88AA00', confidence: 42 },
  ];

  const active = selectedFrag !== null ? fragments[selectedFrag] : null;

  return (
    <div className="relative min-h-screen bg-[#07090e] p-4 sm:p-8 text-slate-100 font-sans select-none overflow-hidden">
      {/* Background Ambience Grid & Radial Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#131b2e15_1px,transparent_1px),linear-gradient(to_bottom,#131b2e15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6">

        {/* Tactical Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-cyan-500/20 p-6 shadow-[0_0_50px_-15px_rgba(6,182,212,0.25)]">
          {/* Subtle Top Accent Beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                  ⚡ Phase 10 // Carve Audit
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>
                  <span className="tracking-wider uppercase text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">
                    4 Slices Isolated
                  </span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
                Recovered Fragment <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.8)]">Explorer</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-mono leading-relaxed">
                Inspect reconstructed PES stream fragments, verify PTS boundaries, and evaluate forensic confidence scores before timeline splicing.
              </p>
            </div>

            <button
              onClick={() => navigate('../video-reconstruction')}
              className="group relative self-start lg:self-auto overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 p-[1px] shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(45,212,191,0.5)] active:scale-95"
            >
              <div className="flex items-center gap-2 rounded-xl bg-slate-950/90 px-6 py-3.5 transition-all duration-300 group-hover:bg-slate-950/40">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.7)] group-hover:text-white">
                  Proceed to Reconstruction
                </span>
                <span className="text-emerald-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 2-Column Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Fragment Manifest */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-slate-950/60 backdrop-blur-md border border-slate-800/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
            <div>
              {/* Manifest Bar */}
              <div className="bg-slate-900/50 px-5 py-3.5 border-b border-slate-800/80 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
                    Carved Fragment Manifest
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  {fragments.length} SLICES CACHED
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/70 bg-slate-950/40 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      <th className="py-3.5 px-5">Fragment ID</th>
                      <th className="py-3.5 px-4">Channel</th>
                      <th className="py-3.5 px-4">Start Bound (UTC)</th>
                      <th className="py-3.5 px-5 text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 font-mono text-xs">
                    {fragments.map((f, i) => {
                      const isSelected = selectedFrag === i;
                      const isHigh = f.confidence > 90;
                      const isMed = f.confidence > 70 && f.confidence <= 90;

                      return (
                        <tr
                          key={f.id}
                          onClick={() => setSelectedFrag(i)}
                          className={`cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'bg-cyan-950/30 border-l-4 border-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]'
                              : 'hover:bg-slate-900/40 border-l-4 border-transparent'
                          }`}
                        >
                          <td className="py-4 px-5 font-semibold">
                            <span
                              className={`inline-block px-2.5 py-1 rounded border transition-all ${
                                isSelected
                                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.35)]'
                                  : 'bg-slate-900/80 text-cyan-400 border-slate-800'
                              }`}
                            >
                              {f.id}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                                f.ch === 'Unknown'
                                  ? 'bg-rose-950/40 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                                  : 'bg-slate-900 text-slate-300 border border-slate-800'
                              }`}
                            >
                              {f.ch === 'Unknown' ? 'UNKNOWN' : `CH ${f.ch}`}
                            </span>
                          </td>

                          <td className="py-4 px-4 font-mono">
                            {f.start === 'Corrupted Timestamp' ? (
                              <span className="text-rose-400 font-sans italic drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                                ⚠ Corrupted Timestamp
                              </span>
                            ) : (
                              <span className="text-slate-300">{f.start}</span>
                            )}
                          </td>

                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-slate-800">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isHigh
                                      ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                                      : isMed
                                      ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                                      : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                                  }`}
                                  style={{ width: `${f.confidence}%` }}
                                />
                              </div>
                              <span
                                className={`font-bold tabular-nums ${
                                  isHigh
                                    ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                                    : isMed
                                    ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]'
                                    : 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                                }`}
                              >
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

            {/* Manifest Footer */}
            <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400">▶</span> Click slice to mount data buffer
              </span>
              <span className="text-slate-400 uppercase tracking-widest">FORMAT: PES / PTS-SYNC</span>
            </div>
          </div>

          {/* Right Column: Forensic Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-slate-950/70 backdrop-blur-md border border-slate-800/80 p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Forensic Telemetry Inspector
                  </h3>
                </div>
                {active && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300/80 shadow-[0_0_10px_rgba(251,191,36,0.15)]">
                    SECTOR: 512B
                  </span>
                )}
              </div>

              {active ? (
                <div className="space-y-3.5">
                  {/* ID & Offset Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Active Node ID
                      </span>
                      <span className="font-mono text-xl font-black text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                        {active.id}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Physical LBA Offset
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-200 block truncate">
                        {active.offset}
                      </span>
                    </div>
                  </div>

                  {/* Size & Channel Target */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Recovered Size
                      </span>
                      <span className="font-mono text-base font-bold text-white">
                        {active.size}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Channel Target
                      </span>
                      <span
                        className={`font-mono text-sm font-bold block ${
                          active.ch === 'Unknown'
                            ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                            : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                        }`}
                      >
                        {active.ch === 'Unknown' ? 'Orphaned Slice' : `Camera CH ${active.ch}`}
                      </span>
                    </div>
                  </div>

                  {/* Timestamp Bounds */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-2 font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      Presentation Temporal Span
                    </span>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">START:</span>
                      <span
                        className={
                          active.start === 'Corrupted Timestamp'
                            ? 'text-rose-400 font-sans italic drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                            : 'text-slate-100 font-semibold'
                        }
                      >
                        {active.start}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">END:</span>
                      <span className="text-slate-100 font-semibold">{active.end}</span>
                    </div>
                  </div>

                  {/* Hex Header Signature Preview */}
                  <div className="p-3.5 rounded-xl bg-black/80 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)] flex flex-col gap-2 font-mono">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-slate-400">
                      <span>Stream Magic Signature</span>
                      <span className="text-emerald-400 font-bold">PARSED</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs flex-wrap font-bold">
                      <span className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">{active.offset}:</span>
                      <span className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">44 48 41 56</span>
                      <span className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">00 00 01 BA</span>
                      <span className="text-slate-400">E0 01</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
                  <div className="w-10 h-10 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-sm font-mono text-cyan-400">
                    Ø
                  </div>
                  <p className="text-xs font-mono max-w-[220px]">
                    Select a fragment row from the list to display forensic details.
                  </p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <button
                disabled={!active}
                className="w-full relative overflow-hidden py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-cyan-950/40 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                Preview Full Hex Dump
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}