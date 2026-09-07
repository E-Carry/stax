import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    BookOpen,
    RefreshCw,
    Smartphone,
    Star,
    Share2,
    Sparkles,
    Eye,
    BookMarked
} from 'lucide-react';

export default function BookModal({ book, onClose, onRead, onConvert, onSync, onBuy, onRent, isOwned, rentalInfo }) {
    const [rotationY, setRotationY] = useState(-20);
    const [rotationX, setRotationX] = useState(10);
    const [isOpenBook, setIsOpenBook] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!book) return null;

    const handleShare = () => {
        navigator.clipboard?.writeText?.(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const stock = Number(book.stock !== undefined ? book.stock : 12);
    const price = Number(book.price || 14.99);
    const rentPrice = Number(book.rentPrice || 2.99);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/50">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs border border-indigo-500/30">
                                {book.format}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                                ISBN: {book.isbn}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1.5"
                            >
                                <Share2 className="w-4 h-4" />
                                <span>{copied ? 'Copied!' : 'Share'}</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 lg:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                        {/* 3D Book Interactive Canvas with Cover Opening Effect */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center">
                            <div
                                className="book-shelf-container cursor-grab active:cursor-grabbing my-4 relative"
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left - rect.width / 2;
                                    const y = e.clientY - rect.top - rect.height / 2;
                                    setRotationY((x / rect.width) * 50);
                                    setRotationX(-(y / rect.height) * 30);
                                }}
                                onMouseLeave={() => {
                                    setRotationY(-20);
                                    setRotationX(10);
                                }}
                            >
                                <div
                                    className="book-3d-wrapper relative w-52 sm:w-60 h-72 sm:h-84 shadow-2xl transition-transform duration-500"
                                    style={{ transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg) translateZ(10px)` }}
                                >
                                    <div className="book-spine-3d flex items-center justify-center">
                                        <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-widest -rotate-90 whitespace-nowrap">
                                            {book.title}
                                        </span>
                                    </div>

                                    <div className="book-pages-3d" />

                                    {/* Inside Pages Preview when cover swings open */}
                                    <div className="absolute inset-0 bg-amber-50 p-4 rounded-r-lg shadow-inner text-slate-900 font-serif text-[10px] space-y-2 overflow-hidden select-none">
                                        <div className="font-bold text-xs border-b border-amber-200 pb-1">{book.title}</div>
                                        <p className="line-clamp-6 opacity-80">{book.content || book.description}</p>
                                    </div>

                                    {/* Front Cover (Swings open 140deg on click) */}
                                    <div
                                        onClick={() => setIsOpenBook(!isOpenBook)}
                                        className="book-cover-3d absolute inset-0 overflow-hidden bg-slate-800 origin-left transition-transform duration-700 cursor-pointer shadow-2xl"
                                        style={{ transform: isOpenBook ? 'rotateY(-140deg)' : 'rotateY(0deg)' }}
                                    >
                                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                                        <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-1 rounded text-[9px] font-mono text-indigo-300 backdrop-blur">
                                            Click to {isOpenBook ? 'Close' : 'Open'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpenBook(!isOpenBook)}
                                className="mt-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{isOpenBook ? 'Close 3D Cover' : 'Open 3D Cover'}</span>
                            </button>
                        </div>

                        {/* Book Metadata & Synopsis */}
                        <div className="md:col-span-7 space-y-4 text-left">
                            <div>
                                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
                                    <span>{book.category}</span>
                                    {book.series && <span>• {book.series}</span>}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                                    {book.title}
                                </h2>
                                <p className="text-sm font-semibold text-slate-300">
                                    By {book.author}
                                </p>
                            </div>

                            {/* Badges Bar */}
                            <div className="flex flex-wrap items-center gap-3 py-2 border-y border-slate-800">
                                <div className="flex items-center gap-1 text-amber-400 font-mono font-bold text-sm">
                                    <Star className="w-4 h-4 fill-amber-400" />
                                    <span>{book.rating}</span>
                                </div>
                                <span className="text-slate-600">|</span>
                                <span className="text-xs font-mono text-slate-400">{book.pages} Pages</span>
                                <span className="text-slate-600">|</span>
                                <span className="text-xs font-mono text-slate-400">{book.fileSize}</span>
                                <span className="text-slate-600">|</span>
                                <span className="text-xs font-mono text-indigo-300">{book.language}</span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                {book.description}
                            </p>

                            {/* Pricing & Acquisition Options */}
                            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-slate-400">Inventory Status:</span>
                                    <span className={`font-bold ${stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {stock > 0 ? `${stock} Available in Warehouse / Cloud` : 'Out of Stock'}
                                    </span>
                                </div>

                                {isOwned ? (
                                    <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                                        <span className="font-bold">✓ Lifetime Digital License Owned</span>
                                    </div>
                                ) : rentalInfo ? (
                                    <div className="flex items-center justify-between p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                                        <span>Active Rental: {rentalInfo.daysRemaining || 7} days remaining</span>
                                        {onBuy && (
                                            <button
                                                type="button"
                                                onClick={() => { onClose(); onBuy(book); }}
                                                className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold cursor-pointer"
                                            >
                                                Upgrade to Lifetime (${price.toFixed(2)})
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        {onBuy && (
                                            <button
                                                type="button"
                                                disabled={stock <= 0}
                                                onClick={() => { onClose(); onBuy(book); }}
                                                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                                            >
                                                <span>Buy to Keep</span>
                                                <span className="font-mono text-indigo-200">(${price.toFixed(2)})</span>
                                            </button>
                                        )}

                                        {onRent && (
                                            <button
                                                type="button"
                                                disabled={stock <= 0}
                                                onClick={() => { onClose(); onRent(book); }}
                                                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                            >
                                                <span className="text-purple-400">Rent 7d</span>
                                                <span className="font-mono text-purple-300">(${rentPrice.toFixed(2)})</span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <button
                                    onClick={() => { onClose(); onRead(book); }}
                                    className="flex-1 min-w-[140px] py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>{book.isAudiobook ? 'Listen Audio' : book.isManga ? 'Read Manga' : 'Open Reader'}</span>
                                </button>

                                <button
                                    onClick={() => { onClose(); onConvert(book); }}
                                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
                                >
                                    <RefreshCw className="w-4 h-4 text-purple-400" />
                                    <span>Convert</span>
                                </button>

                                <button
                                    onClick={() => { onClose(); onSync(book); }}
                                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
                                >
                                    <Smartphone className="w-4 h-4 text-emerald-400" />
                                    <span>Sync</span>
                                </button>
                            </div>

                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
