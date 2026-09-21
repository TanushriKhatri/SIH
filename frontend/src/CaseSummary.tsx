import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CaseSummary(): React.JSX.Element {
  const navigate = useNavigate();
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const fullHash = '7d79ce9b85bd11c1d42a98f1234bcfe81109923a41b590e823b1029cba41e210';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(fullHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none pb-8">

      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-indigo-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Case Dossier / CASE-001
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                OPERATION NIGHTFALL • SEALED
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Executive Case Summary
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Consolidated investigative findings, disk recovery metrics, timeline reconciliations, and cross-camera subject tracking data.
            </p>
          </div>

          <button
            onClick={() => navigate('../chain-of-custody')}
            className="self-start sm:self-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            View Chain of Custody →
          </button>
        </div>
      </div>

      {/* 2. Top Metric Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Active Ingestion</span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">3.6 TB</span>
          <span className="text-[11px] text-zinc-500">16 Continuous Feeds</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Carved Slack</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">14,392</span>
          <span className="text-[11px] text-zinc-500">5.1 GB Restored Slices</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Frames Analyzed</span>
          <span className="text-2xl sm:text-3xl font-black text-teal-300 mt-1">142.5k</span>
          <span className="text-[11px] text-zinc-500">YOLOv8 + ByteTrack Re-ID</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Track Integrity</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">100%</span>
          <span className="text-[11px] text-zinc-500">Correlated Cross-Camera</span>
        </div>
      </div>

      {/* 3. Side-by-Side Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Evidence Profile */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                  Hardware & Acquisition Profile
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                PHYSICAL LAYER
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Device Spec</span>
                <span className="text-zinc-200 font-bold">Dahua NVR (Proprietary DHFS)</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Storage Media</span>
                <span className="text-zinc-200 font-bold">WD Purple 4TB (WD-WCC6Y6A)</span>
              </div>

              <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 uppercase">Image SHA-256 Hash</span>
                  <button
                    onClick={handleCopyHash}
                    className="text-[10px] text-teal-300 hover:text-teal-200 cursor-pointer underline"
                  >
                    {copiedHash ? '✓ Copied' : 'Copy Hash'}
                  </button>
                </div>
                <span className="text-[11px] text-zinc-300 font-mono break-all pt-0.5">
                  {fullHash}
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Acquisition Protocol</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified & Write-Blocked
                </span>
              </div>
            </div>
          </div>

          <span className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
            Compliant with ISO/IEC 27037 forensic imaging requirements.
          </span>
        </div>

        {/* Forensic Processing */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                  Reconstruction Telemetry
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                PROCESSING LOG
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Surveillance Feeds</span>
                <span className="text-cyan-400 font-bold">16 Channels Active</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Allocated Payload</span>
                <span className="text-zinc-200 font-bold">3.6 TB Extracted (78.2%)</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Deleted Data Carved</span>
                <span className="text-amber-400 font-bold">14,392 Fragments (5.1 GB)</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                <span className="text-zinc-400 uppercase">Clock Normalization</span>
                <span className="text-zinc-200 font-bold">UTC -05:00 (+3m 14s drift compensated)</span>
              </div>
            </div>
          </div>

          <span className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
            Proprietary Dahua indices mapped directly to LBA sector boundaries.
          </span>
        </div>
      </div>

      {/* 4. AI Investigation Highlights Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight uppercase">
              AI Vision & Investigative Breakthrough
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 rounded font-bold">
            PROBATIVE VALUE: HIGH
          </span>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            The neural inference module ingested <strong className="text-white font-mono">142,500</strong> normalized video frames across unified PTS presentation timelines:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Detection Cluster</span>
              <span className="text-base font-bold text-emerald-400">23 Distinct Persons</span>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Classified and bounded via YOLOv8 with centroid tracking across all zones.
              </p>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Cross-Camera Track</span>
              <span className="text-base font-bold text-teal-300">Target Track TRK-088</span>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Successfully re-identified traversing between CH04 (Lobby) and CH01 (Gate).
              </p>
            </div>

            <div className="bg-zinc-900/90 border border-amber-500/40 bg-amber-950/10 rounded-xl p-3.5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Carved Slack Match</span>
              <span className="text-base font-bold text-amber-300">Restored Gap (14:31:05)</span>
              <p className="text-xs text-zinc-300 font-sans mt-0.5">
                Target positively spotted in carved fragment FRG-9921 after deletion attempt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Navigation Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
        <button
          onClick={() => navigate('../evidence-validation')}
          className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
        >
          ← Return to Evidence Validation
        </button>

        <button
          onClick={() => navigate('../chain-of-custody')}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          View Chain of Custody →
        </button>
      </div>

    </div>
  );
}