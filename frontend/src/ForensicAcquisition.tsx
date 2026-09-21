import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HashOutput {
  md5: string;
  sha: string;
}

export default function ForensicAcquisition(): React.JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  const [isAcquiring, setIsAcquiring] = useState<boolean>(false);
  const [hashOutput, setHashOutput] = useState<HashOutput | null>(null);
  const navigate = useNavigate();

  const startAcquisition = (): void => {
    setIsAcquiring(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (p > 100) p = 100;
      setProgress(p);
      if (p === 100) {
        clearInterval(interval);
        setHashOutput({
          md5: '7d79ce9b85bd11c1d471df42f0d9c490',
          sha: 'a52a382109ff60e28f01f0cb49080db9c0a68d0eb5f488ff91386d3cb86ebf45'
        });
      }
    }, 200);
  };

  const isComplete = progress === 100;
  const processedGB = ((progress / 100) * 4000).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none">

      {/* Top Banner with Status Indicator */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Phase 03 / Bit-Stream Capture
              </span>
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isComplete ? 'bg-emerald-400' : isAcquiring ? 'bg-amber-400 animate-ping' : 'bg-zinc-600'}`} />
                {isComplete ? 'I/O IDLE' : isAcquiring ? 'STREAMING READ' : 'READY TO ACQUIRE'}
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              Forensic Acquisition
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Bit-stream raw block imaging with concurrent dual-engine cryptographic verification (MD5 & SHA-256).
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs bg-zinc-950/80 border border-zinc-800 px-3.5 py-2.5 rounded-xl self-start sm:self-auto">
            <span className="text-zinc-500">FORMAT:</span>
            <span className="text-cyan-400 font-bold">EX01 / E01</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">HASH:</span>
            <span className="text-violet-400 font-bold">DUAL-PASS</span>
          </div>
        </div>
      </div>

      {/* Main Acquisition Workspace */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6">

        {/* Source and Configuration Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 text-sm shadow-inner">
              ATA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Source Physical Media</span>
                <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded font-semibold">WRITE-BLOCKED</span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-mono mt-0.5">
                WD40PURZ-85TTDY0 <span className="text-zinc-400 font-normal">(4.0 TB / Raw ATA)</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <span className="text-xs font-mono text-zinc-400">CONTAINER:</span>
            <select
              className="bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs font-mono rounded-xl px-3 py-2 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAcquiring || isComplete}
            >
              <option>.E01 (EnCase Forensic Image)</option>
              <option>.DD (Raw Bit-Stream Copy)</option>
              <option>.RAW (Uncompressed Sector Dump)</option>
            </select>
          </div>
        </div>

        {/* Pre-Acquisition Start Callout */}
        {!isAcquiring && progress === 0 && (
          <div className="py-12 px-6 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xl font-bold shadow-lg shadow-amber-500/10">
              0101
            </div>
            <div className="max-w-md">
              <h4 className="text-base font-bold text-white uppercase tracking-tight">
                Ready for Raw Bit-Level Capture
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Forensic imaging will stream physical sectors directly to target storage while generating verifiable cryptographic digests in flight.
              </p>
            </div>
            <button
              onClick={startAcquisition}
              className="mt-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 cursor-pointer transition-all duration-200"
            >
              Start Bit-Stream Acquisition
            </button>
          </div>
        )}

        {/* Live Imaging Telemetry & Crypto Output */}
        {(isAcquiring || isComplete) && (
          <div className="flex flex-col gap-6 py-2">

            {/* Progress Telemetry Card */}
            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 font-bold uppercase tracking-wider">Bitstream Capture Engine</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isComplete ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'}`}>
                    {isComplete ? 'COMPLETE' : 'WRITING_SECTORS'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {!isComplete && (
                    <span className="text-zinc-500 text-[11px]">RATE: ~312 MB/s</span>
                  )}
                  <span className={`text-base font-black ${isComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Multi-tone Glow Progress Bar */}
              <div className="w-full h-3.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-200 ease-linear ${isComplete
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 shadow-md shadow-amber-500/20'
                    }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 pt-0.5">
                <span>0.0 GB</span>
                <span className="text-zinc-200 font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  {processedGB} GB / 4000.0 GB
                </span>
                <span>4000.0 GB</span>
              </div>
            </div>

            {/* Cryptographic Dual-Hash Pipelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* MD5 Hash Block */}
              <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-4.5 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/80" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      Streaming MD5 Hash
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-500/80 uppercase">RFC 1321</span>
                </div>

                <div className={`p-3 rounded-lg bg-black/60 border border-cyan-500/20 font-mono text-xs break-all tracking-wider ${hashOutput ? 'text-cyan-200 font-bold' : 'text-cyan-500/60 animate-pulse'
                  }`}>
                  {hashOutput ? hashOutput.md5 : '0x................................ (Hashing stream)'}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>PIPE: INT-ATA0 &gt;&gt; MD5</span>
                  <span>{hashOutput ? 'VERIFIED' : 'ACTIVE CALCULATING'}</span>
                </div>
              </div>

              {/* SHA-256 Hash Block */}
              <div className="relative overflow-hidden rounded-xl border border-violet-500/30 bg-violet-950/10 p-4.5 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400/80" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
                      Streaming SHA-256 Hash
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-violet-400/80 uppercase">FIPS 180-4</span>
                </div>

                <div className={`p-3 rounded-lg bg-black/60 border border-violet-500/20 font-mono text-xs break-all tracking-wider ${hashOutput ? 'text-violet-200 font-bold' : 'text-violet-500/60 animate-pulse'
                  }`}>
                  {hashOutput ? hashOutput.sha : '0x................................................................ (Hashing stream)'}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>PIPE: INT-ATA0 &gt;&gt; SHA256</span>
                  <span>{hashOutput ? 'VERIFIED' : 'ACTIVE CALCULATING'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Completion Row & Action Trigger */}
        {isComplete && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/20 border border-emerald-500/40 p-5 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/20">
                ✓
              </div>
              <div>
                <div className="text-emerald-400 text-sm font-bold tracking-tight">
                  Original HDD Bit-Level Preserved
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Write locks maintained. Physical media is verified safe for disconnect.
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('../integrity-verification')}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
            >
              Proceed to Verification →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}