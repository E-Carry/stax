import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Flame, Clock, Zap, Target, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export default function ReadingAnalyticsStudio() {
    const [dailyGoalMinutes] = useState(30);
    const [completedMinutes] = useState(25);
    const [wpmTestWords, setWpmTestWords] = useState(280);

    const streakDays = [
        { day: 'Mon', active: true, minutes: 42 },
        { day: 'Tue', active: true, minutes: 35 },
        { day: 'Wed', active: true, minutes: 50 },
        { day: 'Thu', active: true, minutes: 28 },
        { day: 'Fri', active: true, minutes: 45 },
        { day: 'Sat', active: true, minutes: 60 },
        { day: 'Sun', active: true, minutes: 25 },
    ];

    return (
        <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-amber-400" />
                            <h2 className="text-2xl font-display font-black text-white">Reading Analytics & Streak Studio</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Track 7-day reading velocity, calculate WPM reading speed, and monitor goal completion
                        </p>
                    </div>

                    {/* Flame Badge */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-sm leading-none">7 Day Streak</span>
                            <span className="text-[10px] font-mono opacity-80">On Fire! 🔥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Streak Tracker & Goal Ring */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">7-Day Reading Streak</span>
                            <span className="text-xs font-mono text-slate-400">Target: 30m / day</span>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {streakDays.map((sd, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center font-mono text-xs border transition-all ${sd.active ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10' : 'bg-slate-900 border-slate-800 text-slate-600'
                                        }`}>
                                        <Flame className={`w-4 h-4 ${sd.active ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                                        <span className="text-[10px] font-bold mt-1">{sd.minutes}m</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">{sd.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Daily Goal Gauge */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">Daily Goal Progress</span>
                            <div className="text-2xl font-black text-white">{completedMinutes} / {dailyGoalMinutes} mins</div>
                            <p className="text-xs text-slate-400">5 minutes left to complete today's target!</p>
                        </div>

                        <div className="w-20 h-20 rounded-full border-4 border-indigo-500 flex items-center justify-center font-mono font-bold text-indigo-300 text-sm bg-indigo-500/10 border-t-transparent animate-spin-slow">
                            83%
                        </div>
                    </div>
                </div>

                {/* WPM Speed Estimator */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">WPM Reading Speed Test</span>

                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                            <div className="font-bold text-white">Your Reading Speed: {wpmTestWords} WPM</div>
                            <p className="text-[11px] text-slate-400">At this pace, you can read an average 300-page book in ~5.2 hours.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-slate-400">Adjust Estimated Speed (WPM)</label>
                            <input
                                type="range"
                                min="150"
                                max="600"
                                value={wpmTestWords}
                                onChange={(e) => setWpmTestWords(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
