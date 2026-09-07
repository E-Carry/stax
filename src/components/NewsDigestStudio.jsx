import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Newspaper,
    Rss,
    CheckCircle2,
    Download,
    Sparkles,
    BookOpen,
    RefreshCw,
    X,
    Plus,
    Bookmark,
    ChevronRight,
    Send
} from 'lucide-react';
import { RSS_FEEDS } from '../data/mockBooks';
import { triggerFileDownload } from './FormatConverterStudio';

const FEED_ARTICLES_MAP = {
    'rss-1': [ // Hacker News Daily
        {
            id: 'hn-1',
            feed: 'Hacker News Daily',
            title: 'Quantum Advantage Demonstrated in Topological Qubit Architecture',
            author: 'Dr. Elena Rostova',
            time: '2 hours ago',
            category: 'Technology',
            summary: 'Researchers at the Zurich Quantum Institute have observed zero-mode Majorana fermion states inside superconductor-semiconductor nanowire junctions.',
            content: `# Quantum Advantage Demonstrated in Topological Qubit Architecture\n\n**Zurich, Switzerland** — Experimental physicists have demonstrated fault-tolerant topological qubit operations with coherence times exceeding 100 microseconds.`
        },
        {
            id: 'hn-2',
            feed: 'Hacker News Daily',
            title: 'Show HN: Stax E-Book OS - In-Browser 3D Library & Codex AI',
            author: 'Subhabrata',
            time: '3 hours ago',
            category: 'Software',
            summary: 'An open-source web application for managing digital book collections with GSAP 3D bookshelf, text-to-speech, and neural character maps.',
            content: `# Show HN: Stax E-Book OS\n\nStax is designed for self-hosters and readers who want hyper-realistic digital book management.`
        }
    ],
    'rss-2': [ // Literary Hub
        {
            id: 'lh-1',
            feed: 'Literary Hub',
            title: 'The Architecture of Solitude: Re-reading Cyberpunk Classics in the AI Epoch',
            author: 'Marcus Vance',
            time: '4 hours ago',
            category: 'Literature',
            summary: 'How William Gibson and Philip K. Dick anticipated the psychological architecture of modern algorithmic immersion.',
            content: `# The Architecture of Solitude: Re-reading Cyberpunk Classics\n\nWhen Neuromancer hit bookstore shelves in 1984, the internet was a text-only research network.`
        },
        {
            id: 'lh-2',
            feed: 'Literary Hub',
            title: 'Translating Dune: The Metrical Rhythm of Herbert’s Desert Dialects',
            author: 'Claire Dupond',
            time: '6 hours ago',
            category: 'Essays',
            summary: 'An examination of how Frank Herbert constructed the Fremen language using Arabic roots and rhythmic cadence.',
            content: `# Translating Dune: The Metrical Rhythm of Desert Dialects\n\nFrank Herbert’s linguistic choices in Dune reflect profound anthropological research.`
        }
    ],
    'rss-3': [ // MIT Tech Review
        {
            id: 'tr-1',
            feed: 'MIT Tech Review',
            title: 'Solid-State Battery Breakthrough Yields 1,200km EV Range',
            author: 'Sarah Chen',
            time: '5 hours ago',
            category: 'Science',
            summary: 'Silicon-anode solid electrolyte cells withstand 2,000 rapid charging cycles with less than 3% capacity degradation.',
            content: `# Solid-State Battery Breakthrough Yields 1,200km EV Range\n\nEngineers at MIT's Materials Processing Laboratory have announced a commercialization agreement.`
        }
    ],
    'rss-4': [ // ArXiv Physics
        {
            id: 'ax-1',
            feed: 'ArXiv Physics',
            title: 'Non-Abelian Anyon Braiding in Twisted Bilayer Graphene Superlattices',
            author: 'K. Takahashi et al.',
            time: '1 hour ago',
            category: 'Quantum Physics',
            summary: 'Direct optical observation of non-Abelian fractional quantum Hall states at v = 5/2 filling fraction.',
            content: `# Non-Abelian Anyon Braiding in Superlattices\n\nWe present spectroscopic evidence for topological non-Abelian excitations in twisted bilayer graphene.`
        }
    ]
};

