import React, { useEffect, useMemo, useRef, useState } from 'react';

interface TrackingPoint {
  time: number;

  // Bounding box as percentage of video dimensions
  x: number;
  y: number;
  width: number;
  height: number;

  confidence: number;
}

export default function FrameViewer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(12.17);

  /*
   * ACTUAL TRACKING TRAJECTORY
   *
   * Based on the movement of the red-shirt/red-shorts man
   * in the supplied CCTV footage.
   *
   * Video:
   * 858 x 512
   * ~30 FPS
   * ~12.17 seconds
   *
   * Coordinates are normalized to percentages of the frame.
   */
  const trackingData: TrackingPoint[] = [
    // --------------------------------------------------
    // 0 - 2 seconds
    // Person standing near the lower-middle/right
    // --------------------------------------------------

    {
      time: 0.0,
      x: 57.2,
      y: 54.5,
      width: 7.0,
      height: 18.0,
      confidence: 91.7,
    },
    {
      time: 0.5,
      x: 57.3,
      y: 54.3,
      width: 7.0,
      height: 18.2,
      confidence: 92.0,
    },
    {
      time: 1.0,
      x: 57.4,
      y: 54.2,
      width: 7.0,
      height: 18.3,
      confidence: 92.4,
    },
    {
      time: 1.5,
      x: 56.1,
      y: 54.3,
      width: 6.5,
      height: 18.5,
      confidence: 92.8,
    },
    {
      time: 2.0,
      x: 52.4,
      y: 54.0,
      width: 6.0,
      height: 18.3,
      confidence: 93.1,
    },

    // --------------------------------------------------
    // 2 - 4 seconds
    // Person moves upward/rightward into the crossing
    // --------------------------------------------------

    {
      time: 2.5,
      x: 63.8,
      y: 41.0,
      width: 9.0,
      height: 22.0,
      confidence: 93.6,
    },
    {
      time: 3.0,
      x: 61.0,
      y: 39.8,
      width: 7.4,
      height: 23.0,
      confidence: 94.0,
    },
    {
      time: 3.5,
      x: 54.0,
      y: 39.7,
      width: 8.0,
      height: 24.0,
      confidence: 94.3,
    },
    {
      time: 4.0,
      x: 47.0,
      y: 39.3,
      width: 9.0,
      height: 25.0,
      confidence: 94.7,
    },

    // --------------------------------------------------
    // 4 - 5.5 seconds
    // Person continues moving left
    // --------------------------------------------------

    {
      time: 4.5,
      x: 43.5,
      y: 41.0,
      width: 7.0,
      height: 23.0,
      confidence: 94.5,
    },
    {
      time: 5.0,
      x: 36.0,
      y: 41.5,
      width: 10.0,
      height: 24.0,
      confidence: 95.0,
    },
    {
      time: 5.5,
      x: 30.0,
      y: 24.0,
      width: 10.0,
      height: 34.0,
      confidence: 95.3,
    },

    // --------------------------------------------------
    // 5.5 - 8 seconds
    // Person becomes larger as he approaches camera
    // and continues toward the left
    // --------------------------------------------------

    {
      time: 6.0,
      x: 30.0,
      y: 22.0,
      width: 10.0,
      height: 34.0,
      confidence: 95.6,
    },
    {
      time: 6.5,
      x: 30.0,
      y: 23.0,
      width: 11.5,
      height: 36.0,
      confidence: 95.8,
    },
    {
      time: 7.0,
      x: 28.5,
      y: 21.0,
      width: 13.0,
      height: 35.0,
      confidence: 95.9,
    },
    {
      time: 7.5,
      x: 31.0,
      y: 25.0,
      width: 10.5,
      height: 33.0,
      confidence: 95.4,
    },
    {
      time: 8.0,
      x: 29.0,
      y: 28.0,
      width: 11.0,
      height: 33.0,
      confidence: 95.1,
    },

    // --------------------------------------------------
    // 8 - 10 seconds
    // Person continues walking along sidewalk
    // --------------------------------------------------

    {
      time: 8.5,
      x: 27.5,
      y: 30.0,
      width: 12.0,
      height: 32.0,
      confidence: 94.9,
    },
    {
      time: 9.0,
      x: 28.0,
      y: 32.0,
      width: 11.5,
      height: 32.0,
      confidence: 94.7,
    },
    {
      time: 9.5,
      x: 27.8,
      y: 32.0,
      width: 11.5,
      height: 32.0,
      confidence: 94.8,
    },
    {
      time: 10.0,
      x: 27.7,
      y: 32.0,
      width: 11.5,
      height: 32.0,
      confidence: 95.0,
    },

    // --------------------------------------------------
    // 10 - 12 seconds
    // Person remains in approximately the same region
    // --------------------------------------------------

    {
      time: 10.5,
      x: 27.7,
      y: 32.0,
      width: 11.5,
      height: 32.0,
      confidence: 95.1,
    },
    {
      time: 11.0,
      x: 27.7,
      y: 31.8,
      width: 11.5,
      height: 32.0,
      confidence: 95.0,
    },
    {
      time: 11.5,
      x: 27.7,
      y: 31.8,
      width: 11.5,
      height: 32.0,
      confidence: 94.9,
    },
    {
      time: 12.0,
      x: 27.7,
      y: 31.6,
      width: 11.5,
      height: 32.2,
      confidence: 94.8,
    },
  ];

  /*
   * Smoothly interpolate between actual tracking keyframes.
   */
  const getTrackingPosition = (
    time: number
  ): TrackingPoint => {
    if (time <= trackingData[0].time) {
      return trackingData[0];
    }

    const last =
      trackingData[trackingData.length - 1];

    if (time >= last.time) {
      return last;
    }

    let previous = trackingData[0];
    let next = trackingData[1];

    for (let i = 0; i < trackingData.length - 1; i++) {
      if (
        time >= trackingData[i].time &&
        time <= trackingData[i + 1].time
      ) {
        previous = trackingData[i];
        next = trackingData[i + 1];
        break;
      }
    }

    const interval =
      next.time - previous.time;

    const progress =
      interval > 0
        ? (time - previous.time) / interval
        : 0;

    return {
      time,

      x:
        previous.x +
        (next.x - previous.x) *
        progress,

      y:
        previous.y +
        (next.y - previous.y) *
        progress,

      width:
        previous.width +
        (next.width - previous.width) *
        progress,

      height:
        previous.height +
        (next.height - previous.height) *
        progress,

      confidence:
        previous.confidence +
        (next.confidence -
          previous.confidence) *
        progress,
    };
  };

  const tracking = useMemo(
    () => getTrackingPosition(currentTime),
    [currentTime]
  );

  /*
   * Update tracking position every animation frame.
   * This is smoother than relying on video "timeupdate".
   */
  useEffect(() => {
    const update = () => {
      if (videoRef.current) {
        setCurrentTime(
          videoRef.current.currentTime
        );
      }

      if (isPlaying) {
        animationFrameRef.current =
          requestAnimationFrame(update);
      }
    };

    if (isPlaying) {
      animationFrameRef.current =
        requestAnimationFrame(update);
    }

    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error(
        'Unable to play video:',
        error
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    setVideoDuration(
      videoRef.current.duration
    );
  };

  const handleSeek = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const time = Number(e.target.value);

    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }

    setCurrentTime(time);
  };

  const handleEnded = () => {
    setIsPlaying(false);

    if (videoRef.current) {
      setCurrentTime(
        videoRef.current.currentTime
      );
    }
  };

  return (
    <div className="max-w-5xl flex flex-col gap-6 h-full">

      {/* HEADER */}
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">
          Evidence Frame Viewer
        </h2>

        <p className="text-gray-400 mt-1">
          Deep inspection of source video frames
          linked to AI investigative findings.
        </p>
      </div>

      <div className="flex flex-1 gap-6 min-h-[500px]">

        {/* VIDEO PANEL */}
        <div className="flex-1 bg-dark-800 border border-dark-600 rounded-lg overflow-hidden flex flex-col">

          {/* VIDEO HEADER */}
          <div className="p-3 bg-dark-900 border-b border-dark-700 flex justify-between items-center text-sm">

            <span className="font-mono text-primary-400">
              REC_CH01_0915_1422.mp4
            </span>

            <span className="text-gray-400">
              Time:{' '}
              {currentTime.toFixed(3)}s
            </span>

          </div>

          {/* VIDEO */}
          <div className="flex-1 bg-dark-950 relative flex items-center justify-center">

            <div className="w-full aspect-video bg-black relative overflow-hidden">

              <video
                ref={videoRef}
                src="/crosscamera.mp4"
                className="w-full h-full object-cover"
                muted
                onLoadedMetadata={
                  handleLoadedMetadata
                }
                onEnded={handleEnded}
              />

              {/* ======================================
                  AI TRACKING BOUNDING BOX
                  ====================================== */}

              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${tracking.x}%`,
                  top: `${tracking.y}%`,
                  width: `${tracking.width}%`,
                  height: `${tracking.height}%`,

                  /*
                   * Small transition keeps the box
                   * visually attached to the person.
                   */
                  transition:
                    'left 50ms linear, top 50ms linear, width 50ms linear, height 50ms linear',
                }}
              >

                {/* BOX */}
                <div className="absolute inset-0 border-2 border-accent-500 bg-accent-500/10" />

                {/* LABEL */}
                <div className="absolute -top-6 left-[-2px] bg-accent-500 text-dark-900 text-xs font-bold px-1.5 py-0.5 whitespace-nowrap">

                  Person{' '}
                  {tracking.confidence.toFixed(
                    1
                  )}
                  % · TRK-088

                </div>

              </div>

            </div>
          </div>

          {/* VIDEO CONTROLS */}
          <div className="p-4 bg-dark-900 border-t border-dark-700">

            <div className="flex items-center gap-4">

              <button
                onClick={togglePlay}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded font-bold transition-colors"
              >
                {isPlaying
                  ? 'Pause'
                  : 'Play Video'}
              </button>

              <input
                type="range"
                min="0"
                max={videoDuration || 12.17}
                step="0.01"
                value={Math.min(
                  currentTime,
                  videoDuration || 12.17
                )}
                onChange={handleSeek}
                className="flex-1 accent-primary-500"
              />

              <span className="text-xs text-gray-400 font-mono min-w-[80px] text-right">
                {currentTime.toFixed(2)}s
              </span>

            </div>
          </div>
        </div>

        {/* FRAME METADATA */}
        <div className="w-80 bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-6 overflow-y-auto">

          {/* FRAME DETAILS */}
          <div>

            <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2 mb-3">
              Frame Details
            </h3>

            <div className="flex flex-col gap-2 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Camera
                </span>

                <span className="text-gray-200 font-bold">
                  CH01
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Time (Norm)
                </span>

                <span className="text-gray-200">
                  14:31:05.100
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Time (Raw)
                </span>

                <span className="text-gray-200">
                  14:27:51.100
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Resolution
                </span>

                <span className="text-gray-200">
                  1920x1080
                </span>
              </div>

            </div>
          </div>

          {/* AI DETECTION */}
          <div>

            <h3 className="font-bold text-accent-500 border-b border-dark-700 pb-2 mb-3">
              AI Detection
            </h3>

            <div className="bg-dark-900 border border-dark-700 rounded p-3 text-sm flex flex-col gap-2">

              <div className="font-bold text-gray-200">
                TRK-088 (Person)
              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Confidence
                </span>

                <span className="text-accent-500">
                  {tracking.confidence.toFixed(
                    1
                  )}
                  %
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  BBox (x,y)
                </span>

                <span className="font-mono text-gray-400">
                  {tracking.x.toFixed(1)},{' '}
                  {tracking.y.toFixed(1)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Algorithm
                </span>

                <span className="text-gray-400">
                  YOLOv8x
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Tracking
                </span>

                <span className="text-green-400">
                  Active
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Track ID
                </span>

                <span className="font-mono text-gray-300">
                  TRK-088
                </span>

              </div>

            </div>
          </div>

          {/* DATA PROVENANCE */}
          <div>

            <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2 mb-3">
              Data Provenance
            </h3>

            <div className="bg-accent-warning/10 border border-accent-warning/30 rounded p-3 text-sm flex flex-col gap-2">

              <div className="font-bold text-accent-warning flex items-center gap-2">

                <div className="w-2 h-2 bg-accent-warning rounded-full" />

                Recovered Fragment

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Source ID
                </span>

                <span className="font-mono text-gray-300">
                  FRG-9921
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Hex Offset
                </span>

                <span className="font-mono text-gray-300">
                  0x1A2B3D4A
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Physical HDD
                </span>

                <span className="text-gray-300">
                  WD-WCC6Y6A
                </span>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}