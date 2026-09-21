import React, { useState } from 'react';

interface AIInvestigatorProps {
    onVideoFound: (videoPath: string) => void;
}

interface SearchResult {
    camera: string;
    timestamp: string;
    confidence: number;
    videoPath: string;
    description: string;
}

const suggestedQueries = [
    'Find the red shirt weared person holding a black bag on his back',
    'Find the person in red shirt across all cameras',
    'Track the person carrying a black bag',
];

export default function AIInvestigator({
    onVideoFound,
}: AIInvestigatorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [stage, setStage] = useState('');
    const [result, setResult] = useState<SearchResult | null>(null);

    const runInvestigation = () => {
        if (!query.trim()) return;

        setIsProcessing(true);
        setResult(null);

        setStage('Parsing natural-language query...');

        setTimeout(() => {
            setStage('Scanning CH-01-CAMERA-115...');
        }, 900);

        setTimeout(() => {
            setStage('Scanning CH-01-CAMERA-121...');
        }, 1800);

        setTimeout(() => {
            setStage('Scanning CH-02-CAMERA-102...');
        }, 2700);

        setTimeout(() => {
            setStage('Correlating detected objects across cameras...');
        }, 3600);

        setTimeout(() => {
            setStage('Generating investigation result...');
        }, 4500);

        setTimeout(() => {
            const investigationResult: SearchResult = {
                camera: 'CH-01-CAMERA-121',
                timestamp: '2026-09-10 14:31:05',
                confidence: 94,
                videoPath: '/crosscamera.mp4',
                description:
                    'Red-shirted person carrying a black backpack detected and correlated across multiple camera views.',
            };

            setResult(investigationResult);
            setIsProcessing(false);
            setStage('');

            // Send matched video to FrameViewer
            onVideoFound(investigationResult.videoPath);
        }, 5300);
    };

    const handleSuggestedQuery = (text: string) => {
        setQuery(text);
    };

    return (
        <>
            {/* Floating AI Investigator Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="
            fixed bottom-6 right-6 z-50
            w-16 h-16 rounded-full
            bg-primary-500
            border-2 border-primary-300
            shadow-[0_0_25px_rgba(59,130,246,0.45)]
            flex items-center justify-center
            hover:scale-105
            transition-all duration-200
          "
                    title="AI Investigator"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Animated glow */}
                        <div className="absolute w-16 h-16 rounded-full bg-primary-400/20 animate-ping" />

                        {/* AI Bot Image */}
                        <div className="relative w-14 h-14 rounded-full bg-dark-900 border border-primary-300 overflow-hidden flex items-center justify-center">
                            <img
                                src="/ai-bot.png"
                                alt="AI Investigator"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </button>
            )}

            {/* AI Chat Window */}
            {isOpen && (
                <div
                    className="
            fixed bottom-6 right-6 z-50
            w-[430px]
            bg-dark-900
            border border-dark-600
            rounded-xl
            shadow-2xl
            overflow-hidden
          "
                >
                    {/* Header */}
                    <div className="px-5 py-4 bg-dark-800 border-b border-dark-600 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-500/15 border border-primary-500/40 flex items-center justify-center">
                                <span className="text-primary-400 text-lg">✦</span>
                            </div>

                            <div>
                                <h3 className="text-gray-100 font-semibold">
                                    AI Investigator
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Natural-language evidence search
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-200 text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="p-5 flex flex-col gap-4 max-h-[600px] overflow-y-auto">

                        {/* Intro */}
                        <div className="bg-dark-800 border border-dark-700 rounded-lg p-3">
                            <p className="text-sm text-gray-300">
                                Describe what you want to find in the surveillance evidence.
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                                Example: Find a person, object, vehicle, activity, or event
                                across cameras.
                            </p>
                        </div>



                        {/* Input */}
                        <div className="flex gap-2">
                            <input
                                value={query}
                                disabled={isProcessing}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        runInvestigation();
                                    }
                                }}
                                placeholder="Ask the AI Investigator..."
                                className="
                  flex-1
                    bg-gray-200
                    border border-gray-400
                    rounded-lg
                    px-3 py-3
                    text-sm text-gray-900
                    placeholder:text-gray-500
                    outline-none
                    focus:border-primary-500
                "
                            />

                            <button
                                onClick={runInvestigation}
                                disabled={!query.trim() || isProcessing}
                                className="
                  px-4
                  rounded-lg
                  bg-primary-500
                  hover:bg-primary-400
                  disabled:opacity-40
                  text-white
                  font-medium
                "
                            >
                                {isProcessing ? '...' : 'Search'}
                            </button>
                        </div>

                        {/* Processing */}
                        {isProcessing && (
                            <div className="bg-dark-800 border border-primary-500/30 rounded-lg p-4">

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />

                                    <span className="text-sm text-primary-300">
                                        AI investigation in progress
                                    </span>
                                </div>

                                <div className="space-y-2">

                                    <ProcessingStep
                                        text="Parsing natural-language query"
                                        active={stage.includes('Parsing')}
                                    />

                                    <ProcessingStep
                                        text="Scanning camera evidence"
                                        active={stage.includes('Scanning')}
                                    />

                                    <ProcessingStep
                                        text="Cross-camera event correlation"
                                        active={stage.includes('Correlating')}
                                    />

                                    <ProcessingStep
                                        text="Generating investigation result"
                                        active={stage.includes('Generating')}
                                    />

                                </div>

                                <div className="mt-4 pt-3 border-t border-dark-700">
                                    <p className="text-xs text-gray-500">
                                        {stage}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Result */}
                        {result && (
                            <div className="bg-dark-800 border border-green-500/30 rounded-lg p-4">

                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">
                                            Investigation Result
                                        </p>

                                        <p className="text-green-400 font-semibold mt-1">
                                            ✓ Match Found
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">
                                            Confidence
                                        </p>

                                        <p className="text-green-400 font-bold">
                                            {result.confidence}%
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Camera
                                        </span>

                                        <span className="text-gray-200 font-mono">
                                            {result.camera}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Timestamp
                                        </span>

                                        <span className="text-gray-200">
                                            {result.timestamp}
                                        </span>
                                    </div>

                                </div>

                                <div className="mt-3 p-3 bg-dark-950 rounded border border-dark-700">
                                    <p className="text-xs text-gray-400">
                                        {result.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => onVideoFound(result.videoPath)}
                                    className="
                    w-full
                    mt-4
                    bg-primary-500
                    hover:bg-primary-400
                    text-white
                    py-2
                    rounded-lg
                    font-medium
                  "
                                >
                                    ▶ Open Result in Frame Viewer
                                </button>

                            </div>
                        )}

                        {/* Report query */}
                        {query.toLowerCase().includes('case-2') &&
                            query.toLowerCase().includes('report') && (
                                <div className="bg-dark-800 border border-blue-500/30 rounded-lg p-4">

                                    <p className="text-gray-200 font-semibold">
                                        Case-2 Downtown Incident Report
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Court-ready forensic investigation report
                                    </p>

                                    <a
                                        href="/reports/case-2-downtown-incident-report.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                      block
                      text-center
                      mt-4
                      bg-primary-500
                      hover:bg-primary-400
                      text-white
                      py-2
                      rounded-lg
                      font-medium
                    "
                                    >
                                        ↓ Open / Download PDF Report
                                    </a>

                                </div>
                            )}

                    </div>
                </div>
            )}
        </>
    );
}

function ProcessingStep({
    text,
    active,
}: {
    text: string;
    active: boolean;
}) {
    return (
        <div className="flex items-center gap-2">

            <div
                className={`
          w-2 h-2 rounded-full
          ${active ? 'bg-primary-400 animate-pulse' : 'bg-gray-700'}
        `}
            />

            <span
                className={`
          text-xs
          ${active ? 'text-primary-300' : 'text-gray-600'}
        `}
            >
                {text}
            </span>

        </div>
    );
}