export default function NewsDigestStudio({ onAddBook }) {
    const [feeds, setFeeds] = useState(RSS_FEEDS);
    const [selectedFeeds, setSelectedFeeds] = useState(['rss-1', 'rss-2']);

    // Compilation state
    const [isCompiling, setIsCompiling] = useState(false);
    const [compileProgress, setCompileProgress] = useState(0);
    const [compileStep, setCompileStep] = useState('');
    const [compiledDigest, setCompiledDigest] = useState(null);

    // Article Reader Modal state
    const [readingArticle, setReadingArticle] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const toggleFeed = (id) => {
        setSelectedFeeds(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const handleRefreshFeeds = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setFeeds(prev => prev.map(f => ({ ...f, unreadCount: f.unreadCount + Math.floor(Math.random() * 3) + 1 })));
            setIsRefreshing(false);
        }, 1000);
    };

    // Dynamically compute articles stream based on selected feeds
    const activeArticles = selectedFeeds.flatMap(id => FEED_ARTICLES_MAP[id] || []);

    const compileDigest = () => {
        setIsCompiling(true);
        setCompileProgress(0);
        setCompileStep('Ingesting RSS feeds & stripping ads...');

        setTimeout(() => {
            setCompileProgress(35);
            setCompileStep('Formatting multi-column EPUB layout & table of contents...');
        }, 500);

        setTimeout(() => {
            setCompileProgress(75);
            setCompileStep('Generating typography & high-res covers...');
        }, 1000);

        setTimeout(() => {
            setCompileProgress(100);
            const newDigest = {
                id: `digest-${Date.now()}`,
                title: `Stax Daily Digest — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                author: "Stax News Aggregator",
                publisher: "Stax Editorial Board",
                publishedYear: new Date().getFullYear().toString(),
                isbn: "978-0-999-00100-2",
                articlesCount: activeArticles.length * 14 || 36,
                fileSize: "5.2 MB",
                format: "EPUB",
                pages: 84,
                rating: 4.9,
                category: "Technology",
                series: "Daily RSS Magazine",
                language: "English",
                cover: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
                description: `Compiled daily magazine containing ${activeArticles.length} aggregated articles from selected RSS feeds.`,
                readingStatus: "Unread",
                progressPercent: 0,
                currentPage: 1,
                date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                toc: activeArticles.map((art, idx) => ({ title: art.title, page: idx * 10 + 1 })),
                content: activeArticles.map(art => art.content).join('\n\n---\n\n')
            };

            setCompiledDigest(newDigest);
            setIsCompiling(false);
        }, 1500);
    };

    const handleAddToVault = () => {
        if (compiledDigest && onAddBook) {
            onAddBook(compiledDigest);
            alert(`"${compiledDigest.title}" has been added to your Stax Library Vault!`);
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Newspaper className="w-5 h-5 text-pink-400" />
                            <h2 className="text-2xl font-display font-black text-white">Daily RSS News Digest Compiler</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Aggregate articles from Hacker News, LitHub, ArXiv, and TechReview into clean EPUB daily magazines
                        </p>
                    </div>

                    <button
                        onClick={handleRefreshFeeds}
                        disabled={isRefreshing}
                        className="px-4 py-2 rounded-xl bg-pink-500/20 text-pink-300 font-mono text-xs border border-pink-500/30 flex items-center gap-2 hover:bg-pink-500/30 transition-colors"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>{isRefreshing ? 'Fetching RSS...' : 'Fetch Latest Feeds'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: RSS Recipes Selector */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">Select RSS Recipes To Filter & Compile</span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {feeds.map((feed) => {
                            const isSelected = selectedFeeds.includes(feed.id);
                            return (
                                <div
                                    key={feed.id}
                                    onClick={() => toggleFeed(feed.id)}
                                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${isSelected
                                            ? 'bg-pink-950/30 border-pink-500 text-white shadow-lg shadow-pink-500/20 font-bold'
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                >
                                    <div className="space-y-1">
                                        <div className="font-bold text-xs text-white flex items-center gap-2">
                                            <Rss className={`w-3.5 h-3.5 ${isSelected ? 'text-pink-400' : 'text-slate-500'}`} />
                                            <span>{feed.title}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-mono">{feed.source} • {feed.category}</p>
                                    </div>

                                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                                        +{feed.unreadCount} Articles
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Compilation Progress Bar */}
                    {isCompiling && (
                        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                            <div className="flex justify-between items-center text-xs font-mono text-pink-400">
                                <span>{compileStep}</span>
                                <span>{compileProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300" style={{ width: `${compileProgress}%` }} />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={compileDigest}
                        disabled={isCompiling || selectedFeeds.length === 0}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>{isCompiling ? `Compiling Magazine (${compileProgress}%)...` : 'Compile Selected Feeds to Daily EPUB'}</span>
                    </button>

                    {/* Dynamic Unread Feed Stream Preview */}
                    <div className="space-y-3 pt-4 border-t border-slate-800">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                                Live Stream: {activeArticles.length} Articles Selected
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">Click article to read body</span>
                        </div>

                        <div className="space-y-2">
                            {activeArticles.length > 0 ? (
                                activeArticles.map((art) => (
                                    <div
                                        key={art.id}
                                        onClick={() => setReadingArticle(art)}
                                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 cursor-pointer transition-colors flex justify-between items-center"
                                    >
                                        <div className="space-y-1 max-w-lg">
                                            <span className="text-[10px] font-mono text-pink-400 uppercase">{art.feed} • {art.time}</span>
                                            <h5 className="font-bold text-xs text-white leading-tight">{art.title}</h5>
                                            <p className="text-[11px] text-slate-400 line-clamp-1">{art.summary}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-500" />
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-xs font-mono text-slate-500 border border-slate-800 rounded-xl">
                                    Select at least 1 RSS feed recipe above to view articles stream.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Output Box */}
                <div className="lg:col-span-5 space-y-4">
                    {compiledDigest && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-panel p-6 rounded-2xl border border-pink-500/40 space-y-4 bg-pink-950/10 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/30">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-white">{compiledDigest.title}</h3>
                                <p className="text-xs text-slate-400 font-mono mt-1">
                                    {compiledDigest.articlesCount} Articles • {compiledDigest.fileSize} • {compiledDigest.format}
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5">{compiledDigest.date}</p>
                            </div>

                            <div className="pt-2 flex flex-col gap-2">
                                {/* Real Blob Download PDF / EPUB Buttons */}
                                <button
                                    onClick={() => triggerFileDownload(compiledDigest.title, 'EPUB', compiledDigest.content)}
                                    className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Download className="w-4 h-4" /> Download Daily EPUB File
                                </button>

                                <button
                                    onClick={() => triggerFileDownload(compiledDigest.title, 'PDF', compiledDigest.content)}
                                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Download className="w-4 h-4" /> Download Daily PDF File
                                </button>

                                <button
                                    onClick={handleAddToVault}
                                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700"
                                >
                                    <Plus className="w-4 h-4 text-emerald-400" /> Add to Stax Vault
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Inline Article Modal */}
            {readingArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-y-auto space-y-4 text-slate-100 relative">
                        <button onClick={() => setReadingArticle(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>

                        <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">{readingArticle.feed}</span>
                        <h2 className="text-xl font-bold text-white">{readingArticle.title}</h2>
                        <div className="text-xs font-mono text-slate-400">By {readingArticle.author} • {readingArticle.time}</div>

                        <div className="pt-3 border-t border-slate-800 text-xs leading-relaxed space-y-3">
                            <p>{readingArticle.summary}</p>
                            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 font-serif whitespace-pre-wrap">
                                {readingArticle.content}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
