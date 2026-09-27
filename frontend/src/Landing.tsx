import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing(): React.JSX.Element {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020611] text-slate-100 font-sans flex flex-col relative overflow-hidden select-none">
      
      {/* ================= BACKGROUND VIDEO & OPTICAL LAYERS ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-200 z-0"
        >
          <source src="/background.mp4" type="video/mp4" />
          <source src="/background.webm" type="video/webm" />
        </video>

        {/* Global Dark Base Scrim (Ensures baseline contrast across all screen sizes) */}
        <div className="absolute inset-0 bg-[#020611]/65 z-[1]" />

        {/* Directional Hero Scrim: Dims the left text area while keeping video vivid elsewhere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020611]/95 via-[#020611]/75 to-transparent z-[2]" />
        
        {/* Optical grid overlay */}
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_60%,transparent_100%)] opacity-0" />
        
        {/* Dynamic Lens Flare and Glow Spots */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none z-[3]" />
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-blue-600/15 blur-[180px] rounded-full pointer-events-none z-[3]" />
        <div className="absolute -bottom-24 left-1/3 w-[500px] h-[500px] bg-sky-400/10 blur-[150px] rounded-full pointer-events-none z-[3]" />

        {/* Outer Circular Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-cyan-500/10 rounded-full animate-[spin_160s_linear_infinite] z-[3]" />
      </div>

      {/* ================= TOP SURVEILLANCE NAVBAR ================= */}
      <header className="flex justify-between items-center px-6 lg:px-14 py-4 relative z-20 border-b border-cyan-900/50 bg-[#020713]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-400 shadow-[0_0_22px_rgba(6,182,212,0.45)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] transition-all">
            <span className="text-slate-950 font-mono font-black text-sm tracking-widest">TV</span>
            <div className="absolute inset-0 rounded-xl border border-cyan-200/50 animate-ping opacity-290" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                TRACE<span className="text-cyan-400">VAULT</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-semibold">
                v4.2
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-cyan-300 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Forensic Video Intelligence Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="px-5 py-2.5 text-slate-200 hover:text-white bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-700/60 hover:border-cyan-500/40 rounded-xl transition-all cursor-pointer font-semibold backdrop-blur-md"
          >
            Examiner Portal
          </button>
          <button
            onClick={() => navigate('/auth?mode=signup')}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 active:scale-[0.98] text-slate-950 rounded-xl font-extrabold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.45)] cursor-pointer"
          >
            Initialize Workspace
          </button>
        </div>
      </header>

      {/* ================= HERO CONTENT (SPLIT CAMERA HUD) ================= */}
      <main className="flex-1 flex flex-col justify-center px-6 lg:px-14 relative z-10 max-w-7xl mx-auto py-12 lg:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Action Elements */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Live Camera Feed Telemetry Indicator */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#020b18]/90 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-6 w-fit shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-750" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </span>
              <span>LIVE CCTV SENSOR FEED ACTIVE • WRITE-BLOCKED</span>
            </div>

            {/* High-Contrast Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              AI-Powered<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 drop-shadow-[0_2px_15px_rgba(6,182,212,0.5)]">
                DVR/NVR Forensic Investigation & Evidence Reconstruction
              </span>
            </h1>

            {/* High-Readability Description */}
            <p className="text-base text-slate-100 max-w-2xl mb-8 leading-relaxed font-sans font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] bg-slate-950/40 p-4 rounded-xl border border-cyan-500/20 backdrop-blur-md">
              High-throughput surveillance acquisition, fragmented raw PES bitstream carving, hardware timestamp drift normalization, and neural anomaly tracking across 8+ major DVR/NVR manufacturers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs mb-10">
              <button
                onClick={() => navigate('/auth?mode=signup')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 hover:brightness-110 active:scale-[0.98] text-slate-950 rounded-xl font-black uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(6,182,212,0.45)] cursor-pointer flex items-center gap-2"
              >
                <span>Launch Analysis Session</span>
                <span className="text-base">→</span>
              </button>

              <button
                onClick={() => navigate('/case/CASE-001/architecture')}
                className="px-7 py-4 bg-[#051126]/90 hover:bg-cyan-950/80 border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                Inspect Pipeline Architecture
              </button>
            </div>

            {/* Supported OEMs Bar */}
            <div className="pt-6 border-t border-cyan-900/60 bg-slate-950/30 p-4 rounded-xl backdrop-blur-sm border border-cyan-900/30">
              <div className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase mb-3 font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Multi-Vendor Hardware Support:
              </div>
              <div className="flex flex-wrap gap-2">
                {['HIKVISION', 'Dahua', 'CP Plus', 'Honeywell', 'Uniview', 'Matrix', 'TP-Link'].map((brand, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#051126]/90 border border-cyan-700/50 text-[11px] font-mono font-semibold text-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: CCTV Surveillance HUD Container */}
          <div className="lg:col-span-5 relative group">
            
            {/* Ambient Background Glow matching camera lens */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-500" />

            {/* Camera Viewport Frame */}
            <div className="relative rounded-2xl border border-cyan-500/50 bg-[#030917]/95 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-xl">
              
              {/* CCTV Camera Asset */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <video
                  src="/camAni.mp4"
                  className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={(e) => {
                    (e.currentTarget as HTMLVideoElement).src = "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* Animated Optical Radar Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-20 w-full animate-[bounce_4s_infinite_alternate] pointer-events-none border-b border-cyan-400/40" />

                {/* HUD Camera Crosshairs */}
                <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between font-mono text-[10px] text-cyan-300">
                  <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-lg">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      REC [CH_01_RAW]
                    </span>
                    <span className="font-semibold text-cyan-200">1080P • 60FPS</span>
                  </div>

                  {/* Center Target Box */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-cyan-400/50 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 border-t-2 border-l-2 border-cyan-400 absolute top-0 left-0" />
                    <div className="w-2 h-2 border-t-2 border-r-2 border-cyan-400 absolute top-0 right-0" />
                    <div className="w-2 h-2 border-b-2 border-l-2 border-cyan-400 absolute bottom-0 left-0" />
                    <div className="w-2 h-2 border-b-2 border-r-2 border-cyan-400 absolute bottom-0 right-0" />
                    <span className="text-[9px] text-cyan-300 font-mono tracking-widest font-bold">AI_LOCK</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-lg font-semibold">
                    <span>BITSTREAM: H.265 / HEVC</span>
                    <span className="text-emerald-400">MD5: VERIFIED</span>
                  </div>
                </div>

              </div>

              {/* Lower HUD Metrics Panel */}
              <div className="p-4 bg-[#051126]/95 border-t border-cyan-900/60 flex justify-between items-center font-mono text-xs text-slate-200">
                <div>
                  <div className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider">Input Telemetry</div>
                  <div className="font-bold text-white">NVR Direct Channel 04</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Integrity Status</div>
                  <div className="text-emerald-300 font-bold">Hash Lock 100%</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ================= 3-COLUMN CAPABILITY MODULES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          
          {/* Card 1 */}
          <div className="bg-[#050f24]/85 backdrop-blur-2xl border border-cyan-800/50 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:border-cyan-400 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-cyan-500/15 text-cyan-300 rounded-xl border border-cyan-500/40 flex items-center justify-center text-sm font-mono font-bold mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                01
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">
                Multi-OEM Format Parsing
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Automated model identification, proprietary filesystem parsing (DHFS, Hikvision Index, CP Plus), and unallocated E01 disk stream extraction.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-900/60 font-mono text-[11px] text-cyan-300 font-bold flex items-center justify-between">
              <span>Vendor-Agnostic Extraction</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#050f24]/85 backdrop-blur-2xl border border-sky-800/50 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:border-sky-400 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-sky-500/15 text-sky-300 rounded-xl border border-sky-500/40 flex items-center justify-center text-sm font-mono font-bold mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                02
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">
                Deep Block Carving & Reassembly
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Reconstitute overwritten, fragmented, or orphan video frames from unallocated clusters while synchronizing drifted timestamps to an ISO-8601 master line.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-900/60 font-mono text-[11px] text-sky-300 font-bold flex items-center justify-between">
              <span>Unallocated Slack Recovery</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#050f24]/85 backdrop-blur-2xl border border-blue-800/50 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:border-blue-400 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-500/15 text-blue-300 rounded-xl border border-blue-500/40 flex items-center justify-center text-sm font-mono font-bold mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                03
              </div>
              <h3 className="font-extrabold text-white text-base tracking-tight mb-2">
                Chain of Custody & Evidence Seal
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Cryptographic SHA-256 block-level verification with exportable legal audit logs structured for FRE 902(11)/(14) courtroom validation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-blue-900/60 font-mono text-[11px] text-blue-300 font-bold flex items-center justify-between">
              <span>FRE 902(11)/(14) Certified</span>
              <span>→</span>
            </div>
          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-5 px-6 lg:px-14 text-center text-slate-400 text-xs border-t border-cyan-900/50 bg-[#020713]/95 backdrop-blur-md font-mono relative z-20 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span>&copy; 2026 TRACEVAULT Multi-Vendor Surveillance Forensic Platform.</span>
        <div className="flex items-center gap-2 text-cyan-300 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Complies with ISO/IEC 27037 Digital Evidence Principles</span>
        </div>
      </footer>

    </div>
  );
}