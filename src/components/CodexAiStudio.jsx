import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Sparkles,
    MessageSquare,
    BookOpen,
    Send,
    HelpCircle,
    Layers,
    CheckCircle2,
    Volume2,
    VolumeX,
    RotateCw,
    Award,
    ChevronRight,
    UserCheck
} from 'lucide-react';

const MOCK_FLASHCARDS = {
    'stax-001': [
        { q: "What is the primary commodity produced exclusively on Arrakis?", a: "The Spice Melange - essential for interstellar space navigation & human longevity." },
        { q: "What is the Bene Gesserit 'Litany Against Fear'?", a: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration." },
        { q: "Who is the ruler of House Atreides at the beginning of Dune?", a: "Duke Leto Atreides, father of Paul Atreides." },
        { q: "What giant indigenous creature inhabits the deep deserts of Arrakis?", a: "The Sandworms (Shai-Hulud), who produce the spice." }
    ],
    'stax-002': [
        { q: "What was Case's former profession before his nervous system was damaged?", a: "He was a high-stakes console cowboy (matrix hacker)." },
        { q: "What is the famous opening line of Neuromancer?", a: "The sky above the port was the color of television, tuned to a dead channel." },
        { q: "Who hires Case for the heist mission?", a: "Armitage, a mysterious former military officer with a hidden past." }
    ]
};

const MOCK_CHARACTERS = {
    'stax-001': [
        { name: "Paul Atreides", role: "Protagonist / Muad'Dib", faction: "House Atreides", quote: "My road leads into the desert." },
        { name: "Lady Jessica", role: "Bene Gesserit Initiate", faction: "Bene Gesserit / Atreides", quote: "The witch's blood runs deep." },
        { name: "Duke Leto Atreides", role: "Ruler of Caladan", faction: "House Atreides", quote: "A process cannot be understood by stopping it." },
        { name: "Baron Vladimir Harkonnen", role: "Arch-enemy", faction: "House Harkonnen", quote: "He who controls the spice controls the universe." }
    ],
    'stax-002': [
        { name: "Henry Dorsett Case", role: "Matrix Hacker", faction: "Console Cowboys", quote: "Looking for a ghost or a miracle." },
        { name: "Molly Millions", role: "Razorgirl Bodyguard", faction: "Street Samurai", quote: "I got scalpels under my fingernails." }
    ]
};

export default function CodexAiStudio({ books }) {
    const [selectedBook, setSelectedBook] = useState(books[0] || null);
    const [activeMode, setActiveMode] = useState('summary'); // summary, qa, quiz, characters

    // Q&A State
    const [chatMessages, setChatMessages] = useState([
        { sender: 'ai', text: `Greetings! Stax Codex AI Engine initialized for "${books[0]?.title}". What aspect of this volume would you like to analyze?` }
    ]);
    const [inputQuery, setInputQuery] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    // Flashcards State
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [score, setScore] = useState(0);

    // Speech synthesis
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Chapter Accordion
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);

    const currentCards = MOCK_FLASHCARDS[selectedBook?.id] || [
        { q: `What is the core theme of ${selectedBook?.title}?`, a: `Explores ${selectedBook?.category} through deep character agency and world-building.` },
        { q: `Who is the author of ${selectedBook?.title}?`, a: `${selectedBook?.author}, published in ${selectedBook?.publishedYear}.` }
    ];

    const currentCharacters = MOCK_CHARACTERS[selectedBook?.id] || [
        { name: "Protagonist", role: "Lead Character", faction: "Main Cast", quote: "Navigating the central conflict." },
        { name: "Antagonist", role: "Rival Faction", faction: "Opposition", quote: "Challenging the status quo." }
    ];

    const handleSelectBook = (book) => {
        setSelectedBook(book);
        setChatMessages([
            { sender: 'ai', text: `Re-indexed vector embeddings for "${book.title}". How can I assist your study?` }
        ]);
        setCardIndex(0);
        setIsFlipped(false);
    };

    const handleSendMessage = (customText) => {
        const textToSend = customText || inputQuery;
        if (!textToSend.trim()) return;

        const userMsg = { sender: 'user', text: textToSend };
        setChatMessages(prev => [...prev, userMsg]);
        if (!customText) setInputQuery('');
        setIsThinking(true);

        setTimeout(() => {
            let aiResponse = `[Codex AI analysis of ${selectedBook.title}]: `;
            const queryLower = textToSend.toLowerCase();

            if (queryLower.includes('summary') || queryLower.includes('about')) {
                aiResponse += selectedBook.description;
            } else if (queryLower.includes('author') || queryLower.includes('wrote')) {
                aiResponse += `${selectedBook.title} was written by ${selectedBook.author} and published in ${selectedBook.publishedYear}.`;
            } else if (queryLower.includes('fear') || queryLower.includes('spice')) {
                aiResponse += `The spice melange is the foundational currency of Dune, granting extended life and prescience to navigators. The Bene Gesserit use psychological litanies to conquer fear.`;
            } else {
                aiResponse += `Analyzing key themes in ${selectedBook.category}. This volume balances structural narrative arcs with detailed world exposition. Would you like to review flashcards or character relationships?`;
            }

            setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
            setIsThinking(false);
        }, 800);
    };

    const toggleTtsSummary = () => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                const textToRead = `${selectedBook.title} by ${selectedBook.author}. ${selectedBook.description}`;
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.onend = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Bot className="w-6 h-6 text-pink-400 animate-pulse" />
                            <h2 className="text-2xl font-display font-black text-white">Stax Codex AI Engine</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Deep Neural Summarization, Contextual Q&A Chat, Flashcard Deck & Character Relationship Maps
                        </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-mono text-xs border border-pink-500/30 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Codex Neural v4.0
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Controls Column */}
                <div className="lg:col-span-5 space-y-4">

                    {/* Target Volume Dropdown */}
                    <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                        <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">Select Target Volume</span>
                        <select
                            value={selectedBook?.id}
                            onChange={(e) => {
                                const b = books.find(item => item.id === e.target.value);
                                if (b) handleSelectBook(b);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                        >
                            {books.map(b => (
                                <option key={b.id} value={b.id}>{b.title} ({b.category})</option>
                            ))}
                        </select>
                    </div>

                    {/* Analysis Toolset Navigation */}
                    <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">Analysis Toolset</span>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setActiveMode('summary')}
                                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeMode === 'summary' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 font-bold' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                                    }`}
                            >
                                <Sparkles className="w-4 h-4" /> Summary
                            </button>

                            <button
                                onClick={() => setActiveMode('qa')}
                                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeMode === 'qa' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 font-bold' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                                    }`}
                            >
                                <MessageSquare className="w-4 h-4" /> AI Chat Q&A
                            </button>

                            <button
                                onClick={() => setActiveMode('quiz')}
                                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeMode === 'quiz' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 font-bold' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                                    }`}
                            >
                                <HelpCircle className="w-4 h-4" /> Flashcards
                            </button>

                            <button
                                onClick={() => setActiveMode('characters')}
                                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeMode === 'characters' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30 font-bold' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                                    }`}
                            >
                                <Layers className="w-4 h-4" /> Character Map
                            </button>
                        </div>
                    </div>

                    {/* Quick Book Meta Card */}
                    <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                        <img src={selectedBook?.cover} alt="" className="w-12 h-16 object-cover rounded-lg shadow" />
                        <div className="text-xs space-y-1">
                            <div className="font-bold text-white leading-tight">{selectedBook?.title}</div>
                            <div className="text-slate-400 font-mono">By {selectedBook?.author}</div>
                            <div className="text-pink-400 font-mono text-[10px]">{selectedBook?.pages} Pages • {selectedBook?.format}</div>
                        </div>
                    </div>
                </div>

                {/* Right Output Column */}
                <div className="lg:col-span-7 space-y-4">

                    {/* MODE 1: Executive Summary */}
                    {activeMode === 'summary' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-pink-400" />
                                    Executive Summary: {selectedBook?.title}
                                </h3>
                                <button
                                    onClick={toggleTtsSummary}
                                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${isSpeaking ? 'bg-emerald-500 text-white animate-pulse border-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                                        }`}
                                >
                                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                    <span>{isSpeaking ? 'Stop Audio' : 'Listen Summary'}</span>
                                </button>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                {selectedBook?.description}
                            </p>

                            {/* Key Takeaways */}
                            <div className="space-y-3 pt-3 border-t border-slate-800">
                                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">Key Analytical Takeaways</span>
                                <div className="space-y-2">
                                    {[
                                        `Core narrative tension revolves around ${selectedBook?.category} principles.`,
                                        `Explores psychological resilience, strategic foresight, and character agency.`,
                                        `Synthesizes structural world-building with high-stakes decision points.`
                                    ].map((takeaway, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{takeaway}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chapter Summarizer Accordion */}
                            {selectedBook?.toc?.length > 0 && (
                                <div className="space-y-3 pt-3 border-t border-slate-800">
                                    <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">Chapter AI Breakdown</span>
                                    <div className="space-y-2">
                                        {selectedBook.toc.map((chapter, idx) => (
                                            <div key={idx} className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/80">
                                                <button
                                                    onClick={() => setActiveChapterIndex(idx)}
                                                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-200 hover:bg-slate-800 flex justify-between items-center"
                                                >
                                                    <span>{chapter.title}</span>
                                                    <span className="font-mono text-[10px] text-slate-400">p. {chapter.page}</span>
                                                </button>
                                                {activeChapterIndex === idx && (
                                                    <div className="p-3 bg-slate-950 text-[11px] text-slate-300 space-y-1 border-t border-slate-800">
                                                        <p>AI Chapter Insights: Introduces key themes and pivotal character dialogue establishing the central stakes.</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* MODE 2: AI Chat Q&A */}
                    {activeMode === 'qa' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between h-[450px]">

                            {/* Suggested Questions Bar */}
                            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
                                <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap self-center">Prompts:</span>
                                {[
                                    "What is the main plot?",
                                    "Explain key themes",
                                    "Who is the protagonist?"
                                ].map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(prompt)}
                                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white text-[11px] whitespace-nowrap border border-slate-800 transition-colors"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>

                            {/* Chat Thread */}
                            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-none">
                                {chatMessages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white font-medium' : 'bg-slate-900 border border-slate-800 text-slate-200'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isThinking && (
                                    <div className="flex items-center gap-2 text-xs font-mono text-pink-400 animate-pulse">
                                        <Bot className="w-4 h-4" /> Stax Codex AI is analyzing embeddings...
                                    </div>
                                )}
                            </div>

                            {/* Chat Input */}
                            <div className="flex gap-2 pt-2 border-t border-slate-800">
                                <input
                                    type="text"
                                    value={inputQuery}
                                    onChange={(e) => setInputQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={`Ask anything about ${selectedBook?.title}...`}
                                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                                />
                                <button onClick={() => handleSendMessage()} className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-pink-600/30">
                                    <Send className="w-3.5 h-3.5" /> Send
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* MODE 3: Interactive Study Flashcards */}
                    {activeMode === 'quiz' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                                    Flashcard {cardIndex + 1} of {currentCards.length}
                                </span>
                                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                                    <Award className="w-4 h-4" /> Score: {score}
                                </span>
                            </div>

                            {/* Flip Card Canvas */}
                            <div
                                onClick={() => setIsFlipped(!isFlipped)}
                                className="w-full min-h-[180px] p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-pink-500/50 cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-3 relative group"
                            >
                                {!isFlipped ? (
                                    <>
                                        <HelpCircle className="w-8 h-8 text-pink-400 mb-1 animate-bounce" />
                                        <h4 className="text-sm font-bold text-white max-w-md">
                                            {currentCards[cardIndex]?.q}
                                        </h4>
                                        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest pt-2">
                                            Click Card to Flip & Reveal Answer
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-1" />
                                        <p className="text-xs font-medium text-emerald-300 leading-relaxed max-w-md">
                                            {currentCards[cardIndex]?.a}
                                        </p>
                                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pt-2">
                                            Click to flip back to question
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="flex justify-between items-center pt-2">
                                <button
                                    disabled={cardIndex === 0}
                                    onClick={() => { setCardIndex(p => Math.max(0, p - 1)); setIsFlipped(false); }}
                                    className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white disabled:opacity-40"
                                >
                                    ← Previous
                                </button>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setScore(score + 1); setIsFlipped(false); setCardIndex(p => (p + 1) % currentCards.length); }}
                                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                                    >
                                        Got it Right (+1)
                                    </button>
                                </div>

                                <button
                                    onClick={() => { setCardIndex(p => (p + 1) % currentCards.length); setIsFlipped(false); }}
                                    className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
                                >
                                    Next Card →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* MODE 4: Character Map */}
                    {activeMode === 'characters' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                                Character Relationship Graph: {selectedBook?.title}
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {currentCharacters.map((char, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-indigo-500/40 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h5 className="font-bold text-xs text-white">{char.name}</h5>
                                                <span className="text-[10px] font-mono text-pink-400">{char.role}</span>
                                            </div>
                                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                {char.faction}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-300 italic border-l-2 border-slate-700 pl-2">
                                            "{char.quote}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
}
