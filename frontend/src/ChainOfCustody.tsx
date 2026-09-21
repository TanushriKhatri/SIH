import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CustodyRecord {
  phase: string;
  action: string;
  officer: string;
  badgeNo: string;
  timestamp: string;
  sourceHash: string;
  outputHash: string;
  integrityProof: 'Verified' | 'Write-Blocked' | 'Sealed';
}

export default function ChainOfCustody(): React.JSX.Element {
  const navigate = useNavigate();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const custodyEntries: CustodyRecord[] = [
    {
      phase: '01. Physical Seizure & Ingestion',
      action: 'Hardware Write-Blocker Bitstream Mirror (E01 Image)',
      officer: 'Det. M. Vance',
      badgeNo: 'DF-8812',
      timestamp: '2026-09-17 08:30:12 UTC',
      sourceHash: 'Physical WD-WCC6Y6A (4TB)',
      outputHash: '7d79ce9b85bd11c1d42a98f1234bcfe81109923a',
      integrityProof: 'Write-Blocked',
    },
    {
      phase: '02. File Carving & Recovery',
      action: 'Unallocated Cluster Extraction (DHFS Magic 0x000001BA)',
      officer: 'Autonomous Engine v4.2',
      badgeNo: 'SYS-CORE',
      timestamp: '2026-09-17 09:14:44 UTC',
      sourceHash: 'LBA 0x00000000 - 0x1D1C0000',
      outputHash: '4b92af8812ec1099cda11234bcfe019912088fca',
      integrityProof: 'Verified',
    },
    {
      phase: '03. Demux & Standardization',
      action: 'ISO-8601 Temporal Calibration (+3m 14s) & MP4 Remux',
      officer: 'Lead Forensics Spec. K. Rane',
      badgeNo: 'LAB-904',
      timestamp: '2026-09-17 10:02:18 UTC',
      sourceHash: '14,392 Fragmented Clusters',
      outputHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4',
      integrityProof: 'Sealed',
    },
    {
      phase: '04. Neural Re-ID & Audit Sign-Off',
      action: 'YOLOv8 Feature Embedding Vector Extraction & Ledger Seal',
      officer: 'Agent T. Thorne',
      badgeNo: 'INV-4401',
      timestamp: '2026-09-17 11:20:05 UTC',
      sourceHash: 'Unified Multi-Camera Timeline',
      outputHash: '9a88cde11029ba34fe9821a41b590e823b1029cb',
      integrityProof: 'Sealed',
    },
  ];

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none pb-8">

      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Phase 18 / Evidence Custody Record
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                IMMUTABLE AUDIT LOG LOCKED
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Chain of Custody Ledger
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Step-by-step cryptographic provenance record tracing digital evidence from physical platter extraction through neural timeline correlation.
            </p>
          </div>

          <button
            onClick={() => navigate('../report')}
            className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            Generate Report →
          </button>
        </div>
      </div>

      {/* 2. Top Telemetry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Ledger Entries</span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">04 Stages</span>
          <span className="text-[11px] text-zinc-500">Unbroken Custody</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Legal Admissibility</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">Rule 902(14)</span>
          <span className="text-[11px] text-zinc-500">Federal Self-Authenticating</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Root Verification</span>
          <span className="text-2xl sm:text-3xl font-black text-teal-300 mt-1">SHA-256</span>
          <span className="text-[11px] text-zinc-500">Zero Hash Inversion</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Platter Write-State</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">Zero Writes</span>
          <span className="text-[11px] text-zinc-500">Pure Non-Destructive Carve</span>
        </div>
      </div>

      {/* 3. Detailed Custody Chronology Timeline */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight uppercase">
              Sequential Custody Audit Trail
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Cryptographic handover signatures certifying source authenticity across each processing pipeline step.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg font-bold">
            CHAIN VERIFIED: 100% BIT-PARITY
          </span>
        </div>

        <div className="flex flex-col gap-4 relative">
          <div className="hidden sm:block absolute left-6 top-6 bottom-6 w-0.5 bg-zinc-800" />

          {custodyEntries.map((entry, index) => (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:border-zinc-700 transition-colors shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-xs font-bold text-teal-400 shrink-0 z-10 shadow">
                0{index + 1}
              </div>

              <div className="flex-1 flex flex-col gap-3 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-800/80 pb-2.5">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {entry.phase}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans mt-0.5">
                      {entry.action}
                    </p>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300">
                    {entry.integrityProof}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                    <span className="text-zinc-500 text-[10px] uppercase block">Timestamp</span>
                    <span className="text-zinc-200 font-semibold">{entry.timestamp}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                    <span className="text-zinc-500 text-[10px] uppercase block">Authorized Operator</span>
                    <span className="text-teal-300 font-semibold">{entry.officer} ({entry.badgeNo})</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 sm:col-span-2 lg:col-span-1">
                    <span className="text-zinc-500 text-[10px] uppercase block">Source Reference</span>
                    <span className="text-zinc-300 truncate block">{entry.sourceHash}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2.5 rounded-lg bg-black/60 border border-zinc-800/80 font-mono text-xs">
                  <div className="flex items-center gap-2 truncate max-w-xl">
                    <span className="text-teal-400 font-bold uppercase text-[10px]">Checkpoint SHA:</span>
                    <span className="text-zinc-300 truncate text-[11px]">{entry.outputHash}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(entry.outputHash)}
                    className="text-[11px] text-teal-400 hover:text-teal-300 cursor-pointer underline shrink-0 self-end sm:self-auto"
                  >
                    {copiedHash === entry.outputHash ? '✓ Checksum Copied' : 'Copy Checksum'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Judicial Attestation Seal */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-950/30 via-zinc-950 to-teal-950/20 border border-emerald-500/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/10">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-black text-xl shrink-0">
            ✓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white uppercase tracking-tight">
                Forensic Attestation & Legal Certification
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                CERTIFIED COMPLIANT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              I hereby certify that the digital evidence items detailed above were acquired, processed, carved, and evaluated under strict write-blocking controls. The cryptographic hash verification confirms zero bitstream alteration from point of physical intake.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Navigation Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
        <button
          onClick={() => navigate('../case-summary')}
          className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
        >
          ← Return to Case Summary
        </button>

        <button
          onClick={() => navigate('../report')}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          Generate Report →
        </button>
      </div>

    </div>
  );
}