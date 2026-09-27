import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface AIEventItem {
  timestamp: string;
  channel: string;
  event: string;
  confidence: string;
  personsCount: number;
  vehiclesCount: number;
}

export default function AIInvestigation(): React.JSX.Element {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId?: string }>();
  const activeCase = caseId || 'CASE-001';

  const [analyzing, setAnalyzing] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(15);

  // Modal states
  const [selectedEvent, setSelectedEvent] = useState<AIEventItem | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'summary' | 'video'>('summary');
  
  // Criminal scan simulation states (2 matched persons out of 14)
  const [scanningCriminal, setScanningCriminal] = useState<boolean>(false);
  const [criminalStepText, setCriminalStepText] = useState<string>('');
  const [criminalResults, setCriminalResults] = useState<Array<{ name: string; age: string; location: string; allegation: string; confidence: string; image: string }>>([]);

  // RTO plate scan simulation states (2 vehicles with color and model)
  const [scanningRto, setScanningRto] = useState<boolean>(false);
  const [rtoStepText, setRtoStepText] = useState<string>('');
  const [rtoResults, setRtoResults] = useState<Array<{ vehicleNo: string; owner: string; location: string; model: string; color: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 15 : prev));
    }, 350);

    const timer = setTimeout(() => {
      setAnalyzing(false);
      clearInterval(interval);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const aiEventsList: AIEventItem[] = [
    { timestamp: '02:10:15 to 02:26:34', channel: 'CH-02', event: 'Multiple persons crowd detected in restricted sector', confidence: '96.4%', personsCount: 14, vehiclesCount: 0 },
    { timestamp: '03:05:10 to 03:12:35', channel: 'CH-05', event: 'Multiple persons & vehicle detected near perimeter gate', confidence: '98.1%', personsCount: 14, vehiclesCount: 2 },
    { timestamp: '04:18:40 to 04:25:00', channel: 'CH-01', event: 'Unidentified thermal motion anomaly in corridor', confidence: '92.5%', personsCount: 3, vehiclesCount: 0 },
    { timestamp: '05:42:00 to 05:50:12', channel: 'CH-08', event: 'Vehicle transit detected without license plate match', confidence: '94.8%', personsCount: 2, vehiclesCount: 12 },
    { timestamp: '06:15:30 to 06:22:45', channel: 'CH-04', event: 'Forced entry vibration signature & person loitering', confidence: '97.3%', personsCount: 8, vehiclesCount: 1 },
    { timestamp: '07:01:12 to 07:10:00', channel: 'CH-12', event: 'Multiple persons carrying heavy equipment containers', confidence: '99.0%', personsCount: 14, vehiclesCount: 4 }
  ];

  // High-level criminal scan simulation workflow (2 matched out of 14, confidence > 96%)
  const handleScanCriminal = () => {
    setScanningCriminal(true);
    setCriminalResults([]);
    setCriminalStepText('INITIALIZING SECURE API HANDSHAKE WITH BIOMETRIC REGISTRY...');

    setTimeout(() => {
      setCriminalStepText('EXTRACTING FACIAL TENSORS FOR ALL 14 INDIVIDUALS...');
    }, 1200);

    setTimeout(() => {
      setCriminalStepText('CROSS-MATCHING HASHES AGAINST NATIONAL WANTED LEDGERS...');
    }, 2400);

    setTimeout(() => {
      setScanningCriminal(false);
      setCriminalResults([
        {
          name: 'Ashok Jendhe',
          age: '31',
          location: 'Pune Central',
          allegation: 'Robbery & Unauthorized Incursion',
          confidence: '98.4%',
          image: '/susPerson1.png'
        },
        {
          name: 'Vikram Shinde',
          age: '28',
          location: 'Pune Wakad',
          allegation: 'Armed Assault & Warrant Evasion',
          confidence: '96.7%',
          image: '/susPerson2.png'
        }
      ]);
    }, 3600);
  };

  // RTO plate scan simulation workflow (2 vehicles with model & color)
  const handleScanRto = () => {
    setScanningRto(true);
    setRtoResults([]);
    setRtoStepText('CONNECTING TO RTO VEHICLE REGISTRATION GATEWAY...');

    setTimeout(() => {
      setRtoStepText('ISOLATING LICENSE PLATE BOUNDING BOXES & RUNNING OCR...');
    }, 1200);

    setTimeout(() => {
      setRtoStepText('CROSS-REFERENCING NATIONAL HOTLIST & OWNER LEDGERS...');
    }, 2400);

    setTimeout(() => {
      setScanningRto(false);
      setRtoResults([
        {
          vehicleNo: 'MH12XR2562',
          owner: 'Mr. Saket Dixit',
          location: 'Pune Central',
          model: 'Mahindra Thar SUV',
          color: 'Matte Black'
        },
        {
          vehicleNo: 'MH14BW9011',
          owner: 'Mrs. Priya Kulkarni',
          location: 'Pune Hinjewadi',
          model: 'Hyundai Creta SX',
          color: 'Polar White'
        }
      ]);
    }, 3600);
  };

  const handleOpenModal = (item: AIEventItem, tab: 'summary' | 'video') => {
    setSelectedEvent(item);
    setActiveModalTab(tab);
    setCriminalResults([]);
    setRtoResults([]);
    setScanningCriminal(false);
    setScanningRto(false);
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 font-sans select-none pb-16 relative overflow-hidden">
      
      {/* Dynamic Cyber Aurora Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-violet-600/20 via-cyan-600/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-tl from-teal-500/15 via-indigo-500/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-6 relative z-10">

        {/* 1. Hero Cyber Header Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0c1220]/95 via-[#0e1628]/90 to-[#0c1424]/95 border border-violet-500/30 p-8 shadow-[0_0_50px_-12px_rgba(139,92,246,0.25)] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/40 text-violet-300 font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
                  PHASE 19 • NEURAL INTELLIGENCE
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  TENSORRT GPU ACTIVE
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-violet-100 to-cyan-400 bg-clip-text text-transparent">
                AI Vision & Event Investigation
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
                Granular inspection of verified event intervals. Execute biometric criminal database matching, facial recognition, and automated RTO optical character recognition.
              </p>
            </div>

            <button
              onClick={() => navigate('../cross-camera')}
              className="group relative self-start lg:self-auto overflow-hidden rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 p-[1px] font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_30px_-5px_rgba(20,184,166,0.5)] hover:shadow-[0_0_40px_rgba(20,184,166,0.8)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 px-7 py-4 text-slate-950 flex items-center gap-3 font-extrabold group-hover:brightness-105 transition-all">
                <span>Cross-Camera Correlation</span>
                <span className="group-hover:translate-x-1.5 transition-transform text-sm">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Analyzing Terminal State */}
        {analyzing ? (
          <div className="rounded-3xl bg-[#0b101c]/90 border border-slate-800 p-16 flex flex-col items-center justify-center gap-6 shadow-2xl backdrop-blur-xl">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-violet-500/40 rounded-3xl animate-spin [animation-duration:6s]" />
              <div className="w-14 h-14 rounded-2xl border-2 border-cyan-400 flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <span className="text-cyan-300 font-bold font-mono text-sm">AI</span>
              </div>
            </div>

            <div className="text-center z-10 max-w-md">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                Compiling Neural Event Summaries
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Running object vector extraction across candidate event bounds...
              </p>
            </div>

            <div className="w-full max-w-md flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Tensor Inference Progress</span>
                <span className="text-cyan-400 font-bold">{progress}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-teal-400 to-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">

            {/* 3. Event List Ledger */}
            <div className="rounded-3xl bg-[#0b101c]/90 border border-slate-800 p-7 shadow-2xl backdrop-blur-xl flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                <h2 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
                  Verified Candidate Event Inspection Matrix
                </h2>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1.5 rounded-xl font-bold">
                  Total Events: {aiEventsList.length}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {aiEventsList.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#070b13] border border-slate-800 hover:border-violet-500/60 rounded-2xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-violet-950/80 text-violet-300 border border-violet-500/40 w-fit shadow-sm">
                        {item.channel}
                      </span>

                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold text-white">
                          <span className="text-cyan-300 bg-[#0f172a] px-3 py-1 rounded-lg border border-cyan-500/30 font-mono">
                            {item.timestamp}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="font-sans font-medium text-slate-200">{item.event}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                          Confidence: <strong className="text-emerald-400">{item.confidence}</strong> | {item.personsCount} Persons Detected | {item.vehiclesCount} Vehicles Detected
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 text-xs font-mono w-full lg:w-auto justify-end">
                      <button
                        onClick={() => handleOpenModal(item, 'summary')}
                        className="bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 text-violet-300 px-5 py-3 rounded-xl transition-all cursor-pointer font-extrabold shadow-[0_0_15px_rgba(139,92,246,0.2)] active:scale-95"
                      >
                        Show AI Summary
                      </button>
                      <button
                        onClick={() => handleOpenModal(item, 'video')}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white px-5 py-3 rounded-xl transition-all cursor-pointer font-bold active:scale-95"
                      >
                        Show video footage of event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Bottom Navigation Footer */}
            <div className="rounded-2xl bg-[#0b101c]/90 border border-slate-800 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>AI summaries and extracted event footage verified. Ready for multi-camera correlation.</span>
              </div>

              <button
                onClick={() => navigate('../cross-camera')}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 hover:brightness-110 active:scale-[0.98] text-slate-950 font-black uppercase tracking-wider px-7 py-3 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all cursor-pointer whitespace-nowrap"
              >
                Cross-Camera Correlation →
              </button>
            </div>

          </div>
        )}

        {/* 5. Enhanced Large-Scale Interactive Modal Window */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-[#0b101c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col gap-6 shadow-[0_0_80px_-15px_rgba(6,182,212,0.3)] animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-black shadow-sm">
                    {selectedEvent.channel}
                  </span>
                  <span className="text-cyan-200 font-bold text-sm tracking-wide">
                    {selectedEvent.timestamp}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer flex items-center justify-center font-bold text-base transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Tab Switcher */}
              <div className="flex gap-3 font-mono text-xs">
                <button
                  onClick={() => setActiveModalTab('summary')}
                  className={`flex-1 py-3.5 rounded-2xl border transition-all cursor-pointer font-extrabold uppercase tracking-wider ${
                    activeModalTab === 'summary'
                      ? 'bg-gradient-to-r from-violet-600/30 to-cyan-600/30 border-violet-500/60 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.25)]'
                      : 'bg-[#070b13] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🧠 AI Summary & Biometric Scans
                </button>
                <button
                  onClick={() => setActiveModalTab('video')}
                  className={`flex-1 py-3.5 rounded-2xl border transition-all cursor-pointer font-extrabold uppercase tracking-wider ${
                    activeModalTab === 'video'
                      ? 'bg-gradient-to-r from-teal-600/30 to-emerald-600/30 border-teal-500/60 text-teal-200 shadow-[0_0_20px_rgba(20,184,166,0.25)]'
                      : 'bg-[#070b13] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🎥 Event Footage Player (`AI event footage.mp4`)
                </button>
              </div>

              {/* Modal Content: Summary Tab */}
              {activeModalTab === 'summary' ? (
                <div className="flex flex-col gap-6 font-mono">
                  
                  {/* Event Description Card */}
                  <div className="bg-[#070b13] border border-slate-800 p-5 rounded-2xl flex flex-col gap-1.5 shadow-md">
                    <span className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">Event Diagnostic Overview</span>
                    <span className="text-slate-100 font-sans font-semibold text-base">• Suspicious Loitering: Two men wearing sunglasses have remained near the perimeter for 20 minutes—one stationary and actively on a phone call, the second pacing nearby.   
                    </span>
                    <span className="text-slate-100 font-sans font-semibold text-base">• Vehicular Pattern: A dark sedan conducted 4 repetitive, low-speed passes along the same stretch within the same 20-minute window.   
                    </span>
                    <span className="text-slate-100 font-sans font-semibold text-base">⚠️ Flag: Requires investigator review   
                    </span>
                    <span className="text-purple-100 font-sans font-semibold text-base">Confidence: 91.4% 
                    </span>
                  </div>

                  {/* Criminal Scan Section (2 persons out of 14 with susPerson1.png & susPerson2.png) */}
                  <div className="bg-[#070b13] border border-slate-800 p-6 rounded-2xl flex flex-col gap-5 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          Total <strong className="text-violet-400 text-base">{selectedEvent.personsCount} persons</strong> detected in frame tensors.
                        </span>
                        <span className="text-xs text-slate-400 font-sans mt-0.5">Execute biometric tensor comparison against national criminal databases.</span>
                      </div>
                      <button
                        onClick={handleScanCriminal}
                        disabled={scanningCriminal}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-mono font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95 whitespace-nowrap"
                      >
                        {scanningCriminal ? 'Executing Biometric Pass...' : 'Scan for Criminal records'}
                      </button>
                    </div>

                    {/* Processing Simulation with Bold Text & Glow */}
                    {scanningCriminal && (
                      <div className="bg-violet-950/40 border border-violet-500/50 p-5 rounded-xl flex items-center gap-4 animate-pulse shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                        <div className="w-6 h-6 rounded-full border-3 border-violet-400 border-t-transparent animate-spin shrink-0" />
                        <span className="text-sm font-black text-violet-200 tracking-wider uppercase">
                          {criminalStepText}
                        </span>
                      </div>
                    )}

                    {/* Final Criminal Match Outputs (2 Persons out of 14, Confidence > 96%) */}
                    {criminalResults.length > 0 && (
                      <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                          2 persons out of 14 in criminal database
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {criminalResults.map((person, pIdx) => (
                            <div key={pIdx} className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/70 border-2 border-emerald-400/60 p-5 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(52,211,153,0.3)] animate-in fade-in duration-300">
                              
                              {/* Suspect Face Image */}
                              <div className="relative w-20 h-20 rounded-xl border-2 border-emerald-400 overflow-hidden bg-slate-950 shrink-0 shadow-md">
                                <img 
                                  src={person.image} 
                                  alt={`Suspect ${pIdx + 1}`} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <div className="absolute bottom-0 inset-x-0 bg-emerald-950/90 text-emerald-300 text-[8px] text-center font-bold py-0.5 uppercase tracking-widest">
                                  {person.confidence}
                                </div>
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded w-fit border border-emerald-500/30 font-bold">
                                  MATCHED (&gt;96% CONFIDENCE)
                                </span>
                                <h4 className="text-base font-black text-white tracking-tight uppercase bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent font-mono">
                                  {person.name}
                                </h4>
                                <p className="text-[11px] text-slate-300 font-sans leading-tight">
                                  <strong className="text-emerald-300 font-mono">Location:</strong> {person.location}<br />
                                  <strong className="text-rose-400 font-mono">Allegation:</strong> {person.allegation}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RTO Plate Scan Section (2 Different Vehicles with Model & Color) */}
                  <div className="bg-[#070b13] border border-slate-800 p-6 rounded-2xl flex flex-col gap-5 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">
                          Total <strong className="text-amber-400 text-base">{selectedEvent.vehiclesCount} vehicles</strong> detected in frame tensors.
                        </span>
                        <span className="text-xs text-slate-400 font-sans mt-0.5">Execute optical character recognition (OCR) and RTO vehicle registration queries.</span>
                      </div>
                      <button
                        onClick={handleScanRto}
                        disabled={scanningRto || selectedEvent.vehiclesCount === 0}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-slate-950 font-mono font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 whitespace-nowrap"
                      >
                        {scanningRto ? 'Querying RTO Gateway...' : 'Scan for Number Plates'}
                      </button>
                    </div>

                    {selectedEvent.vehiclesCount === 0 && (
                      <span className="text-xs text-slate-500 italic font-sans">No vehicles present in this event interval to scan plates.</span>
                    )}

                    {/* Processing Simulation with Bold Text & Glow */}
                    {scanningRto && (
                      <div className="bg-amber-950/40 border border-amber-500/50 p-5 rounded-xl flex items-center gap-4 animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <div className="w-6 h-6 rounded-full border-3 border-amber-400 border-t-transparent animate-spin shrink-0" />
                        <span className="text-sm font-black text-amber-200 tracking-wider uppercase">
                          {rtoStepText}
                        </span>
                      </div>
                    )}

                    {/* Final RTO Match Outputs (2 Different Vehicles with Model & Color) */}
                    {rtoResults.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                          RTO VEHICLE REGISTRATION MATCHES (2 VEHICLES)
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {rtoResults.map((vehicle, vIdx) => (
                            <div key={vIdx} className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 border-2 border-amber-400/60 p-5 rounded-2xl flex flex-col gap-2 shadow-[0_0_30px_rgba(245,158,11,0.25)] animate-in fade-in duration-300">
                              <span className="text-[9px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded w-fit border border-amber-500/30 font-bold">
                                VEHICLE #{vIdx + 1}
                              </span>
                              <h4 className="text-lg font-black text-white tracking-tight uppercase bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent font-mono">
                                {vehicle.vehicleNo}
                              </h4>
                              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                <strong className="text-amber-300 font-mono">Model:</strong> {vehicle.model} &nbsp;|&nbsp; <strong className="text-cyan-300 font-mono">Color:</strong> {vehicle.color}<br />
                                <strong className="text-teal-300 font-mono">Owner:</strong> {vehicle.owner}<br />
                                <strong className="text-slate-400 font-mono">Location:</strong> {vehicle.location}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                /* Modal Content: Video Player Tab */
                <div className="flex flex-col gap-4">
                  <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center relative aspect-video shadow-2xl">
                    <video
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                      src="/AI event footage.mp4"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <span className="font-mono text-xs text-slate-400 text-center">
                    Source: Verified event-based forensic clip (`AI event footage.mp4`)
                  </span>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase font-extrabold px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}