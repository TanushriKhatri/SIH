import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Play,
  Film,
  Activity,
  Layers,
  Sparkles,
  Cpu,
  Eye,
  X,
  FileCheck,
  Clock,
  HardDrive,
  Camera
} from 'lucide-react';

interface RecoveredVideo {
  id: string;
  camera: string;
  filename: string;
  timestamp: string;
  duration: string;
  coverage: string;
  confidence: number;
  path: string;
}

const recoveredVideos: RecoveredVideo[] = [
  {
    id: 'REC-001',
    camera: 'Camera 01',
    filename: 'recovered_camera_01.mp4',
    timestamp: '2026-09-10 10:15:31',
    duration: '02:34',
    coverage: '94%',
    confidence: 96,
    path: '/recovered-video-01.mp4',
  },
  {
    id: 'REC-002',
    camera: 'Camera 02',
    filename: 'recovered_camera_02.mp4',
    timestamp: '2026-09-10 10:16:02',
    duration: '01:48',
    coverage: '87%',
    confidence: 91,
    path: '/recovered-video-02.mp4',
  },
  {
    id: 'REC-003',
    camera: 'Camera 03',
    filename: 'recovered_camera_03.mp4',
    timestamp: '2026-09-10 10:17:14',
    duration: '03:12',
    coverage: '83%',
    confidence: 88,
    path: '/recovered-video-03.mp4',
  },
];

