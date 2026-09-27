import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Landing from './Landing';
import Auth from './Auth';
import Dashboard from './Dashboard';
import CreateCase from './CreateCase';
import EvidenceRegistration from './EvidenceRegistration';
import HardwareInterrogation from './HardwareInterrogation';
import ForensicAcquisition from './ForensicAcquisition';
import IntegrityVerification from './IntegrityVerification';
import FormatIdentification from './FormatIdentification';
import VendorParser from './VendorParser';
import StorageStructure from './StorageStructure';
import MetadataExtraction from './MetadataExtraction';
import RecoveryEngine from './RecoveryEngine';
import FragmentExplorer from './FragmentExplorer';
import VideoReconstruction from './VideoReconstruction';
import RecoveryValidation from './RecoveryValidation';
import NormalizedEvidence from './NormalizedEvidence';
import Timeline from './Timeline';
import TimeIntervalFilter from './TimeIntervalFilter';
import EnhancementReview from './EnhancementReview';
import LightweightAI from './LightweightAI';
import CandidateEvent from './CandidateEvent';
import EvidenceIndex from './EvidenceIndex';
import AIInvestigation from './AIInvestigation';
import CrossCamera from './CrossCamera';
import EvidenceValidation from './EvidenceValidation';
import CaseSummary from './CaseSummary';
import ChainOfCustody from './ChainOfCustody';
import ForensicReport from './ForensicReport';
import ArchitectureViewer from './ArchitectureViewer';
import FrameViewer from './FrameViewer';
import FrameViewer1 from './FrameViewer1';
import AIAssistant from './AIAssistant';

// Placeholder with Cybernetic Grid & Multi-Color Radar Animation
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col h-full items-center justify-center p-12 text-center gap-6 bg-[#090d19]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.05)] relative overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
    
    <div className="relative w-20 h-20 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
      <div className="absolute inset-0 rounded-full border border-purple-500 animate-ping opacity-20"></div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse flex items-center justify-center shadow-lg">
        <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
    </div>

    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 tracking-wider">{title}</h1>
    <p className="text-gray-400 max-w-md text-sm leading-relaxed font-mono">
      // MODULE STATUS: <span className="text-emerald-400 animate-pulse">STANDBY_ACTIVE</span><br/>
      Multi-spectral telemetry pipeline online. Awaiting stream injection.
    </p>
  </div>
);

// High-Tech SVG Icon Helper
const NavIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'architecture': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'evidence': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
    case 'hardware': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'acquisition': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
    case 'shield': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'search': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
    case 'settings': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>;
    case 'database': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
    case 'chart': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
    case 'chip': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'film': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
    case 'check': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
    case 'clock': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'sparkles': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
    case 'cpu': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'eye': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
    case 'clipboard': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
    case 'link': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
    case 'document': return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    default: return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="2" /></svg>;
  }
};

