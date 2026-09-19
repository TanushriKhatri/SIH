import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = new URLSearchParams(location.search).get('mode') === 'signup';
  
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem('forensic_user', username || 'Investigator');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col justify-center items-center p-4">
      <div className="absolute top-8 left-8 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-6 h-6 rounded bg-primary-500"></div>
        <span className="font-bold text-gray-200">NEXUS FORENSICS</span>
      </div>

      <div className="w-full max-w-md bg-dark-900 border border-dark-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{isSignup ? 'Create Account' : 'Analyst Login'}</h2>
          <p className="text-gray-400 text-sm">Secure access to the Digital Forensic Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Badge ID / Name</label>
              <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="Agent Name" />
            </div>
          )}
          {!isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Badge ID / Name</label>
              <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="Agent Name" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Official Email</label>
            <input required type="email" className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="analyst@agency.gov" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input required type="password" className="w-full bg-gray-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className="mt-2 w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center h-12">
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isSignup ? 'Initialize Account' : 'Authenticate'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500 border-t border-dark-800 pt-6">
          {isSignup ? (
            <p>Already have clearance? <span onClick={() => navigate('/auth?mode=login')} className="text-primary-400 cursor-pointer hover:underline">Log in</span></p>
          ) : (
            <p>Need system access? <span onClick={() => navigate('/auth?mode=signup')} className="text-primary-400 cursor-pointer hover:underline">Sign up</span></p>
          )}
        </div>
      </div>
    </div>
  );
}
