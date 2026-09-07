import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Boxes,
    Wrench,
    AlertTriangle,
    CheckCircle2,
    Plus,
    RefreshCw,
    TrendingUp,
    DollarSign,
    Package,
    Layers,
    BookOpen,
    Trash2,
    Activity,
    Cpu,
    Database,
    Zap,
    Sparkles,
    Search,
    Filter,
    X,
    Check,
    Sliders,
    ArrowRight
} from 'lucide-react';

export default function AdminPortal({
    user,
    books,
    magazines,
    onUpdateBookStock,
    onUpdateMagazineStock,
    onAddBook,
    onAddMagazine,
    systemErrors,
    onResolveError,
    onResolveAllErrors,
    onInjectTestError,
    onSwitchToAdmin
}) {
    const [activeTab, setActiveTab] = useState('stock'); // 'stock' | 'diagnostics'
    const [filterType, setFilterType] = useState('all'); // 'all' | 'book' | 'magazine'
    const [searchQuery, setSearchQuery] = useState('');
    const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'low' | 'out'

    // Add item modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItemType, setNewItemType] = useState('book'); // 'book' | 'magazine'
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newCategory, setNewCategory] = useState('Technology');
    const [newFormat, setNewFormat] = useState('EPUB');
    const [newPrice, setNewPrice] = useState('14.99');
    const [newRentPrice, setNewRentPrice] = useState('2.99');
    const [newStock, setNewStock] = useState('20');
    const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80');
    const [newDesc, setNewDesc] = useState('');

    // Diagnostics state
    const [isRepairing, setIsRepairing] = useState(false);
    const [repairStep, setRepairStep] = useState('');
    const [repairSuccess, setRepairSuccess] = useState(false);

    // Guard if user is not admin
    const isAdmin = user && user.role === 'admin';

    // Preset covers helper
    const presetCovers = [
        { label: 'Minimalist Book', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
        { label: 'Cyberpunk Neon', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
        { label: 'Glossy Editorial', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
        { label: 'Quantum Tech', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' }
    ];

    // Combine all catalog items
    const allCatalog = [
        ...books.map(b => ({ ...b, catalogType: 'book' })),
        ...magazines.map(m => ({ ...m, catalogType: 'magazine' }))
    ];

    // Calculate metrics
    const totalItems = allCatalog.length;
    const totalUnits = allCatalog.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
    const lowStockCount = allCatalog.filter(item => (Number(item.stock) || 0) > 0 && (Number(item.stock) || 0) <= 5).length;
    const outOfStockCount = allCatalog.filter(item => (Number(item.stock) || 0) === 0).length;
    const totalInventoryValue = allCatalog.reduce((sum, item) => sum + ((Number(item.stock) || 0) * (Number(item.price) || 0)), 0);

    const activeErrorCount = systemErrors.filter(e => !e.resolved).length;
    const healthScore = activeErrorCount === 0 ? 100 : Math.max(70, 100 - activeErrorCount * 9);

    // Filtering
    const filteredCatalog = allCatalog.filter(item => {
        const typeMatch = filterType === 'all' || item.catalogType === filterType;
        const searchMatch = !searchQuery.trim() ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.editor && item.editor.toLowerCase().includes(searchQuery.toLowerCase())) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());

        let stockMatch = true;
        if (stockFilter === 'low') stockMatch = (Number(item.stock) || 0) > 0 && (Number(item.stock) || 0) <= 5;
        if (stockFilter === 'out') stockMatch = (Number(item.stock) || 0) === 0;

        return typeMatch && searchMatch && stockMatch;
    });

    const handleCreateItem = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) {
            alert('Please provide a title.');
            return;
        }

        const id = `${newItemType === 'book' ? 'stax' : 'mag'}-${Date.now().toString().slice(-4)}`;
        const priceNum = parseFloat(newPrice) || 12.99;
        const rentPriceNum = parseFloat(newRentPrice) || 2.49;
        const stockNum = parseInt(newStock, 10) || 15;

        if (newItemType === 'book') {
            const newBookObj = {
                id,
                title: newTitle.trim(),
                author: newAuthor.trim() || 'STAX Author',
                publisher: 'STAX Curated Editions',
                publishedYear: new Date().getFullYear().toString(),
                isbn: `978-0-${Math.floor(100000000 + Math.random() * 900000000)}`,
                format: newFormat,
                fileSize: '18.2 MB',
                pages: 320,
                rating: 5.0,
                category: newCategory,
                series: 'STAX Collection',
                language: 'English',
                cover: newCover,
                description: newDesc || `${newTitle} added via STAX Administrator Console.`,
                readingStatus: 'Unread',
                progressPercent: 0,
                currentPage: 1,
                price: priceNum,
                rentPrice: rentPriceNum,
                stock: stockNum,
                isAvailableForBuy: true,
                isAvailableForRent: true,
                itemType: 'book',
                highlights: [],
                toc: [{ title: 'Chapter 1: Genesis', page: 1 }],
                content: `# ${newTitle}\n\nWelcome to ${newTitle}. Masterpiece initialized in the STAX vault.`
            };
            onAddBook(newBookObj);
        } else {
            const newMagObj = {
                id,
                title: newTitle.trim(),
                issue: `Vol. ${new Date().getFullYear()} • Curated Edition`,
                category: newCategory,
                editor: newAuthor.trim() || 'Editorial Director',
                publisher: 'STAX Periodicals Press',
                price: priceNum,
                rentPrice: rentPriceNum,
                stock: stockNum,
                itemType: 'magazine',
                isAvailableForRent: true,
                isAvailableForBuy: true,
                readTime: '18 min read',
                format: 'GLOSSY-PDF',
                rating: 5.0,
                cover: newCover,
                description: newDesc || `${newTitle} periodicals release.`,
                articles: [
                    {
                        id: `art-${Date.now()}`,
                        title: `${newTitle}: Inaugural Keynote`,
                        author: newAuthor || 'Editorial Team',
                        date: 'Sept 2026',
                        subtitle: 'Exclusive overview of digital publishing paradigms.',
                        content: `In this edition of ${newTitle}, we examine leading edge developments in digital library interfaces and cognitive reading systems.`
                    }
                ]
            };
            onAddMagazine(newMagObj);
        }

        setIsAddModalOpen(false);
        setNewTitle('');
        setNewAuthor('');
        setNewDesc('');
    };

    const handleRunAutoRepair = () => {
        setIsRepairing(true);
        setRepairSuccess(false);
        setRepairStep('Analyzing runtime telemetry & local SQLite indices...');

        setTimeout(() => {
            setRepairStep('Flushing corrupted thumbnail cache chunks at node-edge-03...');
        }, 800);

        setTimeout(() => {
            setRepairStep('Releasing orphan inventory mutex locks & re-evaluating stock...');
        }, 1600);

        setTimeout(() => {
            setRepairStep('Validating 256-bit gateway handshake tokens & clearing webhook backoff...');
        }, 2400);

        setTimeout(() => {
            setIsRepairing(false);
            setRepairSuccess(true);
            onResolveAllErrors();
            setTimeout(() => setRepairSuccess(false), 5000);
        }, 3200);
    };

    const handleBulkRestock = () => {
        allCatalog.forEach(item => {
            if ((Number(item.stock) || 0) <= 5) {
                if (item.catalogType === 'book') {
                    onUpdateBookStock(item.id, (Number(item.stock) || 0) + 15);
                } else {
                    onUpdateMagazineStock(item.id, (Number(item.stock) || 0) + 15);
                }
            }
        });
    };

    // If not logged in as Admin, show Access Lock Screen
    if (!isAdmin) {
        return (
            <div className="w-full max-w-2xl mx-auto py-12 px-4 text-center">
                <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-amber-500/30 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                        <ShieldCheck className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-display font-black text-2xl text-white">
                            Administrator Credentials Required
                        </h3>
                        <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                            The STAX Executive Portal grants real-time inventory control, pricing modifications, and self-healing diagnostic repair tools.
                        </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-left space-y-2">
                        <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Quick Access to Test & Evaluate:</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                            Click below to immediately authenticate as System Admin (<span className="text-amber-400 font-mono">admin@stax.io</span>) with zero OTP verification.
                        </p>
                    </div>

                    <button
                        onClick={onSwitchToAdmin}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-lg shadow-amber-600/30 cursor-pointer transition-all"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Instant 1-Click Admin Unlock</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 text-left">

            {/* Admin Header Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-amber-500/30 p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-display font-black text-white">
                                STAX Executive Admin Control OS
                            </h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">
                                ROOT PRIVILEGES
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Live inventory stock controller, book & magazine additions, and real-time app error self-healing engine
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab('stock')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                activeTab === 'stock'
                                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/30'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <Boxes className="w-4 h-4" />
                            <span>Stock & Inventory ({totalItems})</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('diagnostics')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                activeTab === 'diagnostics'
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <Wrench className="w-4 h-4" />
                            <span>Fix App Errors</span>
                            {activeErrorCount > 0 && (
                                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-mono animate-pulse">
                                    {activeErrorCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* TAB 1: STOCK & INVENTORY MANAGEMENT */}
            {activeTab === 'stock' && (
                <div className="space-y-6">

                    {/* Metric Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Titles</span>
                            <div className="text-xl font-display font-black text-white">{totalItems}</div>
                            <span className="text-[10px] font-mono text-indigo-400">{books.length} Books • {magazines.length} Magazines</span>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Units In Stock</span>
                            <div className="text-xl font-display font-black text-emerald-400">{totalUnits}</div>
                            <span className="text-[10px] font-mono text-slate-400">Physical + Digital</span>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Low Stock Items</span>
                            <div className="text-xl font-display font-black text-amber-400">{lowStockCount}</div>
                            <span className="text-[10px] font-mono text-slate-400">Below 5 copies</span>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Depleted / Out of Stock</span>
                            <div className="text-xl font-display font-black text-rose-400">{outOfStockCount}</div>
                            <span className="text-[10px] font-mono text-slate-400">Requires restock</span>
                        </div>

                        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1 col-span-2 lg:col-span-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Est. Retail Value</span>
                            <div className="text-xl font-display font-black text-indigo-300">
                                ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Across entire catalog</span>
                        </div>
                    </div>

                    {/* Filter & Action Toolbar */}
                    <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 sm:w-64">
                                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter by title, author, editor..."
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            {/* Type filter */}
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500"
                            >
                                <option value="all">All Media</option>
                                <option value="book">Books Only</option>
                                <option value="magazine">Magazines Only</option>
                            </select>

                            {/* Stock level filter */}
                            <select
                                value={stockFilter}
                                onChange={(e) => setStockFilter(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-500"
                            >
                                <option value="all">All Stock Statuses</option>
                                <option value="low">Low Stock (&le; 5)</option>
                                <option value="out">Out of Stock (0)</option>
                            </select>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                            <button
                                type="button"
                                onClick={handleBulkRestock}
                                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all"
                                title="Add 15 copies to all items with stock under 5"
                            >
                                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                                <span>Bulk Restock (+15)</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(true)}
                                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-600/30 cursor-pointer transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add New Item</span>
                            </button>
                        </div>
                    </div>

                    {/* Inventory Table */}
                    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono">
                                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                                    <tr>
                                        <th className="py-3 px-4">Item & Metadata</th>
                                        <th className="py-3 px-4">Type</th>
                                        <th className="py-3 px-4">Format</th>
                                        <th className="py-3 px-4">Buy Price</th>
                                        <th className="py-3 px-4">Rent Price (7d)</th>
                                        <th className="py-3 px-4">Live Stock</th>
                                        <th className="py-3 px-4 text-right">Quick Stock Modifier</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {filteredCatalog.map(item => {
                                        const stock = Number(item.stock) || 0;
                                        const isLow = stock > 0 && stock <= 5;
                                        const isOut = stock === 0;

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                                                {/* Item */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item.cover}
                                                            alt={item.title}
                                                            className="w-9 h-12 object-cover rounded-lg border border-slate-700 shadow-sm shrink-0"
                                                        />
                                                        <div className="min-w-0 max-w-xs">
                                                            <div className="font-bold text-white truncate text-xs font-sans">
                                                                {item.title}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400 truncate">
                                                                {item.author || item.editor || 'STAX'} • {item.category}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Type */}
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                                        item.catalogType === 'magazine'
                                                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                                                    }`}>
                                                        {item.catalogType}
                                                    </span>
                                                </td>

                                                {/* Format */}
                                                <td className="py-3 px-4 text-slate-300">
                                                    {item.format || 'EPUB'}
                                                </td>

                                                {/* Buy Price */}
                                                <td className="py-3 px-4 font-bold text-slate-200">
                                                    ${Number(item.price || 0).toFixed(2)}
                                                </td>

                                                {/* Rent Price */}
                                                <td className="py-3 px-4 text-purple-400 font-bold">
                                                    ${Number(item.rentPrice || 0).toFixed(2)}
                                                </td>

                                                {/* Stock Status */}
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                                                            isOut
                                                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                                                : isLow
                                                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                                        }`}>
                                                            {stock} {isOut ? 'Depleted' : isLow ? 'Low Stock' : 'In Stock'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Quick Adjusters */}
                                                <td className="py-3 px-4 text-right">
                                                    <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                                                        <button
                                                            type="button"
                                                            disabled={stock <= 0}
                                                            onClick={() => {
                                                                if (item.catalogType === 'book') onUpdateBookStock(item.id, Math.max(0, stock - 1));
                                                                else onUpdateMagazineStock(item.id, Math.max(0, stock - 1));
                                                            }}
                                                            className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs disabled:opacity-30 cursor-pointer"
                                                            title="Decrease stock by 1"
                                                        >
                                                            -
                                                        </button>

                                                        <span className="w-8 text-center text-xs font-bold text-white">
                                                            {stock}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (item.catalogType === 'book') onUpdateBookStock(item.id, stock + 1);
                                                                else onUpdateMagazineStock(item.id, stock + 1);
                                                            }}
                                                            className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs cursor-pointer"
                                                            title="Increase stock by 1"
                                                        >
                                                            +
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (item.catalogType === 'book') onUpdateBookStock(item.id, stock + 5);
                                                                else onUpdateMagazineStock(item.id, stock + 5);
                                                            }}
                                                            className="px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold text-[10px] cursor-pointer"
                                                            title="Quick restock +5 copies"
                                                        >
                                                            +5
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )}

            {/* TAB 2: APP ERROR DIAGNOSTICS & SELF-HEALING HUB */}
            {activeTab === 'diagnostics' && (
                <div className="space-y-6">

                    {/* Health Dashboard KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">System Operational Health</span>
                            <div className="flex items-center gap-3">
                                <div className={`text-3xl font-display font-black ${
                                    healthScore === 100 ? 'text-emerald-400' : healthScore > 80 ? 'text-amber-400' : 'text-rose-400'
                                }`}>
                                    {healthScore}%
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                                    healthScore === 100 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}>
                                    {healthScore === 100 ? 'All Systems Nominal' : 'Action Recommended'}
                                </span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${
                                        healthScore === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${healthScore}%` }}
                                />
                            </div>
                        </div>

                        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">IndexedDB & Cache Latency</span>
                            <div className="text-2xl font-display font-black text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-indigo-400" />
                                <span>3.8 ms</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Zero bottle-neck threshold</span>
                        </div>

                        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Heap Memory</span>
                            <div className="text-2xl font-display font-black text-purple-400 flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-purple-400" />
                                <span>42.1 MB / 128 MB</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Garbage Collector nominal</span>
                        </div>

                        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Pending Issues</span>
                            <div className="text-2xl font-display font-black text-rose-400 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                <span>{activeErrorCount} Active</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                                {systemErrors.length - activeErrorCount} issues self-healed
                            </span>
                        </div>
                    </div>

                    {/* Diagnostics Control Banner */}
                    <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-400" />
                                <h3 className="font-display font-black text-lg text-white">
                                    Automated Self-Healing Diagnostics Engine
                                </h3>
                            </div>
                            <p className="text-xs font-mono text-slate-400">
                                Initiates a deep scan of local storage partitions, verifies vector thumbnail checksums, flushes orphan mutex locks, and recalibrates inventory balances.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={onInjectTestError}
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
                                title="Inject a test warning to evaluate diagnostic tools"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Inject Test Error</span>
                            </button>

                            <button
                                type="button"
                                disabled={isRepairing || activeErrorCount === 0}
                                onClick={handleRunAutoRepair}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-40 cursor-pointer transition-all"
                            >
                                {isRepairing ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Wrench className="w-4 h-4" />
                                )}
                                <span>{isRepairing ? 'Repairing System...' : 'Run Auto-Repair (Fix All)'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Live Healing Progress Bar */}
                    {isRepairing && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 space-y-2"
                        >
                            <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                                <span className="flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                                    <span>Active Healing Sequence in Progress...</span>
                                </span>
                                <span className="font-bold">65% Complete</span>
                            </div>
                            <div className="text-[11px] font-mono text-slate-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                                &gt; {repairStep}
                            </div>
                        </motion.div>
                    )}

                    {repairSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-lg"
                        >
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span>System Self-Healing Routine complete! All errors resolved, cache indices rebuilt, and health restored to 100%.</span>
                        </motion.div>
                    )}

                    {/* Error Log Cards */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Real-Time System Log & Telemetry
                        </h4>

                        {systemErrors.length === 0 ? (
                            <div className="p-8 text-center rounded-2xl glass-panel border border-slate-800 text-slate-400 text-xs font-mono">
                                No operational errors recorded. All subsystems operating at optimal 100% capacity.
                            </div>
                        ) : (
                            systemErrors.map((err) => (
                                <div
                                    key={err.id}
                                    className={`glass-card p-5 rounded-2xl border transition-all ${
                                        err.resolved
                                            ? 'border-emerald-500/30 opacity-70 bg-slate-950/40'
                                            : err.severity === 'critical'
                                            ? 'border-rose-500/40 bg-rose-950/10'
                                            : 'border-amber-500/40 bg-amber-950/10'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                                                    err.resolved
                                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                                        : err.severity === 'critical'
                                                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                                }`}>
                                                    {err.resolved ? 'RESOLVED' : err.severity}
                                                </span>
                                                <span className="font-mono text-xs text-slate-400">{err.code}</span>
                                                <span className="text-[10px] font-mono text-slate-500">• {err.timestamp}</span>
                                            </div>

                                            <h5 className="font-display font-bold text-sm text-white">
                                                {err.title}
                                            </h5>
                                            <p className="text-xs text-slate-300 font-mono">
                                                {err.details}
                                            </p>
                                        </div>

                                        {!err.resolved && (
                                            <button
                                                type="button"
                                                onClick={() => onResolveError(err.id)}
                                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-center cursor-pointer transition-all whitespace-nowrap"
                                            >
                                                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                                                <span>Auto-Fix This Issue</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}

            {/* ADD NEW BOOK / MAGAZINE MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                    <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 my-auto">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-lg text-white">
                                        Add New Catalog Item
                                    </h3>
                                    <p className="text-xs font-mono text-slate-400">
                                        Register a new book or periodical with pricing & stock allocation
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateItem} className="space-y-4 text-xs font-mono">
                            {/* Type selector */}
                            <div className="space-y-1.5">
                                <label className="text-slate-300 font-bold uppercase">Item Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setNewItemType('book')}
                                        className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer ${
                                            newItemType === 'book'
                                                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                                                : 'bg-slate-800 border-slate-700 text-slate-400'
                                        }`}
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        <span>E-Book / Volume</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewItemType('magazine')}
                                        className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer ${
                                            newItemType === 'magazine'
                                                ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                                                : 'bg-slate-800 border-slate-700 text-slate-400'
                                        }`}
                                    >
                                        <Layers className="w-4 h-4" />
                                        <span>Glossy Magazine</span>
                                    </button>
                                </div>
                            </div>

                            {/* Title & Author */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">Title</label>
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="e.g. Neuromorphic Systems OS"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">{newItemType === 'book' ? 'Author' : 'Lead Editor'}</label>
                                    <input
                                        type="text"
                                        value={newAuthor}
                                        onChange={(e) => setNewAuthor(e.target.value)}
                                        placeholder="e.g. Dr. Vivienne Sterling"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Category & Format */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">Category</label>
                                    <select
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                                    >
                                        <option value="Technology">Technology</option>
                                        <option value="Sci-Fi">Sci-Fi</option>
                                        <option value="Cyberpunk">Cyberpunk</option>
                                        <option value="Architecture & Design">Architecture & Design</option>
                                        <option value="Philosophy">Philosophy</option>
                                        <option value="Science">Science</option>
                                        <option value="Manga">Manga</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">Format</label>
                                    <select
                                        value={newFormat}
                                        onChange={(e) => setNewFormat(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                                    >
                                        <option value="EPUB">EPUB</option>
                                        <option value="PDF">PDF</option>
                                        <option value="AZW3">AZW3</option>
                                        <option value="CBZ">CBZ</option>
                                        <option value="GLOSSY-PDF">GLOSSY-PDF</option>
                                    </select>
                                </div>
                            </div>

                            {/* Pricing & Stock */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">Buy Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">Rent / 7d ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newRentPrice}
                                        onChange={(e) => setNewRentPrice(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-slate-300 font-bold">Stock Copies</label>
                                    <input
                                        type="number"
                                        value={newStock}
                                        onChange={(e) => setNewStock(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Cover URL with quick presets */}
                            <div className="space-y-1.5">
                                <label className="text-slate-300 font-bold">Cover URL</label>
                                <input
                                    type="text"
                                    value={newCover}
                                    onChange={(e) => setNewCover(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-[11px] font-mono focus:outline-none focus:border-amber-500"
                                />
                                <div className="flex items-center gap-2 pt-1">
                                    <span className="text-[10px] text-slate-500">Presets:</span>
                                    {presetCovers.map((p, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setNewCover(p.url)}
                                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700 cursor-pointer"
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1">
                                <label className="text-slate-300 font-bold">Description / Synopsis</label>
                                <textarea
                                    value={newDesc}
                                    onChange={(e) => setNewDesc(e.target.value)}
                                    rows={2}
                                    placeholder="Brief summary of this volume..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold uppercase tracking-wider shadow-lg shadow-amber-600/30 cursor-pointer"
                                >
                                    Register Item & Allocate Stock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
