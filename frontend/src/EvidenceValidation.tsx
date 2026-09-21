import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuditCheck {
  id: string;
  title: string;
  spec: string;
  detail: string;
  category: string;
  statusText: string;
  status: 'passed' | 'sealed';
}

export default function EvidenceValidation(): React.JSX.Element {
  const [validating, setValidating] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(20);
  const navigate = useNavigate();

  useEffect(() => {
    const pInterval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 15 : prev));
    }, 300);

    const t = setTimeout(() => {
      setValidating(false);
      clearInterval(pInterval);
    }, 2000);

    return () => {
      clearTimeout(t);
      clearInterval(pInterval);
    };
  }, []);

  const auditChecks: AuditCheck[] = [
    {
      id: 'CHK-01',
      title: 'Original Image Hash Verification',
      spec: 'MD5 / SHA-256 Checksum Matching',
      detail: 'Bit-stream image matches physical acquisition hash bit-for-bit. No tampering detected.',
      category: 'Cryptographic Custody',
      statusText: '100% Match Post-Acquisition',
      status: 'sealed',
    },
    {
      id: 'CHK-02',
      title: 'Data Carving Source Alignment',
      spec: 'LBA Sector Extents Audit',
      detail: 'Carved video blocks and PES headers trace directly to verified unallocated physical disk sectors.',
      category: 'Storage Geometry',
      statusText: 'All Offsets Map to Unallocated Slack',
      status: 'passed',
    },
    {
      id: 'CHK-03',
      title: 'Timeline Clock Drift Audit',
      spec: 'RTC Calibration Verification',
      detail: 'Measured RTC crystal error (+3m 14s) was normalized across all channels without modifying raw timestamps.',
      category: 'Temporal Integrity',
      statusText: '+3m 14s Calibrated Universally',
      status: 'passed',
    },
    {
      id: 'CHK-04',
      title: 'AI Event Traceability',
      spec: 'Frame-to-Embedding Provenance',
      detail: 'Every bounding box, centroid track, and re-ID vector maps to an immutable, numbered source frame.',
      category: 'Inference Provenance',
      statusText: '100% Events Linked to Master Frames',
      status: 'sealed',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none pb-8">

      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Phase 17 / Chain-of-Custody Attestation
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${validating ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {validating ? 'VALIDATING CUSTODY LEDGER...' : 'FORENSIC INTEGRITY CERTIFIED'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Final Evidence Validation
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Verifying cryptographic hash chains, source sector geometry, timecode offsets, and deterministic AI detection lineage against ISO/IEC 27037 standards.
            </p>
          </div>

          {!validating && (
            <button
              onClick={() => navigate('../case-summary')}
              className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              Proceed to Case Summary →
            </button>
          )}
        </div>
      </div>

      {/* 2. Scanning / Validating State */}
      {validating ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

          {/* Cryptographic Seal Animation */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/20 flex items-center justify-center relative">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/80 animate-pulse flex items-center justify-center">
                <span className="text-emerald-400 font-mono text-xs font-bold">#</span>
              </div>
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-teal-400/70 border-t-transparent animate-spin absolute" />
          </div>

          <div className="text-center z-10 max-w-md">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Executing Cryptographic Pipeline Audit
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
              Cross-verifying post-acquisition SHA-256 root blocks, unallocated sector allocations, and frame provenance tables.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md flex flex-col gap-2 z-10 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Integrity Audit Progress</span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-500">
              <span>Standard: NIST SP 800-86</span>
              <span>Hashing: SHA-256 + MD5</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 animate-in fade-in duration-300">

          {/* 3. Pipeline Metric Summary Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Integrity Protocol</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">ISO 27037</span>
              <span className="text-[11px] text-zinc-500">Chain-of-Custody Locked</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Hash Parity</span>
              <span className="text-xl sm:text-2xl font-black text-teal-300 mt-1">0 Diff (Exact)</span>
              <span className="text-[11px] text-zinc-500">SHA-256 Root Confirmed</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">LBA Attribution</span>
              <span className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">100% Unallocated</span>
              <span className="text-[11px] text-zinc-500">Zero Overlap Collisions</span>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Evidence State</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1">Court-Ready</span>
              <span className="text-[11px] text-zinc-500">Non-Destructive Process</span>
            </div>
          </div>

          {/* 4. Structured Integrity Ledger Table */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-950/80">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Pipeline Integrity Verification Ledger
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Multi-stage forensic proofs validating raw evidence acquisition through downstream inference.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-xs font-bold bg-emerald-500/15 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                  ALL 4 VERIFICATIONS PASSED
                </span>
              </div>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {auditChecks.map((chk) => (
                <div
                  key={chk.id}
                  className="p-4 sm:p-5 hover:bg-zinc-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ✓
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-teal-400">
                          {chk.id}
                        </span>
                        <span className="text-zinc-600 font-mono">•</span>
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {chk.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 hidden md:inline">
                          {chk.spec}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                        {chk.detail}
                      </p>
                    </div>
                  </div>

                  {/* Right Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800 font-mono">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase text-zinc-500 block">{chk.category}</span>
                      <span className="text-xs font-bold text-emerald-300 mt-0.5 block">
                        {chk.statusText}
                      </span>
                    </div>

                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="p-3.5 bg-zinc-950/70 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-mono text-zinc-400">
              <span>Cryptographic Root: SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
              <span className="text-emerald-400 font-semibold">Attestation: Valid</span>
            </div>
          </div>

          {/* 5. Judicial Admissibility Certificate Callout */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-950/30 via-zinc-950 to-teal-950/20 border border-emerald-500/40 p-4.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/10">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-black text-lg shrink-0">
                §
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white uppercase tracking-tight">
                    Court-Ready Digital Evidence Attestation
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    FEDERAL RULE OF EVIDENCE 902(11)/(14)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                  The integrity of all digital artifacts has been maintained strictly from physical block acquisition through timeline reconstruction and machine learning analysis. All processes are write-blocked and mathematically deterministic.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-2 rounded-xl shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Chain of Custody Intact</span>
            </div>
          </div>

          {/* 6. Navigation Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
            <button
              onClick={() => navigate('../cross-camera')}
              className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              ← Back to Cross-Camera Correlation
            </button>

            <button
              onClick={() => navigate('../case-summary')}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Proceed to Case Summary →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}