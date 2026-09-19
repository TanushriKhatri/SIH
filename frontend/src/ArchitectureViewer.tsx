import React, { useState } from 'react';

export default function ArchitectureViewer() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const modules = [
    {
      name: "1. Evidence & Integrity",
      purpose: "Secure the physical evidence and create a cryptographically verifiable bit-stream image.",
      input: "Seized NVR/DVR HDD",
      processing: "Write blocking, ATA pass-through health checks, DD/E01 imaging with dual hashing.",
      output: "Original HDD (Preserved), Forensic Image File, MD5/SHA-256 Hashes"
    },
    {
      name: "2. Format Identification & Parsing",
      purpose: "Automatically detect the proprietary filesystem and map the data structures.",
      input: "Forensic Image File",
      processing: "Magic byte/offset scanning, loading vendor-specific parsers (e.g., Dahua DHFS), structure analysis.",
      output: "Partitions, Indexed Video Timestamps, Unallocated Space Map"
    },
    {
      name: "3. Recovery & Reconstruction",
      purpose: "Carve deleted or overwritten video data from unallocated space.",
      input: "Unallocated Space Map, Vendor Signatures",
      processing: "Signature scanning, fragment classification, temporal ordering, and container wrapping.",
      output: "Recovered Video Fragments, Standardized MP4s"
    },
    {
      name: "4. Timeline & AI Investigation",
      purpose: "Normalize time and intelligently identify events across multiple cameras.",
      input: "Standardized MP4s, Extracted Metadata",
      processing: "Clock drift calculation, YOLO object detection, ByteTrack tracking, cross-camera linking.",
      output: "Unified Timeline, AI Investigative Findings (Persons/Vehicles tracked)"
    },
    {
      name: "5. Validation & Reporting",
      purpose: "Ensure forensic soundness and compile the final court-ready package.",
      input: "AI Findings, Timeline, Hash Logs",
      processing: "Structural integrity checks, chain of custody verification, PDF/ZIP generation.",
      output: "Cryptographically Signed Forensic Report Package"
    }
  ];

  return (
    <div className="max-w-6xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Interactive Architecture Viewer</h2>
        <p className="text-gray-400 mt-1">High-level workflow of the Digital Forensic DVR/NVR Evidence Analysis Platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        
        {/* Pipeline Diagram */}
        <div className="flex flex-col gap-4 relative">
           <div className="absolute top-8 bottom-8 left-8 w-1 bg-dark-600"></div>
           
           {modules.map((m, i) => (
             <div 
               key={i}
               onClick={() => setActiveModule(i)}
               className={`relative z-10 flex items-center gap-6 p-4 rounded-lg cursor-pointer transition-all border ${activeModule === i ? 'bg-primary-500/20 border-primary-500' : 'bg-dark-800 border-dark-600 hover:border-primary-500/50 hover:bg-dark-700'}`}
             >
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 ${activeModule === i ? 'bg-primary-500 text-dark-900' : 'bg-dark-700 text-gray-400'}`}>
                 {i + 1}
               </div>
               <div className={`font-bold ${activeModule === i ? 'text-primary-400' : 'text-gray-300'}`}>
                 {m.name}
               </div>
             </div>
           ))}
        </div>

        {/* Detail Panel */}
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-8 h-full min-h-[400px]">
           {activeModule !== null ? (
             <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-2xl font-bold text-primary-400 border-b border-dark-700 pb-4">{modules[activeModule].name}</h3>
                
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Purpose</div>
                  <div className="text-gray-200">{modules[activeModule].purpose}</div>
                </div>
                
                <div className="bg-dark-900 border border-dark-700 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-dark-700 bg-dark-900/50">
                    <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">Input</div>
                    <div className="text-gray-300 font-mono text-sm">{modules[activeModule].input}</div>
                  </div>
                  <div className="p-4 border-b border-dark-700">
                    <div className="text-xs font-bold text-accent-warning uppercase tracking-widest mb-1">Processing</div>
                    <div className="text-gray-300 text-sm">{modules[activeModule].processing}</div>
                  </div>
                  <div className="p-4 bg-dark-900/50">
                    <div className="text-xs font-bold text-accent-500 uppercase tracking-widest mb-1">Output</div>
                    <div className="text-gray-300 font-mono text-sm">{modules[activeModule].output}</div>
                  </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 italic">
               Click on any module in the pipeline<br/>to view its detailed architecture specifications.
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
