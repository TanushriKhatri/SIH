import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CaseSummary() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Case Summary (CASE-001)</h2>
          <p className="text-gray-400 mt-1">Operation Nightfall - Overview of processed evidence and findings.</p>
        </div>
        <button onClick={() => navigate('../chain-of-custody')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
          View Chain of Custody →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
           <h3 className="text-lg font-bold text-gray-200 border-b border-dark-700 pb-2 mb-4">Evidence Profile</h3>
           <div className="flex flex-col gap-3 text-sm">
             <div className="flex justify-between"><span className="text-gray-500">Device</span> <span className="text-gray-200">Dahua NVR (Proprietary DHFS)</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Storage</span> <span className="text-gray-200">WD Purple 4TB (WD-WCC6Y6A)</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Image Hash</span> <span className="text-gray-200 font-mono text-xs">7d79ce9b85bd11c1...</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Acquisition</span> <span className="text-accent-500">Verified & Write-Blocked</span></div>
           </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
           <h3 className="text-lg font-bold text-gray-200 border-b border-dark-700 pb-2 mb-4">Forensic Processing</h3>
           <div className="flex flex-col gap-3 text-sm">
             <div className="flex justify-between"><span className="text-gray-500">Active Cameras</span> <span className="text-primary-400 font-bold">16</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Active Video</span> <span className="text-gray-200">3.6 TB Extracted</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Deleted Data Carved</span> <span className="text-accent-warning font-bold">14,392 Fragments (5.1 GB)</span></div>
             <div className="flex justify-between"><span className="text-gray-500">Timeline Normalization</span> <span className="text-gray-200">UTC -05:00 (+3m14s drift)</span></div>
           </div>
        </div>
        
        <div className="md:col-span-2 bg-dark-800 border border-dark-600 rounded-lg p-6">
           <h3 className="text-lg font-bold text-gray-200 border-b border-dark-700 pb-2 mb-4">AI Investigation Highlights</h3>
           <div className="bg-dark-900 border border-dark-700 p-4 rounded text-sm text-gray-300">
             <p className="mb-2">The Machine Learning module analyzed <span className="font-bold text-gray-100">142,500</span> normalized frames across the unified timeline.</p>
             <ul className="list-disc pl-5 space-y-1 text-gray-400">
               <li>Identified <span className="text-accent-500 font-bold">23 distinct persons</span>.</li>
               <li>Cross-camera correlation successfully tracked 1 target (TRK-088) across cameras C4 and C1.</li>
               <li>Crucially, the target was identified inside a <span className="text-accent-warning font-bold">carved/recovered deleted fragment</span> at 14:31:05.</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
