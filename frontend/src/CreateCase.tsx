import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateCase() {
  const navigate = useNavigate();
  const [caseId, setCaseId] = useState('CASE-003');
  const [caseName, setCaseName] = useState('');
  const [investigator, setInvestigator] = useState('Lead Analyst Smith');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('forensic_user');
    if (user) setInvestigator(user);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const saved = localStorage.getItem('forensic_cases');
    const cases = saved ? JSON.parse(saved) : [];
    cases.unshift({
      id: caseId,
      name: caseName || 'New Investigation',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Registration',
      statusColor: 'text-gray-400',
      dot: 'bg-gray-500'
    });
    localStorage.setItem('forensic_cases', JSON.stringify(cases));

    setTimeout(() => {
      navigate('/case/' + caseId + '/evidence-registration');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-950 p-8 flex flex-col">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full bg-dark-900 border border-dark-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-dark-800 p-6 border-b border-dark-700">
          <h1 className="text-2xl font-bold text-gray-100">Initialize New Case</h1>
          <p className="text-gray-400 text-sm mt-1">Setup the workspace before beginning evidence registration.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Case ID / Reference Number</label>
              <input 
                required 
                type="text" 
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-mono focus:border-primary-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Operation / Case Name</label>
              <input 
                required 
                type="text" 
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                placeholder="e.g. Operation Nightfall"
                className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Investigator / Analyst Name</label>
            <input 
              required 
              type="text" 
              value={investigator}
              onChange={(e) => setInvestigator(e.target.value)}
              className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Case Description / Notes</label>
            <textarea 
              rows={4}
              placeholder="Provide a brief description of the digital forensic request..."
              className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none" 
            ></textarea>
          </div>

          <div className="flex justify-end pt-6 border-t border-dark-800 mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Proceed to Evidence Registration
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
