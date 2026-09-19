import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StorageStructure() {
  const [analyzing, setAnalyzing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Storage Structure Analysis</h2>
        <p className="text-gray-400 mt-1">Locating partitions, mapping data blocks, and identifying recording/index areas using Proprietary File-System Parser.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-primary-400 font-medium">Resolving data-block offsets...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-dark-900 border border-dark-700 p-4 rounded text-center">
                <div className="text-3xl font-bold text-primary-400 mb-1">1</div>
                <div className="text-xs text-gray-500 uppercase">Partitions Found</div>
              </div>
              <div className="bg-dark-900 border border-dark-700 p-4 rounded text-center">
                <div className="text-3xl font-bold text-primary-400 mb-1">3.6 TB</div>
                <div className="text-xs text-gray-500 uppercase">Data Blocks Mapped</div>
              </div>
              <div className="bg-dark-900 border border-dark-700 p-4 rounded text-center">
                <div className="text-3xl font-bold text-primary-400 mb-1">16</div>
                <div className="text-xs text-gray-500 uppercase">Camera Channels</div>
              </div>
              <div className="bg-dark-900 border border-dark-700 p-4 rounded text-center">
                <div className="text-3xl font-bold text-accent-warning mb-1">1.2 GB</div>
                <div className="text-xs text-gray-500 uppercase">Metadata / Index Area</div>
              </div>
            </div>

            <div className="bg-dark-900 border border-dark-700 rounded overflow-hidden">
               <div className="bg-dark-800 px-4 py-2 border-b border-dark-700 text-sm font-bold text-gray-300">Disk Layout Map (Dahua Proprietary)</div>
               <div className="p-4 flex gap-1 h-12">
                  <div className="w-[2%] bg-accent-warning/80 hover:bg-accent-warning rounded-l cursor-pointer" title="System / Index Header"></div>
                  <div className="w-[10%] bg-primary-500/80 hover:bg-primary-500 cursor-pointer" title="Index Tables (Time -> Block)"></div>
                  <div className="w-[78%] bg-blue-500/60 hover:bg-blue-500 cursor-pointer" title="Active Recording Data Blocks"></div>
                  <div className="w-[10%] bg-dark-600 hover:bg-dark-500 rounded-r cursor-pointer" title="Unallocated / Overwritten Space (Recovery Target)"></div>
               </div>
               <div className="flex justify-between px-4 pb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent-warning"></div> System Header</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary-500"></div> Index Area</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500/60"></div> Active Video Blocks</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-dark-600"></div> Unallocated Space</div>
               </div>
            </div>

            <div className="flex justify-between items-center border-t border-dark-700 pt-4 mt-2">
               <div className="text-sm text-gray-400">File-system successfully parsed. Ready to extract recordings.</div>
               <button onClick={() => navigate('../metadata-extraction')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
                 Proceed to Extraction →
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
