import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-950 text-gray-200 font-sans flex flex-col relative overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] border-[1px] border-primary-500/20 rounded-full absolute animate-[spin_60s_linear_infinite]"></div>
        <div className="w-[600px] h-[600px] border-[1px] border-primary-500/30 rounded-full absolute animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="w-[400px] h-[400px] bg-primary-500/5 blur-[100px] rounded-full absolute"></div>
      </div>

      <header className="flex justify-between items-center p-6 lg:px-12 relative z-10 border-b border-dark-800 bg-dark-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <span className="text-xl font-bold tracking-wider text-gray-100">NEXUS<span className="text-primary-500">FORENSICS</span></span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/auth?mode=login')} className="px-6 py-2 text-gray-300 hover:text-white transition-colors font-medium">Log In</button>
          <button onClick={() => navigate('/auth?mode=signup')} className="px-6 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded font-bold transition-all shadow-lg shadow-primary-500/20">Sign Up</button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 max-w-5xl mx-auto py-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-dark-800 border border-dark-600 text-primary-400 text-sm font-bold tracking-widest mb-8">
          MILITARY-GRADE VIDEO RECOVERY
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Digital Forensic <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">DVR/NVR Platform</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mb-12">
          Automated proprietary format detection, unallocated space carving, timeline normalization, and AI-driven cross-camera correlation for court-ready evidence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button onClick={() => navigate('/auth?mode=signup')} className="px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105">
            Initialize Platform
          </button>
          <button className="px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-600 text-gray-200 rounded-lg font-bold text-lg transition-all">
            View Architecture
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
           <div className="bg-dark-900/80 border border-dark-800 p-6 rounded-xl backdrop-blur">
             <div className="w-12 h-12 bg-primary-500/20 text-primary-400 rounded flex items-center justify-center text-2xl mb-4">🔍</div>
             <h3 className="font-bold text-gray-200 text-lg mb-2">Deep Data Carving</h3>
             <p className="text-sm text-gray-500">Bypass the filesystem to recover deleted or overwritten video frames directly from physical disk blocks.</p>
           </div>
           <div className="bg-dark-900/80 border border-dark-800 p-6 rounded-xl backdrop-blur">
             <div className="w-12 h-12 bg-accent-500/20 text-accent-500 rounded flex items-center justify-center text-2xl mb-4">⏱️</div>
             <h3 className="font-bold text-gray-200 text-lg mb-2">Timeline Normalization</h3>
             <p className="text-sm text-gray-500">Automatically correct hardware clock drift and merge disparate camera feeds into a unified ISO-8601 timeline.</p>
           </div>
           <div className="bg-dark-900/80 border border-dark-800 p-6 rounded-xl backdrop-blur">
             <div className="w-12 h-12 bg-accent-warning/20 text-accent-warning rounded flex items-center justify-center text-2xl mb-4">🧠</div>
             <h3 className="font-bold text-gray-200 text-lg mb-2">AI Event Correlation</h3>
             <p className="text-sm text-gray-500">Run YOLOv8 and ByteTrack to automatically track suspects and vehicles across multiple independent cameras.</p>
           </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-dark-800 bg-dark-950 relative z-10">
        &copy; 2026 Nexus Forensics. High-Fidelity Prototype.
      </footer>
    </div>
  );
}
