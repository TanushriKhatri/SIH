import React, { useState } from 'react';

interface ArchitectureModule {
  name: string;
  code: string;
  purpose: string;
  input: string;
  processing: string;
  output: string;
  oems: string[];
}

export default function ArchitectureViewer(): React.JSX.Element {
  const [activeModule, setActiveModule] = useState<number>(0);

  const modules: ArchitectureModule[] = [
    {
      name: "1. Evidence Ingestion & OEM Identification",
      code: "MOD-01-ACQUISITION",
      purpose: "Identify the vendor OEM signature, apply hardware write-blocking, and generate bit-stream forensic images.",
      input: "Seized DVR/NVR Hard Drive (Proprietary Filesystems)",
      processing: "OEM auto-detection (Hikvision, Dahua, CP Plus, Honeywell, Uniview, Matrix, Godrej, TP-Link), ATA health checks, E01/RAW bit-stream mirroring, and dual MD5/SHA-256 hash generation.",
      output: "Write-Protected Physical Image, OEM Profile Log, Cryptographic Checksum Ledger",
      oems: ["Hikvision", "Dahua", "CP Plus", "Honeywell", "Uniview", "Matrix", "Godrej", "TP-Link"]
    },
    {
      name: "2. Format Identification & Parsing",
      code: "MOD-02-PARSING",
      purpose: "Automatically detect proprietary vendor structures, index video frames, and map partition layouts.",
      input: "Forensic Bit-Stream Image File",
      processing: "Magic byte/offset scanning, vendor-specific container parsing (DHFS, Hikvision DAV, etc.), structure tree analysis, and unallocated sector mapping.",
      output: "Partition Tables, Indexed Video Timestamps, Unallocated Space Map",
      oems: ["All Major OEMs"]
    },
    {
      name: "3. Recovery & Reconstruction",
      code: "MOD-03-CARVING",
      purpose: "Carve deleted, fragmented, or overwritten video recordings directly from unallocated slack space.",
      input: "Unallocated Space Map, Vendor Signatures",
      processing: "PES packet signature extraction (magic 0x000001BA), fragment classification, temporal ordering, and container wrapping into standard MP4s.",
      output: "Recovered Video Fragments (e.g. FRG-9921), Standardized MP4 Streams",
      oems: ["Dahua", "Hikvision", "Uniview"]
    },
    {
      name: "4. Timeline & AI Investigation",
      code: "MOD-04-AI-TIMELINE",
      purpose: "Normalize RTC clock drift and run intelligent multi-camera event analytics.",
      input: "Standardized MP4s, Extracted Metadata",
      processing: "Clock drift calculation (+3m 14s), YOLOv8 object/face detection, ByteTrack centroid tracking, and cross-camera corridor linking.",
      output: "Unified ISO-8601 Master Timeline, AI Investigative Findings Ledger",
      oems: ["Cross-OEM Unified Engine"]
    },
    {
      name: "5. Validation & Reporting",
      code: "MOD-05-ATTESTATION",
      purpose: "Ensure absolute forensic soundness and compile the final court-certified evidentiary report.",
      input: "AI Findings, Timeline Metadata, Hash Logs",
      processing: "Structural integrity verification, Chain of Custody attestation, Federal Rules of Evidence 902(11)/(14) compliance check, and PDF/ZIP generation.",
      output: "Cryptographically Signed Forensic Report Package (Court-Ready)",
      oems: ["Standardized Legal Output"]
    }
  ];

  const current = modules[activeModule];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-12">
      
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                System Architecture / Multi-Vendor Pipeline
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                PIPELINE ONLINE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Interactive Architecture Viewer
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              High-level workflow of the Multi-Vendor DVR/NVR Forensic Analysis Platform, tracing evidence from proprietary OEM acquisition to court-ready attestation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Pipeline Nav (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3 relative">
          <div className="hidden lg:block absolute top-10 bottom-10 left-8 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-emerald-500" />
          
          {modules.map((m, i) => {
            const isActive = activeModule === i;
            return (
              <div
                key={i}
                onClick={() => setActiveModule(i)}
                className={`relative z-10 flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                  isActive
                    ? 'bg-zinc-900 border-teal-400/80 shadow-lg shadow-teal-950/30'
                    : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-teal-400 text-zinc-950 shadow-md shadow-teal-400/30'
                    : 'bg-zinc-900 border border-zinc-700 text-zinc-400'
                }`}>
                  0{i + 1}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className={`text-xs font-mono uppercase font-semibold ${isActive ? 'text-teal-300' : 'text-zinc-500'}`}>
                    {m.code}
                  </span>
                  <span className={`text-sm sm:text-base font-bold truncate tracking-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {m.name.split('. ')[1]}
                  </span>
                </div>

                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Detail Panel (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                {current.code} Specification
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {current.name}
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 self-start sm:self-auto">
              Vendor Neutral Engine
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
              Module Purpose
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
              {current.purpose}
            </p>
          </div>

          {/* OEM Compatibility Tag Cloud for Module 1 */}
          {current.oems && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Supported OEM Ecosystems
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {current.oems.map((oem, idx) => (
                  <span key={idx} className="bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded text-teal-300 font-semibold">
                    {oem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* I/O Matrix Card */}
          <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs shadow-inner">
            <div className="p-4 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-zinc-400 uppercase font-bold text-[11px]">Input Source</span>
              </div>
              <span className="text-cyan-300 font-semibold bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded max-w-sm truncate">
                {current.input}
              </span>
            </div>

            <div className="p-4 border-b border-zinc-800/80 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-zinc-400 uppercase font-bold text-[11px]">Processing Logic</span>
              </div>
              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed pl-4 border-l-2 border-amber-500/40">
                {current.processing}
              </p>
            </div>

            <div className="p-4 bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-zinc-400 uppercase font-bold text-[11px]">Certified Output</span>
              </div>
              <span className="text-emerald-300 font-semibold bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded max-w-sm truncate">
                {current.output}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/70">
            <span>Multi-Vendor Parsing Engine</span>
            <span>Zero Platter Alteration Guaranteed</span>
          </div>

        </div>

      </div>

    </div>
  );
}