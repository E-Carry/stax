import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sun,
    Moon,
    Sparkles,
    Palette,
    Monitor,
    BookOpen,
    Volume2,
    VolumeX,
    Check,
    ChevronUp,
    ChevronDown,
    Zap,
    X,
    Layers,
    Compass,
    Move
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Synthesized mechanical haptic audio using Web Audio API (zero external audio file dependencies)
const playHapticSound = (type = 'click') => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === 'light') {
            // Bright cheerful solar chime
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
            gain.gain.setValueAtTime(0.09, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        } else if (type === 'dark') {
            // Deep subtle obsidian mechanical drop
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
            osc.frequency.exponentialRampToValueAtTime(164.81, ctx.currentTime + 0.14); // E3
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.14);
        } else if (type === 'sepia') {
            // Warm resonant paper acoustic tone
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
            osc.frequency.exponentialRampToValueAtTime(554.37, ctx.currentTime + 0.1); // C#5
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } else {
            // Standard crisp micro-switch
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        }
    } catch (e) {
        // Ignore audio errors if audio context is blocked
    }
};

export default function ThemeToggleCorner({
    theme,
    setTheme,
    soundEnabled = true,
    setSoundEnabled
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const [cornerPosition, setCornerPosition] = useState(() => {
        try {
            return localStorage.getItem('stax-corner-pos') || 'bottom-right';
        } catch (e) {
            return 'bottom-right';
        }
    });
    const [showHint, setShowHint] = useState(true);
    const [soundOn, setSoundOn] = useState(() => {
        try {
            const saved = localStorage.getItem('stax-theme-sound');
            return saved !== null ? saved === 'true' : true;
        } catch (e) {
            return true;
        }
    });
    const [activeMode, setActiveMode] = useState(theme); // 'dark' | 'light' | 'sepia' | 'system'
    const menuRef = useRef(null);

    // Auto dismiss the discovery hint after 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    // Sync active mode with external theme prop
    useEffect(() => {
        setActiveMode(theme);
    }, [theme]);

    // Handle Click Outside to close flyout menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Global Keyboard Shortcut: Alt+T or Shift+D to toggle theme
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.altKey && e.key.toLowerCase() === 't') || (e.shiftKey && e.key.toLowerCase() === 'd')) {
                e.preventDefault();
                toggleDirectTheme();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [theme, soundOn]);

    // Confetti spark micro-burst on theme switch
    const triggerConfetti = (mode) => {
        try {
            const isRight = cornerPosition.includes('right');
            const isBottom = cornerPosition.includes('bottom');
            const originX = isRight ? 0.94 : 0.06;
            const originY = isBottom ? 0.92 : 0.12;

            const colors =
                mode === 'light'
                    ? ['#f59e0b', '#fbbf24', '#fde68a', '#fb923c']
                    : mode === 'sepia'
                        ? ['#d97706', '#b45309', '#fef3c7', '#78350f']
                        : ['#818cf8', '#c084fc', '#38bdf8', '#e879f9'];

            confetti({
                particleCount: 22,
                spread: 55,
                origin: { x: originX, y: originY },
                colors,
                ticks: 120,
                scalar: 0.75,
                gravity: 1.1,
                disableForReducedMotion: true
            });
        } catch (e) { }
    };

    // Toggle sound preference
    const toggleSound = (e) => {
        e?.stopPropagation();
        const next = !soundOn;
        setSoundOn(next);
        try {
            localStorage.setItem('stax-theme-sound', String(next));
        } catch (err) { }
        if (next) playHapticSound('click');
        if (setSoundEnabled) setSoundEnabled(next);
    };

    // Apply specific theme mode
    const applyTheme = (mode, isAuto = false) => {
        setShowHint(false);
        if (soundOn) {
            playHapticSound(mode);
        }
        triggerConfetti(mode);

        if (isAuto) {
            try {
                localStorage.setItem('stax-theme-preference', 'system');
            } catch (err) { }
            const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const actualTheme = systemPrefersDark ? 'dark' : 'light';
            setTheme(actualTheme);
            setActiveMode('system');
        } else {
            try {
                localStorage.setItem('stax-theme-preference', mode);
            } catch (err) { }
            setTheme(mode);
            setActiveMode(mode);
        }
    };

    // Direct toggle between Dark and Light mode
    const toggleDirectTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    };

    // Change corner position
    const handleSetCornerPosition = (pos) => {
        setCornerPosition(pos);
        try {
            localStorage.setItem('stax-corner-pos', pos);
        } catch (err) { }
        if (soundOn) playHapticSound('click');
    };

    const isDark = theme === 'dark';
    const isLight = theme === 'light';
    const isSepia = theme === 'sepia';

    const themeOptions = [
        {
            id: 'dark',
            name: 'Midnight Obsidian',
            desc: 'Deep OLED black & neon indigo',
            icon: Moon,
            accent: 'from-indigo-500 to-purple-600',
            glow: 'rgba(99, 102, 241, 0.4)',
            badge: 'OLED Dark'
        },
        {
            id: 'light',
            name: 'Solar Ivory',
            desc: 'Crisp paper white & golden amber',
            icon: Sun,
            accent: 'from-amber-400 to-orange-500',
            glow: 'rgba(245, 158, 11, 0.4)',
            badge: 'Daylight'
        },
        {
            id: 'sepia',
            name: 'Warm Parchment',
            desc: 'Eye-comfort vintage paper tone',
            icon: BookOpen,
            accent: 'from-amber-600 to-yellow-700',
            glow: 'rgba(217, 119, 6, 0.35)',
            badge: 'Paper'
        },
        {
            id: 'system',
            name: 'System Sync',
            desc: 'Matches your OS day/night clock',
            icon: Monitor,
            accent: 'from-cyan-500 to-blue-600',
            glow: 'rgba(6, 182, 212, 0.35)',
            badge: 'Auto'
        }
    ];

    // Compute fixed positioning classes
    const positionClasses = {
        'bottom-right': 'fixed bottom-5 right-5 items-end',
        'top-right': 'fixed top-20 right-5 items-end',
        'bottom-left': 'fixed bottom-5 left-5 items-start',
        'top-left': 'fixed top-20 left-5 items-start'
    }[cornerPosition] || 'fixed bottom-5 right-5 items-end';

    return (
        <div
            ref={menuRef}
            className={`${positionClasses} z-[60] select-none flex flex-col pointer-events-auto transition-all duration-300`}
            aria-label="Theme Controller"
        >
            {/* INITIAL DISCOVERY BADGE HINT */}
            <AnimatePresence>
                {showHint && !isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        onClick={() => setShowHint(false)}
                        className={`mb-2 px-3 py-1.5 rounded-2xl shadow-xl backdrop-blur-xl border text-[11px] font-mono flex items-center gap-2 cursor-pointer transition-all ${
                            isDark
                                ? 'bg-slate-900/95 border-indigo-500/50 text-indigo-300 shadow-indigo-500/20'
                                : isSepia
                                ? 'bg-[#fbf0d9]/95 border-amber-500/50 text-amber-800 shadow-amber-500/20'
                                : 'bg-white/95 border-amber-400/60 text-amber-800 shadow-amber-500/20'
                        }`}
                    >
                        <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                        <span>Click corner to toggle Light / Dark Mode</span>
                        <kbd className="px-1.5 py-0.5 rounded bg-black/20 text-[9px]">Alt+T</kbd>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. EXPANDED POPUP STUDIO MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: cornerPosition.includes('top') ? -12 : 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: cornerPosition.includes('top') ? -12 : 12 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        className={`${cornerPosition.includes('top') ? 'mt-3 order-2' : 'mb-3 order-1'} w-80 rounded-3xl p-4.5 backdrop-blur-2xl border shadow-2xl overflow-hidden transition-all duration-300`}
                        style={{
                            backgroundColor: isDark
                                ? 'rgba(15, 23, 42, 0.95)'
                                : isSepia
                                ? 'rgba(251, 240, 217, 0.96)'
                                : 'rgba(255, 255, 255, 0.96)',
                            borderColor: isDark
                                ? 'rgba(255, 255, 255, 0.14)'
                                : isSepia
                                ? 'rgba(215, 196, 158, 0.9)'
                                : 'rgba(226, 232, 240, 0.9)',
                            boxShadow: isDark
                                ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.25)'
                                : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 30px rgba(245, 158, 11, 0.2)'
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-700/40 dark:border-slate-700/40">
                            <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                                    isDark ? 'from-indigo-500 to-purple-600 text-white' : isSepia ? 'from-amber-600 to-yellow-700 text-white' : 'from-amber-400 to-orange-500 text-white'
                                } shadow-md`}>
                                    <Palette className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 font-display">
                                        Surface & Optics OS
                                    </h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                        Ultra Dual-Engine Theme Studio
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Theme Profiles Selection */}
                        <div className="py-3 space-y-1.5">
                            {themeOptions.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected =
                                    opt.id === 'system'
                                        ? activeMode === 'system'
                                        : theme === opt.id && activeMode !== 'system';

                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => applyTheme(opt.id, opt.id === 'system')}
                                        className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 group relative ${
                                            isSelected
                                                ? isDark
                                                    ? 'bg-indigo-600/20 border border-indigo-500/50 shadow-sm'
                                                    : isSepia
                                                    ? 'bg-amber-600/20 border border-amber-500/50 shadow-sm'
                                                    : 'bg-amber-500/15 border border-amber-400/60 shadow-sm'
                                                : 'hover:bg-slate-500/10 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                                                    isSelected
                                                        ? `bg-gradient-to-br ${opt.accent} text-white`
                                                        : 'bg-slate-800/60 dark:bg-slate-800/60 text-slate-400 dark:text-slate-300'
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                                                        {opt.name}
                                                    </span>
                                                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-md ${
                                                        isSelected
                                                            ? isDark
                                                                ? 'bg-indigo-500/30 text-indigo-300'
                                                                : 'bg-amber-500/25 text-amber-700 dark:text-amber-300'
                                                            : 'bg-slate-500/15 text-slate-400'
                                                    }`}>
                                                        {opt.badge}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                                                    {opt.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                                    isDark ? 'bg-indigo-500 text-white' : isSepia ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white'
                                                } shadow-md`}
                                            >
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Corner Position Preference */}
                        <div className="py-2 px-1 border-t border-slate-700/40 dark:border-slate-700/40">
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                                <span className="flex items-center gap-1">
                                    <Move className="w-3 h-3 text-indigo-400" />
                                    <span>Corner Dock Position:</span>
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                                <button
                                    onClick={() => handleSetCornerPosition('bottom-right')}
                                    className={`py-1 px-2 rounded-xl border text-center transition-all ${
                                        cornerPosition === 'bottom-right'
                                            ? 'bg-indigo-600 text-white border-indigo-500'
                                            : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-slate-200'
                                    }`}
                                >
                                    Bottom-Right
                                </button>
                                <button
                                    onClick={() => handleSetCornerPosition('top-right')}
                                    className={`py-1 px-2 rounded-xl border text-center transition-all ${
                                        cornerPosition === 'top-right'
                                            ? 'bg-indigo-600 text-white border-indigo-500'
                                            : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-slate-200'
                                    }`}
                                >
                                    Top-Right
                                </button>
                                <button
                                    onClick={() => handleSetCornerPosition('bottom-left')}
                                    className={`py-1 px-2 rounded-xl border text-center transition-all ${
                                        cornerPosition === 'bottom-left'
                                            ? 'bg-indigo-600 text-white border-indigo-500'
                                            : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:text-slate-200'
                                    }`}
                                >
                                    Bottom-Left
                                </button>
                            </div>
                        </div>

                        {/* Footer Controls: Audio Haptics & Shortcut */}
                        <div className="pt-2.5 border-t border-slate-700/40 dark:border-slate-700/40 flex items-center justify-between text-[11px] font-mono">
                            <button
                                onClick={toggleSound}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
                                    soundOn
                                        ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/30'
                                        : 'text-slate-500 bg-slate-800/40 border border-slate-700/40'
                                }`}
                                title="Toggle mechanical switch audio feedback"
                            >
                                {soundOn ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                                <span>{soundOn ? 'Sound: ON' : 'Sound: OFF'}</span>
                            </button>

                            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-700/30 dark:bg-slate-800 border border-slate-600/40 dark:border-slate-700 font-mono text-[9px] text-slate-300">
                                    Alt
                                </kbd>
                                <span>+</span>
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-700/30 dark:bg-slate-800 border border-slate-600/40 dark:border-slate-700 font-mono text-[9px] text-slate-300">
                                    T
                                </kbd>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. MAIN FLOATING CORNER CONTROLLER DOCK */}
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative flex items-center gap-2 p-1.5 rounded-full backdrop-blur-2xl border transition-all duration-300 ${
                    cornerPosition.includes('top') ? 'order-1' : 'order-2'
                } ${
                    isDark
                        ? 'bg-slate-900/92 border-slate-700/80 shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(99,102,241,0.3)]'
                        : isSepia
                        ? 'bg-[#fbf0d9]/95 border-[#d7c49e] shadow-[0_12px_36px_rgba(92,64,51,0.22),0_0_20px_rgba(217,119,6,0.25)]'
                        : 'bg-white/94 border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.14),0_0_28px_rgba(245,158,11,0.3)]'
                }`}
            >
                {/* Ambient dynamic glowing aura ring */}
                <div
                    className={`absolute -inset-1 rounded-full blur-md opacity-35 transition-all duration-500 pointer-events-none ${
                        isDark
                            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-pulse'
                            : isSepia
                            ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 animate-pulse'
                            : 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 animate-pulse'
                    }`}
                />

                {/* Compact Mode Toggle (if user collapsed dock) */}
                {isCompact ? (
                    <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleDirectTheme}
                        className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                            isDark
                                ? 'bg-slate-800 text-indigo-400 border border-slate-700 shadow-lg shadow-indigo-500/20'
                                : isSepia
                                ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-lg'
                                : 'bg-amber-50 text-amber-500 border border-amber-200 shadow-lg shadow-amber-500/20'
                        }`}
                        title={`Current: ${isDark ? 'Dark Mode' : 'Light Mode'} (Click to switch)`}
                    >
                        {isDark ? (
                            <Moon className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.9)]" />
                        ) : isSepia ? (
                            <BookOpen className="w-5 h-5 text-amber-700" />
                        ) : (
                            <Sun className="w-5 h-5 text-amber-500 animate-[spin_12s_linear_infinite] drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
                        )}
                    </motion.button>
                ) : (
                    <>
                        {/* Interactive Dual-Mode Tactile Toggle Switch */}
                        <div
                            onClick={toggleDirectTheme}
                            className={`relative flex items-center p-1 rounded-full cursor-pointer transition-all duration-300 ${
                                isDark
                                    ? 'bg-slate-950/90 border border-slate-800'
                                    : isSepia
                                    ? 'bg-[#eedbb8] border border-[#d7c49e]'
                                    : 'bg-slate-100 border border-slate-200/90'
                            }`}
                            title="Click to Switch Light / Dark Mode"
                        >
                            {/* Sliding Thumb pill */}
                            <motion.div
                                layout
                                transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                                className={`absolute top-1 bottom-1 w-8 rounded-full flex items-center justify-center shadow-lg ${
                                    isDark
                                        ? 'right-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-600/50'
                                        : isSepia
                                        ? 'left-1 bg-gradient-to-br from-amber-600 to-yellow-700 text-white shadow-amber-700/40'
                                        : 'left-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/50'
                                }`}
                            >
                                {isDark ? (
                                    <Moon className="w-3.5 h-3.5 fill-white text-white drop-shadow" />
                                ) : isSepia ? (
                                    <BookOpen className="w-3.5 h-3.5 text-white drop-shadow" />
                                ) : (
                                    <Sun className="w-3.5 h-3.5 fill-white text-white drop-shadow animate-[spin_16s_linear_infinite]" />
                                )}
                            </motion.div>

                            {/* Left Icon: Solar Sun */}
                            <div className="w-8 h-8 flex items-center justify-center z-10 text-amber-500">
                                <Sun className={`w-4 h-4 transition-all ${isLight ? 'opacity-0 scale-75' : 'opacity-60 hover:opacity-100'}`} />
                            </div>

                            {/* Right Icon: Cosmic Moon */}
                            <div className="w-8 h-8 flex items-center justify-center z-10 text-indigo-400">
                                <Moon className={`w-4 h-4 transition-all ${isDark ? 'opacity-0 scale-75' : 'opacity-60 hover:opacity-100'}`} />
                            </div>
                        </div>

                        {/* Mode Name Label & Indicator */}
                        <div
                            onClick={toggleDirectTheme}
                            className="hidden sm:flex flex-col items-start cursor-pointer px-1 pr-1.5"
                        >
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${
                                    isDark ? 'bg-indigo-400 animate-pulse' : isSepia ? 'bg-amber-600' : 'bg-amber-500 animate-pulse'
                                }`} />
                                <span className="text-[11px] font-bold font-display uppercase tracking-wider text-slate-800 dark:text-slate-100">
                                    {isDark ? 'Dark Orbit' : isSepia ? 'Sepia Paper' : 'Solar Light'}
                                </span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-400 leading-none">
                                {isDark ? 'Obsidian UI' : isSepia ? 'Warm Contrast' : 'Daylight UI'}
                            </span>
                        </div>

                        {/* Palette Expand Button */}
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-full transition-all flex items-center justify-center ${
                                isMenuOpen
                                    ? isDark
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'bg-amber-500 text-white shadow-md'
                                    : isDark
                                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50'
                                    : isSepia
                                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/60'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                            title="Ambiance Profiles & Corner Position Settings"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                        </motion.button>
                    </>
                )}

                {/* Micro Expand / Collapse Trigger */}
                <button
                    onClick={() => setIsCompact(!isCompact)}
                    className="p-1 text-slate-400 hover:text-slate-200 dark:hover:text-slate-200 transition-colors"
                    title={isCompact ? "Expand Corner Dock" : "Minimize to Corner Jewel"}
                >
                    {isCompact ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
            </motion.div>
        </div>
    );
}
