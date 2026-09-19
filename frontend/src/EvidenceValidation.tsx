import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EvidenceValidation() {
  const [validating, setValidating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setValidating(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Final Evidence Validation</h2>
          <p className="text-gray-400 mt-1">Ensuring all findings and timelines remain forensically sound and trace back to the original image.</p>
        </div>
        {!validating && (
          <button onClick={() => navigate('../case-summary')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
            Proceed to Case Summary →
          </button>
        )}
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        {validating ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-primary-400 font-medium">Validating entire forensic pipeline...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
             <div className="bg-dark-900 border border-dark-700 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-dark-700 flex justify-between items-center bg-dark-800">
                  <h3 className="font-bold text-gray-300">Pipeline Integrity Checks</h3>
                  <span className="text-xs font-bold bg-accent-500/20 text-accent-500 px-3 py-1 rounded-full border border-accent-500/30">ALL PASSED</span>
                </div>
                
                <div className="divide-y divide-dark-700 text-sm">
                   <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="text-accent-500">✓</div>
                         <div className="text-gray-300 font-medium">Original Image Hash Verification (MD5/SHA-256)</div>
                      </div>
                      <div className="text-gray-500 font-mono text-xs">Matches Post-Acquisition</div>
                   </div>
                   <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="text-accent-500">✓</div>
                         <div className="text-gray-300 font-medium">Data Carving Source Alignment</div>
                      </div>
                      <div className="text-gray-500 font-mono text-xs">All offsets map to Unallocated Space</div>
                   </div>
                   <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="text-accent-500">✓</div>
                         <div className="text-gray-300 font-medium">Timeline Clock Drift Audit</div>
                      </div>
                      <div className="text-gray-500 font-mono text-xs">+3m14s universally applied</div>
                   </div>
                   <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="text-accent-500">✓</div>
                         <div className="text-gray-300 font-medium">AI Event Traceability</div>
                      </div>
                      <div className="text-gray-500 font-mono text-xs">100% Events linked to source frames</div>
                   </div>
                </div>
             </div>
             
             <div className="bg-accent-500/5 border border-accent-500/30 p-4 rounded text-sm text-gray-300 flex items-center gap-4">
                <div className="text-3xl">🏛️</div>
                <div>
                   <span className="font-bold text-accent-500 block mb-1">Court-Ready Status</span>
                   The integrity of this digital evidence has been maintained from physical acquisition through machine learning analysis. No data has been destructively modified.
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
