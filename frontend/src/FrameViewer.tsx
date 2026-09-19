import React, { useState, useRef, useEffect } from 'react';

export default function FrameViewer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    const updateTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        animationFrameId = requestAnimationFrame(updateTime);
      }
    };
    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateTime);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Calculate box position based on time to simulate tracking
  // Video is ~20 seconds. We'll just oscillate a box.
  const boxX = 40 + Math.sin(currentTime) * 15;
  const boxY = 30 + Math.cos(currentTime * 0.5) * 5;

  return (
    <div className="max-w-5xl flex flex-col gap-6 h-full">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Evidence Frame Viewer</h2>
        <p className="text-gray-400 mt-1">Deep inspection of source video frames linked to AI investigative findings.</p>
      </div>

      <div className="flex flex-1 gap-6 min-h-[500px]">
        
        {/* Frame Canvas */}
        <div className="flex-1 bg-dark-800 border border-dark-600 rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 bg-dark-900 border-b border-dark-700 flex justify-between items-center text-sm">
            <span className="font-mono text-primary-400">REC_CH01_0915_1422.mp4</span>
            <span className="text-gray-400">Time: {(currentTime).toFixed(3)}s</span>
          </div>
          
          <div className="flex-1 bg-dark-950 relative flex items-center justify-center">
             <div className="w-full aspect-video bg-black relative overflow-hidden flex items-center justify-center group">
                <video 
                  ref={videoRef}
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" 
                  className="w-full h-full object-cover"
                  loop
                  muted
                />
                
                {/* AI Bounding Box */}
                <div 
                  className="absolute border-2 border-accent-500 bg-accent-500/10 transition-all duration-75"
                  style={{
                    left: boxX + '%',
                    top: boxY + '%',
                    width: '18%',
                    height: '45%'
                  }}
                >
                   <div className="absolute -top-6 left-[-2px] bg-accent-500 text-dark-900 text-xs font-bold px-1 py-0.5 whitespace-nowrap">
                      Person 85.4% (TRK-088)
                   </div>
                </div>
             </div>
          </div>
          
          <div className="p-4 bg-dark-900 border-t border-dark-700 flex justify-center gap-4">
             <button className="px-6 py-2 bg-primary-500 text-white rounded font-bold transition-colors hover:bg-primary-400" onClick={togglePlay}>
               {isPlaying ? 'Pause' : 'Play Video'}
             </button>
          </div>
        </div>

        {/* Frame Metadata */}
        <div className="w-80 bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-6 overflow-y-auto">
           <div>
             <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2 mb-3">Frame Details</h3>
             <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Camera</span><span className="text-gray-200 font-bold">CH01</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Time (Norm)</span><span className="text-gray-200">14:31:05.100</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Time (Raw)</span><span className="text-gray-200">14:27:51.100</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Resolution</span><span className="text-gray-200">1920x1080</span></div>
             </div>
           </div>

           <div>
             <h3 className="font-bold text-accent-500 border-b border-dark-700 pb-2 mb-3">AI Detection</h3>
             <div className="bg-dark-900 border border-dark-700 rounded p-3 text-sm flex flex-col gap-2">
                <div className="font-bold text-gray-200">TRK-088 (Person)</div>
                <div className="flex justify-between"><span className="text-gray-500">Confidence</span><span className="text-accent-500">85.4%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">BBox (x,y)</span><span className="font-mono text-gray-400">{boxX.toFixed(1)}, {boxY.toFixed(1)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Algorithm</span><span className="text-gray-400">YOLOv8x</span></div>
             </div>
           </div>

           <div>
             <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2 mb-3">Data Provenance</h3>
             <div className="bg-accent-warning/10 border border-accent-warning/30 rounded p-3 text-sm flex flex-col gap-2">
                <div className="font-bold text-accent-warning flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-warning rounded-full"></div>
                  Recovered Fragment
                </div>
                <div className="flex justify-between"><span className="text-gray-500">Source ID</span><span className="font-mono text-gray-300">FRG-9921</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Hex Offset</span><span className="font-mono text-gray-300">0x1A2B3D4A</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Physical HDD</span><span className="text-gray-300">WD-WCC6Y6A</span></div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