const SidebarLink = ({ to, label, icon, activeColor }: { to: string, label: string, icon: string, activeColor: string }) => {
  const loc = useLocation();
  const active = loc.pathname.includes(to);
  
  // Dynamic border/glow styles based on section color
  const colorStyles: Record<string, { bg: string, text: string, border: string, shadow: string, indicator: string }> = {
    cyan: {
      bg: 'from-cyan-500/20 to-cyan-600/5',
      text: 'text-cyan-300',
      border: 'border-cyan-500/40',
      shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      indicator: 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
    },
    amber: {
      bg: 'from-amber-500/20 to-amber-600/5',
      text: 'text-amber-300',
      border: 'border-amber-500/40',
      shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      indicator: 'bg-amber-400 shadow-[0_0_10px_#fbbf24]'
    },
    emerald: {
      bg: 'from-emerald-500/20 to-emerald-600/5',
      text: 'text-emerald-300',
      border: 'border-emerald-500/40',
      shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      indicator: 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
    },
    purple: {
      bg: 'from-purple-500/20 to-purple-600/5',
      text: 'text-purple-300',
      border: 'border-purple-500/40',
      shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
      indicator: 'bg-purple-400 shadow-[0_0_10px_#c084fc]'
    },
    pink: {
      bg: 'from-pink-500/20 to-pink-600/5',
      text: 'text-pink-300',
      border: 'border-pink-500/40',
      shadow: 'shadow-[0_0_20px_rgba(244,114,182,0.18)]',
      indicator: 'bg-pink-400 shadow-[0_0_10px_#f472b6]'
    },
    teal: {
      bg: 'from-teal-500/20 to-teal-600/5',
      text: 'text-teal-300',
      border: 'border-teal-500/40',
      shadow: 'shadow-[0_0_20px_rgba(20,184,166,0.15)]',
      indicator: 'bg-teal-400 shadow-[0_0_10px_#2dd4bf]'
    }
  };

  const currentTheme = colorStyles[activeColor] || colorStyles.cyan;

  return (
    <Link 
      to={to} 
      className={`group relative flex items-center gap-3 text-xs px-3.5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
        active 
          ? `bg-gradient-to-r ${currentTheme.bg}${currentTheme.text} border ${currentTheme.border}${currentTheme.shadow}` 
          : 'text-gray-400 hover:bg-dark-700/60 hover:text-gray-200 border border-transparent'
      }`}
    >
      {active && <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-r-full ${currentTheme.indicator}`}></span>}
      <span className={`transition-transform duration-300 ${active ? currentTheme.text + ' scale-110' : 'text-gray-500 group-hover:text-gray-300 group-hover:scale-110'}`}>
        <NavIcon name={icon} />
      </span>
      <span className="truncate tracking-wide">{label}</span>
    </Link>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const loc = useLocation();
  const caseId = loc.pathname.split('/')[2] || 'CASE-001';
  const [systemTime, setSystemTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setSystemTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVideoFound = (videoPath: string) => {
    console.log('AI Investigator found video:', videoPath);
    window.dispatchEvent(
      new CustomEvent('ai-video-found', { detail: { videoPath } })
    );
    window.location.href = `/case/${caseId}/frame-viewer`;
  };

  return (
    <div className="flex h-screen w-full bg-[#04060d] text-gray-200 font-sans overflow-hidden selection:bg-cyan-500 selection:text-white">

      {/* ================= MULTI-COLOR CYBER SIDEBAR ================= */}
      <div className="w-80 bg-[#070a14]/95 backdrop-blur-2xl border-r border-dark-700/80 p-4 flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-600 z-20">

        {/* Branding Header with Multi-Color Glow */}
        <div className="flex items-center justify-between mb-6 px-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <span className="text-white font-black tracking-widest text-sm">TV</span>
              <div className="absolute inset-0 rounded-xl border border-white/30 animate-ping opacity-30"></div>
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-white">TRACE<span className="text-cyan-400">VAULT</span></span>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Multi-Spectral Forensic Suite</p>
            </div>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="group flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 bg-dark-800/80 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-300 border border-dark-700 hover:border-cyan-500/30 rounded-xl transition-all mb-4 shadow-sm"
        >
          <span className="group-hover:-translate-x-1 transition-transform font-mono text-cyan-400">←</span> Return to Dashboard
        </Link>

        <SidebarLink to={`/case/${caseId}/architecture`} label="Architecture Viewer" icon="architecture" activeColor="cyan" />

        {/* Section 1: Cyan Theme (Evidence & Integrity) */}
        <div className="text-[10px] font-black tracking-widest uppercase text-cyan-400/80 mt-6 mb-2 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span> 1. Evidence & Integrity
        </div>
        <SidebarLink to={`/case/${caseId}/evidence-registration`} label="Evidence Registration" icon="evidence" activeColor="cyan" />
        <SidebarLink to={`/case/${caseId}/hardware-interrogation`} label="Hardware Interrogation" icon="hardware" activeColor="cyan" />
        <SidebarLink to={`/case/${caseId}/forensic-acquisition`} label="Forensic Acquisition" icon="acquisition" activeColor="cyan" />
        <SidebarLink to={`/case/${caseId}/integrity-verification`} label="Integrity/Hash Verification" icon="shield" activeColor="cyan" />

        {/* Section 2: Amber Theme (Format Identification) */}
        <div className="text-[10px] font-black tracking-widest uppercase text-amber-400/80 mt-6 mb-2 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]"></span> 2. Format Identification
        </div>
        <SidebarLink to={`/case/${caseId}/format-identification`} label="DVR/NVR Format ID" icon="search" activeColor="amber" />
        <SidebarLink to={`/case/${caseId}/vendor-parser`} label="Vendor Parser" icon="settings" activeColor="amber" />
        <SidebarLink to={`/case/${caseId}/storage-structure`} label="Storage Structure Analysis" icon="database" activeColor="amber" />
        <SidebarLink to={`/case/${caseId}/metadata-extraction`} label="Recording & Metadata" icon="chart" activeColor="amber" />

        {/* Section 3: Emerald Theme (Recovery & Recon) */}
        <div className="text-[10px] font-black tracking-widest uppercase text-emerald-400/80 mt-6 mb-2 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span> 3. Recovery & Recon
        </div>
        <SidebarLink to={`/case/${caseId}/recovery-engine`} label="Recovery Engine" icon="chip" activeColor="emerald" />
        <SidebarLink to={`/case/${caseId}/fragment-explorer`} label="Fragment Explorer" icon="database" activeColor="emerald" />
        <SidebarLink to={`/case/${caseId}/video-reconstruction`} label="Video Reconstruction" icon="film" activeColor="emerald" />
        <SidebarLink to={`/case/${caseId}/recovery-validation`} label="Recovery Validation" icon="check" activeColor="emerald" />

        {/* Section 4: Purple Theme (Timeline Standardization) */}
        <div className="text-[10px] font-black tracking-widest uppercase text-purple-400/80 mt-6 mb-2 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]"></span> 4. Timeline Standardization
        </div>
        <SidebarLink to={`/case/${caseId}/normalized-evidence`} label="Normalized Evidence" icon="document" activeColor="purple" />
        <SidebarLink to={`/case/${caseId}/timeline`} label="Timestamp & Timeline" icon="clock" activeColor="purple" />

        {/* Section 5: Pink Theme (Intelligent Evidence Triage and AI) */}
        <div className="text-[10px] font-black tracking-widest uppercase text-pink-400/80 mt-6 mb-2 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]"></span> 5. Intelligent Evidence Triage and AI
        </div>
        <SidebarLink to={`/case/${caseId}/time-interval-filter`} label="Time Interval Filter" icon="clock" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/enhancement-review`} label="Enhancement Review" icon="sparkles" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/lightweight-ai`} label="Lightweight AI Analysis" icon="cpu" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/candidate-events`} label="Candidate Event" icon="search" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/evidence-index`} label="Evidence Intelligence Index" icon="chart" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/ai-investigation`} label="AI Investigation" icon="cpu" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/cross-camera`} label="Cross-Camera Correlation" icon="link" activeColor="pink" />
        <SidebarLink to={`/case/${caseId}/frame-viewer`} label="Evidence Frame Viewer" icon="eye" activeColor="pink" />

        {/* Section 6: Teal Theme (Finalization) */}
        <div className="text-[10px] font-black tracking-widest uppercase text-teal-400/80 mt-6 mb-2 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]"></span> 6. Finalization
        </div>
        <SidebarLink to={`/case/${caseId}/evidence-validation`} label="Evidence Validation" icon="shield" activeColor="teal" />
        <SidebarLink to={`/case/${caseId}/case-summary`} label="Case Summary" icon="clipboard" activeColor="teal" />
        <SidebarLink to={`/case/${caseId}/chain-of-custody`} label="Chain of Custody" icon="link" activeColor="teal" />
        <SidebarLink to={`/case/${caseId}/report`} label="Forensic Report" icon="document" activeColor="teal" />

        {/* Logout Footer */}
        <div className="mt-auto pt-6 px-3">
          <button
            onClick={() => {
              localStorage.removeItem('forensic_user');
              window.location.href = '/';
            }}
            className="w-full text-left text-xs font-semibold px-4 py-3 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all flex items-center justify-between group shadow-sm"
          >
            <span>Terminate Session</span>
            <span className="group-hover:translate-x-1 transition-transform font-mono text-red-400">→</span>
          </button>
        </div>
      </div>

      {/* ================= MAIN WORKSPACE ================= */}
      <div className="flex-1 flex flex-col bg-[#04060d] overflow-hidden relative">

        {/* TOP STATUS BAR */}
        <div className="h-16 bg-[#070a14]/80 backdrop-blur-md border-b border-dark-700/80 flex shrink-0 items-center px-8 justify-between z-10 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-dark-800/90 border border-dark-700 px-3.5 py-1.5 rounded-xl shadow-inner">
              <span className="text-[11px] text-gray-400 uppercase font-mono tracking-wider">Workspace:</span>
              <span className="text-cyan-400 font-mono font-bold tracking-wide">{caseId}</span>
            </div>
            <div className="hidden md:flex items-center gap-2.5 text-xs font-mono text-gray-400 bg-dark-800/40 px-3.5 py-1.5 rounded-xl border border-dark-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              {systemTime || '2026-03-30 00:00:00 UTC'}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
              <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase font-mono">Multi-Spectral Pipeline Active</span>
            </div>
          </div>
        </div>

        {/* DYNAMIC PAGE CONTENT CONTAINER */}
        <div className="p-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-600 bg-gradient-to-b from-transparent via-[#070a16]/40 to-transparent">
          {children}
        </div>

        {/* ================= GLOBAL AI INVESTIGATOR ================= */}
        <AIAssistant onVideoFound={handleVideoFound} />

      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-case" element={<CreateCase />} />

        {/* Case Workspace Routes */}
        <Route path="/case/:id/*" element={
          <AppLayout>
            <Routes>
              <Route path="architecture" element={<ArchitectureViewer />} />
              <Route path="evidence-registration" element={<EvidenceRegistration />} />
              <Route path="hardware-interrogation" element={<HardwareInterrogation />} />
              <Route path="forensic-acquisition" element={<ForensicAcquisition />} />
              <Route path="integrity-verification" element={<IntegrityVerification />} />
              <Route path="format-identification" element={<FormatIdentification />} />
              <Route path="unknown-format" element={<Placeholder title="10. Unknown Format / Expert Review" />} />
              <Route path="vendor-parser" element={<VendorParser />} />
              <Route path="storage-structure" element={<StorageStructure />} />
              <Route path="metadata-extraction" element={<MetadataExtraction />} />
              <Route path="recovery-engine" element={<RecoveryEngine />} />
              <Route path="fragment-explorer" element={<FragmentExplorer />} />
              <Route path="video-reconstruction" element={<VideoReconstruction />} />
              <Route path="recovery-validation" element={<RecoveryValidation />} />
              <Route path="normalized-evidence" element={<NormalizedEvidence />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="time-interval-filter" element={<TimeIntervalFilter />} />
              <Route path="enhancement-review" element={<EnhancementReview />} />
              <Route path="lightweight-ai" element={<LightweightAI />} />
              <Route path="candidate-events" element={<CandidateEvent />} />
              <Route path="evidence-index" element={<EvidenceIndex />} />
              <Route path="ai-investigation" element={<AIInvestigation />} />
              <Route path="cross-camera" element={<CrossCamera />} />
              <Route path="frame-viewer" element={<FrameViewer />} />
              <Route path="frame-viewer1" element={<FrameViewer1 />} />
              <Route path="evidence-validation" element={<EvidenceValidation />} />
              <Route path="case-summary" element={<CaseSummary />} />
              <Route path="chain-of-custody" element={<ChainOfCustody />} />
              <Route path="report" element={<ForensicReport />} />
              <Route path="*" element={<Navigate to="evidence-registration" replace />} />
            </Routes>
          </AppLayout>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;