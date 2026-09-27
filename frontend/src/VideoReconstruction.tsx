import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  RotateCcw, 
  Cpu, 
  Activity, 
  Film, 
  CheckCircle2, 
  Terminal as TerminalIcon, 
  Radio, 
  Sparkles, 
  FileVideo, 
  ChevronRight, 
  Download, 
  Eye, 
  X 
} from 'lucide-react';

interface FrameItem {
  id: string;
  num: string;
  type: 'IDR' | 'P-Frame' | 'B-Frame';
  desc: string;
  timestamp: string;
  nalType: string;
  macroblocks: string;
  bitrateKb: number;
}

const INITIAL_FRAMES: FrameItem[] = [
  { num: 'FRM_00', id: 'nal_01', type: 'IDR', desc: 'Keyframe Anchor', timestamp: '+00:00.000', nalType: 'NALU-0x05', macroblocks: '8160 MBs', bitrateKb: 620 },
  { num: 'FRM_15', id: 'nal_02', type: 'P-Frame', desc: 'Motion Delta A', timestamp: '+00:00.066', nalType: 'NALU-0x01', macroblocks: '3410 MBs', bitrateKb: 210 },
  { num: 'FRM_30', id: 'nal_03', type: 'P-Frame', desc: 'Motion Delta B', timestamp: '+00:00.133', nalType: 'NALU-0x01', macroblocks: '2980 MBs', bitrateKb: 195 },
  { num: 'FRM_45', id: 'nal_04', type: 'B-Frame', desc: 'Bidirectional Inter', timestamp: '+00:00.200', nalType: 'NALU-0x01', macroblocks: '1840 MBs', bitrateKb: 130 },
  { num: 'FRM_60', id: 'nal_05', type: 'P-Frame', desc: 'Motion Delta C', timestamp: '+00:00.266', nalType: 'NALU-0x01', macroblocks: '3200 MBs', bitrateKb: 205 },
  { num: 'FRM_75', id: 'nal_06', type: 'IDR', desc: 'Keyframe Boundary', timestamp: '+00:00.333', nalType: 'NALU-0x05', macroblocks: '8160 MBs', bitrateKb: 635 }
];

const TERMINAL_LOGS = [
  { at: 10, text: "Carving raw sector range 0x008E4100 -> 0x0091FF40", level: "info" },
  { at: 22, text: "NAL sequence unlocked: SPS (0x07) & PPS (0x08) synced", level: "cyan" },
  { at: 38, text: "GOP boundary locked: N=15, M=3. Baseline profile 0x42", level: "info" },
  { at: 52, text: "Discontinuity at offset 0x3F2: synthetic PTS insertion +33ms", level: "amber" },
  { at: 68, text: "Macroblock motion vector interpolation active (1080p)", level: "cyan" },
  { at: 82, text: "Synthesizing MP4 container atom hierarchy: [ftyp] [moov] [mdat]", level: "violet" },
  { at: 94, text: "All PES packets bound to target audio/video sync clock", level: "info" },
  { at: 100, text: "Reconstruction and bitstream validation verified successfully", level: "emerald" }
];

