import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ArrowUpRight, Star, RefreshCw } from 'lucide-react';

export default function Bookshelf3D({ books, onSelectBook, onReadBook, onConvertBook }) {
    return (
        <div className="w-full bg-slate-900/80 rounded-3xl border border-slate-800 p-6 lg:p-8 my-6 shadow-2xl relative overflow-hidden">
            {/* Background Lighting */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        <h2 className="text-xl font-display font-bold text-white tracking-wide">
                            Virtual 3D Bookshelf Perspective
                        </h2>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                        Hover over volumes to tilt spine and inspect 3D page geometry
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-time Raytracing FX</span>
                </div>
            </div>

            {/* 3D Shelf Container */}
            <div className="book-shelf-container relative py-12 px-4 overflow-x-auto scrollbar-none flex gap-8 sm:gap-12 items-end justify-start min-h-[360px]">
                {books.map((book, index) => (
                    <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative flex-shrink-0 cursor-pointer"
                        onClick={() => onSelectBook(book)}
                    >
                        {/* 3D Book Object */}
                        <div className="book-3d-wrapper relative w-44 sm:w-48 h-64 sm:h-72">

                            {/* Spine (Shown in 3D rotate) */}
                            <div className="book-spine-3d flex items-center justify-center overflow-hidden">
                                <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest -rotate-90 whitespace-nowrap px-2">
                                    {book.title}
                                </span>
                            </div>

                            {/* Pages edge */}
                            <div className="book-pages-3d" />

                            {/* Front Cover */}
                            <div className="book-cover-3d relative w-full h-full overflow-hidden bg-slate-800">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Format Badge Overlay */}
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded bg-slate-950/80 text-indigo-300 border border-indigo-500/40 backdrop-blur-md">
                                        {book.format}
                                    </span>
                                </div>

                                {/* Rating Badge */}
                                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 text-[10px] font-mono border border-amber-500/30 backdrop-blur-md">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    <span>{book.rating}</span>
                                </div>

                                {/* Bottom Shadow Gradient & Title Overlay */}
                                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex flex-col justify-end">
                                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                                        {book.category}
                                    </span>
                                    <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                                        {book.title}
                                    </h3>
                                    <span className="text-[11px] text-slate-400 truncate">
                                        {book.author}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shelf Wood / Metallic Beam Base */}
                        <div className="absolute -bottom-6 inset-x-[-16px] h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg shadow-xl border-t border-slate-600/50 flex items-center justify-center">
                            <div className="w-1/3 h-[2px] bg-indigo-500/40 rounded-full" />
                        </div>

                        {/* Quick Action Overlay on Hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-indigo-500/40 shadow-2xl backdrop-blur-lg z-30">
                            <button
                                onClick={(e) => { e.stopPropagation(); onReadBook(book); }}
                                className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow"
                                title="Read Now"
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onConvertBook(book); }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1 border border-slate-700"
                                title="Convert Format"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
