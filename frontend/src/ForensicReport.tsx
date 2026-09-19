import React, { useState } from 'react';

export default function ForensicReport() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 2500);
  };
  
  const generatePDF = () => {
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Forensic Report - CASE-001</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; }
          h1 { color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
          h2 { color: #2d3748; margin-top: 30px; }
          .meta { margin-bottom: 40px; font-size: 14px; color: #718096; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          th { background-color: #f7fafc; font-weight: bold; }
          .highlight { background-color: #ebf8ff; font-weight: bold; color: #2b6cb0; padding: 2px 4px; border-radius: 4px; }
          .signature { margin-top: 60px; pt-10; border-top: 1px solid #cbd5e0; width: 300px; text-align: center; font-style: italic; }
        </style>
      </head>
      <body>
        <h1>Digital Forensic Analysis Report</h1>
        <div class="meta">
          <strong>Case ID:</strong> CASE-001 (Operation Nightfall)<br>
          <strong>Date Generated:</strong> ${new Date().toLocaleString()}<br>
          <strong>Investigator:</strong> Lead Analyst Smith<br>
          <strong>Report Hash (SHA-256):</strong> 8f810aa7553b3b4f98129a0bc4c7183e
        </div>
        
        <h2>1. Executive Summary</h2>
        <p>A digital forensic acquisition and analysis was performed on a seized Dahua NVR system. The platform successfully extracted 3.6 TB of active video data across 16 channels, and successfully carved <strong>14,392 deleted fragments (5.1 GB)</strong> from unallocated space. Machine learning correlation identified 3 critical events within the recovered footage.</p>
        
        <h2>2. Evidence Profile</h2>
        <table>
          <tr><th>Device Type</th><td>Dahua NVR (Proprietary DHFS Format)</td></tr>
          <tr><th>Physical Media</th><td>WD Purple 4TB (WD-WCC6Y6A)</td></tr>
          <tr><th>Original Image MD5</th><td>7d79ce9b85bd11c1...</td></tr>
          <tr><th>Acquisition Method</th><td>Write-Blocked Bit-Stream Copy (E01)</td></tr>
        </table>
        
        <h2>3. Key AI Findings</h2>
        <p>Object tracking and cross-camera correlation identified the primary subject entering from the North entrance, and subsequently tracked the subject into a <span class="highlight">recovered deleted fragment (FRG-9921)</span> at 14:31:05 on Channel 01.</p>
        
        <h2>4. Chain of Custody / Audit Trail</h2>
        <table>
          <tr><th>Time</th><th>Action</th><th>Cryptographic Verification</th></tr>
          <tr><td>14:02:15</td><td>Write-Blocker Engaged</td><td>Software ATA locked</td></tr>
          <tr><td>18:45:00</td><td>Acquisition Complete</td><td>Image saved as E01</td></tr>
          <tr><td>18:50:33</td><td>Hash Verification</td><td>MD5/SHA256 Match Confirmed</td></tr>
          <tr><td>09:12:00 (Next Day)</td><td>Recovery Engine Executed</td><td>14,392 fragments carved from unalloc space</td></tr>
        </table>
        
        <div class="signature">
          <br><br><br>
          Digitally Signed / Investigator Signature
        </div>
        
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl flex flex-col gap-6 items-center pt-10">
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Final Forensic Report</h2>
        <p className="text-gray-400">Compile all findings, chain of custody logs, and normalized video evidence into a court-ready package.</p>
      </div>

      {!generating && !done && (
        <button onClick={generate} className="bg-primary-500 hover:bg-primary-400 text-white px-10 py-4 rounded-lg font-bold text-xl transition-all shadow-lg shadow-primary-500/20 hover:scale-105">
          Generate Court-Ready Report
        </button>
      )}

      {generating && (
        <div className="flex flex-col items-center justify-center py-12 gap-6 w-full max-w-md bg-dark-800 rounded-lg border border-dark-600 shadow-xl">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="font-bold text-gray-200">Compiling Report Package...</h3>
            <p className="text-sm text-gray-500 mt-1">Exporting PDFs, validating final hashes, packaging video.</p>
          </div>
        </div>
      )}

      {done && (
        <div className="w-full max-w-2xl bg-dark-800 border border-accent-500/50 rounded-lg p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-accent-500"></div>
          
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-accent-500/20 text-accent-500 rounded-full flex items-center justify-center text-4xl font-bold mb-2 border border-accent-500/30">✓</div>
            <h3 className="text-2xl font-bold text-gray-100">Report Package Ready</h3>
            <p className="text-gray-400">The forensic report has been compiled and cryptographically signed.</p>
            
            <div className="w-full bg-dark-900 border border-dark-700 rounded p-4 text-left mt-4 text-sm font-mono text-gray-400">
               <div>Filename: CASE-001_Final_Report_Package.zip</div>
               <div>Size: 6.2 GB</div>
               <div>SHA-256: 8f810aa7553b3b4f...</div>
            </div>
            
            <button onClick={generatePDF} className="mt-6 bg-accent-500 hover:bg-accent-600 text-dark-900 px-8 py-3 rounded font-bold text-lg transition-colors w-full">
              Open & Download PDF Report
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
