import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface StorageMetric {
  title: string;
  metric: string;
  detail: string;
  badge: string;
  themeColor: 'emerald' | 'cyan' | 'amber' | 'sky';
}

export default function StorageStructure(): React.JSX.Element {
  const [analyzing, setAnalyzing] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setAnalyzing(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const metrics: StorageMetric[] = [
    {
      title: 'Partitions Detected',
      metric: '01',
      detail: 'Primary Raw DHFS Container',
      badge: 'LBA 0x0000',
      themeColor: 'emerald'
    },
    {
      title: 'Active Video Payload',
      metric: '3.6 TB',
      detail: '78.2% Contiguous Video Streams',
      badge: '16 CHANNELS',
      themeColor: 'sky'
    },
    {
      title: 'Index & Metadata LUT',
      metric: '1.2 GB',
      detail: 'Timestamp-to-Block Seek Trees',
      badge: 'CACHED',
      themeColor: 'cyan'
    },
    {
      title: 'Unallocated Slack',
      metric: '398 GB',
      detail: 'Carvable Overwritten Sectors',
      badge: 'RECOVERY READY',
      themeColor: 'amber'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5 text-zinc-100 font-sans select-none">

      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-sky-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Phase 07 / Block Allocation
              </span>
              <span className="text-sm text-zinc-300 font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${analyzing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                {analyzing ? 'PARSING DATA BLOCKS...' : 'DISK GEOMETRY COMPILED'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Storage Structure Analysis
            </h1>
            <p className="text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Resolving proprietary Dahua DHFS allocation boundaries, contiguous surveillance stream extents, and slack space.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-xs bg-zinc-950/90 border border-zinc-800 px-4 py-2.5 rounded-xl self-start sm:self-auto">
            <span className="text-zinc-400 uppercase tracking-wider">Allocation Unit</span>
            <span className="text-sky-400 font-bold text-sm">64 KB CLUSTERS</span>
            <span className="text-zinc-400">Direct Sector Mapping</span>
          </div>
        </div>
      </div>

      {/* Main Structural Body */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col gap-5">

        {analyzing ? (
          /* Live Scanning Loader */
          <div className="flex flex-col items-center justify-center py-16 gap-4 bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-zinc-800 rounded-full" />
              <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin absolute inset-0" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-sm sm:text-base font-bold text-zinc-100 font-mono">
                Traversing DHFS Inode Runlists...
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Reading block boundary table [LBA: 0x00000000 - 0x1D1C0000]
              </span>
            </div>
          </div>
        ) : (
          /* Results Dashboard */
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">

            {/* Metric Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-4 flex flex-col justify-between gap-1 shadow-sm hover:border-zinc-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                      {m.title}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {m.badge}
                    </span>
                  </div>

                  <div className="mt-1">
                    <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${m.themeColor === 'emerald' ? 'text-emerald-400' :
                        m.themeColor === 'sky' ? 'text-sky-400' :
                          m.themeColor === 'cyan' ? 'text-cyan-300' :
                            'text-amber-400'
                      }`}>
                      {m.metric}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-400 truncate">
                    {m.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Segmented Physical Allocation Visualizer */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-zinc-300 uppercase tracking-wider">
                  Physical Disk Extent Map (4,000 GB Capacity)
                </span>
                <span className="text-emerald-400 font-semibold">PARTITION STATUS: VERIFIED</span>
              </div>

              {/* Strip Map */}
              <div className="flex h-12 w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-1 gap-1">
                {/* 1. Header (2%) */}
                <div
                  className="w-[2.5%] bg-amber-500 hover:bg-amber-400 transition-all rounded-l cursor-pointer relative group flex items-center justify-center font-mono text-[9px] font-bold text-zinc-950"
                  title="DHFS Master Header (Offset 0x00)"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-[10px] font-mono bg-black/90 px-2 py-0.5 rounded text-amber-300 border border-amber-500/40 pointer-events-none whitespace-nowrap z-20">
                    Header: 2%
                  </span>
                </div>

                {/* 2. Index LUT Area (10%) */}
                <div
                  className="w-[11.5%] bg-cyan-500 hover:bg-cyan-400 transition-all cursor-pointer relative group flex items-center justify-center font-mono text-[11px] font-bold text-zinc-950"
                  title="Seek & Frame Index Tables"
                >
                  <span className="hidden sm:inline">INDEX</span>
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-[10px] font-mono bg-black/90 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/40 pointer-events-none whitespace-nowrap z-20">
                    Time/Frame LUT: 10%
                  </span>
                </div>

                {/* 3. Active Video Extent (76%) */}
                <div
                  className="w-[76%] bg-sky-600 hover:bg-sky-500 transition-all cursor-pointer relative group flex items-center justify-center font-mono text-xs font-bold text-white tracking-wider"
                  title="Allocated Recording Blocks (Channels 01-16)"
                >
                  <span>ACTIVE SURVEILLANCE STREAMS (CH 01 - 16) • 78%</span>
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-[10px] font-mono bg-black/90 px-2 py-0.5 rounded text-sky-200 border border-sky-500/40 pointer-events-none whitespace-nowrap z-20">
                    Continuous Video: 78%
                  </span>
                </div>

                {/* 4. Slack & Unallocated (10%) */}
                <div
                  className="w-[10%] bg-zinc-800 hover:bg-zinc-700 transition-all rounded-r cursor-pointer relative group flex items-center justify-center font-mono text-[10px] font-semibold text-zinc-300 border-l border-zinc-900"
                  title="Unallocated / Overwritten Slack Blocks (Carving Target)"
                >
                  <span className="hidden md:inline">SLACK</span>
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-[10px] font-mono bg-black/90 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700 pointer-events-none whitespace-nowrap z-20">
                    Deleted / Slack Space: 10%
                  </span>
                </div>
              </div>

              {/* Legend Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs text-zinc-300 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>System Header <strong className="text-zinc-500 font-normal">(2%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                  <span>Index LUTs <strong className="text-zinc-500 font-normal">(10%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                  <span>Active Payload <strong className="text-zinc-500 font-normal">(78%)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 shrink-0" />
                  <span>Slack Carve <strong className="text-zinc-500 font-normal">(10%)</strong></span>
                </div>
              </div>
            </div>

            {/* Confirmation & Navigation Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Extents resolved. Ready to parse channel timestamps and camera metadata.</span>
              </div>

              <button
                onClick={() => navigate('../metadata-extraction')}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-zinc-950 font-black text-sm uppercase tracking-wider px-7 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Proceed to Extraction →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}