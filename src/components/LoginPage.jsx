import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    Mail,
    User,
    Key,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Sparkles,
    BookOpen,
    Layers,
    Cpu,
    ArrowLeft,
    Check,
    Sliders,
    Zap,
    Boxes
} from 'lucide-react';
import { DEFAULT_ACCOUNTS } from '../data/mockBooks';

export default function LoginPage({
    initialPortal = 'reader', // 'reader' | 'admin'
    onLoginSuccess,
    onCancel,
    currentTheme = 'dark'
}) {
    // Two separate portals: 'reader' (Normal Login) vs 'admin' (Admin Login)
    const [portal, setPortal] = useState(initialPortal);
    const [mode, setMode] = useState('login'); // 'login' | 'register' (register only in reader portal)

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    // Feedback States
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Sync portal if initialPortal changes
    useEffect(() => {
        setPortal(initialPortal);
        setErrorMsg('');
        setSuccessMsg('');
    }, [initialPortal]);

    // Quick fill helper
    const handleQuickFill = (targetPortal) => {
        setErrorMsg('');
        setSuccessMsg('');
        if (targetPortal === 'reader') {
            const readerAcc = DEFAULT_ACCOUNTS.find(a => a.role === 'reader') || DEFAULT_ACCOUNTS[1];
            setEmail(readerAcc.email);
            setPassword(readerAcc.password);
            setPortal('reader');
            setMode('login');
        } else {
            const adminAcc = DEFAULT_ACCOUNTS.find(a => a.role === 'admin') || DEFAULT_ACCOUNTS[0];
            setEmail(adminAcc.email);
            setPassword(adminAcc.password);
            setPortal('admin');
            setMode('login');
        }
    };

    const handleSwitchPortal = (targetPortal) => {
        setPortal(targetPortal);
        setErrorMsg('');
        setSuccessMsg('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        if (targetPortal === 'admin') {
            setMode('login'); // Admins only sign in
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        // Basic validation
        if (!email.trim() || !password.trim()) {
            setErrorMsg('Please provide both email and password.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters.');
            return;
        }

        if (mode === 'register' && portal === 'reader') {
            if (!name.trim()) {
                setErrorMsg('Please provide your name.');
                return;
            }
            if (password !== confirmPassword) {
                setErrorMsg('Passwords do not match.');
                return;
            }
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            let localUsers = [];
            try {
                const stored = localStorage.getItem('stax-registered-users');
                if (stored) localUsers = JSON.parse(stored);
            } catch (err) {
                console.error(err);
            }

            const allAccounts = [...DEFAULT_ACCOUNTS, ...localUsers];

            if (mode === 'login') {
                const found = allAccounts.find(
                    acc => acc.email.toLowerCase() === email.trim().toLowerCase()
                );

                if (!found) {
                    setErrorMsg('No account found with this email address. Please check credentials or register.');
                    return;
                }

                if (found.password !== password) {
                    setErrorMsg('Incorrect password. For demo: reader password is "reader123", admin is "admin123".');
                    return;
                }

                // STRICT ENFORCEMENT: Admin Portal requires admin role!
                if (portal === 'admin') {
                    if (found.role !== 'admin') {
                        setErrorMsg('ACCESS DENIED: This account does not possess Administrator privileges. Normal users must use the Normal / Reader Login.');
                        return;
                    }

                    setSuccessMsg(`Administrator access granted. Welcome, ${found.name}! Unlocking Admin OS...`);
                    setTimeout(() => {
                        onLoginSuccess(found);
                    }, 800);
                } else {
                    // Normal / Reader Portal
                    // Normal users get standard reader session (Admin OS strictly hidden)
                    const sessionUser = {
                        ...found,
                        role: 'reader' // Ensured standard reader access
                    };
                    setSuccessMsg(`Welcome to STAX Vault, ${found.name}!`);
                    setTimeout(() => {
                        onLoginSuccess(sessionUser);
                    }, 800);
                }

            } else {
                // Register normal user
                const exists = allAccounts.some(
                    acc => acc.email.toLowerCase() === email.trim().toLowerCase()
                );

                if (exists) {
                    setErrorMsg('An account with this email already exists. Please sign in instead.');
                    return;
                }

                const newUser = {
                    id: `usr-${Date.now()}`,
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    password: password,
                    role: 'reader', // New registrations are always standard readers
                    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
                    walletBalance: 100.00, // Welcome gift credits!
                    purchasedIds: [],
                    rentals: []
                };

                try {
                    localStorage.setItem('stax-registered-users', JSON.stringify([...localUsers, newUser]));
                } catch (err) {
                    console.error(err);
                }

                setSuccessMsg('Account registered successfully with $100.00 Welcome Credits! Redirecting to Vault...');
                setTimeout(() => {
                    onLoginSuccess(newUser);
                }, 900);
            }
        }, 600);
    };

    const isAdminPortal = portal === 'admin';

    return (
        <div className="relative min-h-[calc(100vh-140px)] w-full flex flex-col items-center justify-center p-4 lg:p-8 space-y-6">

            {/* Ambient Background Glows */}
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700 ${
                isAdminPortal ? 'bg-amber-600/15' : 'bg-indigo-600/15'
            }`} />
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700 ${
                isAdminPortal ? 'bg-orange-600/15' : 'bg-purple-600/15'
            }`} />

            {/* Top Distinct Portal Selector Tabs */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-2 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-xs font-mono font-bold text-slate-400 pl-2">
                    SELECT PORTAL TYPE:
                </div>

                <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                    {/* Normal / Reader Login Tab */}
                    <button
                        type="button"
                        onClick={() => handleSwitchPortal('reader')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            !isAdminPortal
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Normal / Reader Login</span>
                    </button>

                    {/* Admin Login Tab */}
                    <button
                        type="button"
                        onClick={() => handleSwitchPortal('admin')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isAdminPortal
                                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
                                : 'bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300'
                        }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Login (Exclusive)</span>
                    </button>
                </div>
            </div>

            {/* Main Auth Container */}
            <div className={`w-full max-w-5xl glass-panel rounded-3xl border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-500 ${
                isAdminPortal ? 'border-amber-500/40' : 'border-slate-800/80'
            }`}>

                {/* Left Side: Brand & Feature Showcase */}
                <div className={`lg:col-span-5 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
                    isAdminPortal
                        ? 'bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950'
                        : 'bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900'
                }`}>
                    <div className="relative z-10 space-y-6 text-left">
                        {onCancel && (
                            <button
                                onClick={onCancel}
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Browse Catalog as Guest</span>
                            </button>
                        )}

                        {/* STAX Logo Header */}
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${
                                isAdminPortal
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30'
                                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30'
                            }`}>
                                {isAdminPortal ? <ShieldCheck className="w-6 h-6 text-white" /> : <BookOpen className="w-6 h-6 text-white" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-display font-black text-2xl tracking-wider text-white">STAX</span>
                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                        isAdminPortal
                                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                    }`}>
                                        {isAdminPortal ? 'ADMIN OS ROOT' : 'READER VAULT'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-mono">
                                    {isAdminPortal ? 'Executive Management Console' : 'Curated Digital Library Platform'}
                                </p>
                            </div>
                        </div>

                        {/* Distinct Information for Portals */}
                        {isAdminPortal ? (
                            /* Admin Portal Showcase */
                            <div className="space-y-4 pt-2">
                                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-200">
                                    <span className="font-bold block mb-1">👑 ROOT ADMINISTRATIVE PORTAL</span>
                                    <p className="text-[11px] text-slate-300">
                                        This login grants exclusive access to the <b>Admin OS</b>. Readers and standard users cannot access administrative controls.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5 shrink-0">
                                        <Boxes className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200">Live Inventory Stock Management</h4>
                                        <p className="text-[11px] text-slate-400">Modify live book and magazine stock copies (+1, -1, +5, bulk restock).</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5 shrink-0">
                                        <Sliders className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200">App Error Self-Healing Console</h4>
                                        <p className="text-[11px] text-slate-400">Run automated diagnostics to resolve cache, lock, and network errors.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Reader Portal Showcase */
                            <div className="space-y-4 pt-2">
                                <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs font-mono text-indigo-200">
                                    <span className="font-bold block mb-1">📘 NORMAL MEMBER ACCESS</span>
                                    <p className="text-[11px] text-slate-300">
                                        Sign in to enjoy 3D bookshelves, reading vaults, e-readers, and purchase/rent books and magazines.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mt-0.5 shrink-0">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200">E-Book & Magazine Reading</h4>
                                        <p className="text-[11px] text-slate-400">Full access to 3D bookshelf, ambient sounds, highlights, and analytics.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mt-0.5 shrink-0">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200">Buy to Keep or Rent (7d/14d/30d)</h4>
                                        <p className="text-[11px] text-slate-400">Integrated bank-grade payment gateway with Card, Wallet, UPI QR & Apple Pay.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Security Badges */}
                    <div className="relative z-10 pt-8 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <Lock className={`w-3.5 h-3.5 ${isAdminPortal ? 'text-amber-400' : 'text-emerald-400'}`} />
                            <span>{isAdminPortal ? 'Root Level-0 Authorization' : '256-Bit SSL Encrypted'}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">
                            {isAdminPortal ? 'ADMINISTRATOR ONLY' : 'MEMBER VAULT'}
                        </span>
                    </div>
                </div>

                {/* Right Side: Authentication Form */}
                <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center bg-slate-950/70 text-left">
                    <div className="max-w-md w-full mx-auto space-y-6">

                        {/* Top: Portal Title & Switcher */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                                <h3 className="text-lg font-display font-black text-white flex items-center gap-2">
                                    {isAdminPortal ? (
                                        <>
                                            <span className="text-amber-400">👑 Administrator Login</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>📘 Normal / Reader Login</span>
                                        </>
                                    )}
                                </h3>
                                <p className="text-[11px] font-mono text-slate-400">
                                    {isAdminPortal ? 'Enter admin credentials to unlock Admin OS' : 'Sign in to access your personal reading library'}
                                </p>
                            </div>

                            {/* Sign In vs Register (for normal users only) */}
                            {!isAdminPortal && (
                                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => { setMode('login'); setErrorMsg(''); }}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            mode === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setMode('register'); setErrorMsg(''); }}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            mode === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 1-Click Quick Demo Fill Pill for Current Portal */}
                        <div className={`p-3 rounded-2xl border space-y-2 ${
                            isAdminPortal ? 'bg-amber-950/20 border-amber-500/30' : 'bg-indigo-950/20 border-indigo-500/30'
                        }`}>
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className={`font-bold flex items-center gap-1.5 ${isAdminPortal ? 'text-amber-300' : 'text-indigo-300'}`}>
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>1-Click Demo Credentials ({isAdminPortal ? 'Admin' : 'Normal Reader'}):</span>
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleQuickFill(portal)}
                                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
                                    isAdminPortal
                                        ? 'bg-slate-900/90 hover:bg-slate-800 border-amber-500/40 text-amber-300'
                                        : 'bg-slate-900/90 hover:bg-slate-800 border-indigo-500/40 text-indigo-300'
                                }`}
                            >
                                <div>
                                    <div className="text-[10px] font-mono font-bold uppercase">
                                        {isAdminPortal ? '👑 Fill Administrator Account' : '⚡ Fill Normal Reader Account'}
                                    </div>
                                    <div className="text-xs font-mono text-slate-200">
                                        {isAdminPortal ? 'admin@stax.io (Password: admin123)' : 'reader@stax.io (Password: reader123)'}
                                    </div>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-lg ${
                                    isAdminPortal ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                                }`}>
                                    Click to Fill
                                </span>
                            </button>
                        </div>

                        {/* Feedback Alerts */}
                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                                <span>{errorMsg}</span>
                            </motion.div>
                        )}

                        {successMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                                <span>{successMsg}</span>
                            </motion.div>
                        )}

                        {/* Login / Register Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'register' && !isAdminPortal && (
                                <div className="space-y-1">
                                    <label className="text-xs font-mono font-medium text-slate-300 block">
                                        Your Name
                                    </label>
                                    <div className="relative flex items-center">
                                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Alex Mercer"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs font-mono font-medium text-slate-300 block">
                                    {isAdminPortal ? 'Administrator Email' : 'Email Address'}
                                </label>
                                <div className="relative flex items-center">
                                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={isAdminPortal ? 'admin@stax.io' : 'reader@stax.io'}
                                        className={`w-full bg-slate-900 border rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-all ${
                                            isAdminPortal
                                                ? 'border-amber-500/30 focus:border-amber-500'
                                                : 'border-slate-800 focus:border-indigo-500'
                                        }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono font-medium text-slate-300 block">
                                        {isAdminPortal ? 'Root Password' : 'Password'}
                                    </label>
                                    <span className="text-[11px] font-mono text-slate-500">
                                        No OTP required
                                    </span>
                                </div>
                                <div className="relative flex items-center">
                                    <Key className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className={`w-full bg-slate-900 border rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                                            isAdminPortal
                                                ? 'border-amber-500/30 focus:border-amber-500'
                                                : 'border-slate-800 focus:border-indigo-500'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {mode === 'register' && !isAdminPortal && (
                                <div className="space-y-1">
                                    <label className="text-xs font-mono font-medium text-slate-300 block">
                                        Confirm Password
                                    </label>
                                    <div className="relative flex items-center">
                                        <Key className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Re-type password"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Remember Session & Info */}
                            <div className="flex items-center justify-between text-xs pt-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                                    />
                                    <span>Remember session</span>
                                </label>
                                <span className={`text-[11px] font-mono ${isAdminPortal ? 'text-amber-400 font-bold' : 'text-indigo-400'}`}>
                                    {isAdminPortal ? '👑 Unlocks Admin OS' : 'Standard Reader'}
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-white shadow-lg transition-all cursor-pointer ${
                                    isAdminPortal
                                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-amber-600/30'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/30'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>
                                            {isAdminPortal
                                                ? 'Authenticate & Unlock Admin OS'
                                                : mode === 'login'
                                                ? 'Sign In to Reader Vault'
                                                : 'Complete Reader Registration'}
                                        </span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    );
}
