import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Menu,
    Sun,
    Moon,
    Type,
    Columns,
    Square,
    Highlighter,
    Volume2,
    VolumeX,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    List,
    Sparkles,
    Sliders,
    Search
} from 'lucide-react';

export default function EbookReaderModal({ book, onClose, onSaveHighlight }) {
    const [themeMode, setThemeMode] = useState('dark'); // dark, sepia, eink, cyber
    const [fontFamily, setFontFamily] = useState('sans'); // sans, serif, mono
    const [fontSize, setFontSize] = useState(18);
    const [columnMode, setColumnMode] = useState('single'); // single, dual
    const [tocOpen, setTocOpen] = useState(false);
    const [highlights, setHighlights] = useState(book?.highlights || []);
    const [selectedText, setSelectedText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [jumpInput, setJumpInput] = useState('');

    // Dynamic Multi-Page Chapter Pagination State
    const [pageNumber, setPageNumber] = useState(book?.currentPage || 1);
    const totalPages = book?.pages || 480;

    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    if (!book) return null;

    // Text to Speech
    const toggleSpeech = () => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                const currentPageText = getPageContent(pageNumber).paragraphs.join(' ');
                const utterance = new SpeechSynthesisUtterance(currentPageText.slice(0, 500));
                utterance.onend = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
        }
    };

    const addHighlight = (color) => {
        if (!selectedText) return;
        const newHighlight = {
            id: Date.now().toString(),
            text: selectedText,
            chapter: `Page ${pageNumber}`,
            page: pageNumber,
            color
        };
        setHighlights([newHighlight, ...highlights]);
        if (onSaveHighlight) onSaveHighlight(book.id, newHighlight);
        setSelectedText('');
    };

    const themeClass =
        themeMode === 'sepia' ? 'theme-sepia' :
            themeMode === 'eink' ? 'theme-eink' :
                themeMode === 'cyber' ? 'theme-cyber' : 'bg-slate-950 text-slate-100';

    const fontClass =
        fontFamily === 'serif' ? 'font-serif' :
            fontFamily === 'mono' ? 'font-mono' : 'font-sans';

    // Rich Infinite Multi-Page Generator (Supports Page 1 to Page 500+)
    const getPageContent = (page) => {
        const chapterNum = Math.floor((page - 1) / 12) + 1;
        const sectionNum = ((page - 1) % 12) + 1;
        const chapterTitle = book.toc?.[chapterNum - 1]?.title || `Chapter ${chapterNum}: The Assembly of ${book.category || 'Knowledge'}`;

        const paragraphs = [
            `CHAPTER ${chapterNum} • PAGE ${page} OF ${totalPages}`,
            book.content && page === 1 ? book.content : `${book.title} — Written by ${book.author}`,
            `The quiet stillness of the surrounding landscape framed the opening of Section ${sectionNum}. On page ${page}, ${book.author} invites the reader into an intricate exploration of ${book.category.toLowerCase()} themes. The structural design of the narrative shifts as internal tensions collide with outward events.`,
            `"When we analyze the historical trajectory of ${book.title}," noted the lead observer, "we realize that every decision recorded on page ${page} carries profound weight." The characters pause, weighing their next maneuver against the environmental feedback of their surroundings.`,
            `Further into Chapter ${chapterNum}, detailed observations reveal unexpected nuances. The atmospheric depth of the world unfolds with vivid imagery, weaving philosophy, tactical discipline, and human agency into a seamless reading experience.`,
            `As this page draws to a close, the momentum builds toward the upcoming resolution. Readers are encouraged to mark highlights and record annotations using the Stax Codex toolbar.`
        ];

        return {
            chapterTitle,
            paragraphs
        };
    };

    const currentPageData = getPageContent(pageNumber);

    const handleJumpPage = (e) => {
        e.preventDefault();
        const p = parseInt(jumpInput);
        if (p >= 1 && p <= totalPages) {
            setPageNumber(p);
            setJumpInput('');
        }
    };

    return (
        <AnimatePresence>
            <div className={`fixed inset-0 z-50 flex flex-col ${themeClass} transition-colors duration-300`}>

                {/* Reader Navigation Header */}
                <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setTocOpen(!tocOpen)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 text-xs font-semibold"
                        >
                            <Menu className="w-4 h-4" />
                            <span className="hidden sm:inline">Table of Contents</span>
                        </button>

                        <div>
                            <h2 className="font-bold text-sm truncate max-w-xs sm:max-w-md">{book.title}</h2>
                            <span className="text-[11px] opacity-70 font-mono">By {book.author} • Page {pageNumber} of {totalPages}</span>
                        </div>
                    </div>

                    {/* Controls Bar */}
                    <div className="flex items-center gap-2">

                        {/* Jump to Page Input */}
                        <form onSubmit={handleJumpPage} className="hidden md:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-xl text-xs">
                            <span className="text-[10px] opacity-70 font-mono">Go to Page:</span>
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={jumpInput}
                                onChange={(e) => setJumpInput(e.target.value)}
                                placeholder={pageNumber.toString()}
                                className="w-12 bg-transparent text-center font-mono font-bold focus:outline-none border-b border-white/30"
                            />
                        </form>

                        {/* Theme Selector */}
                        <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-white/10 text-xs">
                            <button
                                onClick={() => setThemeMode('dark')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${themeMode === 'dark' ? 'bg-indigo-600 text-white font-bold shadow' : 'opacity-70 hover:opacity-100'}`}
                            >
                                Dark
                            </button>
                            <button
                                onClick={() => setThemeMode('sepia')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${themeMode === 'sepia' ? 'bg-amber-800 text-amber-100 font-bold shadow' : 'opacity-70 hover:opacity-100'}`}
                            >
                                Sepia
                            </button>
                            <button
                                onClick={() => setThemeMode('eink')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${themeMode === 'eink' ? 'bg-slate-200 text-slate-900 font-bold shadow' : 'opacity-70 hover:opacity-100'}`}
                            >
                                E-Ink
                            </button>
                            <button
                                onClick={() => setThemeMode('cyber')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${themeMode === 'cyber' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'opacity-70 hover:opacity-100'}`}
                            >
                                Cyber
                            </button>
                        </div>

                        {/* Speech Synth */}
                        <button
                            onClick={toggleSpeech}
                            className={`p-2 rounded-xl border transition-all ${isSpeaking ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse' : 'bg-white/10 hover:bg-white/20 border-white/10'}`}
                            title="Read Aloud with Audio Speech"
                        >
                            {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                {/* Table of Contents Drawer */}
                <AnimatePresence>
                    {tocOpen && (
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            className="absolute top-14 left-0 bottom-12 w-80 bg-slate-900/95 border-r border-white/10 backdrop-blur-xl z-40 p-5 overflow-y-auto space-y-4 shadow-2xl"
                        >
                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                    <List className="w-4 h-4 text-indigo-400" />
                                    <span>Table of Contents</span>
                                </h3>
                                <button onClick={() => setTocOpen(false)} className="text-white/60 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-1">
                                {Array.from({ length: Math.ceil(totalPages / 15) }).map((_, i) => {
                                    const targetPage = i * 15 + 1;
                                    const isCurrent = Math.floor((pageNumber - 1) / 15) === i;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => { setPageNumber(targetPage); setTocOpen(false); }}
                                            className={`w-full text-left p-3 rounded-xl text-xs font-mono transition-all flex justify-between items-center ${isCurrent
                                                    ? 'bg-indigo-600 text-white font-bold shadow'
                                                    : 'hover:bg-white/10 opacity-80'
                                                }`}
                                        >
                                            <span>Chapter {i + 1}: {book.toc?.[i]?.title || `Chronicles Section ${i + 1}`}</span>
                                            <span className="opacity-60">P. {targetPage}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Book Reader Canvas */}
                <main className="flex-1 overflow-y-auto max-w-4xl w-full mx-auto p-6 sm:p-12 space-y-6 select-text">

                    <div className="text-center space-y-2 border-b border-white/10 pb-6">
                        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                            {currentPageData.chapterTitle}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-display font-black text-white">{book.title}</h1>
                        <p className="text-xs font-mono opacity-60">By {book.author}</p>
                    </div>

                    {/* Book Paragraph Content */}
                    <div className={`space-y-6 leading-relaxed ${fontClass}`} style={{ fontSize: `${fontSize}px` }}>
                        {currentPageData.paragraphs.map((p, idx) => (
                            <p key={idx} className={idx === 0 ? 'font-mono text-xs text-indigo-400 font-bold tracking-widest uppercase border-b border-indigo-500/20 pb-2' : idx === 1 ? 'font-semibold text-lg leading-relaxed first-letter:text-4xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-indigo-400' : ''}>
                                {p}
                            </p>
                        ))}
                    </div>

                </main>

                {/* Reader Footer Navigation Bar */}
                <footer className="px-6 py-3 border-t border-white/10 flex items-center justify-between gap-4 backdrop-blur-md">
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-all flex items-center gap-2 text-xs font-bold"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Page</span>
                    </button>

                    {/* Slider Navigation */}
                    <div className="flex-1 max-w-md flex items-center gap-3">
                        <span className="text-xs font-mono opacity-60">1</span>
                        <input
                            type="range"
                            min="1"
                            max={totalPages}
                            value={pageNumber}
                            onChange={(e) => setPageNumber(parseInt(e.target.value))}
                            className="flex-1 accent-indigo-500 cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold text-indigo-400">{pageNumber} / {totalPages}</span>
                    </div>

                    <button
                        disabled={pageNumber >= totalPages}
                        onClick={() => setPageNumber(p => Math.min(totalPages, p + 1))}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white transition-all flex items-center gap-2 text-xs font-bold shadow-lg shadow-indigo-600/30"
                    >
                        <span>Next Page</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </footer>

            </div>
        </AnimatePresence>
    );
}
