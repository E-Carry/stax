import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Layers } from 'lucide-react';

export default function ComicMangaReaderModal({ book, onClose }) {
    const [panelIndex, setPanelIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);

    if (!book) return null;

    const panels = book.comicPanels || [book.cover];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100">

                {/* Header */}
                <header className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                    <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 font-mono text-xs border border-pink-500/30">
                            CBZ MANGA
                        </span>
                        <h2 className="font-bold text-sm">{book.title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
                            <button onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))} className="p-1 hover:bg-slate-700 rounded"><ZoomOut className="w-4 h-4" /></button>
                            <span className="text-xs font-mono px-2">{Math.round(zoomLevel * 100)}%</span>
                            <button onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))} className="p-1 hover:bg-slate-700 rounded"><ZoomIn className="w-4 h-4" /></button>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Comic Canvas */}
                <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center relative">
                    <motion.img
                        key={panelIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: zoomLevel }}
                        transition={{ duration: 0.3 }}
                        src={panels[panelIndex]}
                        alt={`Panel ${panelIndex + 1}`}
                        className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-slate-800"
                    />

                    {/* Nav Controls */}
                    {panelIndex > 0 && (
                        <button
                            onClick={() => setPanelIndex(panelIndex - 1)}
                            className="absolute left-6 p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-2xl transition-all"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    {panelIndex < panels.length - 1 && (
                        <button
                            onClick={() => setPanelIndex(panelIndex + 1)}
                            className="absolute right-6 p-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-2xl transition-all"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Footer Panel Flipper */}
                <footer className="px-6 py-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400 bg-slate-900">
                    <span>Panel {panelIndex + 1} of {panels.length}</span>
                    <div className="flex items-center gap-2">
                        {panels.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPanelIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${panelIndex === idx ? 'bg-pink-500 scale-125' : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                </footer>

            </div>
        </AnimatePresence>
    );
}
