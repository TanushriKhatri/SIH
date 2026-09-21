import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimelineEvent {
  id: string;
  timeRaw: string;
  timeNormalized: string;
  channel: string;
  sourceType: 'Active Stream' | 'Carved Fragment';
  badge: string;
  title: string;
  description: string;
  driftDelta: string;
  durationSpan: string;
  status: 'Synchronized' | 'Drift Corrected';
  theme: 'cyan' | 'indigo' | 'amber';
}

export default function Timeline(): React.JSX.Element {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<number>(2);

  useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      id: 'EV-VID-01',
      timeRaw: '14:25:24',
      timeNormalized: '14:22:10 UTC',
      channel: 'CH 01 (Gate Alpha)',
      sourceType: 'Active Stream',
      badge: 'RECORDING START',
      title: 'Perimeter Feed Initialized',
      description: 'Main gate surveillance stream started writing contiguous sectors to physical cylinder 0x01.',
      driftDelta: '-00:03:14 Calibrated',
      durationSpan: '22m 50s Duration',
      status: 'Synchronized',
      theme: 'cyan'
    },
    {
      id: 'EV-VID-03',
      timeRaw: '14:28:14',
      timeNormalized: '14:25:00 UTC',
      channel: 'CH 04 (Lobby Entrance)',
      sourceType: 'Active Stream',
      badge: 'RECORDING START',
      title: 'Interior Motion Capture Engaged',
      description: 'Motion threshold triggered sensor recording across sector extent 0x2B1A9900.',
      driftDelta: '-00:03:14 Calibrated',
      durationSpan: '35m 00s Duration',
      status: 'Synchronized',
      theme: 'indigo'
    },
    {
      id: 'FRG-9921',
      timeRaw: '14:34:19',
      timeNormalized: '14:31:05 UTC',
      channel: 'CH 01 (Gate Alpha)',
      sourceType: 'Carved Fragment',
      badge: 'EXCAVATED GAP',
      title: 'Recovered Deleted Incident Slice',
      description: 'Orphaned slack fragment restored via deep carving. Timestamp adjusted by +3m 14s drift offset.',
      driftDelta: '+00:03:14 Synchronized',
      durationSpan: '04m 12s Duration',
      status: 'Drift Corrected',
      theme: 'amber'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-8">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Phase 14 / Temporal Unification
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${analyzing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {analyzing ? 'CALIBRATING CLOCK DRIFT...' : 'TIMELINE RECONCILED'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Timestamp & Unified Timeline
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Normalizing hardware timecodes (ISO-8601 UTC), compensating for internal RTC clock drift, and weaving multi-camera streams into a unified chronological ledger.
            </p>
          </div>

          {!analyzing && (
            <button
              onClick={() => navigate('../ai-investigation')}
              className="self-start sm:self-auto bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-400 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Send to AI Investigation →
            </button>
          )}
        </div>
      </div>

      {analyzing ? (
        /* Oscilloscope Waveform Clock Calibration Scanner */
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />

          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-800 flex items-center justify-center" />
            <div className="w-16 h-16 rounded-full border-2 border-t-indigo-400 border-r-teal-400 border-transparent animate-spin absolute" />
            <span className="font-mono text-xs font-bold text-teal-400">RTC</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center relative z-10">
            <span className="text-base font-bold text-white tracking-tight">
              Reconciling Multi-Camera Real-Time Clocks
            </span>
            <span className="text-xs font-mono text-zinc-400 max-w-md">
              Comparing internal Dahua RTC crystals with standardized UTC network references to eliminate multi-channel jitter.
            </span>
          </div>

          {/* Clock Pulse Bar Graphic */}
          <div className="flex items-center gap-1.5 h-6">
            {[20, 50, 80, 40, 90, 30, 70, 100, 60, 40, 85, 30, 65, 45].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-indigo-500 to-teal-400 rounded-full animate-pulse"
                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">

          {/* Telemetry Strip Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Detected Timezone</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-white">UTC -05:00</span>
                <span className="text-xs text-zinc-400 font-semibold">(EST Reference)</span>
              </div>
              <span className="text-[11px] text-zinc-400">Master Clock Standard</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">RTC Crystal Drift</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-amber-400">+00:03:14</span>
                <span className="text-xs text-amber-300 font-semibold">(Fast)</span>
              </div>
              <span className="text-[11px] text-zinc-400">Drift Offsets Compensated</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Normalization Standard</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-emerald-400">ISO-8601 UTC</span>
                <span className="text-xs text-emerald-300 font-semibold">(Active)</span>
              </div>
              <span className="text-[11px] text-zinc-400">Certified for Judicial Submission</span>
            </div>
          </div>

          {/* Interactive Multi-Camera Timeline Track */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Unified Chronological Master Stream
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  Synchronized multi-camera timeline interleaving continuous feeds and carved slack gaps.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-zinc-300">Continuous Stream</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-zinc-300">Carved Slack Gap</span>
                </div>
              </div>
            </div>

            {/* Timeline Tree Component */}
            <div className="relative pl-2 sm:pl-4">
              {/* Continuous Vertical Time Anchor Rail */}
              <div className="absolute top-4 bottom-4 left-24 sm:left-28 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-amber-500" />

              <div className="flex flex-col gap-6">
                {timelineEvents.map((evt, idx) => {
                  const isSelected = selectedEvent === idx;
                  const isGap = evt.sourceType === 'Carved Fragment';

                  return (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEvent(idx)}
                      className="flex items-start gap-4 sm:gap-6 group cursor-pointer"
                    >
                      {/* Left Timestamp Display */}
                      <div className="w-20 sm:w-24 text-right shrink-0 pt-1">
                        <span className="text-xs sm:text-sm font-mono font-bold text-white block">
                          {evt.timeNormalized.split(' ')[0]}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                          RAW: {evt.timeRaw}
                        </span>
                      </div>

                      {/* Interactive Pin Node */}
                      <div className="relative z-10 shrink-0 mt-1">
                        <div className={`w-4 h-4 rounded-full transition-all duration-200 border-2 border-zinc-950 flex items-center justify-center ${isGap
                            ? 'bg-amber-400 ring-4 ring-amber-500/20'
                            : evt.theme === 'cyan'
                              ? 'bg-cyan-400 ring-4 ring-cyan-500/20'
                              : 'bg-indigo-400 ring-4 ring-indigo-500/20'
                          }`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                        </div>
                      </div>

                      {/* Event Detail Container */}
                      <div className={`flex-1 rounded-xl p-4 sm:p-5 border transition-all duration-200 ${isSelected
                          ? isGap
                            ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-950/20'
                            : 'bg-zinc-950 border-teal-500/60 shadow-lg shadow-teal-950/20'
                          : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                        }`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-800/80 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isGap
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              }`}>
                              {evt.badge}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                              {evt.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="text-zinc-400 font-semibold">{evt.channel}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-zinc-300 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                              {evt.id}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed">
                          {evt.description}
                        </p>

                        {/* Stream Length & Drift Compensation Gauge */}
                        <div className="mt-4 pt-3 border-t border-zinc-800/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-400">DURATION: <strong className="text-zinc-200">{evt.durationSpan}</strong></span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-emerald-400 font-semibold">{evt.driftDelta}</span>
                          </div>

                          <div className="w-full sm:w-48 bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                            <div
                              className={`h-full ${isGap
                                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                                  : evt.theme === 'cyan'
                                    ? 'bg-gradient-to-r from-cyan-500 to-teal-400'
                                    : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                                }`}
                              style={{ width: idx === 0 ? '45%' : idx === 1 ? '70%' : '25%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Dispatch Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Multi-camera timeline synchronized. Ready for autonomous AI incident investigation.</span>
            </div>

            <button
              onClick={() => navigate('../ai-investigation')}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-400 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Dispatch to AI Investigation →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}