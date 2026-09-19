import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HardwareInterrogation() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => {
        if (s < 4) return s + 1;
        clearInterval(timer);
        return s;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: 'Initializing ATA Pass Through...', details: 'Connecting to physical interface.' },
    { label: 'Querying Device Identification...', details: 'Retrieving Serial, Model, Firmware.' },
    { label: 'Reading SMART Health Metrics...', details: 'Checking reallocated sectors and power cycles.' },
    { label: 'Establishing Write Protection...', details: 'Software write-blocker active.' }
  ];

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Hardware Interrogation</h2>
        <p className="text-gray-400 mt-1">Interrogating physical media through write-blocked ATA interface.</p>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-200 mb-4 border-b border-dark-700 pb-2">Interrogation Progress</h3>
        
        <div className="flex flex-col gap-4">
          {steps.map((s, idx) => (
            <div key={idx} className={`flex items-start gap-4 p-3 rounded border ${idx < step ? 'border-primary-500/30 bg-primary-500/5' : idx === step ? 'border-accent-warning/50 bg-accent-warning/5 animate-pulse' : 'border-dark-700 bg-dark-900 opacity-50'}`}>
              <div className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 ${idx < step ? 'bg-primary-500' : idx === step ? 'bg-accent-warning' : 'bg-dark-600'}`}></div>
              <div>
                <div className={`font-semibold ${idx <= step ? 'text-gray-200' : 'text-gray-500'}`}>{s.label}</div>
                <div className="text-sm text-gray-500">{s.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {step >= 4 && (
        <div className="bg-dark-800 border border-accent-500/50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-accent-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-500"></div> Interrogation Complete
            </h3>
            <span className="text-xs bg-accent-500/20 text-accent-500 px-2 py-1 rounded">WRITE PROTECTED</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-900 p-3 rounded border border-dark-700">
              <div className="text-xs text-gray-500 uppercase">Model Number</div>
              <div className="text-gray-200 font-mono text-sm mt-1">WDC WD40PURZ-85TTDY0</div>
            </div>
            <div className="bg-dark-900 p-3 rounded border border-dark-700">
              <div className="text-xs text-gray-500 uppercase">Serial Number</div>
              <div className="text-gray-200 font-mono text-sm mt-1">WD-WCC6Y6A</div>
            </div>
            <div className="bg-dark-900 p-3 rounded border border-dark-700">
              <div className="text-xs text-gray-500 uppercase">Firmware Revision</div>
              <div className="text-gray-200 font-mono text-sm mt-1">80.00A80</div>
            </div>
            <div className="bg-dark-900 p-3 rounded border border-dark-700">
              <div className="text-xs text-gray-500 uppercase">SMART Status</div>
              <div className="text-accent-500 font-bold text-sm mt-1">HEALTHY</div>
            </div>
          </div>

          <div className="flex justify-end border-t border-dark-700 pt-4">
             <button onClick={() => navigate('../forensic-acquisition')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
               Proceed to Forensic Acquisition →
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
