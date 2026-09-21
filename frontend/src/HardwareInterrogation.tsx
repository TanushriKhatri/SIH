import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface InterrogationStep {
  label: string;
  details: string;
  code: string;
}

interface HardwareDetail {
  label: string;
  value: string;
  accent?: 'emerald' | 'amber' | 'slate';
}

export default function HardwareInterrogation(): React.JSX.Element {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        if (s < 4) return s + 1;
        clearInterval(timer);
        return s;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const steps: InterrogationStep[] = [
    {
      label: 'Initializing ATA Pass Through...',
      details: 'Connecting to physical interface.',
      code: 'CMD 0xEC'
    },
    {
      label: 'Querying Device Identification...',
      details: 'Retrieving Serial, Model, Firmware.',
      code: 'IDENT_DEV'
    },
    {
      label: 'Reading SMART Health Metrics...',
      details: 'Checking reallocated sectors and power cycles.',
      code: 'SMART_READ'
    },
    {
      label: 'Establishing Write Protection...',
      details: 'Software write-blocker active.',
      code: 'BLOCK_IO'
    }
  ];

  const hardwareSpecs: HardwareDetail[] = [
    { label: 'Model Number', value: 'WDC WD40PURZ-85TTDY0', accent: 'slate' },
    { label: 'Serial Number', value: 'WD-WCC6Y6A', accent: 'slate' },
    { label: 'Firmware Revision', value: '80.00A80', accent: 'slate' },
    { label: 'SMART Status', value: 'HEALTHY', accent: 'emerald' }
  ];

  const isCompleted = step >= 4;
  const progressPercent = Math.min(step * 25, 100);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none">

      {/* Top Header Banner with Live Telemetry */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Phase 02 / Hardware Link
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Bus: ATA-0
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              Hardware Interrogation
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Probing low-level disk registers via write-blocked controller pipeline. Preserves source physical state.
            </p>
          </div>

          {/* Progress Gauge */}
          <div className="flex flex-col items-start md:items-end gap-1.5 bg-zinc-900/90 border border-zinc-800 px-4 py-3 rounded-xl min-w-[200px]">
            <div className="flex justify-between w-full text-xs font-mono">
              <span className="text-zinc-400">STATUS</span>
              <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isCompleted ? 'COMPLETE' : 'IN_PROGRESS'}
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-amber-300'
                  }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-500">{progressPercent}% • Step {Math.min(step, 4)} of 4</span>
          </div>
        </div>
      </div>

      {/* Main Execution Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Step Progression Timeline (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Command Sequence Log
            </span>
            <span className="text-xs font-mono text-zinc-500">I/O Interceptor v4.2</span>
          </div>

          <div className="space-y-3">
            {steps.map((s: InterrogationStep, idx: number) => {
              const isDone = idx < step;
              const isCurrent = idx === step;
              const isPending = idx > step;

              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${isCurrent
                      ? 'bg-amber-950/20 border-amber-500/60 ring-1 ring-amber-500/30 shadow-lg shadow-amber-950/40'
                      : isDone
                        ? 'bg-zinc-900/90 border-emerald-500/30'
                        : 'bg-zinc-950/40 border-zinc-800/60 opacity-40'
                    }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {/* Step index badge */}
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-colors ${isCurrent
                          ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                          : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}>
                        {isDone ? '✓' : `0${idx + 1}`}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold tracking-tight ${isCurrent ? 'text-amber-200' : isDone ? 'text-zinc-100' : 'text-zinc-500'
                            }`}>
                            {s.label}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{s.details}</p>
                      </div>
                    </div>

                    {/* Operational Code Tag */}
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded tracking-wider uppercase ${isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                          : isDone
                            ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
                            : 'bg-zinc-900 text-zinc-600'
                        }`}>
                        {s.code}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Hex Stream Monitor (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Controller Bus Feed
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>

          <div className="bg-black/90 rounded-xl border border-zinc-800 p-4 font-mono text-xs text-zinc-400 h-full min-h-[220px] flex flex-col justify-between shadow-inner">
            <div className="space-y-1 text-[11px] leading-relaxed">
              <div className="text-zinc-600">// ATA PASS-THROUGH MONITOR</div>
              <div>[0x0001] PHY_SYNC: ESTABLISHED (6.0 Gbps)</div>
              <div>[0x0002] W_LOCK: ENFORCED VIA KERNEL HOOK</div>
              <div className={step >= 1 ? 'text-emerald-400' : 'text-zinc-600'}>
                [0x001A] ID_SERIAL &gt;&gt; WD-WCC6Y6A
              </div>
              <div className={step >= 2 ? 'text-emerald-400' : 'text-zinc-600'}>
                [0x002B] SMART_ATTR &gt;&gt; REALLOC_SECT: 0 [PASS]
              </div>
              <div className={step >= 3 ? 'text-amber-400' : 'text-zinc-600'}>
                [0x003C] REG_STAT &gt;&gt; WRITE_BLOCK_ENGAGED
              </div>
              {step >= 4 && (
                <div className="text-emerald-300 font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-800/40 mt-2">
                  &gt;&gt; INTERROGATION_OK: ALL CHECKS PASSED
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex justify-between items-center text-[10px] text-zinc-500">
              <span>CRC32: 0x9B4F8201</span>
              <span>MODE: READ-ONLY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Diagnostic Panel */}
      {step >= 4 && (
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900/95 border-2 border-emerald-500/50 p-6 md:p-8 shadow-2xl shadow-emerald-950/20 backdrop-blur-md transition-all duration-300">

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/80 animate-pulse" />
                <h3 className="text-xl font-black text-white tracking-tight">
                  Interrogation Complete
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Device signature verified. Drive geometry locked in read-only forensic isolation.
              </p>
            </div>

            {/* Strict Red Write-Protect Shield */}
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              WRITE PROTECTED
            </div>
          </div>

          {/* Detailed Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
            {hardwareSpecs.map((spec: HardwareDetail, i: number) => (
              <div
                key={i}
                className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-4 flex flex-col justify-between gap-1.5 hover:border-zinc-700 transition-colors"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {spec.label}
                </span>
                <span className={`text-sm font-mono font-bold tracking-tight truncate ${spec.accent === 'emerald' ? 'text-emerald-400 text-base' : 'text-zinc-100'
                  }`}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-zinc-800">
            <span className="text-xs text-zinc-400 font-mono">
              Ready for bit-stream bit-for-bit physical disk copy.
            </span>
            <button
              onClick={() => navigate('../forensic-acquisition')}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
            >
              Proceed to Forensic Acquisition →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}