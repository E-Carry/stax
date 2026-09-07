import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    Tag,
    Clock,
    CheckCircle2,
    Calendar,
    Star,
    Layers,
    BookOpen,
    CreditCard,
    Sparkles,
    Search,
    Filter,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Bookmark,
    Plus
} from 'lucide-react';

export default function StoreStudio({
    books,
    magazines,
    user,
    onCheckout,
    onOpenReader,
    onTopUpWallet
}) {
    const [viewMode, setViewMode] = useState('catalog'); // 'catalog' | 'my_library'
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterMediaType, setFilterMediaType] = useState('all'); // 'all' | 'books' | 'magazines'
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Sci-Fi', 'Technology', 'Architecture & Design', 'Cyberpunk', 'Manga', 'Philosophy', 'Science', 'Audiobook'];

    // Combine books and magazines with catalog tagging
    const catalogItems = [
        ...books.map(b => ({ ...b, itemType: 'book' })),
        ...magazines.map(m => ({ ...m, itemType: 'magazine' }))
    ];

    const purchasedIds = user?.purchasedIds || [];
    const activeRentals = user?.rentals || [];

    // Helper to check ownership & rental status
    const isPurchased = (id) => purchasedIds.includes(id);
    const getRental = (id) => activeRentals.find(r => r.id === id);

    // Filtering logic
    const filteredItems = catalogItems.filter(item => {
        if (viewMode === 'my_library') {
            const owned = isPurchased(item.id);
            const rented = !!getRental(item.id);
            if (!owned && !rented) return false;
        }

        const typeMatch =
            filterMediaType === 'all' ||
            (filterMediaType === 'books' && item.itemType === 'book') ||
            (filterMediaType === 'magazines' && item.itemType === 'magazine');

        const catMatch = filterCategory === 'All' || item.category === filterCategory;

        const searchMatch = !searchQuery.trim() ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.editor && item.editor.toLowerCase().includes(searchQuery.toLowerCase()));

        return typeMatch && catMatch && searchMatch;
    });

    return (
        <div className="w-full space-y-6 text-left">

            {/* Store Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-display font-black text-white">
                                STAX Store & Digital Exchange
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/40">
                                BUY & RENT V3.5
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Permanent volume purchases, 7/14/30 day rentals, glossy magazine issues, and instant reader delivery
                        </p>
                    </div>

                    {/* User Wallet Pill & Test Gateway Button */}
                    <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
                        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800 shadow-sm">
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-mono text-slate-400 uppercase block">Wallet Balance</span>
                                <span className="text-sm font-mono font-bold text-emerald-400">
                                    ${(user?.walletBalance || 0).toFixed(2)}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onTopUpWallet?.(50)}
                                className="px-2.5 py-1 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                                title="Add $50 test funds to wallet"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Top Up $50</span>
                            </button>
                        </div>

                        {catalogItems[0] && (
                            <button
                                type="button"
                                onClick={() => onCheckout(catalogItems[0], 'buy')}
                                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer transition-all"
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>Open Payment Gateway</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Gateway Guide Pill */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                        <strong className="text-slate-200">How Payment Gateway Works:</strong> Click <span className="text-indigo-300 font-bold">"Buy to Keep"</span> or <span className="text-purple-300 font-bold">"Rent (7d)"</span> on any book or magazine card below to open the bank-grade checkout tunnel.
                    </span>
                </div>
            </div>

            {/* View Mode & Filter Tabs */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Catalog vs My Rentals Switcher */}
                <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => setViewMode('catalog')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            viewMode === 'catalog'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        Store Catalog ({catalogItems.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('my_library')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            viewMode === 'my_library'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <span>My Purchases & Rentals</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-indigo-300 text-[10px] font-mono">
                            {purchasedIds.length + activeRentals.length}
                        </span>
                    </button>
                </div>

                {/* Search & Media Type */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                    <div className="relative flex-1 sm:w-60">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search store titles..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        {['all', 'books', 'magazines'].map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFilterMediaType(type)}
                                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer ${
                                    filterMediaType === type
                                        ? 'bg-indigo-600 text-white font-bold'
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(cat => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setFilterCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${
                            filterCategory === cat
                                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold shadow-sm'
                                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                    <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                    <h4 className="font-display font-bold text-lg text-slate-300">
                        {viewMode === 'my_library' ? 'No active purchases or rentals found' : 'No store items match your filter'}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                        {viewMode === 'my_library'
                            ? 'Browse the Store Catalog to purchase volumes or rent periodicals!'
                            : 'Try adjusting your search query or selecting "All" categories.'}
                    </p>
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredItems.map((item, idx) => {
                        const owned = isPurchased(item.id);
                        const rental = getRental(item.id);
                        const stock = Number(item.stock) || 0;
                        const isLow = stock > 0 && stock <= 5;
                        const isOut = stock === 0;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: idx * 0.04 }}
                                className="glass-card rounded-3xl p-4 border border-slate-800/80 flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* Top Cover Area */}
                                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 mb-3 shadow-lg">
                                    <img
                                        src={item.cover}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Format & Type Badges */}
                                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                                            {item.format || 'EPUB'}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase backdrop-blur-md border ${
                                            item.itemType === 'magazine'
                                                ? 'bg-purple-950/80 text-purple-300 border-purple-500/30'
                                                : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30'
                                        }`}>
                                            {item.itemType}
                                        </span>
                                    </div>

                                    {/* Ownership / Rental Status Overlay */}
                                    <div className="absolute top-2.5 right-2.5 z-10">
                                        {owned && (
                                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40 backdrop-blur-md shadow-md">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                                <span>OWNED</span>
                                            </span>
                                        )}
                                        {!owned && rental && (
                                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/90 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/40 backdrop-blur-md shadow-md">
                                                <Clock className="w-3 h-3 text-purple-400 animate-pulse" />
                                                <span>{rental.daysRemaining || 7}d RENT</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Stock Badge Overlay */}
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex justify-between items-center text-[10px] font-mono">
                                        <span className={`px-2 py-0.5 rounded backdrop-blur-md border ${
                                            isOut
                                                ? 'bg-rose-950/80 text-rose-300 border-rose-500/30'
                                                : isLow
                                                ? 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                                                : 'bg-slate-950/80 text-slate-300 border-slate-700'
                                        }`}>
                                            {isOut ? 'Depleted' : isLow ? `Only ${stock} left` : `${stock} in stock`}
                                        </span>

                                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-400 border border-slate-700">
                                            <Star className="w-3 h-3 fill-amber-400" />
                                            <span>{item.rating || '4.9'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Metadata Area */}
                                <div className="space-y-2 mb-4">
                                    <span className="text-[10px] font-mono uppercase text-indigo-400 block truncate">
                                        {item.category}
                                    </span>
                                    <h4 className="font-display font-bold text-sm text-white line-clamp-1 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 truncate">
                                        {item.author || item.editor || 'STAX Collective'}
                                    </p>
                                </div>

                                {/* Bottom Pricing & Action Section */}
                                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                                    {owned || rental ? (
                                        /* Already owned / rented */
                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={() => onOpenReader(item)}
                                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer transition-all"
                                            >
                                                <BookOpen className="w-4 h-4" />
                                                <span>Open in Reader</span>
                                            </button>

                                            {rental && !owned && (
                                                <button
                                                    type="button"
                                                    onClick={() => onCheckout(item, 'buy')}
                                                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono flex items-center justify-center gap-1 cursor-pointer transition-all"
                                                >
                                                    <span>Upgrade to Lifetime (${Number(item.price || 14.99).toFixed(2)})</span>
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        /* Available to Buy or Rent */
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onCheckout(item, 'buy')}
                                                disabled={isOut}
                                                className="py-2.5 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-md shadow-indigo-600/30 disabled:opacity-40 cursor-pointer transition-all"
                                            >
                                                <span className="text-[10px] uppercase font-mono tracking-wider">Buy to Keep</span>
                                                <span className="text-xs font-mono font-bold">${Number(item.price || 14.99).toFixed(2)}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onCheckout(item, 'rent')}
                                                disabled={isOut}
                                                className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex flex-col items-center justify-center gap-0.5 disabled:opacity-40 cursor-pointer transition-all"
                                            >
                                                <span className="text-[10px] uppercase font-mono text-purple-400 tracking-wider">Rent (7d)</span>
                                                <span className="text-xs font-mono text-purple-300 font-bold">${Number(item.rentPrice || 2.99).toFixed(2)}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
}
