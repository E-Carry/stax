import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, BookOpen, Rss, ArrowLeft, Bookmark, Share2, Sparkles, Eye, Download, Layers, CheckCircle2, Clock, ShoppingBag } from 'lucide-react';
import { INITIAL_MAGAZINES } from '../data/mockBooks';

export default function LiveMagazineStudio({
    magazines: propMagazines,
    onBuy,
    onRent,
    user
}) {
    const magazineList = propMagazines && propMagazines.length > 0 ? propMagazines : INITIAL_MAGAZINES;
    const [selectedMag, setSelectedMag] = useState(magazineList[0]);
    const [activeArticleIndex, setActiveArticleIndex] = useState(0);
    const [isReadingMode, setIsReadingMode] = useState(false);

    const purchasedIds = user?.purchasedIds || [];
    const activeRentals = user?.rentals || [];
    const isOwned = (id) => purchasedIds.includes(id);
    const getRental = (id) => activeRentals.find(r => r.id === id);

    const currentArticle = selectedMag?.articles?.[activeArticleIndex] || selectedMag?.articles?.[0] || {
        title: 'Editorial Overview',
        author: 'Staff Writer',
        date: 'Sept 2026',
        subtitle: 'Digital architecture and magazine spreads',
        content: 'Editorial content preview.'
    };

    return (
        <div className="w-full space-y-6 text-left">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Newspaper className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-display font-black text-white">Live Magazine & Periodicals Studio</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Editorial multi-column glossy magazine reader, live article feeds, buy issues, and 7-day rentals
                        </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30 self-start sm:self-auto">
                        Glossy Periodical Engine v3.5
                    </span>
                </div>
            </div>

            {!isReadingMode ? (
                /* Magazine Library Spread */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {magazineList.map((mag) => {
                        const owned = isOwned(mag.id);
                        const rental = getRental(mag.id);
                        const stock = Number(mag.stock || 20);
                        const price = Number(mag.price || 9.99);
                        const rentPrice = Number(mag.rentPrice || 1.99);

                        return (
                            <motion.div
                                key={mag.id}
                                whileHover={{ y: -4 }}
                                className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
                            >
                                <div className="flex gap-4">
                                    <div className="relative shrink-0">
                                        <img src={mag.cover} alt={mag.title} className="w-28 h-40 object-cover rounded-2xl shadow-xl border border-slate-700" />
                                        {owned && (
                                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold">
                                                OWNED
                                            </span>
                                        )}
                                        {!owned && rental && (
                                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-purple-950/90 text-purple-300 border border-purple-500/40 text-[9px] font-mono font-bold">
                                                {rental.daysRemaining || 7}d RENT
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                {mag.category}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-400">
                                                Stock: <span className={stock <= 5 ? 'text-amber-400' : 'text-emerald-400'}>{stock}</span>
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-lg text-white leading-tight">{mag.title}</h3>
                                        <p className="text-xs text-slate-400 font-mono">{mag.issue}</p>
                                        <p className="text-xs text-slate-300 line-clamp-2 italic">
                                            "{mag.articles?.[0]?.subtitle || mag.description}"
                                        </p>
                                    </div>
                                </div>

                                {/* Pricing & Actions */}
                                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                                        <span>{mag.readTime || '15 min read'}</span>
                                        <span>•</span>
                                        <span className="text-slate-300">Buy: <b className="text-white">${price.toFixed(2)}</b></span>
                                        <span>•</span>
                                        <span className="text-purple-300">Rent: <b>${rentPrice.toFixed(2)}</b></span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {onBuy && !owned && (
                                            <button
                                                type="button"
                                                onClick={() => onBuy(mag)}
                                                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold cursor-pointer transition-all"
                                                title={`Buy issue for $${price.toFixed(2)}`}
                                            >
                                                Buy (${price.toFixed(2)})
                                            </button>
                                        )}

                                        {onRent && !owned && (
                                            <button
                                                type="button"
                                                onClick={() => onRent(mag)}
                                                className="px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold cursor-pointer transition-all"
                                                title={`Rent for 7 days for $${rentPrice.toFixed(2)}`}
                                            >
                                                Rent (${rentPrice.toFixed(2)})
                                            </button>
                                        )}

                                        <button
                                            onClick={() => { setSelectedMag(mag); setActiveArticleIndex(0); setIsReadingMode(true); }}
                                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-600/30 cursor-pointer transition-all"
                                        >
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span>Read</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                /* Glossy Reader Layout */
                <div className="glass-panel rounded-3xl border border-slate-800 p-6 lg:p-10 space-y-8 max-w-4xl mx-auto">
                    {/* Reader Header Navigation */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <button
                            onClick={() => setIsReadingMode(false)}
                            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-mono"
                        >
                            <ArrowLeft className="w-4 h-4" /> Return to Periodicals
                        </button>

                        <div className="text-center">
                            <h4 className="font-bold text-xs text-white">{selectedMag.title}</h4>
                            <span className="text-[10px] text-slate-400 font-mono">{selectedMag.issue}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => alert("Article Bookmarked!")} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
                                <Bookmark className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Article Header */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest">
                            <span>{selectedMag.category}</span>
                            <span>•</span>
                            <span>By {currentArticle.author}</span>
                            <span>•</span>
                            <span>{currentArticle.date}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                            {currentArticle.title}
                        </h1>

                        <p className="text-sm font-semibold text-indigo-300 italic border-l-2 border-purple-500 pl-3">
                            "{currentArticle.subtitle}"
                        </p>
                    </div>

                    {/* Two-Column Glossy Body Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-slate-200 font-sans border-t border-slate-800 pt-6">
                        <div className="space-y-4">
                            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-purple-400 first-letter:mr-2 first-letter:float-left">
                                {currentArticle.content.slice(0, 300)}...
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p>{currentArticle.content.slice(300)}</p>

                            {/* Glossy Pull Quote Box */}
                            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-purple-200 italic font-serif text-xs">
                                "When digital volumes reflect ambient light, the psychological boundary between physical paper and screens dissolves."
                            </div>
                        </div>
                    </div>

                    {/* Article Selector Navigation Footer */}
                    <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
                        <button
                            disabled={activeArticleIndex === 0}
                            onClick={() => setActiveArticleIndex(p => Math.max(0, p - 1))}
                            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 text-slate-300 hover:text-white"
                        >
                            ← Previous Article
                        </button>

                        <span className="text-slate-400">
                            Article {activeArticleIndex + 1} of {selectedMag.articles.length}
                        </span>

                        <button
                            disabled={activeArticleIndex >= selectedMag.articles.length - 1}
                            onClick={() => setActiveArticleIndex(p => Math.min(selectedMag.articles.length - 1, p + 1))}
                            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 text-slate-300 hover:text-white"
                        >
                            Next Article →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
