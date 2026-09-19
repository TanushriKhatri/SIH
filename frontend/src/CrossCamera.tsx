import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrossCamera() {
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
          <h2 className="text-2xl font-bold text-gray-100">Intelligent Cross-Camera Correlation</h2>
          <p className="text-gray-400 mt-1">Linking object track IDs and matching sequences across different camera topologies.</p>
        </div>
        {!analyzing && (
          <button onClick={() => navigate('../evidence-validation')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
            Proceed to Validation & Reporting →
          </button>
        )}
      </div>

      {analyzing ? (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-12 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-200">Correlating Track Attributes</h3>
            <p className="text-gray-400 mt-2">Matching identical time windows and building cross-camera event chains...</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-6">
           <div className="flex-1 bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-6">
              <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2">Track ID: TRK-088 (Subject 1)</h3>
              
              <div className="flex flex-col relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-dark-600"></div>
                
                <div className="flex gap-4 items-center p-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-dark-900 border-2 border-primary-500 flex items-center justify-center font-bold text-gray-300">C4</div>
                  <div className="bg-dark-900 border border-dark-700 rounded p-4 flex-1">
                     <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-primary-400">Target Detected (North Entrance)</div>
                          <div className="text-sm text-gray-400">14:26:30 • CH04</div>
                        </div>
                        <div className="text-xs bg-dark-800 px-2 py-1 rounded text-gray-500 border border-dark-700">AI-001</div>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 items-center p-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-dark-900 border-2 border-accent-warning flex items-center justify-center font-bold text-gray-300">C4</div>
                  <div className="bg-dark-900 border border-dark-700 rounded p-4 flex-1">
                     <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-accent-warning">Target separated from object (Backpack)</div>
                          <div className="text-sm text-gray-400">14:27:15 • CH04</div>
                        </div>
                        <div className="text-xs bg-dark-800 px-2 py-1 rounded text-gray-500 border border-dark-700">AI-002</div>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4 items-center p-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-dark-900 border-2 border-accent-500 flex items-center justify-center font-bold text-gray-300">C1</div>
                  <div className="bg-dark-900 border border-accent-500/50 rounded p-4 flex-1 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-accent-500"></div>
                     <div className="flex justify-between items-start pl-2">
                        <div>
                          <div className="font-bold text-accent-500">Target Track Matched in Recovered Data</div>
                          <div className="text-sm text-gray-400">14:31:05 • CH01 (Recovered Frag: FRG-9921)</div>
                          <div className="text-xs text-gray-500 mt-2 bg-dark-800 p-2 rounded border border-dark-700">Chain of custody intact: AI ID → Timeline offset (+3m14s) → Recovered Frag → Hex Offset 0x1A2B3C00 → Source WD-WCC6Y6A</div>
                        </div>
                        <div className="text-xs bg-dark-800 px-2 py-1 rounded text-gray-500 border border-dark-700">AI-003</div>
                     </div>
                  </div>
                </div>
              </div>
           </div>

           <div className="w-80 bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-4">
              <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2">Forensic Traceability</h3>
              <p className="text-sm text-gray-400">
                The platform ensures every AI event is fully traceable back to the physical source evidence.
              </p>
              <div className="flex flex-col gap-2 mt-4 text-sm text-gray-300">
                 <div className="flex justify-between border-b border-dark-700 pb-2"><span>AI Event:</span> <span className="font-mono text-primary-400">AI-003</span></div>
                 <div className="flex justify-between border-b border-dark-700 pb-2"><span>Source Video:</span> <span className="font-mono text-gray-400">REC_CH01_...mp4</span></div>
                 <div className="flex justify-between border-b border-dark-700 pb-2"><span>Recovered Block:</span> <span className="font-mono text-gray-400">FRG-9921</span></div>
                 <div className="flex justify-between border-b border-dark-700 pb-2"><span>Hex Offset:</span> <span className="font-mono text-gray-400">0x1A2B3C00</span></div>
                 <div className="flex justify-between pb-2"><span>Physical HDD:</span> <span className="font-mono text-gray-400">WD-WCC6Y6A</span></div>
              </div>
              
              <button onClick={() => navigate('../frame-viewer')} className="mt-auto w-full bg-dark-700 hover:bg-dark-600 text-gray-200 py-2 rounded transition-colors text-sm border border-dark-500">
                Inspect Source Frame
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
