import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MetadataExtraction() {
  const [extracting, setExtracting] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setExtracting(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const mockRecordings = [
    { ch: '01', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1920x1080', fps: 15, status: 'Active', size: '142 GB' },
    { ch: '02', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1920x1080', fps: 15, status: 'Active', size: '150 GB' },
    { ch: '03', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1280x720', fps: 30, status: 'Active', size: '95 GB' },
    { ch: '04', start: '2026-09-17 00:00:00', end: '2026-09-18 14:32:11', res: '1280x720', fps: 30, status: 'Active', size: '98 GB' },
  ];

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Recording & Metadata Extraction</h2>
        <p className="text-gray-400 mt-1">Extracting channel IDs, timestamps, and recording metadata from the parsed index tables.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        {extracting ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-primary-400 font-medium">Extracting indexed recordings...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-200">Extracted Active Recordings</h3>
              <div className="text-sm text-gray-400">Total Found: <span className="text-primary-400 font-bold">16 Channels</span></div>
            </div>

            <div className="overflow-x-auto border border-dark-700 rounded bg-dark-900">
              <table className="w-full text-left text-sm">
                <thead className="bg-dark-800 text-gray-400">
                  <tr>
                    <th className="p-3">CH</th>
                    <th className="p-3">Start Timestamp</th>
                    <th className="p-3">End Timestamp</th>
                    <th className="p-3">Resolution</th>
                    <th className="p-3">FPS</th>
                    <th className="p-3">Data Size</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {mockRecordings.map((r, i) => (
                    <tr key={i} className="hover:bg-dark-800 transition-colors">
                      <td className="p-3 font-bold text-gray-300">CH{r.ch}</td>
                      <td className="p-3 font-mono text-gray-400">{r.start}</td>
                      <td className="p-3 font-mono text-gray-400">{r.end}</td>
                      <td className="p-3 text-gray-300">{r.res}</td>
                      <td className="p-3 text-gray-300">{r.fps}</td>
                      <td className="p-3 text-gray-400">{r.size}</td>
                      <td className="p-3"><span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded text-xs">{r.status}</span></td>
                    </tr>
                  ))}
                  <tr className="hover:bg-dark-800 transition-colors text-gray-500">
                    <td className="p-3 text-center" colSpan={7}>+ 12 more channels loaded...</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-accent-warning/10 border border-accent-warning/30 p-4 rounded flex justify-between items-center mt-4">
               <div>
                  <h4 className="text-accent-warning font-bold mb-1">Deleted/Overwritten Data Detected</h4>
                  <p className="text-sm text-gray-400">The index analysis indicates gaps and expired entries. Proceed to the Recovery Engine to carve deleted fragments.</p>
               </div>
               <button onClick={() => navigate('../recovery-engine')} className="bg-accent-warning hover:bg-yellow-600 text-dark-900 px-6 py-2 rounded font-bold transition-colors whitespace-nowrap">
                 Launch Recovery Engine →
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
