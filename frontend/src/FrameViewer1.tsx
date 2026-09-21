import React, {
    useRef,
    useState,
} from 'react';

export default function FrameViewer1() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(12.17);

    /*
     * ============================================================
     * CROSS-CAMERA EVENT VIDEO
     * ============================================================
     *
     * Video is stored inside:
     *
     * public/crosscam_event.mp4
     *
     * Therefore React accesses it using:
     *
     * /crosscam_event.mp4
     */

    const videoPath = '/crosscam_event.mp4';

    /*
     * ============================================================
     * TIME UPDATE
     * ============================================================
     */

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(
                videoRef.current.currentTime
            );
        }
    };

    /*
     * ============================================================
     * PLAY / PAUSE
     * ============================================================
     */

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

    /*
     * ============================================================
     * VIDEO METADATA
     * ============================================================
     */

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;

        const duration =
            videoRef.current.duration;

        if (
            Number.isFinite(duration) &&
            duration > 0
        ) {
            setVideoDuration(duration);
        }
    };

    /*
     * ============================================================
     * SEEK
     * ============================================================
     */

    const handleSeek = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const time = Number(e.target.value);

        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }

        setCurrentTime(time);
    };

    /*
     * ============================================================
     * VIDEO ENDED
     * ============================================================
     */

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
                    Cross-Camera Source Frame Viewer
                </h2>

                <p className="text-gray-400 mt-1">
                    Inspection of the source video frame
                    associated with the cross-camera correlation event.
                </p>

            </div>

            {/* MAIN CONTENT */}

            <div className="flex flex-1 gap-6 min-h-[500px]">

                {/* VIDEO PANEL */}

                <div className="flex-1 bg-dark-800 border border-dark-600 rounded-lg overflow-hidden flex flex-col">

                    {/* VIDEO HEADER */}

                    <div className="p-3 bg-dark-900 border-b border-dark-700 flex justify-between items-center text-sm">

                        <span className="font-mono text-primary-400">
                            crosscam_event.mp4
                        </span>

                        <span className="text-gray-400">
                            Time:{' '}
                            {currentTime.toFixed(3)}s
                        </span>

                    </div>

                    {/* VIDEO VIEWPORT */}

                    <div className="flex-1 bg-dark-950 relative flex items-center justify-center p-4">

                        <div
                            className="relative w-full bg-black overflow-hidden"
                            style={{
                                aspectRatio: '858 / 512',
                            }}
                        >

                            {/* ACTUAL CROSS-CAMERA VIDEO */}

                            <video
                                ref={videoRef}
                                src={videoPath}
                                className="absolute inset-0 w-full h-full object-fill"
                                muted
                                playsInline
                                preload="metadata"
                                onLoadedMetadata={
                                    handleLoadedMetadata
                                }
                                onTimeUpdate={
                                    handleTimeUpdate
                                }
                                onEnded={handleEnded}
                            />

                        </div>

                    </div>

                    {/* VIDEO CONTROLS */}

                    <div className="p-4 bg-dark-900 border-t border-dark-700">

                        <div className="flex items-center gap-4">

                            <button
                                onClick={togglePlay}
                                className="
                  px-6
                  py-2
                  bg-primary-500
                  hover:bg-primary-400
                  text-white
                  rounded
                  font-bold
                  transition-colors
                "
                            >
                                {isPlaying
                                    ? 'Pause'
                                    : 'Play Video'}
                            </button>

                            <input
                                type="range"
                                min="0"
                                max={
                                    videoDuration || 12.17
                                }
                                step="0.01"
                                value={Math.min(
                                    currentTime,
                                    videoDuration || 12.17
                                )}
                                onChange={handleSeek}
                                className="
                  flex-1
                  accent-primary-500
                "
                            />

                            <span className="text-xs text-gray-400 font-mono min-w-[80px] text-right">
                                {currentTime.toFixed(2)}s
                                {' / '}
                                {(videoDuration || 12.17).toFixed(2)}s
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
                                    858 × 512
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