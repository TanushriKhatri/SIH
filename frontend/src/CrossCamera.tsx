import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Finding {
  id: string;
  time: string;
  ch: string;
  cameraName: string;
  obj: 'Person' | 'Backpack' | 'Vehicle';
  conf: number;
  desc: string;
  isRecoveredGap?: boolean;
}

export default function CrossCamera(): React.JSX.Element {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'recovered'>('all');
  const [progress, setProgress] = useState<number>(18);
  const [selectedFinding, setSelectedFinding] = useState<string>('AI-003');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 14 : prev));
    }, 400);

    const timer = setTimeout(() => {
      setAnalyzing(false);
      clearInterval(interval);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const findings: Finding[] = [
    {
      id: 'AI-001',
      time: '14:26:30 UTC',
      ch: 'CH04',
      cameraName: 'Lobby Entrance',
      obj: 'Person',
      conf: 92,
      desc: 'Subject entered frame from North quadrant and traversed towards interior vestibule.',
    },
    {
      id: 'AI-002',
      time: '14:27:15 UTC',
      ch: 'CH04',
      cameraName: 'Lobby Entrance',
      obj: 'Backpack',
      conf: 88,
      desc: 'Object separation anomaly: black backpack detached from Person track ID #104.',
    },
    {
      id: 'AI-003',
      time: '14:31:05 UTC',
      ch: 'CH01',
      cameraName: 'Perimeter Gate',
      obj: 'Person',
      conf: 85,
      desc: 'Subject detected in restored slack fragment (FRG-9921) after 3m 14s temporal gap.',
      isRecoveredGap: true,
    },
  ];

  const filteredFindings = findings.filter((item) => {
    if (activeTab === 'critical') return item.conf >= 90 || item.isRecoveredGap;
    if (activeTab === 'recovered') return item.isRecoveredGap;
    return true;
  });

  const activeFindingData = findings.find((f) => f.id === selectedFinding) || findings[2];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none pb-8">

      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Phase 16 / Spatial Trajectory Mapping
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${analyzing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {analyzing ? 'CORRELATING CAMERA NODES...' : 'INTER-CAMERA TRAJECTORY LINKED'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Cross-Camera Spatial Correlation
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Re-identifying suspect vectors, tracking transit time across camera blindspots, and reconciling excavated slack fragments into a unified movement corridor.
            </p>
          </div>

          {!analyzing && (
            <button
              onClick={() => navigate('../evidence-validation')}
              className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              Proceed to Evidence Validation →
            </button>
          )}
        </div>
      </div>

      {/* 2. Loading State */}
      {analyzing ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

          {/* Dual Reticle Linking Animation */}
          <div className="relative w-40 h-20 flex items-center justify-between px-4">
            <div className="w-12 h-12 rounded-xl border border-indigo-500/60 bg-indigo-950/40 flex items-center justify-center font-mono text-xs font-bold text-indigo-300">
              CH04
            </div>
            <div className="flex-1 h-0.5 border-t border-dashed border-teal-400/80 animate-pulse mx-2 relative">
              <div className="w-2 h-2 rounded-full bg-teal-400 absolute -top-[3px] left-1/2 -translate-x-1/2 animate-ping" />
            </div>
            <div className="w-12 h-12 rounded-xl border border-amber-500/60 bg-amber-950/40 flex items-center justify-center font-mono text-xs font-bold text-amber-300">
              CH01
            </div>
          </div>

          <div className="text-center z-10 max-w-md">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Calculating Inter-Camera Re-ID Vector
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
              Evaluating transit velocity between CH04 (Lobby) and CH01 (Gate). Bridging the 3m 50s gap using carved evidence.
            </p>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 z-10 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Feature Embedding & Re-ID Matching</span>
              <span className="text-teal-400 font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-500">
              <span>Embedding Cosine Match: 0.914</span>
              <span>Blindspot Drift: Reconciled</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">

          {/* 3. Top Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Correlated Nodes</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-400 mt-1">02 Feeds</span>
              <span className="text-[11px] text-zinc-500">CH04 (Lobby) ↔ CH01 (Gate)</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Transit Delta</span>
              <span className="text-2xl sm:text-3xl font-black text-teal-400 mt-1">03m 50s</span>
              <span className="text-[11px] text-zinc-500">Walking speed compatible</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Subject Re-ID Match</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">91.4%</span>
              <span className="text-[11px] text-zinc-500">Torso & Silhouette Match</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Slack Bridge Status</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">Connected</span>
              <span className="text-[11px] text-zinc-500">Validated via FRG-9921</span>
            </div>
          </div>

          {/* 4. Spatial Trajectory Visualizer */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Cross-Camera Movement Corridor
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Spatial sequence tracking Subject #104 moving between physical camera zones.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                Spatial Path: Interior ➔ North Corridor ➔ Perimeter Gate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Point A */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-indigo-400 font-bold uppercase">Node A: CH04 (Lobby)</span>
                  <span className="text-zinc-500">14:26:30 UTC</span>
                </div>
                <div className="text-sm font-bold text-white">Entry & Discard Event</div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Subject enters frame carrying backpack. Detaches object at 14:27:15 UTC before exiting east hallway towards exterior exit.
                </p>
                <div className="text-[11px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded border border-indigo-500/20 mt-auto">
                  Confidence: 92% • Track #104
                </div>
              </div>

              {/* Transit Zone */}
              <div className="bg-zinc-950/80 border border-dashed border-zinc-700/80 rounded-xl p-4 flex flex-col gap-2 relative">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-amber-400 font-bold uppercase">Blindspot Zone</span>
                  <span className="text-amber-400">Δ 03m 50s</span>
                </div>
                <div className="text-sm font-bold text-zinc-200">Unmonitored Passage</div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Distance: 185 meters through non-surveilled utility service stairwell. Expected transit window: 3m 15s to 4m 30s.
                </p>
                <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-500/20 mt-auto">
                  Physics Validated • Transit Normal
                </div>
              </div>

              {/* Point B */}
              <div className="bg-zinc-950/80 border border-amber-500/40 rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-amber-400 font-bold uppercase">Node B: CH01 (Gate)</span>
                  <span className="text-zinc-500">14:31:05 UTC</span>
                </div>
                <div className="text-sm font-bold text-white">Carved Gap Re-Identification</div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Subject reappears on perimeter camera without backpack. Discovered exclusively within restored deleted slack segment (FRG-9921).
                </p>
                <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20 mt-auto">
                  Re-ID Match: 91.4% • Carved Gap
                </div>
              </div>
            </div>
          </div>

          {/* 5. Correlated Findings Table & Inspector Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Table (7 Cols) */}
            <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/80">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Correlated Event Evidence
                  </h3>
                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-lg text-xs font-mono">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-2.5 py-0.5 rounded ${activeTab === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab('critical')}
                      className={`px-2.5 py-0.5 rounded ${activeTab === 'critical' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-zinc-400'}`}
                    >
                      Critical
                    </button>
                    <button
                      onClick={() => setActiveTab('recovered')}
                      className={`px-2.5 py-0.5 rounded ${activeTab === 'recovered' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-zinc-400'}`}
                    >
                      Carved
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead className="bg-zinc-950 text-zinc-400 uppercase text-[11px] border-b border-zinc-800">
                      <tr>
                        <th className="py-2.5 px-3.5">ID</th>
                        <th className="py-2.5 px-3.5">Time (UTC)</th>
                        <th className="py-2.5 px-3.5">Camera</th>
                        <th className="py-2.5 px-3.5">Target</th>
                        <th className="py-2.5 px-3.5 text-right">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80">
                      {filteredFindings.map((f) => {
                        const isSelected = selectedFinding === f.id;
                        return (
                          <tr
                            key={f.id}
                            onClick={() => setSelectedFinding(f.id)}
                            className={`cursor-pointer transition-colors ${isSelected
                                ? 'bg-teal-950/40 border-l-2 border-l-teal-400'
                                : 'hover:bg-zinc-800/40'
                              }`}
                          >
                            <td className="py-3 px-3.5 font-bold text-indigo-300">{f.id}</td>
                            <td className="py-3 px-3.5 text-zinc-300">{f.time}</td>
                            <td className="py-3 px-3.5 text-teal-300">{f.ch}</td>
                            <td className="py-3 px-3.5">
                              <span className={`px-2 py-0.5 rounded text-[11px] ${f.obj === 'Person'
                                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                                }`}>
                                {f.obj}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-400">
                              {f.conf}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-zinc-950/60 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex justify-between">
                <span>Select a finding row to inspect spatial telemetry.</span>
                <span>Algorithm: ByteTrack Re-ID</span>
              </div>
            </div>

            {/* Inspector (5 Cols) */}
            <div className="lg:col-span-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                      Cross-Camera Telemetry
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                    {activeFindingData.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase block">Camera Node</span>
                    <span className="text-teal-300 font-bold mt-0.5 block">{activeFindingData.ch} ({activeFindingData.cameraName})</span>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase block">Time (Normalized)</span>
                    <span className="text-zinc-200 font-bold mt-0.5 block">{activeFindingData.time}</span>
                  </div>
                </div>

                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold">Incident Narrative</span>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans mt-0.5">
                    {activeFindingData.desc}
                  </p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono text-xs flex justify-between items-center">
                  <span className="text-zinc-400">Forensic Confidence:</span>
                  <span className="text-emerald-400 font-bold text-sm">{activeFindingData.conf}% Verified</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 mt-4 flex gap-2">
                <button
                  onClick={() => navigate('../frame-viewer1')}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer border border-zinc-700"
                >
                  View Camera Frame
                </button>
              </div>
            </div>
          </div>

          {/* 6. Footer Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
            <button
              onClick={() => navigate('../ai-investigation')}
              className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              ← Return to AI Investigation
            </button>

            <button
              onClick={() => navigate('../evidence-validation')}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Proceed to Evidence Validation →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}