import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Bookmark,
    Clock,
    Sliders,
    Headphones,
    Sparkles,
    List
} from 'lucide-react';

export default function AudiobookPlayerModal({ book, onClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [progress, setProgress] = useState(35);
    const canvasRef = useRef(null);

    if (!book) return null;

    const chapters = book.audioChapters || [
        { title: "Chapter 1: Introduction & Fundamentals", duration: "14:20" },
        { title: "Chapter 2: Deep Core Concepts", duration: "22:15" },
        { title: "Chapter 3: Advanced Applications", duration: "18:40" }
    ];

    // Audio Waveform Visualizer simulation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let animationId;
            let step = 0;

            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const width = canvas.width;
                const height = canvas.height;
                const bars = 40;
                const barWidth = width / bars - 2;

                for (let i = 0; i < bars; i++) {
                    const amp = isPlaying ? Math.sin(step + i * 0.3) * 20 + 25 : 8;
                    ctx.fillStyle = i % 2 === 0 ? '#818cf8' : '#c084fc';
                    ctx.fillRect(i * (barWidth + 2), height / 2 - amp / 2, barWidth, amp);
                }
                step += 0.1;
                animationId = requestAnimationFrame(render);
            };
            render();
            return () => cancelAnimationFrame(animationId);
        }
    }, [isPlaying]);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-2">
                            <Headphones className="w-5 h-5 text-indigo-400" />
                            <span className="font-mono text-xs text-indigo-300 font-bold uppercase tracking-wider">
                                Stax Audio Lounge
                            </span>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Album Cover & Player Info */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-36 h-36 object-cover rounded-2xl shadow-2xl border border-slate-700/80"
                        />
                        <div className="text-center sm:text-left space-y-1 flex-1">
                            <span className="text-xs font-mono text-purple-400 uppercase">{book.category}</span>
                            <h2 className="text-xl font-bold text-white line-clamp-1">{book.title}</h2>
                            <p className="text-xs text-slate-400">Narrated by Stax Neural Engine</p>
                            <div className="pt-2 text-xs font-mono text-indigo-300 flex items-center gap-2">
                                <span>Speed: {playbackSpeed}x</span>
                                <span>•</span>
                                <span>Duration: {book.duration || '5h 30m'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Animated Waveform Canvas */}
                    <div className="w-full h-16 bg-slate-950/80 rounded-2xl p-2 border border-slate-800 flex items-center justify-center">
                        <canvas ref={canvasRef} width={400} height={40} className="w-full h-full" />
                    </div>

                    {/* Progress Bar Slider */}
                    <div className="space-y-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="flex justify-between text-[11px] font-mono text-slate-400">
                            <span>01:42:15</span>
                            <span>{progress}%</span>
                            <span>05:35:00</span>
                        </div>
                    </div>

                    {/* Audio Controls */}
                    <div className="flex items-center justify-center gap-6">
                        <button
                            onClick={() => setPlaybackSpeed(playbackSpeed === 1.0 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : playbackSpeed === 1.5 ? 2.0 : 1.0)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-slate-700"
                        >
                            {playbackSpeed}x
                        </button>

                        <button
                            onClick={() => setProgress(Math.max(0, progress - 5))}
                            className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/40 hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                        </button>

                        <button
                            onClick={() => setProgress(Math.min(100, progress + 5))}
                            className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>

                        <button className="p-3 rounded-2xl bg-slate-800 text-indigo-400 border border-slate-700">
                            <Bookmark className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chapter Selector */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                        <span className="text-xs font-mono text-slate-400 uppercase">Chapter Selector</span>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 scrollbar-none">
                            {chapters.map((ch, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setCurrentChapterIndex(idx)}
                                    className={`p-2.5 rounded-xl text-xs flex justify-between cursor-pointer transition-colors ${currentChapterIndex === idx ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800/60'
                                        }`}
                                >
                                    <span>{ch.title}</span>
                                    <span className="font-mono text-[11px]">{ch.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
