import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateCase(): React.JSX.Element {
  const navigate = useNavigate();
  const [caseId, setCaseId] = useState<string>(`CASE-00${Math.floor(Math.random() * 80) + 10}`);
  const [caseName, setCaseName] = useState<string>('');
  const [leadExaminer, setLeadExaminer] = useState<string>(localStorage.getItem('forensic_user') || 'Det. M. Vance');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseName.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const newCase = {
        id: caseId,
        name: caseName,
        date: new Date().toISOString().split('T')[0],
        status: 'Active Evidence',
        oem: 'Dahua Technology (DHFS)',
        evidenceSize: '3.6 TB / 4TB'
      };

      const existing = localStorage.getItem('forensic_cases');
      const parsed = existing ? JSON.parse(existing) : [];
      localStorage.setItem('forensic_cases', JSON.stringify([newCase, ...parsed]));

      setLoading(false);
      navigate(`/case/${caseId}/evidence-registration`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col select-none pb-16">

      {/* Cybernetic Header Navbar */}
      <header className="flex justify-between items-center p-6 lg:px-10 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 shadow-lg shadow-teal-500/20 flex items-center justify-center font-mono font-black text-zinc-950 text-sm">
            TV
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-white">TRACEVAULT</span>
            <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase">Case Intake Terminal</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer"
        >
          ← Return to Dashboard
        </button>
      </header>

      {/* Main Intake Form Container */}
      <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 flex flex-col gap-8 pt-10">
        
        <div className="border-b border-zinc-800 pb-5">
          <div className="inline-block px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
            EVIDENTIARY INTAKE PROTOCOL
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Initialize New Forensic Investigation
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
            Configure primary case identifiers and lead examiner sign-off parameters.
          </p>
        </div>

        <form onSubmit={handleCreateCase} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
          
          {/* Row 1: Case ID & Investigation Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-zinc-400 mb-1.5">
                Case Identifier
              </label>
              <input
                type="text"
                value={caseId}
                onChange={e => setCaseId(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-teal-300 font-bold focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase font-bold text-zinc-400 mb-1.5">
                Operation / Incident Name
              </label>
              <input
                type="text"
                value={caseName}
                onChange={e => setCaseName(e.target.value)}
                placeholder="e.g. Operation Nightfall (Server Room Incursion)"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-400 font-sans"
              />
            </div>
          </div>

          {/* Row 2: Lead Forensic Examiner */}
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-zinc-400 mb-1.5">
              Lead Forensic Examiner
            </label>
            <input
              type="text"
              value={leadExaminer}
              onChange={e => setLeadExaminer(e.target.value)}
              placeholder="e.g. Det. M. Vance (DF-8812)"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-400 font-sans"
            />
          </div>

          {/* Write-Blocker Status Indicator */}
          <div className="bg-zinc-950 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3 font-mono text-xs">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <span className="text-white font-bold block">Hardware Write-Blocker State: Engaged</span>
              <span className="text-zinc-400 text-[11px]">Platter write operations are physically blocked in accordance with ISO/IEC 27037.</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black font-mono text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex justify-center items-center h-12 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Initialize Case & Begin Acquisition →'
            )}
          </button>

        </form>

      </main>

    </div>
  );
}