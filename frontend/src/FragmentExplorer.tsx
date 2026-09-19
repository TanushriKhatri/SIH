import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FragmentExplorer() {
  const navigate = useNavigate();
  const [selectedFrag, setSelectedFrag] = useState<number | null>(null);

  const fragments = [
    { id: 'FRG-9921', ch: '01', start: '2026-09-15 14:22:10', end: '2026-09-15 14:45:00', size: '1.2 GB', offset: '0x1A2B3C00', confidence: 98 },
    { id: 'FRG-9922', ch: '01', start: '2026-09-15 14:45:00', end: '2026-09-15 15:10:33', size: '1.4 GB', offset: '0x1A8D4F00', confidence: 95 },
    { id: 'FRG-9923', ch: '04', start: '2026-09-15 14:25:00', end: '2026-09-15 15:00:00', size: '2.1 GB', offset: '0x2B1A9900', confidence: 89 },
    { id: 'FRG-9924', ch: 'Unknown', start: 'Corrupted Timestamp', end: '---', size: '0.4 GB', offset: '0x3C88AA00', confidence: 42 },
  ];

  return (
    <div className="max-w-6xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Recovered Fragment Explorer</h2>
          <p className="text-gray-400 mt-1">Review carved video fragments before reconstruction.</p>
        </div>
        <button onClick={() => navigate('../video-reconstruction')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
          Proceed to Reconstruction →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
          <div className="bg-dark-900 border-b border-dark-700 p-4 font-bold text-gray-300">Carved Fragment List</div>
          <table className="w-full text-left text-sm">
            <thead className="bg-dark-800 text-gray-400 border-b border-dark-700">
              <tr>
                <th className="p-3">Frag ID</th>
                <th className="p-3">Est. Channel</th>
                <th className="p-3">Start Time</th>
                <th className="p-3">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {fragments.map((f, i) => (
                <tr key={i} onClick={() => setSelectedFrag(i)} className={`cursor-pointer transition-colors ${selectedFrag === i ? 'bg-primary-500/20' : 'hover:bg-dark-700'}`}>
                  <td className="p-3 font-mono text-primary-400">{f.id}</td>
                  <td className="p-3">CH {f.ch}</td>
                  <td className="p-3 font-mono">{f.start}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                       <div className="w-16 h-2 bg-dark-900 rounded-full overflow-hidden">
                         <div className={`h-full ${f.confidence > 90 ? 'bg-accent-500' : f.confidence > 70 ? 'bg-accent-warning' : 'bg-accent-danger'}`} style={{width: `${f.confidence}%`}}></div>
                       </div>
                       <span className="text-xs text-gray-400">{f.confidence}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-4">
          <h3 className="font-bold text-gray-200 border-b border-dark-700 pb-2">Fragment Details</h3>
          {selectedFrag !== null ? (
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-xs text-gray-500 uppercase">Fragment ID</div>
                <div className="font-mono text-primary-400 text-lg">{fragments[selectedFrag].id}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Physical Offset (Hex)</div>
                <div className="font-mono text-gray-300">{fragments[selectedFrag].offset}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase">Size</div>
                  <div className="text-gray-300">{fragments[selectedFrag].size}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Est. Channel</div>
                  <div className="text-gray-300">{fragments[selectedFrag].ch}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Time Span</div>
                <div className="font-mono text-sm text-gray-300">{fragments[selectedFrag].start}<br/>to<br/>{fragments[selectedFrag].end}</div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-dark-700">
                <button className="w-full bg-dark-700 hover:bg-dark-600 text-gray-200 py-2 rounded transition-colors text-sm">
                  Preview Hex Dump
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm text-center py-10 italic">
              Select a fragment from the list to view forensic details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
