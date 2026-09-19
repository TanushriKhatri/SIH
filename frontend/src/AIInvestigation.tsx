import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIInvestigation() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const findings = [
    { id: 'AI-001', time: '14:26:30', ch: 'CH04', obj: 'Person', conf: 92, desc: 'Subject entered frame from North.' },
    { id: 'AI-002', time: '14:27:15', ch: 'CH04', obj: 'Backpack', conf: 88, desc: 'Object separated from Person.' },
    { id: 'AI-003', time: '14:31:05', ch: 'CH01', obj: 'Person', conf: 85, desc: 'Subject detected in recovered deleted fragment.' },
  ];

  return (
    <div className="max-w-6xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Machine Learning / AI Investigation</h2>
          <p className="text-gray-400 mt-1">Object detection (YOLO), face detection (MTCNN), and object tracking (ByteTrack).</p>
        </div>
        {!analyzing && (
          <button onClick={() => navigate('../cross-camera')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
            Cross-Camera Correlation →
          </button>
        )}
      </div>

      {analyzing ? (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-12 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-200">Processing Video Frames</h3>
            <p className="text-gray-400 mt-2">Running YOLOv8 and ByteTrack on normalized evidence timeline...</p>
          </div>
          <div className="w-64 bg-dark-900 h-2 rounded-full overflow-hidden mt-4">
             <div className="h-full bg-primary-500 animate-[pulse_2s_ease-in-out_infinite]" style={{width: '75%'}}></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 text-center">
               <div className="text-3xl font-bold text-primary-400">142,500</div>
               <div className="text-xs text-gray-500 uppercase mt-1">Frames Analyzed</div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 text-center">
               <div className="text-3xl font-bold text-accent-500">23</div>
               <div className="text-xs text-gray-500 uppercase mt-1">Persons Detected</div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 text-center">
               <div className="text-3xl font-bold text-accent-warning">5</div>
               <div className="text-xs text-gray-500 uppercase mt-1">Vehicles Tracked</div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 text-center">
               <div className="text-3xl font-bold text-purple-400">3</div>
               <div className="text-xs text-gray-500 uppercase mt-1">Critical Events</div>
            </div>
          </div>

          <div className="bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
             <div className="p-4 border-b border-dark-700 bg-dark-900 flex justify-between items-center">
               <h3 className="font-bold text-gray-300">AI Investigative Findings</h3>
               <span className="text-xs text-gray-500 italic">Click a finding to view source evidence</span>
             </div>
             <table className="w-full text-left text-sm">
               <thead className="bg-dark-800 text-gray-400 border-b border-dark-700">
                 <tr>
                   <th className="p-4">Finding ID</th>
                   <th className="p-4">Time (Normalized)</th>
                   <th className="p-4">Camera</th>
                   <th className="p-4">Classification</th>
                   <th className="p-4">Description</th>
                   <th className="p-4">Confidence</th>
                   <th className="p-4"></th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-dark-700">
                 {findings.map((f, i) => (
                   <tr key={i} className="hover:bg-dark-700 transition-colors">
                     <td className="p-4 font-mono text-primary-400 font-bold">{f.id}</td>
                     <td className="p-4 font-mono text-gray-300">{f.time}</td>
                     <td className="p-4 text-gray-300">{f.ch}</td>
                     <td className="p-4">
                        <span className="bg-dark-900 border border-dark-600 px-2 py-1 rounded text-xs text-gray-300">{f.obj}</span>
                     </td>
                     <td className="p-4 text-gray-400">{f.desc}</td>
                     <td className="p-4">
                        <div className="flex items-center gap-2">
                           <div className="w-12 h-1.5 bg-dark-900 rounded-full overflow-hidden">
                             <div className="h-full bg-accent-500" style={{width: `${f.conf}%`}}></div>
                           </div>
                           <span className="text-xs text-gray-500">{f.conf}%</span>
                        </div>
                     </td>
                     <td className="p-4 text-right">
                        <button onClick={() => navigate('../frame-viewer')} className="text-primary-400 hover:text-primary-300 text-xs font-bold underline">
                          View Frame
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
}
