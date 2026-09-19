import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoReconstruction() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 10;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Video Reconstruction</h2>
        <p className="text-gray-400 mt-1">Reassembling frame sequences, handling missing data, and marking reconstruction gaps.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-8">
        
        <div className="flex flex-col items-center justify-center py-8 gap-6">
          
          <div className="relative w-48 h-48 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="45" fill="none" stroke="#2d2d2d" strokeWidth="8" />
               <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray={`${progress * 2.83} 283`} className="transition-all duration-300" />
             </svg>
             <div className="absolute flex flex-col items-center">
               <span className="text-4xl font-bold text-gray-200">{progress}%</span>
               <span className="text-xs text-primary-400 uppercase tracking-widest mt-1">Rebuilding</span>
             </div>
          </div>

          <div className="w-full max-w-md bg-dark-900 border border-dark-700 rounded p-4 font-mono text-sm text-gray-400 h-32 overflow-hidden flex flex-col justify-end relative">
             <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10 pointer-events-none"></div>
             {progress > 10 && <div>Reassembling seq: CH01_15_1422...</div>}
             {progress > 30 && <div>Resolving overlap (Block 1A2B vs 1A2C)...</div>}
             {progress > 50 && <div className="text-accent-warning">Detected 4s gap in CH01. Marking gap...</div>}
             {progress > 70 && <div>Wrapping container (H.264 -&gt; MP4)...</div>}
             {progress >= 100 && <div className="text-accent-500 font-bold mt-2">Reconstruction complete. 12 files generated.</div>}
          </div>

        </div>

        {progress === 100 && (
          <div className="flex justify-end mt-4 pt-4 border-t border-dark-700">
             <button onClick={() => navigate('../recovery-validation')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
               Validate Recovered Video →
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
