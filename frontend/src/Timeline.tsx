import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Timeline() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-6xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Timestamp & Unified Timeline</h2>
          <p className="text-gray-400 mt-1">Normalizing timestamps (UTC/ISO-8601), calculating clock drift, and building a multi-camera timeline.</p>
        </div>
        {!analyzing && (
          <button onClick={() => navigate('../ai-investigation')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Send to AI Investigation
          </button>
        )}
      </div>

      {analyzing ? (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-12 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-400">Performing Clock Offset / Drift Analysis...</div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
               <div className="text-xs text-gray-500 uppercase mb-1">Detected Timezone</div>
               <div className="font-bold text-gray-200">UTC -05:00 (EST)</div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
               <div className="text-xs text-gray-500 uppercase mb-1">Average Clock Drift</div>
               <div className="font-bold text-accent-warning">+00:03:14 (Fast)</div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
               <div className="text-xs text-gray-500 uppercase mb-1">Normalization Status</div>
               <div className="font-bold text-accent-500">ISO-8601 Applied</div>
            </div>
          </div>

          <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
             <h3 className="font-bold text-gray-200 mb-6">Unified Multi-Camera Timeline</h3>
             
             <div className="relative">
                {/* Timeline axis */}
                <div className="absolute top-0 bottom-0 left-24 w-px bg-dark-600"></div>
                
                {/* Timeline items */}
                <div className="flex flex-col gap-8 relative">
                   <div className="flex gap-4">
                      <div className="w-20 text-right font-mono text-sm text-gray-400 pt-1">14:22:10</div>
                      <div className="absolute left-24 w-3 h-3 -translate-x-1.5 translate-y-1.5 rounded-full bg-primary-500 ring-4 ring-dark-800"></div>
                      <div className="flex-1 bg-dark-900 border border-dark-700 rounded p-4 ml-6">
                         <div className="flex justify-between items-start">
                           <span className="font-bold text-gray-300">Recording Starts (CH01)</span>
                           <span className="text-xs text-gray-500">EV-VID-01</span>
                         </div>
                         <div className="w-full h-2 bg-primary-500/20 rounded mt-3"><div className="h-full bg-primary-500 rounded" style={{width:'30%'}}></div></div>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <div className="w-20 text-right font-mono text-sm text-gray-400 pt-1">14:25:00</div>
                      <div className="absolute left-24 w-3 h-3 -translate-x-1.5 translate-y-1.5 rounded-full bg-blue-500 ring-4 ring-dark-800"></div>
                      <div className="flex-1 bg-dark-900 border border-dark-700 rounded p-4 ml-6">
                         <div className="flex justify-between items-start">
                           <span className="font-bold text-gray-300">Recording Starts (CH04)</span>
                           <span className="text-xs text-gray-500">EV-VID-03</span>
                         </div>
                         <div className="w-full h-2 bg-blue-500/20 rounded mt-3"><div className="h-full bg-blue-500 rounded" style={{width:'60%'}}></div></div>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <div className="w-20 text-right font-mono text-sm text-gray-400 pt-1">14:31:05</div>
                      <div className="absolute left-24 w-3 h-3 -translate-x-1.5 translate-y-1.5 rounded-full bg-accent-warning ring-4 ring-dark-800"></div>
                      <div className="flex-1 bg-dark-900 border border-dark-700 rounded p-4 ml-6 border-l-2 border-l-accent-warning">
                         <div className="flex justify-between items-start">
                           <span className="font-bold text-gray-300">Recovered Gap (CH01)</span>
                           <span className="text-xs text-accent-warning font-bold">FRG-9921</span>
                         </div>
                         <p className="text-sm text-gray-500 mt-2">Clock drift of +3m 14s corrected for this recovered block to align with active recordings.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
