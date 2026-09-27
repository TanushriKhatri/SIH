import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EvidenceIndexItem {
  timestamp: string;
  channel: string;
  event: string;
  confidence: number;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  evidenceHash: string;
}

export default function EvidenceIntelligenceIndex(): React.JSX.Element {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId?: string }>();
  const activeCase = caseId || 'CASE-001';

  const [evidenceList] = useState<EvidenceIndexItem[]>([
    {
      timestamp: '02:10:15 → 02:26:34',
      channel: 'CH-02',
      event: 'Multiple persons crowd detected in restricted sector',
      confidence: 96.4,
      threatLevel: 'CRITICAL',
      evidenceHash: '0x8F9A…21D4'
    },
    {
      timestamp: '03:05:10 → 03:12:35',
      channel: 'CH-05',
      event: 'Multiple persons & vehicle detected near perimeter gate',
      confidence: 98.1,
      threatLevel: 'CRITICAL',
      evidenceHash: '0x3C41…88E1'
    },
    {
      timestamp: '04:18:40 → 04:25:00',
      channel: 'CH-01',
      event: 'Unidentified thermal motion anomaly in secure corridor',
      confidence: 92.5,
      threatLevel: 'ELEVATED',
      evidenceHash: '0x77B0…A519'
    },
    {
      timestamp: '05:42:00 → 05:50:12',
      channel: 'CH-08',
      event: 'Vehicle transit detected without license plate match',
      confidence: 94.8,
      threatLevel: 'HIGH',
      evidenceHash: '0x19DF…CC04'
    },
    {
      timestamp: '06:15:30 → 06:22:45',
      channel: 'CH-04',
      event: 'Forced entry vibration signature & subject loitering',
      confidence: 97.3,
      threatLevel: 'CRITICAL',
      evidenceHash: '0xEE34…99A2'
    },
    {
      timestamp: '07:01:12 → 07:10:00',
      channel: 'CH-12',
      event: 'Multiple persons carrying heavy equipment containers',
      confidence: 99.0,
      threatLevel: 'HIGH',
      evidenceHash: '0x551A…FB87'
    }
  ]);

  const handleNavigateToDetailedAI = () => {
    navigate(`/case/${activeCase}/ai-investigation`);
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 font-sans select-none pb-16 relative overflow-hidden">
      
      {/* Dynamic Cyber Aurora Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-cyan-600/20 via-indigo-600/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-tl from-emerald-500/15 via-teal-500/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-6 relative z-10">

        {/* Hero Cyber Header Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0c1220]/95 via-[#0e1628]/90 to-[#0c1424]/95 border border-cyan-500/30 p-8 shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  PHASE 18 • MASTER INTELLIGENCE
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  CRYPTOGRAPHIC CHAIN VERIFIED
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                Evidence Intelligence Index
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
                Centralized forensic matrix indexing all candidate timeline anomalies. Pre-extracted vectors and event clusters are verified across camera channels below CH-16.
              </p>
            </div>

            {/* Top Quick Dispatch Button */}
            <button
              onClick={handleNavigateToDetailedAI}
              className="group relative self-start lg:self-auto overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 p-[1px] font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 px-7 py-4 text-slate-950 flex items-center gap-3 font-extrabold group-hover:brightness-105 transition-all">
                <span>Detailed AI Investigation</span>
                <span className="group-hover:translate-x-1.5 transition-transform text-sm">→</span>
              </div>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-cyan-500/20 font-mono text-xs">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Active Channels</span>
              <span className="text-xl font-black text-cyan-300 mt-0.5">6 Feeds (<span className="text-cyan-400">CH-01–12</span>)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Critical Threats</span>
              <span className="text-xl font-black text-rose-400 mt-0.5">3 Incidents</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Mean AI Accuracy</span>
              <span className="text-xl font-black text-emerald-400 mt-0.5">96.35%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Vector Cache Hit</span>
              <span className="text-xl font-black text-indigo-400 mt-0.5">100% (Instant)</span>
            </div>
          </div>
        </div>

        {/* Enhanced Table Matrix */}
        <div className="rounded-3xl bg-[#0b101c]/90 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
          <div className="p-6 border-b border-slate-800/80 bg-gradient-to-r from-[#0d1424] to-[#090d16] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <h2 className="text-sm font-bold tracking-wider uppercase font-mono text-white">
                Chronological Observation Ledger
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Ledger Standard:</span>
              <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                ISO-8601 UTC
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#070b13] text-slate-400 uppercase tracking-widest text-[11px] border-b border-slate-800/90">
                <tr>
                  <th className="py-5 px-6 font-bold text-cyan-300">Timestamp Interval</th>
                  <th className="py-5 px-6 font-bold text-indigo-300">Channel ID</th>
                  <th className="py-5 px-6 font-bold text-slate-300">Detected Event Description</th>
                  <th className="py-5 px-6 font-bold text-center">Threat Level</th>
                  <th className="py-5 px-6 font-bold text-right text-emerald-300">AI Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {evidenceList.map((item, idx) => {
                  const isCritical = item.threatLevel === 'CRITICAL';
                  const isHigh = item.threatLevel === 'HIGH';

                  return (
                    <tr 
                      key={idx}
                      className="hover:bg-gradient-to-r hover:from-cyan-950/20 hover:via-indigo-950/10 hover:to-transparent transition-all group cursor-pointer"
                    >
                      {/* Timestamp with Neon Accent */}
                      <td className="py-4 px-6 font-mono text-xs whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                          <span className="text-cyan-200 font-bold bg-[#0f172a] px-3 py-1.5 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400/70 transition-colors">
                            {item.timestamp}
                          </span>
                        </div>
                      </td>

                      {/* Channel Pill (strictly < CH-16) */}
                      <td className="py-4 px-6 font-mono text-xs whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/40 text-indigo-300 font-black px-3 py-1.5 rounded-lg group-hover:border-indigo-400 transition-colors shadow-sm">
                          <span className="text-[10px] text-indigo-400">CAM</span>
                          {item.channel}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-slate-100 font-semibold text-sm group-hover:text-cyan-200 transition-colors">
                            {item.event}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500">
                            Hash Identifier: {item.evidenceHash}
                          </span>
                        </div>
                      </td>

                      {/* Threat Level */}
                      <td className="py-4 px-6 whitespace-nowrap text-center font-mono">
                        <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border ${
                          isCritical
                            ? 'bg-rose-950/50 text-rose-300 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                            : isHigh
                            ? 'bg-amber-950/50 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                            : 'bg-teal-950/50 text-teal-300 border-teal-500/50'
                        }`}>
                          {item.threatLevel}
                        </span>
                      </td>

                      {/* Confidence Score with micro progress gauge */}
                      <td className="py-4 px-6 text-right whitespace-nowrap font-mono">
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {item.confidence.toFixed(1)}%
                          </span>
                          <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full"
                              style={{ width: `${item.confidence}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Catchy & Bold "Cached All Observations" Bottom Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#0e1628] to-cyan-950/70 border-2 border-cyan-400/50 p-7 sm:p-8 shadow-[0_0_50px_-10px_rgba(6,182,212,0.4)] backdrop-blur-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-500 text-slate-950 flex items-center justify-center text-2xl font-black shrink-0 shadow-[0_0_25px_rgba(34,211,238,0.6)]">
              ⚡
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                ZERO-LATENCY TENSOR CACHE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 uppercase tracking-tight font-mono">
                Cached All Observations For Reuse
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5 leading-relaxed">
                Extracted spatial bounding boxes and behavioral vectors are resident in memory. Instant cross-camera timeline re-indexing enabled.
              </p>
            </div>
          </div>

          <button
            onClick={handleNavigateToDetailedAI}
            className="w-full md:w-auto bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:brightness-110 active:scale-[0.98] text-slate-950 font-black font-mono text-xs uppercase tracking-wider px-9 py-4 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-3 shrink-0 group"
          >
            <span>Launch Detailed AI Investigation</span>
            <span className="group-hover:translate-x-1.5 transition-transform text-sm">→</span>
          </button>
        </div>

      </main>
    </div>
  );
}