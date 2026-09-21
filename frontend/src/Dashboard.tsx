import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CaseItem {
  id: string;
  name: string;
  date: string;
  status: string;
  oem?: string;
  evidenceSize?: string;
}

export default function Dashboard(): React.JSX.Element {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const investigator = localStorage.getItem('forensic_user') || 'Investigator';

  useEffect(() => {
    const saved = localStorage.getItem('forensic_cases');
    if (saved) {
      setCases(JSON.parse(saved));
    } else {
      const defaultCases: CaseItem[] = [
        { 
          id: 'CASE-001', 
          name: 'Operation Nightfall (Server Room Incursion)', 
          date: '2026-09-19', 
          status: 'Active Evidence', 
          oem: 'Dahua DHFS',
          evidenceSize: '3.6 TB / 4TB' 
        },
        { 
          id: 'CASE-002', 
          name: 'Downtown Commercial Perimeter Breach', 
          date: '2026-09-18', 
          status: 'Analysis Complete', 
          oem: 'Hikvision DAV',
          evidenceSize: '1.8 TB / 2TB' 
        }
      ];
      localStorage.setItem('forensic_cases', JSON.stringify(defaultCases));
      setCases(defaultCases);
    }
  }, []);

  const filteredCases = cases.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.oem && c.oem.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col select-none pb-16">

      {/* Cybernetic Header Navbar */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 lg:px-10 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md gap-4 relative z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 shadow-lg shadow-teal-500/20 flex items-center justify-center font-mono font-black text-zinc-950 text-sm">
            TV
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-white">TRACEVAULT</span>
            <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase">Examiner Control Terminal</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end">
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">Operator: <strong className="text-white">{investigator}</strong></span>
          </div>

          <button 
            onClick={() => { localStorage.removeItem('forensic_user'); navigate('/'); }} 
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col gap-8 pt-8">
        
        {/* Top Control Bar: Title & New Case Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
              ACTIVE CASE REPOSITORY
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Forensic Investigation Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
              Manage multi-OEM evidence containers, unallocated slack carving tasks, and chain-of-custody seals.
            </p>
          </div>

          <button 
            onClick={() => navigate('/create-case')} 
            className="bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>+ Initialize New Case</span>
          </button>
        </div>

        {/* Search & Telemetry Summary Strip */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search case ID, name, or OEM..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 w-full sm:w-auto justify-end">
            <span className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl">
              Total Cases: <strong className="text-white">{cases.length}</strong>
            </span>
            <span className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl">
              Environment: <strong className="text-emerald-400">Write-Blocked</strong>
            </span>
          </div>
        </div>

        {/* Case Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map(c => {
            const isActive = c.status === 'Active Evidence';
            return (
              <Link 
                key={c.id} 
                to={`/case/${c.id}/evidence-registration`} 
                className="bg-zinc-900/90 border border-zinc-800 hover:border-teal-400/80 rounded-2xl p-6 transition-all shadow-xl hover:shadow-teal-950/20 flex flex-col justify-between gap-5 group cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top accent gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <span className="text-base font-mono font-bold text-teal-300 bg-teal-950/60 border border-teal-500/30 px-2.5 py-1 rounded-lg">
                      {c.id}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                      {c.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base tracking-tight group-hover:text-teal-300 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-1">
                      OEM: {c.oem || 'Dahua DHFS'} • {c.evidenceSize || '3.6 TB'}
                    </p>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="pt-4 border-t border-zinc-800/80 flex justify-between items-center font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-teal-400 animate-pulse' : 'bg-emerald-400'}`} />
                    <span className={isActive ? 'text-teal-300 font-bold' : 'text-emerald-300 font-bold'}>
                      {c.status}
                    </span>
                  </div>

                  <span className="text-zinc-500 group-hover:text-teal-400 transition-colors font-bold">
                    Open Case →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCases.length === 0 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center font-mono text-xs text-zinc-500">
            No forensic cases matched your search query.
          </div>
        )}

      </main>

    </div>
  );
}