import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormatIdentification(): React.JSX.Element {
  const [scanning, setScanning] = useState<boolean>(true);
  const [vendorFound, setVendorFound] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scanTimer = setTimeout(() => {
      setScanning(false);
      setVendorFound(true);
    }, 2500);
    return () => clearTimeout(scanTimer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-cyan-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Phase 05 / Signature Parsing
              </span>
              <span className="text-sm text-zinc-300 font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${scanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {scanning ? 'SCANNING OFFSETS (LBA 0 - 1024)...' : 'SIGNATURE RECOGNIZED'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              DVR/NVR Format Identification
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl leading-relaxed">
              Scanning raw block offsets and magic header sequences to isolate proprietary CCTV filesystem structures and video metadata tables.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-sm bg-zinc-950/90 border border-zinc-800 px-5 py-3.5 rounded-xl">
            <span className="text-zinc-400 text-xs uppercase tracking-wider">Engine Heuristics</span>
            <span className="text-cyan-400 font-bold text-base">MAGIC-BYTES v3.8</span>
            <span className="text-zinc-400 text-xs">Deep Header Analysis</span>
          </div>
        </div>
      </div>

      {/* Main Analysis Container */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6">

        {/* State Banner / Scanner Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-all duration-300 shrink-0 ${scanning
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/10'
                : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/20'
              }`}>
              {scanning ? (
                <div className="w-7 h-7 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                '✓'
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Offset & Magic Byte Scanner
                </h3>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase ${scanning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                  {scanning ? 'INSPECTING BLOCKS' : 'SIGNATURE MATCH'}
                </span>
              </div>
              <p className="text-sm text-zinc-300 mt-1">
                {scanning
                  ? 'Traversing sectors 0 to 1024 for known Dahua, Hikvision, and Tiandy magic tokens...'
                  : 'Header discovery finished. Definite match confirmed against forensic reference database.'}
              </p>
            </div>
          </div>

          <div className="font-mono text-xs text-zinc-400 bg-zinc-950 px-3.5 py-2 rounded-lg border border-zinc-800 self-stretch sm:self-auto text-center">
            {scanning ? 'LOOKUP: 48 KNOWN PROFILES' : 'CORRELATION: 100%'}
          </div>
        </div>

        {/* Live Hex Stream Monitor (Scanning State) */}
        {scanning && (
          <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-black/80 p-5 font-mono shadow-inner">
            {/* Ambient Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] to-transparent pointer-events-none animate-pulse" />

            <div className="flex justify-between items-center pb-3 mb-3 border-b border-zinc-800 text-xs text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                BUFFER: RAW LBA DUMP
              </span>
              <span className="text-amber-300">STREAMING DISK OFFSETS...</span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-zinc-300">
              <div className="flex gap-4">
                <span className="text-cyan-400 font-bold">0x00000000:</span>
                <span className="text-zinc-400">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00</span>
                <span className="text-zinc-600 hidden md:inline">................</span>
              </div>
              <div className="flex gap-4">
                <span className="text-cyan-400 font-bold">0x00000010:</span>
                <span className="text-zinc-400">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00</span>
                <span className="text-zinc-600 hidden md:inline">................</span>
              </div>
              <div className="flex gap-4 bg-amber-950/20 py-0.5 rounded px-1 -mx-1 border border-amber-500/20">
                <span className="text-amber-400 font-bold">0x000001E0:</span>
                <span className="text-amber-200 font-bold">44 48 41 56 01 00 00 00 20 00 00 00 58 4E 56 52</span>
                <span className="text-amber-300 font-bold hidden md:inline">DHAV.... ...XNVR</span>
              </div>
              <div className="flex gap-4">
                <span className="text-cyan-400 font-bold">0x00000200:</span>
                <span className="text-zinc-400">12 40 88 01 4A 2B 00 FF 00 00 00 00 48 44 44 31</span>
                <span className="text-zinc-600 hidden md:inline">.@..J+......HDD1</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-between items-center text-xs text-zinc-400">
              <span className="text-amber-400 animate-pulse">Evaluating magic token at offset 0x000001E0...</span>
              <span>1024 / 1024 sectors parsed</span>
            </div>
          </div>
        )}

        {/* Identified Vendor Dossier (Completed State) */}
        {!scanning && vendorFound && (
          <div className="relative overflow-hidden rounded-2xl bg-zinc-950/90 border-2 border-emerald-500/40 p-6 sm:p-7 shadow-2xl shadow-emerald-950/20 animate-in fade-in duration-300">
            {/* Accent Highlight Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

            <div className="flex flex-col gap-6">

              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                      Vendor & Format Confirmed
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    DAHUA DHFS <span className="text-zinc-400 font-normal text-lg sm:text-xl">(Proprietary CCTV FS)</span>
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  COMPATIBLE ENGINE FOUND
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1.5">
                  <span className="text-xs font-mono uppercase text-zinc-400">Magic Signature</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-cyan-300">
                    DHAV (0x44 48 41 56)
                  </span>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1.5">
                  <span className="text-xs font-mono uppercase text-zinc-400">Found Offset</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-zinc-100">
                    LBA Sector 0x01E0
                  </span>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1.5">
                  <span className="text-xs font-mono uppercase text-zinc-400">Filesystem Layout</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-zinc-100">
                    DHFS v4.1 (Block Indexed)
                  </span>
                </div>

                <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1.5">
                  <span className="text-xs font-mono uppercase text-zinc-400">Carving Profile</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">
                    Dahua Frame-Level Carve
                  </span>
                </div>
              </div>

              {/* Action Trigger Row */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t border-zinc-800">
                <p className="text-sm text-zinc-300">
                  Ready to load dedicated stream un-packer for raw H.264/H.265 extraction.
                </p>

                <button
                  onClick={() => navigate('../vendor-parser')}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  Select Appropriate Parser →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}