import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, CloudRain, Flame, Coffee, Sparkles } from 'lucide-react';

export default function AmbientSoundModal({ isOpen, onClose }) {
    const [rainVol, setRainVol] = useState(40);
    const [fireVol, setFireVol] = useState(20);
    const [cafeVol, setCafeVol] = useState(0);
    const [spaceVol, setSpaceVol] = useState(50);
    const [isPlaying, setIsPlaying] = useState(true);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-slate-100"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-indigo-400 animate-pulse" />
                            <h3 className="font-bold text-sm font-display text-white">Ambient Sound Lounge</h3>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="text-xs text-slate-400">
                        Mix background acoustic sounds to enhance focus while reading or listening to volumes.
                    </p>

                    {/* Sound Controls */}
                    <div className="space-y-4 text-xs font-mono">
                        {/* Rain */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-slate-300">
                                <span className="flex items-center gap-2">
                                    <CloudRain className="w-4 h-4 text-sky-400" /> Gentle Rain on Window
                                </span>
                                <span>{rainVol}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={rainVol} onChange={(e) => setRainVol(Number(e.target.value))} className="w-full accent-sky-400" />
                        </div>

                        {/* Fireplace */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-slate-300">
                                <span className="flex items-center gap-2">
                                    <Flame className="w-4 h-4 text-amber-400" /> Library Fireplace Crackle
                                </span>
                                <span>{fireVol}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={fireVol} onChange={(e) => setFireVol(Number(e.target.value))} className="w-full accent-amber-400" />
                        </div>

                        {/* Coffee Shop */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-slate-300">
                                <span className="flex items-center gap-2">
                                    <Coffee className="w-4 h-4 text-emerald-400" /> Cozy Coffee Shop Ambience
                                </span>
                                <span>{cafeVol}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={cafeVol} onChange={(e) => setCafeVol(Number(e.target.value))} className="w-full accent-emerald-400" />
                        </div>

                        {/* Deep Space */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-slate-300">
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-400" /> Deep Space Drone
                                </span>
                                <span>{spaceVol}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={spaceVol} onChange={(e) => setSpaceVol(Number(e.target.value))} className="w-full accent-purple-400" />
                        </div>
                    </div>

                    <div className="pt-2 flex justify-between">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-400'
                                }`}
                        >
                            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <span>{isPlaying ? 'Master Ambience Active' : 'Ambience Muted'}</span>
                        </button>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
