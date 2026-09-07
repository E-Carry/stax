import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Grid,
    List,
    Layers,
    Star,
    BookOpen,
    RefreshCw,
    Smartphone,
    CheckCircle2,
    Clock,
    UploadCloud,
    FileText,
    Sparkles,
    Plus,
    BookPlus
} from 'lucide-react';

export default function LibraryGrid({
    books,
    onAddBook,
    viewMode,
    setViewMode,
    onSelectBook,
    onReadBook,
    onConvertBook,
    onSyncBook
}) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedFormat, setSelectedFormat] = useState('All');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const categories = ['All', 'Sci-Fi', 'Cyberpunk', 'Manga', 'Audiobook', 'Technology', 'History', 'Philosophy'];
    const formats = ['All', 'EPUB', 'AZW3', 'PDF', 'CBZ', 'M4B', 'MOBI'];
    const statuses = ['All', 'Reading', 'Unread', 'Completed'];

    // Filtering Logic
    const filteredBooks = books.filter(book => {
        const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
        const statusMatch = selectedStatus === 'All' || book.readingStatus === selectedStatus;
        const formatMatch = selectedFormat === 'All' || book.format === selectedFormat;
        return categoryMatch && statusMatch && formatMatch;
    });

    // File Drag and Drop Import Processor
    const handleFiles = (files) => {
        Array.from(files).forEach((file) => {
            const ext = file.name.split('.').pop().toUpperCase();
            const format = ['EPUB', 'PDF', 'AZW3', 'MOBI', 'CBZ', 'M4B'].includes(ext) ? ext : 'PDF';
            const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";

            let category = 'Technology';
            let isManga = false;
            let isAudiobook = false;
            let cover = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";

            if (format === 'CBZ') {
                category = 'Manga';
                isManga = true;
                cover = "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80";
            } else if (format === 'M4B') {
                category = 'Audiobook';
                isAudiobook = true;
                cover = "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80";
            } else if (format === 'EPUB') {
                category = 'Literature';
                cover = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80";
            }

            const newBook = {
                id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                author: "Imported Document",
                publisher: "Local Library Import",
                publishedYear: new Date().getFullYear().toString(),
                isbn: `978-0-${Math.floor(100000000 + Math.random() * 900000000)}`,
                format,
                fileSize: sizeMB,
                pages: Math.floor(100 + Math.random() * 300),
                rating: 5.0,
                category,
                series: "User Imports",
                language: "English",
                cover,
                description: `Imported file "${file.name}" added to Stax Ultra repository.`,
                readingStatus: "Unread",
                progressPercent: 0,
                currentPage: 1,
                isManga,
                isAudiobook,
                highlights: [],
                toc: [{ title: "Chapter 1: Beginning", page: 1 }],
                content: `
# ${title}

This is the imported text content of ${file.name}. 

The Stax E-Book OS has successfully parsed, indexed, and cached this ${format} volume for instant rendering, text-to-speech, AI summarization, and device sideloading.
`
            };

            if (onAddBook) onAddBook(newBook);
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    return (
        <div className="w-full space-y-6">

            {/* Library Grid Content */}

            {/* Control Toolbar: View Toggle & Filters */}
            <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">

                {/* Category Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Right Controls: Format / Status dropdowns & View switcher */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">

                    <div className="flex items-center gap-2">
                        <select
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
                        >
                            <option value="All">Format: All</option>
                            {formats.filter(f => f !== 'All').map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="All">Status: All</option>
                            {statuses.filter(s => s !== 'All').map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* View Mode Switcher */}
                    <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            title="Grid Cards"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('3d')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === '3d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            title="3D Virtual Shelf"
                        >
                            <Layers className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            title="List View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                </div>

            </div>

            {/* Books Grid */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    <AnimatePresence>
                        {filteredBooks.map((book, idx) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                onClick={() => onSelectBook(book)}
                                className="group glass-card rounded-2xl p-3 flex flex-col justify-between cursor-pointer border border-slate-800/80 relative overflow-hidden"
                            >
                                {/* Book Cover Container */}
                                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-3 bg-slate-900">
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Format Badge */}
                                    <div className="absolute top-2 left-2 z-10">
                                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                                            {book.format}
                                        </span>
                                    </div>

                                    {/* Reading Status Pill */}
                                    <div className="absolute top-2 right-2 z-10">
                                        {book.readingStatus === 'Reading' && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 text-[10px] font-mono border border-emerald-500/40 backdrop-blur-md">
                                                <Clock className="w-3 h-3 text-emerald-400" />
                                                <span>{book.progressPercent}%</span>
                                            </span>
                                        )}
                                        {book.readingStatus === 'Completed' && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 text-[10px] font-mono border border-blue-500/40 backdrop-blur-md">
                                                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                                                <span>Done</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Quick Action Overlay */}
                                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2 p-3 z-20">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onReadBook(book); }}
                                            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/40"
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            <span>{book.isAudiobook ? 'Listen Audio' : book.isManga ? 'Read Manga' : 'Open Reader'}</span>
                                        </button>
                                        <div className="flex items-center gap-2 w-full">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onConvertBook(book); }}
                                                className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1 border border-slate-700"
                                                title="Convert Format"
                                            >
                                                <RefreshCw className="w-3.5 h-3.5" /> Convert
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onSyncBook(book); }}
                                                className="flex-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1 border border-slate-700"
                                                title="Send to Device"
                                            >
                                                <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Sync
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Metadata */}
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                        <span>{book.category}</span>
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            <Star className="w-3 h-3 fill-amber-400" />
                                            <span>{book.rating}</span>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-sm text-slate-100 line-clamp-1 group-hover:text-indigo-300 transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 truncate">
                                        {book.author}
                                    </p>

                                    {/* Progress Bar */}
                                    {book.readingStatus === 'Reading' && (
                                        <div className="pt-2">
                                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full"
                                                    style={{ width: `${book.progressPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Compact List View */}
            {viewMode === 'list' && (
                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
                    <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                            <tr>
                                <th className="p-3.5">Title & Author</th>
                                <th className="p-3.5">Format</th>
                                <th className="p-3.5">Category</th>
                                <th className="p-3.5">Size</th>
                                <th className="p-3.5">Rating</th>
                                <th className="p-3.5">Status</th>
                                <th className="p-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {filteredBooks.map((book) => (
                                <tr
                                    key={book.id}
                                    onClick={() => onSelectBook(book)}
                                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                                >
                                    <td className="p-3.5 flex items-center gap-3">
                                        <img src={book.cover} alt={book.title} className="w-8 h-12 object-cover rounded shadow" />
                                        <div>
                                            <div className="font-bold text-white text-sm">{book.title}</div>
                                            <div className="text-slate-400 text-xs">{book.author}</div>
                                        </div>
                                    </td>
                                    <td className="p-3.5 font-mono text-indigo-300 font-semibold">{book.format}</td>
                                    <td className="p-3.5 text-slate-300">{book.category}</td>
                                    <td className="p-3.5 font-mono text-slate-400">{book.fileSize}</td>
                                    <td className="p-3.5 font-mono text-amber-400">★ {book.rating}</td>
                                    <td className="p-3.5">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                                            {book.readingStatus} ({book.progressPercent}%)
                                        </span>
                                    </td>
                                    <td className="p-3.5 text-right">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => onReadBook(book)}
                                                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1"
                                            >
                                                <BookOpen className="w-3 h-3" /> Read
                                            </button>
                                            <button
                                                onClick={() => onConvertBook(book)}
                                                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                                                title="Convert"
                                            >
                                                <RefreshCw className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
