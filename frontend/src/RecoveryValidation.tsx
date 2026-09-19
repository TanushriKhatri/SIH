import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecoveryValidation() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Recovery Validation</h2>
          <p className="text-gray-400 mt-1">Validating video/frame structure and calculating recovered coverage.</p>
        </div>
        <button onClick={() => navigate('../normalized-evidence')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
          Proceed to Timeline Analysis →
        </button>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <h3 className="font-bold text-gray-200 mb-6">Validation Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-900 border border-dark-700 p-4 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-500 text-xl font-bold">✓</div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Structural Integrity</div>
              <div className="font-bold text-gray-200">100% Passed</div>
            </div>
          </div>
          <div className="bg-dark-900 border border-dark-700 p-4 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-warning/20 flex items-center justify-center text-accent-warning text-xl font-bold">!</div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Detected Gaps</div>
              <div className="font-bold text-gray-200">14 Minor Gaps</div>
            </div>
          </div>
          <div className="bg-dark-900 border border-dark-700 p-4 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl font-bold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Total Recovered</div>
              <div className="font-bold text-gray-200">5.1 GB Video Data</div>
            </div>
          </div>
        </div>

        <div className="border border-dark-700 rounded-lg overflow-hidden bg-dark-900">
           <div className="bg-dark-800 p-3 border-b border-dark-700 font-bold text-sm text-gray-300">Recovered Video Files (Ready for Normalization)</div>
           <table className="w-full text-left text-sm">
             <thead className="text-gray-500 border-b border-dark-700">
               <tr>
                 <th className="p-3 font-normal">Filename</th>
                 <th className="p-3 font-normal">Duration</th>
                 <th className="p-3 font-normal">Validation Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-dark-700">
               <tr className="hover:bg-dark-800 transition-colors">
                 <td className="p-3 font-mono text-gray-300">REC_CH01_0915_1422.mp4</td>
                 <td className="p-3 text-gray-400">22m 50s</td>
                 <td className="p-3 text-accent-500">Valid</td>
               </tr>
               <tr className="hover:bg-dark-800 transition-colors">
                 <td className="p-3 font-mono text-gray-300">REC_CH01_0915_1445.mp4</td>
                 <td className="p-3 text-gray-400">25m 33s</td>
                 <td className="p-3 text-accent-warning">Valid (Contains 1 gap)</td>
               </tr>
               <tr className="hover:bg-dark-800 transition-colors">
                 <td className="p-3 font-mono text-gray-300">REC_CH04_0915_1425.mp4</td>
                 <td className="p-3 text-gray-400">35m 00s</td>
                 <td className="p-3 text-accent-500">Valid</td>
               </tr>
             </tbody>
           </table>
        </div>
        
        <div className="mt-4 p-3 bg-dark-900 border border-dark-700 rounded text-sm text-gray-400 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-dark-800 flex items-center justify-center border border-dark-600 shrink-0">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
          These standard .mp4 files have been placed in the Evidence Container. They are now ready to be sent to the Timeline Analysis and Machine Learning modules.
        </div>

      </div>
    </div>
  );
}
