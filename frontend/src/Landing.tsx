import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col relative overflow-hidden select-none">

      {/* Cybernetic Grid & Radar Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-teal-500/10 rounded-full animate-[spin_90s_linear_infinite]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-500/15 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Top Header Navbar */}
      <header className="flex justify-between items-center p-6 lg:px-12 relative z-10 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 shadow-lg shadow-teal-500/20 flex items-center justify-center font-mono font-black text-zinc-950 text-sm">
            TV
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider text-white">TRACEVAULT</span>
            <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase">Multi-OEM Forensic Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="px-5 py-2.5 text-zinc-300 hover:text-white transition-colors font-semibold cursor-pointer"
          >
            Examiner Portal
          </button>
          <button
            onClick={() => navigate('/auth?mode=signup')}
            className="px-5 py-2.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:brightness-110 active:scale-[0.98] text-zinc-950 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            Initialize Workspace →
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 max-w-6xl mx-auto py-16 sm:py-24">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-teal-400 text-xs font-mono font-bold tracking-widest mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          MULTI-VENDOR DVR / NVR SURVEILLANCE FORENSIC ANALYSIS SUITE
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
          Unified Multi-Vendor <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400">
            Surveillance Intelligence Platform
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mb-8 leading-relaxed font-sans">
          Standardizing acquisition, unallocated space carving, cross-vendor format decoding, clock drift normalization, and AI-driven analytics across major NVR OEMs.
        </p>

        {/* Supported OEMs Ticker Tag Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-[11px] text-zinc-400">
          <span className="text-zinc-500 uppercase mr-1">Supported OEMs:</span>
          {['HIKVISION', 'Dahua Technology', 'CP Plus', 'Honeywell', 'Uniview', 'Matrix', 'Godrej', 'TP-Link'].map((oem, idx) => (
            <span key={idx} className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-zinc-300 font-semibold">
              {oem}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-mono text-xs">
          <button
            onClick={() => navigate('/timeline')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 rounded-xl font-black uppercase tracking-wider transition-all shadow-xl shadow-teal-500/25 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Launch Forensic Workflow</span>
            <span>→</span>
          </button>

          <button
            onClick={() => navigate('/architecture')}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Explore System Architecture
          </button>
        </div>

        {/* Broad-Scope Feature Cards matching problem statement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20 text-left w-full">
          
          <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30 flex items-center justify-center text-xl mb-4 font-mono font-bold">
                01
              </div>
              <h3 className="font-bold text-white text-base tracking-tight mb-2">
                Multi-OEM Format Parsing
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Automated model identification, proprietary filesystem parsing (DHFS, etc.), and raw bit-stream E01 imaging across 8+ major manufacturers.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-800 font-mono text-[11px] text-cyan-400 font-semibold">
              Vendor-Agnostic Extraction
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/30 flex items-center justify-center text-xl mb-4 font-mono font-bold">
                02
              </div>
              <h3 className="font-bold text-white text-base tracking-tight mb-2">
                Deep Carving & Normalization
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Recover deleted PES video blocks from unallocated slack space while automatically neutralizing hardware clock drift into an ISO-8601 timeline.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-800 font-mono text-[11px] text-indigo-400 font-semibold">
              Unallocated Slack Recovery
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30 flex items-center justify-center text-xl mb-4 font-mono font-bold">
                03
              </div>
              <h3 className="font-bold text-white text-base tracking-tight mb-2">
                AI Analytics & Legal Admissibility
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                YOLOv8 & ByteTrack anomaly correlation combined with cryptographic SHA-256 validation for Federal Rules of Evidence compliance.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-800 font-mono text-[11px] text-amber-400 font-semibold">
              FRE 902(11)/(14) Certified
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-zinc-500 text-xs border-t border-zinc-800/80 bg-zinc-950 font-mono relative z-10 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span>&copy; 2026 TRACEVAULT Multi-Vendor DVR/NVR Forensic Platform. All rights reserved.</span>
        <span className="text-emerald-400">Secure Write-Block Environment • ISO/IEC 27037</span>
      </footer>

    </div>
  );
}