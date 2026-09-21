import React, { useState } from 'react';

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
    <div className="max-w-6xl mx-auto flex flex-col gap-6 text-zinc-100 font-sans select-none">

      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
              Phase 12 / Final Verification
            </span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              INTEGRITY AUDIT COMPLETE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Recovery Validation
          </h1>
          <p className="text-sm text-zinc-300 mt-1">
            Validate reconstructed surveillance recordings and review recovered video evidence.
          </p>
        </div>

        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-bold">Successfully Recovered</span>
        </div>
      </div>

      {/* 2. Recovery Summary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
            Recovered Recordings
          </span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 mt-1">
            0{recoveredVideos.length}
          </span>
          <span className="text-xs font-mono text-zinc-500">Playable Streams</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
            Reconstruction Coverage
          </span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-1">
            88%
          </span>
          <span className="text-xs font-mono text-zinc-500">Mean Frame Continuity</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
            Frame Structure
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
            ✓ Validated
          </span>
          <span className="text-xs font-mono text-zinc-500">GOP & PTS Aligned</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-1 shadow-sm">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
            Evidence Integrity
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
            ✓ Validated
          </span>
          <span className="text-xs font-mono text-zinc-500">Hash Match Confirmed</span>
        </div>
      </div>

      {/* 3. Validation Result Callout */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-teal-950/20 border border-emerald-500/40 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-lg font-bold shrink-0">
            ✓
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Recovery Validation Complete
            </h3>
            <p className="text-sm text-zinc-300 mt-0.5">
              Reconstructed video fragments were validated and converted into viewable surveillance recordings.
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
          <span className="text-xs font-mono font-bold text-emerald-300">
            ✓ Successfully Recovered
          </span>
        </div>
      </div>

      {/* 4. Recovered Recordings Manifest */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Recovered Recordings
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Select a recovered recording to preview the reconstructed video.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg">
            {recoveredVideos.length} recordings
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {recoveredVideos.map((video) => (
            <div
              key={video.id}
              className="border border-zinc-800 hover:border-teal-500/60 bg-zinc-950/60 hover:bg-zinc-950 p-4 rounded-xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
                  <span className="text-lg">▶</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base tracking-tight">
                      {video.camera}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {video.id}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-teal-300 mt-0.5">
                    {video.filename}
                  </p>

                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {video.timestamp} · {video.duration}
                  </p>
                </div>
              </div>

              {/* Right Metrics & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <div className="text-left sm:text-right font-mono">
                  <span className="text-xs text-zinc-500 uppercase block">Coverage</span>
                  <span className="text-sm font-bold text-zinc-200">{video.coverage}</span>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-xs text-zinc-500 uppercase block">Confidence</span>
                  <span className="text-sm font-bold text-emerald-400">{video.confidence}%</span>
                </div>

                <button
                  onClick={() => handleSelectVideo(video)}
                  className="bg-zinc-800 hover:bg-teal-500 hover:text-zinc-950 text-white border border-zinc-700 hover:border-teal-500 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  View Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Normalized Recovered Evidence */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Normalized Recovered Evidence
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Recovered recordings and metadata are normalized for downstream timeline and AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-mono">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 uppercase font-semibold">Video Format</span>
            <span className="text-sm font-bold text-zinc-100 mt-0.5">H.264 / H.265</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 uppercase font-semibold">Timestamp</span>
            <span className="text-sm font-bold text-zinc-100 mt-0.5">Normalized</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 uppercase font-semibold">Camera IDs</span>
            <span className="text-sm font-bold text-zinc-100 mt-0.5">Preserved</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 uppercase font-semibold">Evidence Status</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5">Validated</span>
          </div>
        </div>
      </div>

      {/* 6. Video Viewer Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={closeViewer}
        >
          <div
            className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 border-b border-zinc-800 bg-zinc-950">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Recovered Video — {selectedVideo.camera}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {selectedVideo.timestamp} · Reconstruction confidence: {selectedVideo.confidence}%
                </p>
              </div>

              <button
                onClick={closeViewer}
                className="text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors cursor-pointer"
                aria-label="Close video viewer"
              >
                ✕
              </button>
            </div>

            {/* Video Container Canvas */}
            <div className="p-5 flex flex-col gap-4">
              <div className="bg-black rounded-xl overflow-hidden border border-zinc-800">
                {!videoError ? (
                  <video
                    key={selectedVideo.path}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[50vh] object-contain"
                    onError={() => setVideoError(true)}
                  >
                    <source src={selectedVideo.path} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <div className="h-[340px] flex flex-col items-center justify-center text-center p-6 bg-zinc-950 font-mono">
                    <p className="text-rose-400 font-bold text-sm">
                      Unable to load recovered video
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      Verify that the recovered video exists at:
                    </p>
                    <code className="text-zinc-300 text-xs mt-2 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">
                      {selectedVideo.path}
                    </code>
                  </div>
                )}
              </div>

              {/* Evidence Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase block">Recording ID</span>
                  <span className="text-cyan-400 font-bold text-sm mt-0.5 block">{selectedVideo.id}</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase block">Camera</span>
                  <span className="text-zinc-200 font-semibold text-sm mt-0.5 block">{selectedVideo.camera}</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase block">Timestamp</span>
                  <span className="text-zinc-200 font-semibold text-sm mt-0.5 block">{selectedVideo.timestamp}</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase block">Duration</span>
                  <span className="text-zinc-200 font-semibold text-sm mt-0.5 block">{selectedVideo.duration}</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase block">Coverage</span>
                  <span className="text-emerald-400 font-bold text-sm mt-0.5 block">{selectedVideo.coverage}</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase block">Confidence</span>
                  <span className="text-emerald-400 font-bold text-sm mt-0.5 block">{selectedVideo.confidence}%</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2 border-t border-zinc-800">
                <button
                  onClick={closeViewer}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer border border-zinc-700"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}