import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EvidencePackage {
  id: string;
  camera: string;
  fileName: string;
  timeRange: string;
  duration: string;
  fileSize: string;
  status: 'Ready for Review' | 'Verified';
}

export default function NormalizedEvidence(): React.JSX.Element {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState<boolean>(false);

  const evidenceFiles: EvidencePackage[] = [
    {
      id: 'EVD-01',
      camera: 'Camera 01 (Front Gate)',
      fileName: 'Camera_01_Normalized.mp4',
      timeRange: '10:15:31 – 10:18:05 UTC',
      duration: '02:34',
      fileSize: '142 MB',
      status: 'Ready for Review'
    },
    {
      id: 'EVD-02',
      camera: 'Camera 02 (Hallway East)',
      fileName: 'Camera_02_Normalized.mp4',
      timeRange: '10:16:02 – 10:17:50 UTC',
      duration: '01:48',
      fileSize: '98 MB',
      status: 'Ready for Review'
    },
    {
      id: 'EVD-03',
      camera: 'Camera 03 (Parking Rear)',
      fileName: 'Camera_03_Normalized.mp4',
      timeRange: '10:17:14 – 10:20:26 UTC',
      duration: '03:12',
      fileSize: '185 MB',
      status: 'Verified'
    }
  ];

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Forensic video evidence package downloaded successfully.');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-6">

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
              Evidence Standardization
            </span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              CONVERTED & READY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Normalized Evidence
          </h1>
          <p className="text-sm text-zinc-300 mt-1">
            Recovered proprietary recordings have been converted into standard, court-admissible video files.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <button
            onClick={handleExport}
            disabled={downloading}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            {downloading ? 'Exporting...' : 'Save Bundle ↓'}
          </button>
          <button
            onClick={() => navigate('../timeline')}
            className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Initialize Timeline Analysis →
          </button>
        </div>
      </div>

      {/* 2. Key Improvements Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4.5 flex flex-col gap-1.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold text-sm mb-1">
            ▶
          </div>
          <h3 className="text-base font-bold text-white">Universal MP4 Playback</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Plays in standard media players (VLC, Windows Media Player, QuickTime) without proprietary surveillance codecs.
          </p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4.5 flex flex-col gap-1.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-sm mb-1">
            ⏱
          </div>
          <h3 className="text-base font-bold text-white">Synchronized Timestamps</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All video angles are aligned to real-world standard time for easy multi-camera incident cross-referencing.
          </p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4.5 flex flex-col gap-1.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-sm mb-1">
            ✓
          </div>
          <h3 className="text-base font-bold text-white">Chain of Custody Preserved</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Cryptographically sealed and untampered, maintaining strict chain of custody for legal and investigative review.
          </p>
        </div>
      </div>

      {/* 3. Normalized Files Manifest */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Ready-to-Use Evidence Files
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Individual channel clips separated and packaged with timeline metadata.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg">
            {evidenceFiles.length} files prepared
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {evidenceFiles.map((file) => (
            <div
              key={file.id}
              className="bg-zinc-950/70 border border-zinc-800/90 hover:border-teal-500/50 p-4 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                  MP4
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {file.camera}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {file.id}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-teal-300 mt-0.5">
                    {file.fileName}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {file.timeRange} • <span className="text-zinc-300">{file.duration}</span> ({file.fileSize})
                  </p>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {file.status}
                </span>

                <button
                  onClick={() => alert(`Downloading ${file.fileName}...`)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  Save File
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Navigation Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
        <button
          onClick={() => navigate('../recovery-validation')}
          className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
        >
          ← Return to Video Player
        </button>

        <button
          onClick={() => navigate('../timeline')}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          Initialize Timeline Analysis →
        </button>
      </div>

    </div>
  );
}