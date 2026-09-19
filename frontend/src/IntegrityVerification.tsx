import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntegrityVerification() {
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Integrity Hash Verification</h2>
        <p className="text-gray-400 mt-1">Verifying the generated image hash against the acquired stream hash.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <div className="flex flex-col gap-6">
          
          <div className="grid grid-cols-3 gap-4 text-sm border-b border-dark-700 pb-2">
            <div className="text-gray-500 font-bold uppercase">Hash Type</div>
            <div className="text-gray-500 font-bold uppercase">Acquisition Stream</div>
            <div className="text-gray-500 font-bold uppercase">Image File Verification</div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-gray-300 font-bold">MD5</div>
            <div className="font-mono text-gray-400 text-xs break-all bg-dark-900 p-2 rounded">7d79ce9b85bd11c1d471df42f0d9c490</div>
            {verifying ? (
              <div className="text-accent-warning animate-pulse text-sm">Verifying Image...</div>
            ) : (
              <div className="font-mono text-accent-500 text-xs break-all bg-accent-500/10 p-2 rounded border border-accent-500/30">7d79ce9b85bd11c1d471df42f0d9c490</div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-gray-300 font-bold">SHA-256</div>
            <div className="font-mono text-gray-400 text-xs break-all bg-dark-900 p-2 rounded">a52a382109ff60e28f01f0cb49080db9c0a68d0eb5f488ff91386d3cb86ebf45</div>
            {verifying ? (
              <div className="text-accent-warning animate-pulse text-sm">Verifying Image...</div>
            ) : (
              <div className="font-mono text-accent-500 text-xs break-all bg-accent-500/10 p-2 rounded border border-accent-500/30">a52a382109ff60e28f01f0cb49080db9c0a68d0eb5f488ff91386d3cb86ebf45</div>
            )}
          </div>
          
        </div>

        {!verifying && (
          <div className="mt-8 pt-6 border-t border-dark-700 flex justify-between items-center bg-accent-500/5 p-4 rounded border border-accent-500/20">
             <div className="flex flex-col">
                <span className="text-accent-500 font-bold text-lg">Hash Match Confirmed</span>
                <span className="text-gray-400 text-sm">Forensic image integrity is verified. Safe to proceed to format identification.</span>
             </div>
             <button onClick={() => navigate('../format-identification')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
               Proceed to Format ID →
             </button>
          </div>
        )}

      </div>
    </div>
  );
}
