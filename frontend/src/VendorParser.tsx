import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VendorParser() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Vendor-Specific Parser Selection</h2>
        <p className="text-gray-400 mt-1">Loading format-specific definitions and initializing video-data decoder for Dahua.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <div className="flex gap-4 items-center mb-6">
          <div className="bg-primary-500/10 text-primary-400 p-3 rounded-lg border border-primary-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-200">Dahua DHFS Parser Module</h3>
            <p className="text-sm text-gray-400">Version 2.4.1 (Proprietary File-System Engine)</p>
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between p-3 bg-dark-900 rounded border border-dark-700">
             <span className="text-gray-300">Loading format-specific signatures...</span>
             {loading ? <span className="text-accent-warning animate-pulse">Loading</span> : <span className="text-accent-500 font-bold">Loaded</span>}
           </div>
           <div className="flex items-center justify-between p-3 bg-dark-900 rounded border border-dark-700">
             <span className="text-gray-300">Loading structure definitions...</span>
             {loading ? <span className="text-accent-warning animate-pulse">Loading</span> : <span className="text-accent-500 font-bold">Loaded</span>}
           </div>
           <div className="flex items-center justify-between p-3 bg-dark-900 rounded border border-dark-700">
             <span className="text-gray-300">Initializing metadata mapping...</span>
             {loading ? <span className="text-accent-warning animate-pulse">Loading</span> : <span className="text-accent-500 font-bold">Mapped</span>}
           </div>
           <div className="flex items-center justify-between p-3 bg-dark-900 rounded border border-dark-700">
             <span className="text-gray-300">Initializing video-data decoder (H.264/H.265)...</span>
             {loading ? <span className="text-accent-warning animate-pulse">Loading</span> : <span className="text-accent-500 font-bold">Ready</span>}
           </div>
        </div>

        {!loading && (
          <div className="mt-6 flex justify-end">
            <button onClick={() => navigate('../storage-structure')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
              Begin Storage Analysis →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