export default function RecoveryValidation(): React.JSX.Element {
  const [selectedVideo, setSelectedVideo] = useState<RecoveredVideo | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);

  const handleSelectVideo = (video: RecoveredVideo): void => {
    setSelectedVideo(video);
    setVideoError(false);
  };

  const closeViewer = (): void => {
    setSelectedVideo(null);
    setVideoError(false);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 p-3 sm:p-6 lg:p-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Dynamic Ambient Background Glow Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="fixed top-[35%] right-[20%] w-[450px] h-[450px] rounded-full bg-teal-600/10 blur-[150px] pointer-events-none" />

      {/* Cyber Grid Pattern Accent */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col gap-6 z-10 select-none">

        {/* 1. Header Card */}
        <header className="relative rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-teal-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(20,184,166,0.12)] overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/15 via-teal-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-400/40 shadow-[0_0_12px_rgba(20,184,166,0.35)] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  Phase 12 // Final Verification
                </span>
                <span className="text-xs text-zinc-300 font-mono flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="text-emerald-400 font-semibold tracking-wide">
                    INTEGRITY AUDIT COMPLETE
                  </span>
                </span>
              </div>

              {/* Glowing High-Impact Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
                Recovery <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.7)]">Validation</span>
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Validate reconstructed surveillance recordings, review forensic bitstream hash signatures, and inspect playback integrity.
              </p>
            </div>

            {/* Overall Status Badge */}
            <div className="flex items-center gap-3 bg-zinc-950/80 border border-emerald-500/30 px-5 py-3.5 rounded-2xl font-mono shadow-[0_0_25px_rgba(16,185,129,0.15)] self-start lg:self-auto backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Audit Verdict</span>
                <span className="text-emerald-400 font-extrabold text-sm uppercase tracking-wider drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]">
                  Successfully Recovered
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 2. Recovery Summary Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950/80 border border-cyan-500/20 p-5 rounded-2xl flex flex-col justify-between gap-1 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              Recovered Recordings
            </span>
            <span className="text-3xl sm:text-4xl font-black font-mono text-cyan-400 mt-2 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
              0{recoveredVideos.length}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Muxed Playable Streams</span>
          </div>

          <div className="bg-zinc-950/80 border border-amber-500/20 p-5 rounded-2xl flex flex-col justify-between gap-1 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Reconstruction Coverage
            </span>
            <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400 mt-2 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
              88%
            </span>
            <span className="text-[11px] font-mono text-zinc-500">Mean Frame Continuity</span>
          </div>

          <div className="bg-zinc-950/80 border border-emerald-500/20 p-5 rounded-2xl flex flex-col justify-between gap-1 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Frame Structure
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-2 drop-shadow-[0_0_12px_rgba(52,211,153,0.7)] flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" /> Validated
            </span>
            <span className="text-[11px] font-mono text-zinc-500">GOP & PTS Aligned</span>
          </div>

          <div className="bg-zinc-950/80 border border-emerald-500/20 p-5 rounded-2xl flex flex-col justify-between gap-1 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
            <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              Evidence Integrity
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-2 drop-shadow-[0_0_12px_rgba(52,211,153,0.7)] flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" /> Validated
            </span>
            <span className="text-[11px] font-mono text-zinc-500">SHA-256 Hash Confirmed</span>
          </div>
        </div>

        {/* 3. Validation Result Callout Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/50 via-zinc-950 to-teal-950/40 border border-emerald-500/40 p-5 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center text-xl font-bold shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_#34d399]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                Recovery Validation Complete
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed">
                Reconstructed surveillance fragments have passed GOP validation, atom headers were compiled, and streams are ready for chain-of-custody export.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0 self-start sm:self-auto">
            <span className="text-xs font-mono font-black text-emerald-300 uppercase tracking-wider drop-shadow-[0_0_6px_#34d399]">
              ✓ Ready for Review
            </span>
          </div>
        </div>

        {/* 4. Recovered Recordings Manifest */}
        <div className="bg-zinc-950/80 border border-teal-500/20 rounded-3xl p-5 sm:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-2">
                <Film className="w-4 h-4 text-teal-400" />
                Recovered Recordings Manifest
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Select any recovered channel stream to trigger the forensic preview node.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              {recoveredVideos.length} recordings indexed
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            {recoveredVideos.map((video) => (
              <div
                key={video.id}
                className="border border-zinc-800/80 hover:border-teal-400/60 bg-zinc-900/60 hover:bg-zinc-900/90 p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-[0_0_25px_rgba(20,184,166,0.15)] group"
              >
                {/* Left Stream Details */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-teal-400 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-all duration-300">
                    <Play className="w-5 h-5 fill-teal-400/40 text-teal-300" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-black text-white text-base tracking-tight group-hover:text-teal-200 transition-colors">
                        {video.camera}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-700/80 text-cyan-300 font-bold shadow-inner">
                        {video.id}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-teal-300/90 mt-1 font-semibold flex items-center gap-1.5 drop-shadow-[0_0_6px_rgba(45,212,191,0.4)]">
                      <HardDrive className="w-3.5 h-3.5 text-teal-400" />
                      {video.filename}
                    </p>

                    <p className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {video.timestamp} · <span className="text-zinc-300 font-bold">{video.duration}</span>
                    </p>
                  </div>
                </div>

                {/* Right Metrics & Launch Button */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">Coverage</span>
                    <span className="text-sm font-black text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
                      {video.coverage}
                    </span>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">Confidence</span>
                    <span className="text-sm font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]">
                      {video.confidence}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectVideo(video)}
                    className="bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 active:scale-[0.97] text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-black transition-all cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(20,184,166,0.35)] hover:shadow-[0_0_20px_rgba(45,212,191,0.6)] flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Video Viewer Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
            onClick={closeViewer}
          >
            {/* Modal Box */}
            <div
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950/95 border border-teal-500/40 rounded-3xl shadow-[0_0_60px_rgba(20,184,166,0.25)] flex flex-col animate-in fade-in zoom-in-95 duration-200 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner Cyber Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-teal-400 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-teal-400 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-teal-400 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-teal-400 pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between p-5 sm:p-6 border-b border-zinc-800 bg-zinc-950/90 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Surveillance Playback Node
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      STREAM ACTIVE
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                    Recovered Video — <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]">{selectedVideo.camera}</span>
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    Captured: <span className="text-zinc-200">{selectedVideo.timestamp}</span> · Confidence: <span className="text-emerald-400 font-bold drop-shadow-[0_0_6px_#34d399]">{selectedVideo.confidence}%</span>
                  </p>
                </div>

                <button
                  onClick={closeViewer}
                  className="text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700/80 hover:border-teal-400 w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="Close video viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player & Metrics Canvas */}
              <div className="p-5 sm:p-6 flex flex-col gap-5 relative z-10">
                <div className="relative bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  {!videoError ? (
                    <video
                      key={selectedVideo.path}
                      controls
                      autoPlay
                      playsInline
                      className="w-full max-h-[50vh] object-contain bg-black"
                      onError={() => setVideoError(true)}
                    >
                      <source src={selectedVideo.path} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  ) : (
                    <div className="h-[340px] flex flex-col items-center justify-center text-center p-6 bg-zinc-950 font-mono">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-3">
                        <X className="w-6 h-6" />
                      </div>
                      <p className="text-rose-400 font-bold text-sm drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                        Unable to load recovered video stream
                      </p>
                      <p className="text-zinc-400 text-xs mt-1 max-w-sm">
                        Verify that the recovered MP4 file exists at the local target path:
                      </p>
                      <code className="text-cyan-300 text-xs mt-3 bg-zinc-900 px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        {selectedVideo.path}
                      </code>
                    </div>
                  )}
                </div>

                {/* Evidence Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold block">Recording ID</span>
                    <span className="text-cyan-400 font-extrabold text-sm mt-0.5 block drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">
                      {selectedVideo.id}
                    </span>
                  </div>

                  <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold block">Source Channel</span>
                    <span className="text-zinc-100 font-extrabold text-sm mt-0.5 block">
                      {selectedVideo.camera}
                    </span>
                  </div>

                  <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold block">Timestamp</span>
                    <span className="text-zinc-100 font-bold text-xs mt-1 block">
                      {selectedVideo.timestamp}
                    </span>
                  </div>

                  <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold block">Duration</span>
                    <span className="text-zinc-100 font-extrabold text-sm mt-0.5 block">
                      {selectedVideo.duration}
                    </span>
                  </div>

                  <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold block">Continuity Coverage</span>
                    <span className="text-amber-400 font-extrabold text-sm mt-0.5 block drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
                      {selectedVideo.coverage}
                    </span>
                  </div>

                  <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold block">Integrity Confidence</span>
                    <span className="text-emerald-400 font-extrabold text-sm mt-0.5 block drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]">
                      {selectedVideo.confidence}%
                    </span>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="flex justify-end pt-3 border-t border-zinc-800/80">
                  <button
                    onClick={closeViewer}
                    className="bg-zinc-900 hover:bg-zinc-800 hover:border-teal-400 text-zinc-200 hover:text-teal-200 px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-extrabold transition-all cursor-pointer border border-zinc-700 shadow-md hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}