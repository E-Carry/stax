import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, RefreshCw, Smartphone, Sparkles, Newspaper, Headphones, Command, Sun, Moon, Palette } from 'lucide-react';

export default function CommandPaletteModal({ isOpen, onClose, books, onSelectTab, onSelectBook, theme, setTheme, user }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                isOpen ? onClose() : null;
            }
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filtered = books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase())
    );

    const isDark = theme === 'dark';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
                >
                    {/* Input Header */}
                    <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                        <Search className="w-5 h-5 text-indigo-400" />
                        <input
                            type="text"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type a command (e.g. 'light', 'dark', 'vault') or search volumes..."
                            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                        />
                        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Quick Navigation & Theme Commands */}
                    {!query && (
                        <div className="p-3 border-b border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                            <button onClick={() => { onSelectTab('vault'); onClose(); }} className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 flex items-center gap-2 text-slate-300 transition-colors cursor-pointer">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Vault
                            </button>
                            <button onClick={() => { onSelectTab('store'); onClose(); }} className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 flex items-center gap-2 text-slate-300 transition-colors cursor-pointer">
                                <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Store & Rent
                            </button>
                            {user?.role === 'admin' ? (
                                <button onClick={() => { onSelectTab('admin'); onClose(); }} className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 flex items-center gap-2 text-amber-400 transition-colors cursor-pointer">
                                    <Command className="w-3.5 h-3.5 text-amber-400" /> Admin OS
                                </button>
                            ) : (
                                <button onClick={() => { onSelectTab('login'); onClose(); }} className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 flex items-center gap-2 text-slate-300 transition-colors cursor-pointer">
                                    <RefreshCw className="w-3.5 h-3.5 text-indigo-400" /> Account
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (setTheme) setTheme(isDark ? 'light' : 'dark');
                                    onClose();
                                }}
                                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 flex items-center gap-2 text-amber-300 transition-colors cursor-pointer"
                            >
                                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                                {isDark ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    )}

                    {/* Theme Search Matches */}
                    {query && ('light mode'.includes(query.toLowerCase()) || 'dark mode'.includes(query.toLowerCase()) || 'theme'.includes(query.toLowerCase())) && (
                        <div className="p-2 border-b border-slate-800/60">
                            <div
                                onClick={() => {
                                    if (setTheme) setTheme(query.toLowerCase().includes('light') ? 'light' : query.toLowerCase().includes('sepia') ? 'sepia' : isDark ? 'light' : 'dark');
                                    onClose();
                                }}
                                className="p-3 rounded-2xl hover:bg-indigo-600/20 cursor-pointer flex items-center gap-3 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                                    <Palette className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-xs text-white group-hover:text-indigo-300">
                                        Toggle Appearance Theme
                                    </div>
                                    <div className="text-[11px] text-slate-400">
                                        Current: {theme === 'dark' ? 'Midnight Obsidian (Dark)' : theme === 'sepia' ? 'Warm Parchment (Sepia)' : 'Solar Ivory (Light)'}
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                                    Action
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    <div className="max-h-72 overflow-y-auto p-2 space-y-1 scrollbar-none">
                        {filtered.map((b) => (
                            <div
                                key={b.id}
                                onClick={() => { onSelectBook(b); onClose(); }}
                                className="p-3 rounded-2xl hover:bg-indigo-600/20 cursor-pointer flex items-center gap-3 transition-colors group"
                            >
                                <img src={b.cover} alt={b.title} className="w-8 h-12 object-cover rounded shadow" />
                                <div className="flex-1 overflow-hidden">
                                    <div className="font-bold text-xs text-white group-hover:text-indigo-300 truncate">{b.title}</div>
                                    <div className="text-[11px] text-slate-400 truncate">{b.author} • {b.category}</div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                                    {b.format}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
                        <span>Navigation: ↑ ↓ Enter to select</span>
                        <span>ESC to close • Alt+T for Theme</span>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
