import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HashComparisonRow {
  algorithm: 'MD5' | 'SHA-256';
  standard: string;
  sourceHash: string;
  targetHash: string;
  theme: {
    accent: string;
    border: string;
    bg: string;
    badge: string;
  };
}

export default function IntegrityVerification(): React.JSX.Element {
  const [verifying, setVerifying] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const hashRows: HashComparisonRow[] = [
    {
      algorithm: 'MD5',
      standard: 'RFC 1321 • 128-bit',
      sourceHash: '7d79ce9b85bd11c1d471df42f0d9c490',
      targetHash: '7d79ce9b85bd11c1d471df42f0d9c490',
      theme: {
        accent: 'text-cyan-400',
        border: 'border-cyan-500/30',
        bg: 'bg-cyan-950/20',
        badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
      }
    },
    {
      algorithm: 'SHA-256',
      standard: 'FIPS 180-4 • 256-bit',
      sourceHash: 'a52a382109ff60e28f01f0cb49080db9c0a68d0eb5f488ff91386d3cb86ebf45',
      targetHash: 'a52a382109ff60e28f01f0cb49080db9c0a68d0eb5f488ff91386d3cb86ebf45',
      theme: {
        accent: 'text-violet-400',
        border: 'border-violet-500/30',
        bg: 'bg-violet-950/20',
        badge: 'bg-violet-500/10 text-violet-300 border-violet-500/30'
      }
    }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 via-cyan-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 04 / Cryptographic Audit
              </span>
              <span className="text-sm text-zinc-300 font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${verifying ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {verifying ? 'COMPUTING PARITY...' : 'DIGEST VALIDATED'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Integrity Hash Verification
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl leading-relaxed">
              Cross-validating stream digests captured during physical read against the compiled image container.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-sm bg-zinc-950/90 border border-zinc-800 px-5 py-3.5 rounded-xl">
            <span className="text-zinc-400 text-xs uppercase tracking-wider">Verification Standard</span>
            <span className="text-emerald-400 font-bold text-base">NIST SP 800-86</span>
            <span className="text-zinc-400 text-xs">Zero-Tolerance Collision Gate</span>
          </div>
        </div>
      </div>

      {/* Main Verification Canvas */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col gap-7">

        {/* Verification Status Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-800/80 pb-5">
          <div>
            <span className="text-sm font-bold font-mono tracking-wider uppercase text-zinc-300">
              Cryptographic Checksum Matrix
            </span>
            <p className="text-sm text-zinc-400 mt-1">
              Independent bitwise comparison between ATA Input Stream and Destination E01 file.
            </p>
          </div>

          {verifying ? (
            <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              PARITY ENGINE: SCANNING BLOCKS
            </div>
          ) : (
            <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% BIT-FOR-BIT IDENTICAL
            </div>
          )}
        </div>

        {/* Verification Rows */}
        <div className="flex flex-col gap-5">
          {hashRows.map((row) => (
            <div
              key={row.algorithm}
              className={`rounded-xl border p-6 transition-all duration-300 ${verifying
                  ? 'border-zinc-800 bg-zinc-950/40'
                  : 'border-emerald-500/30 bg-zinc-950/70 shadow-lg shadow-emerald-950/10'
                }`}
            >
              {/* Algorithm Title Bar */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3.5">
                  <span className={`text-lg sm:text-xl font-black font-mono tracking-tight ${row.theme.accent}`}>
                    {row.algorithm}
                  </span>
                  <span className={`text-xs font-mono border px-2.5 py-0.5 rounded-md ${row.theme.badge}`}>
                    {row.standard}
                  </span>
                </div>

                <div>
                  {verifying ? (
                    <span className="text-sm font-mono text-amber-400 animate-pulse flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Computing Digest...
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/40 px-3 py-1.5 rounded-md">
                      MATCH CONFIRMED
                    </span>
                  )}
                </div>
              </div>

              {/* Hashes Side-by-Side Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Acquisition Stream */}
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span className="font-semibold">SOURCE (ACQUISITION STREAM)</span>
                    <span className="text-zinc-500">OFFSET: 0x00</span>
                  </div>
                  <div className="font-mono text-sm sm:text-base text-zinc-200 break-all bg-black/70 p-3.5 rounded-lg border border-zinc-800 leading-relaxed">
                    {row.sourceHash}
                  </div>
                </div>

                {/* Target Image Verification */}
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span className="font-semibold">DESTINATION (IMAGE FILE VERIFICATION)</span>
                    <span className="text-zinc-500">CONTAINER: E01</span>
                  </div>
                  {verifying ? (
                    <div className="min-h-[58px] rounded-lg bg-amber-950/15 border border-amber-500/20 px-4 flex items-center justify-between text-sm font-mono text-amber-300">
                      <span className="animate-pulse">Reading block stream verification tables...</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    </div>
                  ) : (
                    <div className="font-mono text-sm sm:text-base text-emerald-300 font-bold break-all bg-emerald-950/30 p-3.5 rounded-lg border border-emerald-500/40 shadow-inner leading-relaxed">
                      {row.targetHash}
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Verification Success Action Card */}
        {!verifying && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/50 via-zinc-900 to-teal-950/30 border-2 border-emerald-500/50 p-6 sm:p-7 shadow-2xl animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-500/20 shrink-0">
                  ✓
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                      Hash Match Confirmed
                    </h3>
                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                      CHAIN SECURED
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 mt-1 max-w-xl leading-relaxed">
                    Forensic image integrity is mathematically certified. No data drift or sector anomalies detected. Ready for video format header analysis.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('../format-identification')}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Proceed to Format ID →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}