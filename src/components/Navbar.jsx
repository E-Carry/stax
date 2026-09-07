import React, { useEffect, useRef, useState } from 'react';
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
    Layers,
    ShoppingBag,
    ShieldCheck,
    User,
    LogOut,
    Wallet,
    ChevronDown,
    Sliders,
    Clock
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
    onOpenAmbient,
    user,
    onOpenLogin,
    onLogout,
    errorCount = 0
}) {
    const logoRef = useRef(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        if (logoRef.current) {
            gsap.fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.92 },
                { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
            );
        }
    }, []);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isAdmin = user && user.role === 'admin';

    const navItems = [
        { id: 'vault', label: 'Vault', icon: Library, badge: bookCount },
        { id: 'store', label: 'Store & Rent', icon: ShoppingBag, isNew: true },
        { id: 'magazine', label: 'Magazine', icon: Layers },
        ...(isAdmin ? [{ id: 'admin', label: 'Admin OS', icon: ShieldCheck, isAlert: errorCount > 0, badge: errorCount > 0 ? errorCount : undefined }] : []),
        { id: 'ai', label: 'Codex AI', icon: Bot },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'converter', label: 'Converter', icon: RefreshCw },
        { id: 'quotes', label: 'Quote Wall', icon: Quote },
        { id: 'sync', label: 'Sync Hub', icon: Smartphone }
    ];

    return (
        <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-2.5 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                {/* Clean Vector STAX Logo Mark */}
                <div
                    ref={logoRef}
                    onClick={() => setActiveTab('vault')}
                    className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
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
                        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 hidden sm:inline text-left">
                            Engineered Library OS
                        </span>
                    </div>
                </div>

                {/* Global Command Palette Trigger */}
                <div className="flex-1 max-w-xs hidden xl:block">
                    <div
                        onClick={onOpenCommandPalette}
                        className="relative flex items-center w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-indigo-500/50 hover:text-slate-200 cursor-pointer transition-all shadow-inner group"
                    >
                        <Search className="w-4 h-4 mr-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs flex-1 truncate font-mono text-left">
                            {searchQuery ? searchQuery : "Cmd + K search..."}
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
                                className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? 'text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-md shadow-indigo-600/30 font-bold'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.id === 'admin' ? 'text-amber-400' : 'text-slate-400'}`} />
                                <span>{item.label}</span>
                                {item.isNew && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                                )}
                                {item.badge !== undefined && (
                                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                        item.isAlert
                                            ? 'bg-rose-500 text-white font-bold animate-pulse'
                                            : isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-800 text-slate-400'
                                    }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Right Side: Ambience, Theme, and User Authentication */}
                <div className="flex items-center gap-2">
                    {/* Ambient Sound Lounge */}
                    <button
                        onClick={onOpenAmbient}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/50 transition-all shadow-sm flex items-center gap-1 text-xs font-mono cursor-pointer"
                        title="Ambient Sound Lounge"
                    >
                        <Volume2 className="w-4 h-4 animate-pulse text-indigo-400" />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`p-2 rounded-xl border transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer ${
                            theme === 'dark'
                                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/40 hover:bg-slate-800'
                                : 'bg-white border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-400/40 hover:bg-slate-100'
                        }`}
                        title={`Current: ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}`}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-4 h-4 text-amber-400" />
                        ) : (
                            <Moon className="w-4 h-4 text-indigo-600" />
                        )}
                    </button>

                    {/* User Profile Hub / Sign In Trigger */}
                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                type="button"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm group"
                            >
                                <img
                                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                                    alt={user.name}
                                    className="w-7 h-7 rounded-xl object-cover border border-indigo-500/30 group-hover:scale-105 transition-transform"
                                />
                                <div className="flex flex-col text-left hidden sm:block">
                                    <span className="text-xs font-bold text-white leading-none truncate max-w-[100px]">
                                        {user?.name ? user.name.split(' ')[0] : 'User'}
                                    </span>
                                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                                        user?.role === 'admin' ? 'text-amber-400' : 'text-indigo-400'
                                    }`}>
                                        {user?.role === 'admin' ? '👑 ADMIN' : 'READER'}
                                    </span>
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-slate-800 shadow-2xl p-3 z-50 space-y-3 text-left">
                                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-xs text-white truncate">{user?.name || 'User'}</span>
                                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                                user?.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                                            }`}>
                                                {(user?.role || 'reader').toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-mono text-slate-400 truncate">{user?.email || ''}</div>
                                    </div>

                                    {/* Financials & Status */}
                                    <div className="space-y-1.5 px-1 text-xs font-mono">
                                        <div className="flex items-center justify-between text-slate-300">
                                            <span className="flex items-center gap-1.5 text-slate-400">
                                                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                                                <span>Wallet:</span>
                                            </span>
                                            <span className="font-bold text-emerald-400">${(user.walletBalance || 0).toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-slate-300">
                                            <span className="flex items-center gap-1.5 text-slate-400">
                                                <Clock className="w-3.5 h-3.5 text-purple-400" />
                                                <span>Rentals:</span>
                                            </span>
                                            <span className="text-purple-300 font-bold">{user.rentals?.length || 0} active</span>
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                                        {isAdmin ? (
                                            <button
                                                type="button"
                                                onClick={() => { setIsProfileMenuOpen(false); setActiveTab('admin'); }}
                                                className="w-full px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                                            >
                                                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                                                <span>Admin OS (Root)</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => { setIsProfileMenuOpen(false); onOpenLogin(); }}
                                                className="w-full px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                                            >
                                                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                                                <span>Switch to Admin Account</span>
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => { setIsProfileMenuOpen(false); setActiveTab('store'); }}
                                            className="w-full px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
                                            <span>Purchases & Rentals</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => { setIsProfileMenuOpen(false); onLogout(); }}
                                            className="w-full px-2.5 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Sign Out / Switch</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Separate Reader and Admin Login Triggers */
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => onOpenLogin('reader')}
                                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                                title="Normal member and reader login"
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>Reader Login</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => onOpenLogin('admin')}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 hover:border-amber-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                title="Root administrator login - unlocks Admin OS"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                                <span>Admin Login</span>
                            </button>
                        </div>
                    )}

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
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                                isActive
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{item.label}</span>
                            {item.badge !== undefined && (
                                <span className="text-[10px] font-mono px-1 rounded-full bg-slate-800 text-slate-300">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </header>
    );
}
