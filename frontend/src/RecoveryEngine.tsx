import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecoveryEngine() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => {
        if (s < 5) return s + 1;
        clearInterval(timer);
        return s;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { name: 'Recording Index Analysis', desc: 'Reading index tables to detect deleted/expired entries and map channel time blocks.' },
    { name: 'Deleted-Region Identification', desc: 'Comparing index vs data blocks to locate unreferenced regions (450 GB identified).' },
    { name: 'Video Signature Carving', desc: 'Scanning residual blocks for Dahua frame signatures (0x00 00 01 BA).' },
    { name: 'Fragment Classification', desc: 'Extracting timestamps, identifying channel info, grouping fragments.' },
    { name: 'Fragment Ordering', desc: 'Resolving overlapping fragments and ensuring sequence continuity.' },
  ];

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Recovery Engine</h2>
        <p className="text-gray-400 mt-1">Carving and reassembling deleted or fragmented video data from unallocated space.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-8">
           {steps.map((s, idx) => (
             <div key={idx} className={`h-2 rounded-full ${idx < step ? 'bg-primary-500' : idx === step ? 'bg-accent-warning animate-pulse' : 'bg-dark-700'}`}></div>
           ))}
        </div>

        <div className="flex flex-col gap-6 min-h-[300px]">
          {steps.map((s, idx) => (
             idx <= step && (
               <div key={idx} className={`flex gap-4 p-4 rounded border ${idx === step ? 'border-accent-warning/50 bg-accent-warning/5' : 'border-dark-700 bg-dark-900'}`}>
                 <div className="mt-1">
                   {idx < step ? (
                     <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-sm">✓</div>
                   ) : (
                     <div className="w-6 h-6 border-2 border-accent-warning border-t-transparent rounded-full animate-spin"></div>
                   )}
                 </div>
                 <div>
                   <h4 className={`font-bold ${idx === step ? 'text-accent-warning' : 'text-gray-200'}`}>{s.name}</h4>
                   <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
                 </div>
               </div>
             )
          ))}
        </div>

        {step >= 5 && (
           <div className="mt-6 flex justify-between items-center pt-6 border-t border-dark-700">
             <div className="flex flex-col">
               <span className="text-primary-400 font-bold text-lg">Recovery Engine Completed</span>
               <span className="text-sm text-gray-400">14,392 fragmented video blocks carved successfully.</span>
             </div>
             <button onClick={() => navigate('../fragment-explorer')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
               Explore Recovered Fragments →
             </button>
           </div>
        )}
      </div>
    </div>
  );
}