export default function VideoReconstruction(): React.JSX.Element {
  const navigate = useNavigate();

  const [progress, setProgress] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [selectedFrame, setSelectedFrame] = useState<FrameItem>(INITIAL_FRAMES[0]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [conversionDone, setConversionDone] = useState<boolean>(false);
  const [activeSpeed] = useState<number>(450);
  const [activeTab, setActiveTab] = useState<'stream' | 'telemetry'>('stream');
  
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll terminal log to bottom on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [progress, activeTab]);

  // Ticker for reconstruction stream
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(100, prev + 10);
        });
      }, activeSpeed);
    }
    return () => clearInterval(timer);
  }, [isRunning, progress, activeSpeed]);

  // Open modal and run the conversion sequence upon reaching 100%
  useEffect(() => {
    if (progress >= 100) {
      setShowModal(true);
      setConversionDone(false);
      const conversionTimer = setTimeout(() => {
        setConversionDone(true);
      }, 3400);
      return () => clearTimeout(conversionTimer);
    }
  }, [progress]);

  const handleReset = () => {
    setProgress(0);
    setConversionDone(false);
    setShowModal(false);
    setIsRunning(true);
  };

  const framesProcessed = Math.floor((progress / 100) * 18450);
  const isCompleted = progress >= 100;

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 p-3 sm:p-6 lg:p-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Dynamic Ambient Background Glow Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-emerald-600/10 blur-[130px] pointer-events-none" />
      <div className="fixed top-[40%] right-[25%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      
      {/* Background Cyber Grid Accent */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col gap-6 z-10">

        {/* Top Header Card */}
        <header className="relative rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.12)] overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-cyan-500/15 via-emerald-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.35)] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                  Phase 11 // Forensic Stream Synthesis
                </span>
                <span className="text-xs text-zinc-300 font-mono flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/60">
                  <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]'}`} />
                  <span className={isCompleted ? 'text-emerald-400 font-semibold' : 'text-cyan-300 font-semibold'}>
                    {isCompleted ? 'PIPELINE LOCKED & MUXED' : `REMUXING STREAM (${progress}%)`}
                  </span>
                </span>
              </div>

              {/* Glowing High-Impact Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
                Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]">Reconstruction</span>
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Sequencing carved NAL units, filling PTS gaps, resolving timestamp collisions, and muxing raw H.264 bitstreams into authenticated forensic MP4 containers.
              </p>
            </div>

            {/* Quick Metrics and Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="grid grid-cols-2 gap-3 bg-zinc-950/80 border border-cyan-500/25 p-3.5 rounded-2xl font-mono shadow-inner backdrop-blur-md">
                <div className="px-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Frames Muxed</span>
                  <span className="text-cyan-400 font-black text-lg drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                    {framesProcessed.toLocaleString()}
                  </span>
                </div>
                <div className="px-2 border-l border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Target Codec</span>
                  <span className="text-emerald-400 font-black text-lg drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                    H.264 / AVC
                  </span>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex sm:flex-col gap-2 justify-center">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 transition-all font-mono text-xs cursor-pointer shadow-md"
                  title="Pause / Resume Stream"
                >
                  {isRunning ? <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
                  {isRunning ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-400 hover:text-emerald-300 transition-all font-mono text-xs cursor-pointer shadow-md"
                  title="Re-run Simulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restart
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Reconstruction Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column (7 cols): GOP Filmstrip & Signal Pulse */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-cyan-500/20 rounded-3xl p-6 flex flex-col justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

            {/* Sub-header with Channel Status */}
            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
              <span className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 animate-ping shadow-[0_0_10px_#f43f5e]'}`} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-300 font-extrabold">
                  GOP Sequence Reconstitution (CH 01)
                </span>
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-cyan-500/30 text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                1080P @ 15 FPS
              </span>
            </div>

            {/* OSD Status Bar */}
            <div className="flex flex-wrap gap-2 justify-between items-center bg-zinc-900/90 px-4 py-3 rounded-2xl border border-zinc-800 font-mono text-xs shadow-inner">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-rose-400 font-bold uppercase tracking-wider drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]">
                  {isCompleted ? 'REASSEMBLED' : 'ACTIVE_MUXING'}
                </span>
              </div>
              <span className="text-zinc-400">2026-09-15 14:38:22 UTC</span>
              <span className="text-cyan-300 font-bold tracking-wide drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">
                PTS +00:16:12.440
              </span>
            </div>

            {/* Filmstrip Frame Pipeline Cards */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  Keyframe Anchor & Motion Delta Stitching
                </span>
                <span className="text-[11px] font-mono text-zinc-500">Click card for packet forensics</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {INITIAL_FRAMES.map((frame, idx) => {
                  const isStitched = ((idx + 1) / INITIAL_FRAMES.length) * 100 <= progress;
                  const isKeyframe = frame.type === 'IDR';
                  const isSelected = selectedFrame.num === frame.num;

                  return (
                    <button
                      key={frame.num}
                      onClick={() => setSelectedFrame(frame)}
                      className={`relative p-3 rounded-2xl border flex flex-col justify-between gap-1 text-center font-mono transition-all duration-300 cursor-pointer text-left ${
                        isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-zinc-950 scale-102' : ''
                      } ${
                        isStitched
                          ? isKeyframe
                            ? 'bg-gradient-to-b from-emerald-950/60 to-zinc-950 border-emerald-400/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'bg-gradient-to-b from-cyan-950/50 to-zinc-950 border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                          : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-600 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-zinc-400 font-semibold mb-1">
                        <span>{frame.num}</span>
                        {isStitched && (
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        )}
                      </div>

                      <span
                        className={`text-base font-black tracking-tight ${
                          isStitched
                            ? isKeyframe
                              ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]'
                            : 'text-zinc-600'
                        }`}
                      >
                        {frame.type}
                      </span>

                      <span className="text-[10px] text-zinc-400 font-sans truncate block mt-1" title={frame.desc}>
                        {isStitched ? frame.desc : 'Waiting...'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Frame Quick Info Panel */}
              <div className="mt-1 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    {selectedFrame.num}
                  </span>
                  <span className="text-zinc-300 font-semibold">{selectedFrame.desc}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400">
                  <span>NAL: <strong className="text-zinc-200">{selectedFrame.nalType}</strong></span>
                  <span>Spatial: <strong className="text-emerald-400">{selectedFrame.macroblocks}</strong></span>
                  <span>Chunk: <strong className="text-cyan-400">{selectedFrame.bitrateKb} KB</strong></span>
                </div>
              </div>

              {/* Linear Progress Bar with Neon Flow */}
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    PTS Alignment & Audio Clock Lock
                  </span>
                  <span className={isCompleted ? 'text-emerald-400 font-bold drop-shadow-[0_0_6px_#10b981]' : 'text-cyan-400 font-bold drop-shadow-[0_0_6px_#06b6d4]'}>
                    {progress}% Synced
                  </span>
                </div>
                <div className="relative w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.8)] relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Metric Bar */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono pt-2">
              <div className="bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-800 hover:border-cyan-500/40 transition-colors">
                <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Bitrate</span>
                <span className="text-base font-bold text-zinc-100 mt-0.5 block">4,120 kbps</span>
              </div>
              <div className="bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-800 hover:border-cyan-500/40 transition-colors">
                <span className="text-[10px] text-zinc-400 uppercase block font-semibold">GOP Topology</span>
                <span className="text-base font-bold text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)] mt-0.5 block">M=3, N=15</span>
              </div>
              <div className="bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-800 hover:border-emerald-500/40 transition-colors">
                <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Reconstitution State</span>
                <span className={`text-base font-bold mt-0.5 block ${isCompleted ? 'text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]' : 'text-amber-400'}`}>
                  {isCompleted ? 'LOCKED' : 'MUXING'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Diagnostics & Telemetry Visualizer */}
          <div className="lg:col-span-5 bg-zinc-950/80 border border-cyan-500/20 rounded-3xl p-6 flex flex-col justify-between gap-5 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl relative">
            <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/5 blur-3xl pointer-events-none" />

            {/* Diagnostic Header Tabs */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('stream')}
                  className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'stream' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Diagnostics Feed
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'telemetry' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Signal Telemetry
                </button>
              </div>

              <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                Pass 01 / 01
              </span>
            </div>

            {/* Circular Progress & Status Card */}
            <div className="flex items-center gap-5 bg-zinc-900/80 p-4 sm:p-5 rounded-2xl border border-zinc-800 shadow-inner relative overflow-hidden">
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1f242d" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={isCompleted ? '#10b981' : '#06b6d4'}
                    strokeWidth="8"
                    strokeDasharray={`${progress * 2.64} 264`}
                    strokeLinecap="round"
                    className="transition-all duration-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    {progress}%
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">
                    {isCompleted ? 'SYNCED' : 'BUILD'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {isCompleted ? 'Bitstream Packaging Finished' : 'De-duplicating Stream Slices'}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {isCompleted
                    ? 'Carved MPEG-PS fragments synthesized into standard MP4 containers with verified presentation timestamps.'
                    : 'Resolving sector overlaps, marking time gaps, and compiling header atom hierarchies.'}
                </p>
              </div>
            </div>

            {/* Terminal Console Feed or Telemetry Tab */}
            {activeTab === 'stream' ? (
              <div className="bg-black/90 border border-zinc-800 rounded-2xl p-4 font-mono text-xs sm:text-sm h-48 overflow-y-auto flex flex-col justify-start shadow-inner relative space-y-2">
                <div className="text-zinc-500 font-semibold sticky top-0 bg-black/90 pb-1 border-b border-zinc-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                    // FORENSIC MULTIPLEXER STREAM
                  </span>
                  <span className="text-[10px] text-zinc-600">LIVE FEED</span>
                </div>

                {TERMINAL_LOGS.filter(log => progress >= log.at).map((log, index) => (
                  <div key={index} className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-1 duration-200">
                    <span className="text-cyan-400 font-bold shrink-0">&gt;</span>
                    <span className={
                      log.level === 'emerald' ? 'text-emerald-400 font-bold drop-shadow-[0_0_6px_#10b981]' :
                      log.level === 'amber' ? 'text-amber-300 font-semibold' :
                      log.level === 'violet' ? 'text-purple-300' :
                      log.level === 'cyan' ? 'text-cyan-300 font-semibold' : 'text-zinc-300'
                    }>
                      {log.text}
                    </span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            ) : (
              /* Telemetry Visualizer Tab */
              <div className="bg-black/90 border border-zinc-800 rounded-2xl p-4 font-mono text-xs h-48 flex flex-col justify-between">
                <div className="flex justify-between items-center text-zinc-400 border-b border-zinc-900 pb-2">
                  <span>CH_01 BITSTREAM DENSITY WAVEFORM</span>
                  <span className="text-emerald-400 font-bold">14.2 MS JITTER</span>
                </div>

                {/* Simulated Audio/Video Frequency Waveform */}
                <div className="flex items-end justify-between gap-1 h-24 py-2 px-1">
                  {[45, 80, 20, 95, 60, 30, 85, 40, 100, 75, 45, 90, 65, 35, 70, 50, 85, 95, 30, 60, 40, 75, 90, 65].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${Math.min(val, (progress / 100) * val + 15)}%`,
                        backgroundColor: i % 3 === 0 ? '#06b6d4' : i % 2 === 0 ? '#10b981' : '#a855f7',
                        boxShadow: i % 3 === 0 ? '0 0 6px rgba(6,182,212,0.5)' : 'none'
                      }}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-900">
                  <span>AUDIO SYNCHRONIZATION: LOCKED</span>
                  <span>SYNC ERROR: &lt; 0.002%</span>
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              {isCompleted ? (
                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 border border-cyan-500/50 hover:bg-zinc-850 hover:border-cyan-400 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  >
                    <Eye className="w-4 h-4" />
                    Inspect MP4 Node
                  </button>

                  <button
                    onClick={() => {
                      navigate('../recovery-validation'); 
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 active:scale-[0.98] text-zinc-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Validate Video
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Muxing PES stream into MP4 container...
                  </span>
                  <span className="text-cyan-400 font-semibold">{framesProcessed} frames</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Centered Square Conversion Window / Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
          
          {/* Square Modal Shell */}
          <div className="relative w-84 h-84 sm:w-96 sm:h-96 rounded-3xl bg-zinc-950/95 border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col items-center justify-between p-7 overflow-hidden text-center backdrop-blur-2xl">
            
            {/* Corner Cyber Accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            {/* Glowing Mesh Center Reflection */}
            <div
              className={`absolute inset-0 bg-radial transition-opacity duration-1000 pointer-events-none ${
                conversionDone 
                  ? 'from-emerald-500/20 via-transparent' 
                  : 'from-cyan-500/20 via-transparent'
              }`}
            />

            {/* Modal Header */}
            <div className="relative z-10 w-full flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <FileVideo className="w-3.5 h-3.5 text-cyan-400" />
                Transmuxer Node // 01
              </span>
              
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-extrabold tracking-wider ${
                    conversionDone
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_#10b981]'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse shadow-[0_0_10px_#06b6d4]'
                  }`}
                >
                  {conversionDone ? 'COMPLETED' : 'PROCESSING'}
                </span>
                {conversionDone && (
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-zinc-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Central Animated Graphic Area */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              {!conversionDone ? (
                /* Rich Multi-Layered Futuristic Spinner Animation */
                <div className="relative w-32 h-32 flex items-center justify-center">
                  
                  {/* Outer pulsating radar wave */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
                  
                  {/* Outer gradient rotating halo */}
                  <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin shadow-[0_0_20px_#22d3ee]" />

                  {/* Counter-rotating neon emerald accent */}
                  <div
                    className="absolute inset-4 rounded-full border-2 border-transparent border-b-emerald-400 border-l-emerald-300 animate-spin drop-shadow-[0_0_10px_#34d399]"
                    style={{ animationDirection: 'reverse', animationDuration: '1.4s' }}
                  />

                  {/* Secondary dashed orbit */}
                  <div 
                    className="absolute inset-7 rounded-full border border-dashed border-purple-400/50 animate-spin"
                    style={{ animationDuration: '8s' }}
                  />

                  {/* Center Cyber Core */}
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <span className="text-cyan-300 font-mono text-xs font-black tracking-wider animate-pulse">
                      H.264
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400">TO MP4</span>
                  </div>
                </div>
              ) : (
                /* Completed State: Glowing Success Graphic */
                <div className="relative flex flex-col items-center gap-2 animate-in zoom-in-90 duration-300">
                  <div className="relative w-20 h-20 rounded-3xl bg-emerald-950/80 border-2 border-emerald-400/70 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-300 uppercase mt-1">
                    Container Muxed 100%
                  </span>
                </div>
              )}

              {/* Status Text with Dynamic Glowing Typography */}
              <div className="mt-4 flex flex-col items-center">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {!conversionDone ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                      Synthesizing MP4 Container...
                    </span>
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_16px_rgba(52,211,153,0.8)] font-black">
                      Video Converted to mp4 format
                    </span>
                  )}
                </h3>
                
                <p className="text-xs text-zinc-400 max-w-[270px] mt-1.5 leading-snug">
                  {!conversionDone
                    ? 'Writing moov & ftyp header atoms, synchronizing audio/video presentation clocks.'
                    : 'The reconstructed H.264 bitstream has been converted and packaged into standard MP4.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 w-full">
              {conversionDone ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Close & Inspect
                  </button>
                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob(['forensic_reconstruction_sample'], { type: 'video/mp4' });
                      element.href = URL.createObjectURL(file);
                      element.download = 'forensic_rec_ch01.mp4';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="py-2.5 px-3 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-zinc-200 hover:text-cyan-300 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    title="Export File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-900/60 py-2 rounded-xl border border-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Packing ISO BMFF atoms...</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}