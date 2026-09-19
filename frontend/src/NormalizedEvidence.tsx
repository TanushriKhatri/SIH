import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NormalizedEvidence() {
  const navigate = useNavigate();

  const evidenceFiles = [
    { id: 'EV-VID-01', ch: 'CH01', date: '2026-09-15', duration: '22m 50s', size: '1.2 GB', format: 'Standard MP4 (H.264)', codec: 'AVC' },
    { id: 'EV-VID-02', ch: 'CH01', date: '2026-09-15', duration: '25m 33s', size: '1.4 GB', format: 'Standard MP4 (H.264)', codec: 'AVC' },
    { id: 'EV-VID-03', ch: 'CH04', date: '2026-09-15', duration: '35m 00s', size: '2.1 GB', format: 'Standard MP4 (H.264)', codec: 'AVC' },
    { id: 'EV-VID-04', ch: 'CH05', date: '2026-09-15', duration: '12m 10s', size: '0.8 GB', format: 'Standard MP4 (H.264)', codec: 'AVC' },
  ];

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Normalized Evidence Container</h2>
          <p className="text-gray-400 mt-1">Video frames and metadata standardized for timeline analysis and AI processing.</p>
        </div>
        <button onClick={() => navigate('../timeline')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
          Initialize Timeline Analysis →
        </button>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-dark-700 flex justify-between items-center bg-dark-900">
          <h3 className="font-bold text-gray-300">Standardized Evidence Records</h3>
          <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">12 Normalized Files</span>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-dark-800 text-gray-400 border-b border-dark-700">
            <tr>
              <th className="p-4">Evidence ID</th>
              <th className="p-4">Camera ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Codec</th>
              <th className="p-4">Container Format</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {evidenceFiles.map((ev, i) => (
              <tr key={i} className="hover:bg-dark-700 transition-colors">
                <td className="p-4 font-bold text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                  {ev.id}
                </td>
                <td className="p-4 text-primary-400 font-medium">{ev.ch}</td>
                <td className="p-4 font-mono text-gray-400">{ev.date}</td>
                <td className="p-4 text-gray-300">{ev.duration}</td>
                <td className="p-4 text-gray-400">{ev.codec}</td>
                <td className="p-4"><span className="bg-dark-900 border border-dark-600 px-2 py-1 text-xs rounded text-gray-400">{ev.format}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
