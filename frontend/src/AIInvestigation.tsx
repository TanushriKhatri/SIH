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

export default function AIInvestigation(): React.JSX.Element {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'recovered'>('all');
  const [progress, setProgress] = useState<number>(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 12 : prev));
    }, 450);

    const timer = setTimeout(() => {
      setAnalyzing(false);
      clearInterval(interval);
    }, 4000);

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
      desc: 'Subject entered frame from North quadrant and traversed towards vestibule.',
    },
    {
      id: 'AI-002',
      time: '14:27:15 UTC',
      ch: 'CH04',
      cameraName: 'Lobby Entrance',
      obj: 'Backpack',
      conf: 88,
      desc: 'Object separation anomaly: backpack detached from Person track ID #104.',
    },
    {
      id: 'AI-003',
      time: '14:31:05 UTC',
      ch: 'CH01',
      cameraName: 'Perimeter Gate',
      obj: 'Person',
      conf: 85,
      desc: 'Subject detected in restored slack fragment (FRG-9921) after 3m 14s gap.',
      isRecoveredGap: true,
    },
  ];

  const filteredFindings = findings.filter((item) => {
    if (activeTab === 'critical') return item.conf >= 90 || item.isRecoveredGap;
    if (activeTab === 'recovered') return item.isRecoveredGap;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none pb-8">

      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-violet-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Phase 15 / Neural Analytics
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${analyzing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {analyzing ? 'INFERENCE ENGINE ENGAGED' : 'DETECTION COMPLETE'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              AI Vision & Forensics Investigation
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Automated multi-stream inspection using YOLOv8 bounding inference, MTCNN landmark alignment, and ByteTrack spatial re-identification.
            </p>
          </div>

          {!analyzing && (
            <button
              onClick={() => navigate('../cross-camera')}
              className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              Cross-Camera Correlation →
            </button>
          )}
        </div>
      </div>

      {/* 2. Scanning / Analyzing Terminal State */}
      {analyzing ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle scanning grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

          {/* Neural Reticle Animation */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-dashed border-violet-500/40 rounded-2xl animate-spin [animation-duration:8s]" />
            <div className="w-16 h-16 rounded-xl border-2 border-teal-400/80 flex items-center justify-center relative bg-black/40">
              <div className="w-8 h-8 rounded-md bg-violet-500/30 border border-violet-400 animate-pulse" />
              {/* Corner brackets */}
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-teal-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-teal-400" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-teal-400" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-teal-400" />
            </div>
          </div>

          <div className="text-center z-10 max-w-md">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Executing Multi-Camera Neural Pass
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
              Evaluating 142,500 frames across unified PTS streams. Generating object tracks and centroid drift metrics.
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full max-w-md flex flex-col gap-2 z-10 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>YOLOv8 + ByteTrack [Inference]</span>
              <span className="text-teal-400 font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-violet-500 via-teal-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-500">
              <span>Model: YOLOv8x-Forensic</span>
              <span>Batch Size: 64 frames</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">

          {/* 3. Top Metrics Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Frames Analyzed</span>
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">142,500</span>
              <span className="text-[11px] text-zinc-500">100% Normalized Video</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Persons Detected</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">23</span>
              <span className="text-[11px] text-zinc-500">Pose & Bounding Confirmed</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Vehicles Tracked</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">05</span>
              <span className="text-[11px] text-zinc-500">Plate & Path Segmented</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Critical Events</span>
              <span className="text-2xl sm:text-3xl font-black text-violet-400 mt-1">03</span>
              <span className="text-[11px] text-zinc-500">Anomalies Tagged for Review</span>
            </div>
          </div>

          {/* 4. Filter Bar & Findings Log */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">

            {/* Table Header & Segment Filter */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-950/80">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  AI Forensic Findings Ledger
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Extracted target detections correlated with spatial coordinates and recovered timestamps.
                </p>
              </div>

              {/* View Filters */}
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-mono">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${activeTab === 'all'
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  All (3)
                </button>
                <button
                  onClick={() => setActiveTab('critical')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${activeTab === 'critical'
                      ? 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/40'
                      : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  High Priority
                </button>
                <button
                  onClick={() => setActiveTab('recovered')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${activeTab === 'recovered'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  Recovered Gaps
                </button>
              </div>
            </div>

            {/* Findings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Finding ID</th>
                    <th className="py-3 px-4">Normalized Time</th>
                    <th className="py-3 px-4">Camera Channel</th>
                    <th className="py-3 px-4">Classification</th>
                    <th className="py-3 px-4">Observable Anomaly</th>
                    <th className="py-3 px-4">Confidence</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800/80 font-mono">
                  {filteredFindings.map((f) => {
                    const isHigh = f.conf >= 90;
                    return (
                      <tr
                        key={f.id}
                        className={`hover:bg-zinc-800/40 transition-colors ${f.isRecoveredGap ? 'bg-amber-500/[0.03]' : ''
                          }`}
                      >
                        {/* ID */}
                        <td className="py-3.5 px-4 font-bold text-violet-300">
                          <span className="bg-violet-950/60 border border-violet-500/30 px-2 py-0.5 rounded text-xs">
                            {f.id}
                          </span>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3.5 px-4 text-zinc-200 text-xs">
                          {f.time}
                        </td>

                        {/* Camera */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-teal-300">{f.ch}</span>
                            <span className="text-[11px] text-zinc-400 font-sans">{f.cameraName}</span>
                          </div>
                        </td>

                        {/* Classification */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold ${f.obj === 'Person'
                              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                              : f.obj === 'Backpack'
                                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                                : 'bg-zinc-800 text-zinc-300'
                            }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {f.obj}
                          </span>
                        </td>

                        {/* Description */}
                        <td className="py-3.5 px-4 font-sans text-xs text-zinc-300 max-w-xs sm:max-w-sm">
                          <p className="line-clamp-2">
                            {f.desc}
                          </p>
                          {f.isRecoveredGap && (
                            <span className="inline-block mt-1 text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded font-semibold">
                              SLACK GAP INCIDENT
                            </span>
                          )}
                        </td>

                        {/* Confidence Bar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${isHigh ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-teal-400'
                                  }`}
                                style={{ width: `${f.conf}%` }}
                              />
                            </div>
                            <span className={`text-xs font-bold ${isHigh ? 'text-emerald-400' : 'text-teal-300'}`}>
                              {f.conf}%
                            </span>
                          </div>
                        </td>

                        {/* View Frame Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => navigate('../frame-viewer1')}
                            className="bg-zinc-800 hover:bg-teal-500 hover:text-zinc-950 border border-zinc-700 hover:border-teal-500 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shadow-sm"
                          >
                            Inspect Frame →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3.5 bg-zinc-950/70 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-mono text-zinc-400">
              <span>All bounding coordinates calibrated with normalized PTS offsets.</span>
              <span className="text-zinc-500">Inference Device: TensorRT GPU FP16</span>
            </div>
          </div>

          {/* 5. Bottom Navigation Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>3 critical forensic events validated. Ready for multi-camera trajectory mapping.</span>
            </div>

            <button
              onClick={() => navigate('../cross-camera')}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Cross-Camera Correlation →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}