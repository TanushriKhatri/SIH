import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('forensic_cases');
    if (saved) {
      setCases(JSON.parse(saved));
    } else {
      const defaultCases = [
        { id: 'CASE-001', name: 'Operation Nightfall', date: '2026-09-19', status: 'Active Evidence', statusColor: 'text-primary-400', dot: 'bg-primary-500' },
        { id: 'CASE-002', name: 'Downtown Incident', date: '2026-09-18', status: 'Analysis Complete', statusColor: 'text-accent-500', dot: 'bg-accent-500' }
      ];
      localStorage.setItem('forensic_cases', JSON.stringify(defaultCases));
      setCases(defaultCases);
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 p-10 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Forensic Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage cases, ongoing acquisitions, and system health.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { localStorage.removeItem('forensic_user'); navigate('/'); }} className="bg-dark-800 hover:bg-dark-700 border border-dark-600 text-gray-300 px-6 py-2 rounded font-medium transition-colors">
            Log Out
          </button>
          <button onClick={() => navigate('/create-case')} className="bg-primary-500 hover:bg-primary-400 text-white px-6 py-2 rounded font-medium transition-colors">
            + Initialize New Case
          </button>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map(c => (
            <Link key={c.id} to={`/case/${c.id}/evidence-registration`} className="bg-dark-800 border border-dark-600 rounded-lg p-6 hover:border-primary-500 transition-colors flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="text-xl font-bold text-gray-100">{c.id}</div>
                <div className="text-xs bg-dark-700 px-2 py-1 rounded text-gray-300">{c.date}</div>
              </div>
              <div className="text-gray-400">{c.name}</div>
              <div className="mt-auto pt-4 border-t border-dark-700 text-sm flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${c.status === 'Active Evidence' ? 'bg-primary-500' : 'bg-accent-500'}`}></div>
                {c.status}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
