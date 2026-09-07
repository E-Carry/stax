import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Share2, Sparkles, Copy, Check, Download, Bookmark } from 'lucide-react';

export default function QuoteWallStudio({ books }) {
    // Aggregate all highlights from books
    const allHighlights = books.flatMap(b => (b.highlights || []).map(h => ({ ...h, bookTitle: b.title, author: b.author, cover: b.cover })));

    const [selectedHighlight, setSelectedHighlight] = useState(allHighlights[0] || {
        id: "q1",
        text: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
        bookTitle: "Dune: Master Edition",
        author: "Frank Herbert",
        chapter: "Chapter 1",
        color: "yellow"
    });

    const [copied, setCopied] = useState(false);
    const [cardTheme, setCardTheme] = useState('indigo'); // indigo, purple, amber, dark

    const handleCopyQuote = () => {
        navigator.clipboard?.writeText?.(`"${selectedHighlight.text}" — ${selectedHighlight.author}, ${selectedHighlight.bookTitle}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cardGradient =
        cardTheme === 'purple' ? 'from-purple-900 via-indigo-950 to-slate-950 border-purple-500/40' :
            cardTheme === 'amber' ? 'from-amber-950 via-slate-950 to-slate-950 border-amber-500/40' :
                cardTheme === 'dark' ? 'from-slate-900 to-slate-950 border-slate-800' :
                    'from-indigo-950 via-purple-950 to-slate-950 border-indigo-500/40';

    return (
        <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Quote className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-display font-black text-white">Interactive Quote Wall & Card Generator</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Curate saved book highlights and generate social-media ready aesthetic quote posters
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Quote Feed List */}
                <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">Saved Library Highlights</span>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-none">
                        {allHighlights.map((hl) => (
                            <div
                                key={hl.id}
                                onClick={() => setSelectedHighlight(hl)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedHighlight.id === hl.id
                                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <p className="text-xs italic text-slate-200 line-clamp-2">"{hl.text}"</p>
                                <div className="flex items-center justify-between text-[11px] font-mono mt-2 text-slate-400">
                                    <span>{hl.bookTitle}</span>
                                    <span className="text-indigo-400 font-semibold">{hl.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Visual Poster Card Generator */}
                <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">Social Poster Card Studio</span>

                    {/* Theme Switcher for Card */}
                    <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-slate-400">Card Theme:</span>
                        <button onClick={() => setCardTheme('indigo')} className="px-2.5 py-1 rounded-lg bg-indigo-900 text-indigo-200 border border-indigo-500">Indigo</button>
                        <button onClick={() => setCardTheme('purple')} className="px-2.5 py-1 rounded-lg bg-purple-900 text-purple-200 border border-purple-500">Purple</button>
                        <button onClick={() => setCardTheme('amber')} className="px-2.5 py-1 rounded-lg bg-amber-900 text-amber-200 border border-amber-500">Amber</button>
                        <button onClick={() => setCardTheme('dark')} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-700">Dark</button>
                    </div>

                    {/* Aesthetic Poster Card */}
                    <motion.div
                        key={selectedHighlight.id + cardTheme}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-8 rounded-3xl bg-gradient-to-br ${cardGradient} border shadow-2xl space-y-6 relative overflow-hidden text-left`}
                    >
                        <Quote className="w-10 h-10 text-white/20 absolute top-6 right-6" />

                        <div className="space-y-4 relative z-10">
                            <p className="text-lg sm:text-xl font-serif italic text-white leading-relaxed font-medium">
                                "{selectedHighlight.text}"
                            </p>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-sm text-white">{selectedHighlight.author}</h4>
                                    <span className="text-xs text-indigo-300 font-mono">{selectedHighlight.bookTitle}</span>
                                </div>

                                <div className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded bg-white/10 text-white border border-white/20">
                                    STAX QUOTE
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopyQuote}
                            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? 'Copied Quote Text!' : 'Copy Quote Text'}</span>
                        </button>

                        <button
                            onClick={() => alert(`Exported high-res Quote Poster Card for ${selectedHighlight.bookTitle}`)}
                            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all"
                        >
                            <Download className="w-4 h-4 text-purple-400" />
                            <span>Export Image Card</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
