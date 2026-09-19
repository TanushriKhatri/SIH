import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForensicAcquisition() {
  const [progress, setProgress] = useState(0);
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [hashOutput, setHashOutput] = useState<{md5: string, sha: string} | null>(null);
  const navigate = useNavigate();

  const startAcquisition = () => {
    setIsAcquiring(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (p > 100) p = 100;
      setProgress(p);
      if (p === 100) {
        clearInterval(interval);
        setHashOutput({
          md5: '7d79ce9b85bd11c1d471df42f0d9c490',
          sha: 'a52a382109ff60e28f01f0cb49080db9c0a68d0eb5f488ff91386d3cb86ebf45'
        });
      }
    }, 200);
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Forensic Acquisition</h2>
        <p className="text-gray-400 mt-1">Bit-stream imaging with streaming dual hashing (MD5 & SHA-256).</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b border-dark-700 pb-4">
           <div>
             <h3 className="text-lg font-bold text-gray-200">Acquisition Parameters</h3>
             <p className="text-sm text-gray-500">Source: WD40PURZ-85TTDY0 (4.0 TB)</p>
           </div>
           <select className="bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" disabled={isAcquiring || progress === 100}>
             <option>.E01 (EnCase Image Format)</option>
             <option>.DD (Raw Image)</option>
             <option>.RAW</option>
           </select>
        </div>

        {!isAcquiring && progress === 0 && (
          <div className="flex justify-center py-8">
            <button onClick={startAcquisition} className="bg-primary-500 hover:bg-primary-400 text-white px-8 py-3 rounded-lg font-bold transition-colors text-lg shadow-lg shadow-primary-500/20">
              Start Bit-Stream Acquisition
            </button>
          </div>
        )}

        {(isAcquiring || progress === 100) && (
          <div className="flex flex-col gap-6 py-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 font-medium">Imaging Progress</span>
                <span className="text-primary-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-4 bg-dark-900 rounded-full overflow-hidden border border-dark-700">
                <div className="h-full bg-primary-500 transition-all duration-200 ease-linear" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0 GB</span>
                <span>{((progress / 100) * 4000).toFixed(1)} GB / 4000 GB</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-900 p-4 rounded border border-dark-700">
                <div className="text-xs text-gray-500 uppercase mb-1">Streaming MD5 Hash</div>
                <div className={`font-mono text-sm break-all ${hashOutput ? 'text-accent-500' : 'text-gray-400 animate-pulse'}`}>
                  {hashOutput ? hashOutput.md5 : 'Calculating...'}
                </div>
              </div>
              <div className="bg-dark-900 p-4 rounded border border-dark-700">
                <div className="text-xs text-gray-500 uppercase mb-1">Streaming SHA-256 Hash</div>
                <div className={`font-mono text-sm break-all ${hashOutput ? 'text-accent-500' : 'text-gray-400 animate-pulse'}`}>
                  {hashOutput ? hashOutput.sha : 'Calculating...'}
                </div>
              </div>
            </div>
          </div>
        )}

        {progress === 100 && (
           <div className="flex justify-between items-center border-t border-dark-700 pt-6 mt-2">
             <div className="flex items-center gap-2 text-accent-500 text-sm font-bold">
               <div className="w-4 h-4 rounded-full bg-accent-500 flex items-center justify-center text-dark-900 leading-none">✓</div>
               Original HDD Preserved (Safe to Disconnect)
             </div>
             <button onClick={() => navigate('../integrity-verification')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
               Proceed to Verification →
             </button>
           </div>
        )}
      </div>
    </div>
  );
}
