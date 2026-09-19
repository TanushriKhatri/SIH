import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChainOfCustody() {
  const navigate = useNavigate();
  
  const logs = [
    { time: '2026-09-19 14:00:00', user: 'Investigator Smith', action: 'Evidence Registered', detail: 'WD-WCC6Y6A' },
    { time: '2026-09-19 14:02:15', user: 'System', action: 'Write-Blocker Engaged', detail: 'Software ATA pass-through locked' },
    { time: '2026-09-19 18:45:00', user: 'System', action: 'Acquisition Complete', detail: 'Image saved as .DD' },
    { time: '2026-09-19 18:50:33', user: 'System', action: 'Hash Verification', detail: 'MD5/SHA256 Match Confirmed' },
    { time: '2026-09-20 09:12:00', user: 'Analyst Doe', action: 'Recovery Engine Executed', detail: '14,392 fragments carved' },
    { time: '2026-09-20 11:30:00', user: 'System', action: 'AI Inference Completed', detail: 'YOLO/ByteTrack run on timeline' },
  ];

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Chain of Custody / Audit Trail</h2>
          <p className="text-gray-400 mt-1">Immutable log of all interactions and automated processing steps.</p>
        </div>
        <button onClick={() => navigate('../report')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
          Generate Forensic Report →
        </button>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
         <table className="w-full text-left text-sm">
           <thead className="bg-dark-900 text-gray-400 border-b border-dark-700">
             <tr>
               <th className="p-4">Timestamp (UTC)</th>
               <th className="p-4">Actor</th>
               <th className="p-4">Action Taken</th>
               <th className="p-4">Cryptographic Details</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-dark-700">
             {logs.map((l, i) => (
               <tr key={i} className="hover:bg-dark-700 transition-colors">
                 <td className="p-4 font-mono text-gray-400">{l.time}</td>
                 <td className="p-4 text-gray-300 font-medium">{l.user}</td>
                 <td className="p-4 text-primary-400">{l.action}</td>
                 <td className="p-4 text-gray-500 text-xs font-mono">{l.detail}</td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
      
      <div className="text-right">
        <button className="text-primary-400 hover:text-primary-300 text-sm font-bold underline">
          Export Full Audit Log (.CSV)
        </button>
      </div>
    </div>
  );
}
