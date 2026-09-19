import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormatIdentification() {
  const [scanning, setScanning] = useState(true);
  const [vendorFound, setVendorFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scanTimer = setTimeout(() => {
      setScanning(false);
      setVendorFound(true);
    }, 2500);
    return () => clearTimeout(scanTimer);
  }, []);

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">DVR/NVR Format Identification</h2>
        <p className="text-gray-400 mt-1">Scanning offsets and magic bytes to automatically determine the file system and vendor structure.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-6">
        
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-dark-900 border border-dark-700 flex items-center justify-center">
            {scanning ? (
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className="text-primary-400 font-bold text-xl">✓</div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-200">Offset & Magic Byte Scanner</h3>
            <p className="text-sm text-gray-400">{scanning ? 'Reading sector 0-1024 for known vendor signatures...' : 'Scan complete. Magic signatures identified.'}</p>
          </div>
        </div>

        {scanning ? (
           <div className="bg-dark-900 border border-dark-700 p-4 rounded h-40 flex items-center justify-center">
             <div className="font-mono text-xs text-primary-500/50 flex flex-col items-center gap-2">
                <div>0x00000000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00</div>
                <div>0x00000010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00</div>
                <div className="text-primary-500 animate-pulse">Scanning block offsets...</div>
             </div>
           </div>
        ) : (
           <div className="bg-dark-900 border border-primary-500/30 p-6 rounded flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
             <div className="flex flex-col gap-2">
                <div className="text-xs font-bold text-primary-500 uppercase tracking-wider">Vendor & Format Confirmed</div>
                <div className="text-2xl font-bold text-gray-100">DAHUA DHFS (Proprietary)</div>
                <div className="text-sm text-gray-400">Magic Signature Match: <span className="font-mono text-gray-300">0x44 0x48 0x41 0x56 (DHAV)</span></div>
             </div>
             <button onClick={() => navigate('../vendor-parser')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
               Select Appropriate Parser →
             </button>
           </div>
        )}

      </div>
    </div>
  );
}
