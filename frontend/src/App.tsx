import React from 'react';
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

// Placeholder components for 27 screens
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col h-full items-center justify-center p-8 text-center gap-4">
    <h1 className="text-3xl font-bold text-gray-500">{title}</h1>
    <p className="text-gray-600 max-w-lg">This module is part of the forensic pipeline. Development is ongoing to integrate mock data processing.</p>
  </div>
);

const SidebarLink = ({ to, label }: { to: string, label: string }) => {
  const loc = useLocation();
  const active = loc.pathname.includes(to);
  return (
    <Link to={to} className={`text-sm px-3 py-2 rounded-md transition-colors ${active ? 'bg-primary-500/20 text-primary-400 font-medium border border-primary-500/30' : 'text-gray-400 hover:bg-dark-700 hover:text-gray-200'}`}>
      {label}
    </Link>
  )
}

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const loc = useLocation();
  const caseId = loc.pathname.split('/')[2] || 'CASE-001';

  const handleVideoFound = (videoPath: string) => {
    console.log('AI Investigator found video:', videoPath);

    // Navigate to Frame Viewer while preserving the selected video
    window.dispatchEvent(
      new CustomEvent('ai-video-found', {
        detail: {
          videoPath,
        },
      })
    );

    window.location.href = `/case/${caseId}/frame-viewer`;
  };

  return (
    <div className="flex h-screen w-full bg-dark-900 text-gray-200 font-sans">

      {/* ================= SIDEBAR ================= */}
      <div className="w-72 bg-dark-800 border-r border-dark-600 p-4 flex flex-col gap-1 overflow-y-auto">

        <div className="flex items-center gap-2 mb-6 text-primary-400 font-bold text-xl px-2">
          <div className="w-4 h-4 rounded-sm bg-primary-500"></div>
          TraceVault
        </div>

        <Link
          to="/dashboard"
          className="text-sm px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-dark-700 rounded-md mb-2"
        >
          ← Back to Dashboard
        </Link>

        <SidebarLink
          to={`/case/${caseId}/architecture`}
          label="Architecture Viewer"
        />

        <div className="text-xs font-bold tracking-wider uppercase text-gray-500 mt-6 mb-2 px-3">
          1. Evidence & Integrity
        </div>

        <SidebarLink
          to={`/case/${caseId}/evidence-registration`}
          label="Evidence Registration"
        />

        <SidebarLink
          to={`/case/${caseId}/hardware-interrogation`}
          label="Hardware Interrogation"
        />

        <SidebarLink
          to={`/case/${caseId}/forensic-acquisition`}
          label="Forensic Acquisition"
        />

        <SidebarLink
          to={`/case/${caseId}/integrity-verification`}
          label="Integrity/Hash Verification"
        />

        <div className="text-xs font-bold tracking-wider uppercase text-gray-500 mt-6 mb-2 px-3">
          2. Format Identification
        </div>

        <SidebarLink
          to={`/case/${caseId}/format-identification`}
          label="DVR/NVR Format ID"
        />

        <SidebarLink
          to={`/case/${caseId}/vendor-parser`}
          label="Vendor Parser"
        />

        <SidebarLink
          to={`/case/${caseId}/storage-structure`}
          label="Storage Structure Analysis"
        />

        <SidebarLink
          to={`/case/${caseId}/metadata-extraction`}
          label="Recording & Metadata"
        />

        <div className="text-xs font-bold tracking-wider uppercase text-gray-500 mt-6 mb-2 px-3">
          3. Recovery & Recon
        </div>

        <SidebarLink
          to={`/case/${caseId}/recovery-engine`}
          label="Recovery Engine"
        />

        <SidebarLink
          to={`/case/${caseId}/fragment-explorer`}
          label="Fragment Explorer"
        />

        <SidebarLink
          to={`/case/${caseId}/video-reconstruction`}
          label="Video Reconstruction"
        />

        <SidebarLink
          to={`/case/${caseId}/recovery-validation`}
          label="Recovery Validation"
        />

        <div className="text-xs font-bold tracking-wider uppercase text-gray-500 mt-6 mb-2 px-3">
          4. Timeline & AI
        </div>

        <SidebarLink
          to={`/case/${caseId}/normalized-evidence`}
          label="Normalized Evidence"
        />

        <SidebarLink
          to={`/case/${caseId}/timeline`}
          label="Timestamp & Timeline"
        />

        <SidebarLink
          to={`/case/${caseId}/ai-investigation`}
          label="AI Investigation"
        />

        <SidebarLink
          to={`/case/${caseId}/cross-camera`}
          label="Cross-Camera Correlation"
        />

        <SidebarLink
          to={`/case/${caseId}/frame-viewer`}
          label="Evidence Frame Viewer"
        />

        <div className="text-xs font-bold tracking-wider uppercase text-gray-500 mt-6 mb-2 px-3">
          5. Finalization
        </div>

        <SidebarLink
          to={`/case/${caseId}/evidence-validation`}
          label="Evidence Validation"
        />

        <SidebarLink
          to={`/case/${caseId}/case-summary`}
          label="Case Summary"
        />

        <SidebarLink
          to={`/case/${caseId}/chain-of-custody`}
          label="Chain of Custody"
        />

        <SidebarLink
          to={`/case/${caseId}/report`}
          label="Forensic Report"
        />

        <div className="mt-auto pt-6 px-3">
          <button
            onClick={() => {
              localStorage.removeItem('forensic_user');
              window.location.href = '/';
            }}
            className="w-full text-left text-sm px-3 py-2 text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 border border-transparent rounded-md transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col bg-dark-900 overflow-hidden">

        {/* TOP BAR */}
        <div className="h-16 bg-dark-800 border-b border-dark-600 flex shrink-0 items-center px-6 justify-between">

          <div className="font-medium text-gray-300">
            Case Workspace:

            <span className="text-primary-400 font-bold ml-2">
              {caseId}
            </span>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-2 h-2 rounded-full bg-accent-warning animate-pulse"></div>

            <div className="text-sm text-gray-400">
              Processing Active
            </div>

          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>

        {/* ==========================================
            GLOBAL AI INVESTIGATOR
            ========================================== */}

        <AIAssistant
          onVideoFound={handleVideoFound}
        />

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
