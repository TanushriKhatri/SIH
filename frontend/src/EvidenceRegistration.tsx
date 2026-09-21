import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PhysicalDrive {
  id: string;
  model: string;
  capacity: string;
  sectorSize: string;
  serial: string;
  status: 'Available' | 'In Use' | 'Offline';
}

export default function EvidenceRegistration(): React.JSX.Element {
  const [mediaType, setMediaType] = useState<string>('DVR/NVR Physical Drive');
  const [selectedDrive, setSelectedDrive] = useState<PhysicalDrive | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<string>('Seized from security room DVR chassis.');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const navigate = useNavigate();

  const mockDrives: PhysicalDrive[] = [
    {
      id: 'Drive 01',
      model: 'Seagate ST2000DM008',
      capacity: '2 TB',
      sectorSize: '512 bytes',
      serial: 'S3XXXXXXXX',
      status: 'Available'
    },
    {
      id: 'Drive 02',
      model: 'Western Digital WD40PURZ',
      capacity: '4 TB',
      sectorSize: '512 bytes',
      serial: 'WXXXXXXXX',
      status: 'Available'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const isRegisterEnabled = (): boolean => {
    if (mediaType === 'DVR/NVR Physical Drive') {
      return selectedDrive !== null;
    } else if (mediaType === 'Video Files') {
      return selectedFile !== null;
    } else if (mediaType === 'USB Storage') {
      return false; // Disabled state as specified
    }
    return false;
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isRegisterEnabled()) return;

    setIsRegistering(true);
    if (mediaType === 'DVR/NVR Physical Drive') {
      setConfirmationMessage('Physical drive selected. Write access will be blocked. Evidence will be accessed in read-only mode.');
    }

    setTimeout(() => {
      navigate('../hardware-interrogation');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 text-slate-200 font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-sky-500/20" />
          <h2 className="text-2xl font-semibold tracking-tight text-white">Evidence Registration</h2>
        </div>
        <p className="text-sm text-slate-400 pl-5.5">
          Register and catalog physical digital evidence. Vendor identity and filesystem signatures are auto-detected in downstream stages.
        </p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleRegister} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-sm flex flex-col gap-6">

        {/* Media Type Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Source Media Classification
          </label>
          <div className="relative">
            <select
              className="w-full bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 appearance-none cursor-pointer"
              value={mediaType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setMediaType(e.target.value);
                setSelectedDrive(null);
                setSelectedFile(null);
                setConfirmationMessage('');
              }}
            >
              <option value="DVR/NVR Physical Drive">DVR/NVR Physical Drive</option>
              <option value="Video Files">Video Files</option>
              <option value="USB Storage">USB Storage</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 1. DVR/NVR Physical Drive Section */}
        {mediaType === 'DVR/NVR Physical Drive' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Detected Physical Disks
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {mockDrives.length} drives detected
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {mockDrives.map((drive: PhysicalDrive) => {
                const isSelected = selectedDrive?.id === drive.id;
                return (
                  <div
                    key={drive.id}
                    onClick={() => setSelectedDrive(drive)}
                    className={`cursor-pointer rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isSelected
                        ? 'border-sky-500/80 bg-sky-500/10 ring-1 ring-sky-500/40 shadow-lg shadow-sky-500/5'
                        : 'border-slate-800 bg-slate-950/40 hover:bg-slate-800/40 hover:border-slate-700'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Drive Icon */}
                      <div className={`p-2.5 rounded-lg border shrink-0 ${isSelected
                          ? 'bg-sky-500/20 border-sky-500/40 text-sky-400'
                          : 'bg-slate-800/80 border-slate-700/60 text-slate-400'
                        }`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white tracking-tight">{drive.id}</span>
                          <span className="text-xs font-medium text-slate-400">({drive.model})</span>
                          {isSelected && (
                            <span className="text-[11px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full">
                              Active Target
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-400 font-mono mt-0.5">
                          <span>Cap: <strong className="text-slate-200">{drive.capacity}</strong></span>
                          <span className="text-slate-700">•</span>
                          <span>Sector: {drive.sectorSize}</span>
                          <span className="text-slate-700">•</span>
                          <span className="text-emerald-400/90 font-sans font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {drive.status}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Serial: {drive.serial}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        setSelectedDrive(drive);
                      }}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-xs tracking-wide transition-all ${isSelected
                          ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30 font-semibold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                    >
                      {isSelected ? 'Selected' : 'Select Target'}
                    </button>
                  </div>
                );
              })}
            </div>

            {selectedDrive && (
              <div className="flex items-center gap-2 text-xs text-sky-400 bg-sky-950/40 border border-sky-900/50 px-3.5 py-2.5 rounded-lg">
                <svg className="w-4 h-4 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Hardware write-block active. Target drive <strong>{selectedDrive.id}</strong> mounted read-only.</span>
              </div>
            )}
          </div>
        )}

        {/* 2. Video Files Section */}
        {mediaType === 'Video Files' && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Surveillance Stream Ingestion
            </label>
            <div className="bg-slate-950/50 border border-dashed border-slate-700 hover:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-colors">
              <input
                type="file"
                id="video-file-input"
                className="hidden"
                accept=".mp4,.avi,.mov,.mkv,.dav,.264,.h264,.265,.hevc"
                onChange={handleFileChange}
              />
              {!selectedFile ? (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <label
                      htmlFor="video-file-input"
                      className="cursor-pointer inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all"
                    >
                      Browse Footage Archive
                    </label>
                    <p className="text-xs text-slate-400 mt-2">or drag and drop video container here</p>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between items-center bg-slate-900 border border-slate-700/80 p-4 rounded-xl">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="font-semibold text-slate-100 text-sm">{selectedFile.name}</div>
                        <div className="text-xs text-slate-400 font-mono">
                          Format: {selectedFile.type || 'Raw Stream'} • {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Validated & Loaded
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 text-xs font-medium px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-lg transition-colors"
                    >
                      Clear File
                    </button>
                  </div>
                </div>
              )}
              <span className="text-[11px] text-slate-500 text-center font-mono">
                Supported: .mp4, .avi, .mov, .mkv, .dav, .264, .h264, .265, .hevc
              </span>
            </div>
          </div>
        )}

        {/* 3. USB Storage Section */}
        {mediaType === 'USB Storage' && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Hardware Bus Polling
            </label>
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 max-w-sm">
                Insert a physical USB mass storage device into the forensic workstation port to initialize interface bridge.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-slate-800/80 text-slate-400 px-3.5 py-1.5 rounded-lg text-xs font-mono border border-slate-700 cursor-not-allowed">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Awaiting Bus Signal (Disconnected)
              </div>
            </div>
          </div>
        )}

        {/* Common Field Notes */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Chain of Custody & Acquisition Notes
          </label>
          <textarea
            className="bg-slate-950/80 border border-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-xl p-3.5 text-sm text-slate-200 h-24 placeholder-slate-600 outline-none transition-all duration-200 resize-none font-normal"
            value={notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            placeholder="Document physical condition, serial markings, seizing officer, or custody details..."
          />
        </div>

        {/* Confirmation Message */}
        {confirmationMessage && (
          <div className="bg-sky-950/40 border border-sky-500/30 text-sky-300 p-4 rounded-xl text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="leading-relaxed">{confirmationMessage}</div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-3 border-t border-slate-800/80">
          <div className="text-xs text-slate-500">
            {mediaType === 'USB Storage' ? 'Registration suspended until hardware target is verified.' : 'Verified forensic write-protection protocol.'}
          </div>
          <button
            type="submit"
            disabled={!isRegisterEnabled() || isRegistering}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700/60 disabled:shadow-none text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md shadow-sky-500/20 cursor-pointer disabled:cursor-not-allowed"
          >
            {isRegistering && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isRegistering ? 'Locking & Registering...' : 'Register Evidence'}
          </button>
        </div>
      </form>
    </div>
  );
}