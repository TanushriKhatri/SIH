import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForensicReport(): React.JSX.Element {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const masterSHA256 = '8f810aa7553b3b4f98129a0bc4c7183e29bb1802a450ce10993bcda4118029cb';
  const pdfFileName = 'forensic_examination_report.pdf';
  const pdfPath = `/${pdfFileName}`;
  const videoUrl = 'https://drive.google.com/file/d/1mz7VLgiDazIbyuo16yE0Gkl8yXfa_MY4/view?usp=sharing';

  const handleDownload = () => {
    setDownloading(true);
    // Trigger direct file download from public folder
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'CASE-001_Server_Breach_Examination_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 800);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(masterSHA256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none pb-12">

      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Phase 19 / Certified Case Deliverable
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                OFFICIAL PDF REPOSITORY LINKED
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Forensic Examination Report
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Download the court-certified PDF report containing physical drive acquisition logs, unallocated sector carving proofs, photographic evidence, and clickable video repository links.
            </p>
          </div>

          <button
            onClick={() => navigate('../chain-of-custody')}
            className="self-start sm:self-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            ← Custody Ledger
          </button>
        </div>
      </div>

      {/* 2. Main Action Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 shadow-xl">
        <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center text-3xl font-bold shadow-lg shadow-teal-950/40">
          PDF
        </div>

        <div className="max-w-lg">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Certified Examination Report Ready
          </h2>
          {/* <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
            Ensure <span className="font-mono text-zinc-200">{pdfFileName}</span> is placed in your project's <span className="font-mono text-teal-300">public/</span> folder.
          </p> */}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50 text-center"
          >
            {downloading ? 'Downloading...' : 'Download PDF Report ↓'}
          </button>

          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors text-center"
          >
            Preview in Tab ↗
          </a>
        </div>
      </div>

      {/* 3. Evidentiary Manifest & Video Quick Link */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <span className="font-bold text-white uppercase text-sm">Package Evidentiary Manifest</span>
          <button
            onClick={handleCopyHash}
            className="text-teal-300 hover:text-teal-200 cursor-pointer underline text-[11px]"
          >
            {copiedHash ? '✓ Checksum Copied' : 'Copy Root SHA-256'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block">Target PDF File</span>
            <span className="text-zinc-200 font-bold mt-0.5 block">{pdfPath}</span>
          </div>
          <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase block">External Video Repository</span>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline font-bold mt-0.5 block truncate"
            >
              Google Drive Evidence Link ↗
            </a>
          </div>
        </div>

        <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase block">Digital Evidence Root SHA-256</span>
          <span className="text-zinc-200 break-all text-[11px] block mt-1">
            {masterSHA256}
          </span>
        </div>
      </div>

      {/* 4. Return Home Bar */}
      <div className="flex justify-between items-center bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl font-mono text-xs">
        <span className="text-zinc-400">
          Investigation complete. All evidence archived in write-blocked storage.
        </span>

        <button
          onClick={() => navigate('/')}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-5 py-2 rounded-xl uppercase tracking-wider font-semibold transition-colors cursor-pointer"
        >
          Close Case Session
        </button>
      </div>

    </div>
  );
}