import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Auth(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = new URLSearchParams(location.search).get('mode') === 'signup';
  
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate secure forensic login/registration delay
    setTimeout(() => {
      localStorage.setItem('forensic_user', username || 'Investigator');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">

      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 blur-[130px] rounded-full" />
      </div>

      {/* Top Left Navigation Link */}
      <div 
        className="absolute top-6 left-6 lg:left-12 flex items-center gap-3 cursor-pointer z-10 group" 
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 shadow-lg shadow-teal-500/20 flex items-center justify-center font-mono font-black text-zinc-950 text-xs">
          TV
        </div>
        <span className="font-bold text-white tracking-wider text-sm group-hover:text-teal-400 transition-colors">
          TRACEVAULT
        </span>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-md">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
            SECURE EXAMINER GATEWAY
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isSignup ? 'Initialize Examiner Account' : 'Analyst Clearance Login'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Multi-OEM Forensic Evidence Analysis Platform
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
          
          <div>
            <label className="block font-semibold text-zinc-400 uppercase tracking-wider text-[11px] mb-1.5">
              Badge ID / Investigator Name
            </label>
            <input 
              required 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-sans text-sm" 
              placeholder="e.g. Det. M. Vance (DF-8812)" 
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-400 uppercase tracking-wider text-[11px] mb-1.5">
              Official Agency Email
            </label>
            <input 
              required 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-sans text-sm" 
              placeholder="analyst@cybertaskforce.gov" 
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-400 uppercase tracking-wider text-[11px] mb-1.5">
              Passphrase / Clearance Key
            </label>
            <input 
              required 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-sans text-sm" 
              placeholder="••••••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="mt-2 w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 hover:brightness-110 active:scale-[0.98] text-zinc-950 font-black uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-teal-500/20 flex justify-center items-center h-12 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isSignup ? 'Initialize Credentials →' : 'Authenticate Session →'
            )}
          </button>
        </form>
        
        {/* Footer Toggle */}
        <div className="mt-6 text-center text-xs text-zinc-400 border-t border-zinc-800 pt-5 font-mono">
          {isSignup ? (
            <p>
              Already cleared?{' '}
              <span 
                onClick={() => navigate('/auth?mode=login')} 
                className="text-teal-400 font-bold cursor-pointer hover:underline"
              >
                Log in here
              </span>
            </p>
          ) : (
            <p>
              New investigator?{' '}
              <span 
                onClick={() => navigate('/auth?mode=signup')} 
                className="text-teal-400 font-bold cursor-pointer hover:underline"
              >
                Request system access
              </span>
            </p>
          )}
        </div>

      </div>

      {/* Bottom Security Notice */}
      <div className="mt-6 text-center text-[11px] font-mono text-zinc-600 relative z-10">
        Restricted Government & Law Enforcement System • Write-Block Active
      </div>

    </div>
  );
}