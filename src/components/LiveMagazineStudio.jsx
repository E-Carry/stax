import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, BookOpen, Rss, ArrowLeft, Bookmark, Share2, Sparkles, Eye, Download, Layers } from 'lucide-react';

const MAGAZINES = [
    {
        id: 'mag-1',
        title: 'STAX ARCHITECTURE & DESIGN QUARTERLY',
        issue: 'Issue #42 • Autumn 2026',
        category: 'Architecture & Design',
        readTime: '15 min read',
        cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        articles: [
            {
                id: 'art-1',
                title: 'The Resurgence of Brutalist Glassmorphism in Modern Digital OS',
                author: 'Elena Rostova',
                date: 'Sept 2026',
                subtitle: 'How tactile textures, 3D depth physics, and translucent glass redefined digital libraries.',
                content: `In an era dominated by flat, sterile UI surfaces, a quiet revolution has taken root among software architects. Digital systems are shifting back toward tactile realism—a philosophy dubbed "Brutalist Glassmorphic Realism". By combining light refraction, ambient depth shadows, and physical 3D perspective transforms, contemporary user interfaces evoke the permanence of physical leatherbound archives while retaining the speed of modern GPU acceleration.\n\nKey to this movement is the elevation of typography and spatial hierarchy. When readers interact with digital volumes that tilt, open, and reflect ambient light, the psychological boundary between physical paper and OLED screens dissolves.`
            },
            {
                id: 'art-2',
                title: 'Kinetic Typography as a Spatial Navigation Paradigm',
                author: 'Marcus Vance',
                date: 'Aug 2026',
                subtitle: 'Exploring how animated text physics guide human focus.',
                content: `Motion in typography is no longer mere decoration; it is structural. By modulating letter spacing, skew, and weight transitions during scroll events, digital publications create a rhythmic reading velocity that matches human cognitive intake.`
            }
        ]
    },
    {
        id: 'mag-2',
        title: 'WIRED TECH REVIEW: NEURAL E-READERS',
        issue: 'Vol. 18 • Special Edition',
        category: 'Technology',
        readTime: '12 min read',
        cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        articles: [
            {
                id: 'art-3',
                title: 'E-Ink Gallery 3 vs OLED: The Battle for Sequential Art Supremacy',
                author: 'Kaito Tanaka',
                date: 'Sept 2026',
                subtitle: 'Full-color reflective displays reach 300 DPI with sub-100ms refresh rates.',
                content: `Comic and manga readers have long faced a dilemma: the eye-comfort of monochrome E-Ink versus the vivid hues of emissive displays. With the latest full-color E-Ink Gallery 3 panels paired with local GPU rasterizers, sequential art rendering has achieved print parity.`
            }
        ]
    }
];

export default function LiveMagazineStudio() {
    const [selectedMag, setSelectedMag] = useState(MAGAZINES[0]);
    const [activeArticleIndex, setActiveArticleIndex] = useState(0);
    const [isReadingMode, setIsReadingMode] = useState(false);

    const currentArticle = selectedMag.articles[activeArticleIndex] || selectedMag.articles[0];

    return (
        <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Newspaper className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-display font-black text-white">Live Magazine & Periodicals Studio</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Editorial multi-column glossy magazine reader, live article feeds, and high-DPI periodical spreads
                        </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30">
                        Glossy Periodical Engine v2.4
                    </span>
                </div>
            </div>

            {!isReadingMode ? (
                /* Magazine Library Spread */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MAGAZINES.map((mag) => (
                        <motion.div
                            key={mag.id}
                            whileHover={{ y: -6 }}
                            className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
                        >
                            <div className="flex gap-4">
                                <img src={mag.cover} alt={mag.title} className="w-28 h-40 object-cover rounded-2xl shadow-xl border border-slate-700" />
                                <div className="space-y-2 flex-1">
                                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                        {mag.category}
                                    </span>
                                    <h3 className="font-display font-bold text-lg text-white leading-tight">{mag.title}</h3>
                                    <p className="text-xs text-slate-400 font-mono">{mag.issue}</p>
                                    <p className="text-xs text-slate-300 line-clamp-2 italic">
                                        "{mag.articles[0].subtitle}"
                                    </p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-400">{mag.readTime}</span>
                                <button
                                    onClick={() => { setSelectedMag(mag); setActiveArticleIndex(0); setIsReadingMode(true); }}
                                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30"
                                >
                                    <BookOpen className="w-4 h-4" /> Open Magazine
                                </button>
                            </div>
                        </motion.div>
                    ))}
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
