import React, { useEffect, useRef } from 'react';
import {
    Library,
    RefreshCw,
    Sparkles,
    Smartphone,
    Headphones,
    Newspaper,
    Search,
    Command,
    Sun,
    Moon,
    HardDrive,
    Bot,
    BarChart3,
    Volume2,
    Quote,
    Layers
} from 'lucide-react';
import gsap from 'gsap';

export default function Navbar({
    activeTab,
    setActiveTab,
    searchQuery,
    onOpenCommandPalette,
    theme,
    setTheme,
    bookCount,
    storageUsed,
    onOpenAmbient
}) {
    const logoRef = useRef(null);

    useEffect(() => {
        if (logoRef.current) {
            gsap.fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.92 },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
            );
        }
    }, []);

    const navItems = [
        { id: 'vault', label: 'Vault', icon: Library, badge: bookCount },
        { id: 'magazine', label: 'Magazine', icon: Layers, isNew: true },
        { id: 'ai', label: 'Codex AI', icon: Bot },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'converter', label: 'Converter', icon: RefreshCw },
        { id: 'quotes', label: 'Quote Wall', icon: Quote },
        { id: 'sync', label: 'Device Sync', icon: Smartphone },
        { id: 'rss', label: 'News Digest', icon: Newspaper },
    ];

    return (
        <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-2.5 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                {/* Clean Vector STAX Logo Mark */}
                <div
                    ref={logoRef}
                    onClick={() => setActiveTab('vault')}
                    className="flex items-center gap-3 cursor-pointer group select-none"
                >
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform duration-300">
                            <defs>
                                <linearGradient id="staxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#818cf8" />
                                    <stop offset="50%" stopColor="#c084fc" />
                                    <stop offset="100%" stopColor="#38bdf8" />
                                </linearGradient>
                            </defs>
                            <rect x="18" y="20" width="64" height="14" rx="4" fill="url(#staxGrad)" opacity="0.95" />
                            <rect x="26" y="42" width="56" height="14" rx="4" fill="url(#staxGrad)" opacity="0.8" />
                            <rect x="18" y="64" width="64" height="14" rx="4" fill="url(#staxGrad)" opacity="1" />
                            <circle cx="74" cy="27" r="4" fill="#ffffff" className="animate-pulse" />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-display font-black text-2xl tracking-[0.25em] text-white uppercase leading-none">
                                STAX
                            </span>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/40">
                                ULTRA
                            </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 hidden sm:inline">
                            Engineered Library OS
                        </span>
                    </div>
                </div>

                {/* Global Command Palette Trigger */}
                <div className="flex-1 max-w-sm hidden md:block">
                    <div
                        onClick={onOpenCommandPalette}
                        className="relative flex items-center w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-indigo-500/50 hover:text-slate-200 cursor-pointer transition-all shadow-inner group"
                    >
                        <Search className="w-4 h-4 mr-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs flex-1 truncate font-mono">
                            {searchQuery ? searchQuery : "Cmd + K to search volumes & actions..."}
                        </span>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
                            <Command className="w-3 h-3" /> K
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${isActive
                                        ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-md shadow-indigo-600/30 font-bold'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                                    }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span>{item.label}</span>
                                {item.isNew && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                                )}
                                {item.badge !== undefined && (
                                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Ambient Sound & Theme Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onOpenAmbient}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/50 transition-all shadow-sm flex items-center gap-1 text-xs font-mono"
                        title="Ambient Reading Sound Lounge"
                    >
                        <Volume2 className="w-4 h-4 animate-pulse text-indigo-400" />
                        <span className="hidden xl:inline">Ambience</span>
                    </button>

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`p-2 rounded-xl border transition-all duration-300 shadow-sm flex items-center justify-center ${
                            theme === 'dark'
                                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/40 hover:bg-slate-800'
                                : 'bg-white border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-400/40 hover:bg-slate-100'
                        }`}
                        title={`Current: ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'} (Click to switch)`}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-4 h-4 text-amber-400 animate-[spin_16s_linear_infinite]" />
                        ) : (
                            <Moon className="w-4 h-4 text-indigo-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Sub-Nav */}
            <div className="flex lg:hidden overflow-x-auto gap-2 mt-2 pt-2 border-t border-slate-800/60 scrollbar-none">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${isActive
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </header>
    );
}
