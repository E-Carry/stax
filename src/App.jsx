import React, { useState, useEffect } from 'react';
import {
  INITIAL_BOOKS,
  INITIAL_MAGAZINES,
  INITIAL_SYSTEM_ERRORS,
  DEFAULT_ACCOUNTS,
  CONNECTED_DEVICES
} from './data/mockBooks';

import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import Bookshelf3D from './components/Bookshelf3D';
import LibraryGrid from './components/LibraryGrid';
import BookModal from './components/BookModal';
import EbookReaderModal from './components/EbookReaderModal';
import ComicMangaReaderModal from './components/ComicMangaReaderModal';
import AudiobookPlayerModal from './components/AudiobookPlayerModal';
import FormatConverterStudio from './components/FormatConverterStudio';
import MetadataStudio from './components/MetadataStudio';
import DeviceSyncHub from './components/DeviceSyncHub';
import NewsDigestStudio from './components/NewsDigestStudio';
import CommandPaletteModal from './components/CommandPaletteModal';

// Pro Upgrade Modules
import CodexAiStudio from './components/CodexAiStudio';
import ReadingAnalyticsStudio from './components/ReadingAnalyticsStudio';
import AmbientSoundModal from './components/AmbientSoundModal';
import QuoteWallStudio from './components/QuoteWallStudio';
import LiveMagazineStudio from './components/LiveMagazineStudio';
import ThemeToggleCorner from './components/ThemeToggleCorner';

// New Advanced Features
import StoreStudio from './components/StoreStudio';
import AdminPortal from './components/AdminPortal';
import LoginPage from './components/LoginPage';
import PaymentGatewayModal from './components/PaymentGatewayModal';

export default function App() {
  // Catalog States
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem('stax-books-catalog');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_BOOKS;
  });

  const [magazines, setMagazines] = useState(() => {
    try {
      const saved = localStorage.getItem('stax-magazines-catalog');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_MAGAZINES;
  });

  // Diagnostics / System Errors State
  const [systemErrors, setSystemErrors] = useState(() => {
    try {
      const saved = localStorage.getItem('stax-system-errors');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_SYSTEM_ERRORS;
  });

  // Calculate live unresolved errors count for admin telemetry badge
  const unresolvedErrorsCount = (systemErrors || []).filter(e => !e.resolved).length;

  // Ensure any previous stale auto-login session is cleared so user starts on the Login Page
  useEffect(() => {
    try {
      // If user wasn't intentionally authenticated in this session, ensure clean login start
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === 'true') {
        localStorage.removeItem('stax-current-user');
      }
    } catch (e) {}
  }, []);

  // User Authentication State - Starts NULL so user sees the Login Page!
  const [currentUser, setCurrentUser] = useState(null);

  // Navigation State - Defaults directly to the full Login Page!
  const [activeTab, setActiveTab] = useState('login');
  const [loginPortal, setLoginPortal] = useState('reader'); // 'reader' | 'admin'
  const [viewMode, setViewMode] = useState('grid'); // grid, 3d, list
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent Theme State
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('stax-theme');
      if (saved) return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch (e) { }
    return 'dark';
  });

  // Sync document root classes whenever theme updates
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark', 'light', 'sepia');
      root.classList.add(theme);
      localStorage.setItem('stax-theme', theme);
    } catch (e) { }
  }, [theme]);

  // Persist Catalog and Errors on state changes
  useEffect(() => {
    try {
      localStorage.setItem('stax-books-catalog', JSON.stringify(books));
    } catch (e) { }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('stax-magazines-catalog', JSON.stringify(magazines));
    } catch (e) { }
  }, [magazines]);

  useEffect(() => {
    try {
      localStorage.setItem('stax-system-errors', JSON.stringify(systemErrors));
    } catch (e) { }
  }, [systemErrors]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('stax-current-user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('stax-current-user');
      }
    } catch (e) { }
  }, [currentUser]);

  // Modals Active State
  const [inspectedBook, setInspectedBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [comicBook, setComicBook] = useState(null);
  const [audiobook, setAudiobook] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAmbientOpen, setIsAmbientOpen] = useState(false);

  // Payment Checkout Modal State
  const [checkoutData, setCheckoutData] = useState(null); // { item, mode: 'buy' | 'rent' }

  // Search filtering for vault books
  const displayedBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.format.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenReader = (item) => {
    if (item.isAudiobook) {
      setAudiobook(item);
    } else if (item.isManga) {
      setComicBook(item);
    } else {
      setReadingBook(item);
    }
  };

  const handleSaveHighlight = (bookId, highlight) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, highlights: [highlight, ...(b.highlights || [])] };
      }
      return b;
    }));
  };

  // Stock Management Handlers
  const handleUpdateBookStock = (bookId, newStock) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, stock: Math.max(0, newStock) } : b));
  };

  const handleUpdateMagazineStock = (magId, newStock) => {
    setMagazines(prev => prev.map(m => m.id === magId ? { ...m, stock: Math.max(0, newStock) } : m));
  };

  const handleAddBook = (newBook) => {
    setBooks(prev => [newBook, ...prev]);
  };

  const handleAddMagazine = (newMag) => {
    setMagazines(prev => [newMag, ...prev]);
  };

  // Diagnostic Error Self-Healing Handlers
  const handleResolveError = (errId) => {
    setSystemErrors(prev => prev.map(e => e.id === errId ? { ...e, resolved: true } : e));
  };

  const handleResolveAllErrors = () => {
    setSystemErrors(prev => prev.map(e => ({ ...e, resolved: true })));
  };

  const handleInjectTestError = () => {
    const errorCodes = [
      { code: 'CACHE_INDEX_DESYNC', title: 'Corrupted Vector Cache in Edge-03', comp: 'Asset Engine', sev: 'warning', desc: 'Checksum mismatch on cover vector stream. Fallback canvas active.' },
      { code: 'STALE_INVENTORY_MUTEX', title: 'Stale Mutex Lock on Order Queue', comp: 'Stock Engine', sev: 'critical', desc: 'Transaction worker #4 timed out waiting for checkout release.' },
      { code: 'GATEWAY_WEBHOOK_RETRY', title: 'Payment Webhook Backoff Alert', comp: 'Payment Gateway', sev: 'warning', desc: 'Webhook listener encountered 2 retry backoffs on sandbox test listener.' }
    ];
    const pick = errorCodes[Math.floor(Math.random() * errorCodes.length)];
    const newErr = {
      id: `ERR-${Date.now().toString().slice(-4)}`,
      code: pick.code,
      title: pick.title,
      component: pick.comp,
      severity: pick.sev,
      timestamp: 'Just now',
      details: pick.desc,
      resolved: false
    };
    setSystemErrors(prev => [newErr, ...prev]);
  };

  // Checkout & Payment Handlers
  const handleOpenCheckout = (item, mode = 'buy') => {
    setCheckoutData({ item, mode });
  };

  const handlePaymentSuccess = ({ item, mode, durationDays, totalAmount, paymentMethod, transactionId, licenseKey }) => {
    // 1. Decrement inventory stock
    if (item.itemType === 'magazine') {
      handleUpdateMagazineStock(item.id, Math.max(0, (Number(item.stock) || 1) - 1));
    } else {
      handleUpdateBookStock(item.id, Math.max(0, (Number(item.stock) || 1) - 1));
    }

    // 2. Update user wallet balance & owned / rented records
    if (currentUser) {
      setCurrentUser(prev => {
        let newBalance = prev.walletBalance || 0;
        if (paymentMethod === 'wallet') {
          newBalance = Math.max(0, newBalance - totalAmount);
        }

        let newPurchased = [...(prev.purchasedIds || [])];
        let newRentals = [...(prev.rentals || [])];

        if (mode === 'buy') {
          if (!newPurchased.includes(item.id)) {
            newPurchased.push(item.id);
          }
          // Remove from rentals if upgrading
          newRentals = newRentals.filter(r => r.id !== item.id);
        } else {
          // Add or extend rental
          newRentals = newRentals.filter(r => r.id !== item.id);
          newRentals.push({
            id: item.id,
            itemType: item.itemType || 'book',
            title: item.title,
            rentedAt: Date.now(),
            expiresAt: Date.now() + durationDays * 24 * 60 * 60 * 1000,
            daysRemaining: durationDays,
            plan: `${durationDays}-Day Rental`
          });
        }

        return {
          ...prev,
          walletBalance: Number(newBalance.toFixed(2)),
          purchasedIds: newPurchased,
          rentals: newRentals
        };
      });
    }
  };

  // Top Up user wallet
  const handleTopUpWallet = (amount = 50) => {
    if (currentUser) {
      setCurrentUser(prev => ({
        ...prev,
        walletBalance: Number(((prev.walletBalance || 0) + amount).toFixed(2))
      }));
    }
  };

  // Auth Handlers
  const handleOpenLogin = (portal = 'reader') => {
    setLoginPortal(portal);
    setCurrentUser(null);
    setActiveTab('login');
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    if (userObj?.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('vault');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleOpenLogin('reader');
  };

  const handleSwitchToAdmin = () => {
    handleOpenLogin('admin');
  };

  // STANDALONE LOGIN GATEWAY: User MUST authenticate first before the app UI opens!
  if (!currentUser) {
    return (
      <div className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-100'
          : theme === 'sepia'
          ? 'bg-[#fbf0d9] text-[#2d1e12]'
          : 'bg-slate-50 text-slate-900'
      } transition-colors duration-300 font-sans flex flex-col justify-center items-center relative overflow-hidden py-8 px-4`}>
        <LoginPage
          initialPortal={loginPortal}
          onLoginSuccess={handleLoginSuccess}
          currentTheme={theme}
        />
        <ThemeToggleCorner
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark'
        ? 'bg-slate-950 text-slate-100'
        : theme === 'sepia'
        ? 'bg-[#fbf0d9] text-[#2d1e12]'
        : 'bg-slate-50 text-slate-900'
    } transition-colors duration-300 font-sans flex flex-col relative`}>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        onOpenAmbient={() => setIsAmbientOpen(true)}
        theme={theme}
        setTheme={setTheme}
        bookCount={books.length}
        storageUsed="18.4"
        user={currentUser}
        onOpenLogin={(portal) => handleOpenLogin(portal || 'reader')}
        onLogout={handleLogout}
        errorCount={unresolvedErrorsCount}
      />

      {/* Main Content Area - Unlocked after successful login! */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">

        {/* Module 1: Library Vault */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <HeroHeader
              totalBooks={books.length}
              storageMB={516.5}
              connectedDevices={CONNECTED_DEVICES.length}
              onAction={(tab) => setActiveTab(tab)}
            />

            {/* 3D Virtual Shelf Display */}
            {viewMode === '3d' ? (
              <Bookshelf3D
                books={displayedBooks}
                onSelectBook={(b) => setInspectedBook(b)}
                onReadBook={handleOpenReader}
                onConvertBook={() => { setActiveTab('converter'); }}
              />
            ) : null}

            {/* Main Library Catalog */}
            <LibraryGrid
              books={displayedBooks}
              onAddBook={handleAddBook}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onSelectBook={(b) => setInspectedBook(b)}
              onReadBook={handleOpenReader}
              onConvertBook={() => setActiveTab('converter')}
              onSyncBook={() => setActiveTab('sync')}
            />
          </div>
        )}

        {/* Module 2: Store & Rental Exchange */}
        {activeTab === 'store' && (
          <StoreStudio
            books={books}
            magazines={magazines}
            user={currentUser}
            onCheckout={handleOpenCheckout}
            onOpenReader={handleOpenReader}
            onTopUpWallet={handleTopUpWallet}
          />
        )}

        {/* Module 3: Live Magazine Studio */}
        {activeTab === 'magazine' && (
          <LiveMagazineStudio
            magazines={magazines}
            onBuy={(m) => handleOpenCheckout(m, 'buy')}
            onRent={(m) => handleOpenCheckout(m, 'rent')}
            user={currentUser}
          />
        )}

        {/* Module 4: Executive Admin Control Portal - Strictly Exclusive to Admin Login */}
        {activeTab === 'admin' && (
          currentUser?.role === 'admin' ? (
            <AdminPortal
              user={currentUser}
              books={books}
              magazines={magazines}
              onUpdateBookStock={handleUpdateBookStock}
              onUpdateMagazineStock={handleUpdateMagazineStock}
              onAddBook={handleAddBook}
              onAddMagazine={handleAddMagazine}
              systemErrors={systemErrors}
              onResolveError={handleResolveError}
              onResolveAllErrors={handleResolveAllErrors}
              onInjectTestError={handleInjectTestError}
              onSwitchToAdmin={handleSwitchToAdmin}
            />
          ) : (
            <div className="w-full max-w-xl mx-auto py-16 text-center space-y-4">
              <div className="p-8 rounded-3xl glass-panel border border-rose-500/40 space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20 text-2xl font-bold">
                  🔒
                </div>
                <h3 className="font-display font-black text-2xl text-white">
                  Access Restricted: Admin OS Exclusive
                </h3>
                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                  Admin OS is strictly exclusive to administrator accounts (admin@stax.io). Readers and guests do not have root administrative permissions to update stock levels or run diagnostic repairs.
                </p>
                <div className="pt-3 flex justify-center gap-3">
                  <button
                    onClick={handleSwitchToAdmin}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 cursor-pointer transition-all"
                  >
                    Go to Admin Login (admin@stax.io)
                  </button>
                  <button
                    onClick={() => setActiveTab('vault')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 cursor-pointer"
                  >
                    Return to Vault
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Module 5: Codex AI Engine */}
        {activeTab === 'ai' && (
          <CodexAiStudio books={books} />
        )}

        {/* Module 6: Reading Analytics & Streak Studio */}
        {activeTab === 'analytics' && (
          <ReadingAnalyticsStudio />
        )}

        {/* Module 7: Universal Format Converter Studio */}
        {activeTab === 'converter' && (
          <FormatConverterStudio books={books} />
        )}

        {/* Module 8: Quote Wall & Poster Generator */}
        {activeTab === 'quotes' && (
          <QuoteWallStudio books={books} />
        )}

        {/* Module 9: Metadata Studio */}
        {activeTab === 'metadata' && (
          <MetadataStudio books={books} onUpdateBook={() => { }} />
        )}

        {/* Module 10: Device Sync Hub */}
        {activeTab === 'sync' && (
          <DeviceSyncHub books={books} />
        )}

        {/* Module 11: News Digest Studio */}
        {activeTab === 'rss' && (
          <NewsDigestStudio onAddBook={handleAddBook} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 dark:border-slate-800/60 py-6 px-4 text-center text-xs font-mono text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
          <span>STAX PRO ULTRA v3.5 • Engineered E-Book & Periodical OS</span>
          <span className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>256-Bit SSL Secure Gateway</span>
          </span>
        </div>
      </footer>

      {/* Corner Theme Toggle Controller */}
      <ThemeToggleCorner
        theme={theme}
        setTheme={setTheme}
      />

      {/* 3D Book Inspection Modal with Buy & Rent Integration */}
      {inspectedBook && (
        <BookModal
          book={inspectedBook}
          onClose={() => setInspectedBook(null)}
          onRead={handleOpenReader}
          onConvert={() => setActiveTab('converter')}
          onSync={() => setActiveTab('sync')}
          onBuy={(b) => handleOpenCheckout(b, 'buy')}
          onRent={(b) => handleOpenCheckout(b, 'rent')}
          isOwned={currentUser?.purchasedIds?.includes(inspectedBook.id)}
          rentalInfo={currentUser?.rentals?.find(r => r.id === inspectedBook.id)}
        />
      )}

      {/* Bank-Grade Payment Gateway Modal */}
      {checkoutData && (
        <PaymentGatewayModal
          isOpen={!!checkoutData}
          item={checkoutData.item}
          initialMode={checkoutData.mode}
          user={currentUser}
          onClose={() => setCheckoutData(null)}
          onPaymentSuccess={handlePaymentSuccess}
          onOpenReader={handleOpenReader}
        />
      )}

      {/* Reader Modals */}
      {readingBook && (
        <EbookReaderModal
          book={readingBook}
          onClose={() => setReadingBook(null)}
          onSaveHighlight={handleSaveHighlight}
        />
      )}

      {comicBook && (
        <ComicMangaReaderModal
          book={comicBook}
          onClose={() => setComicBook(null)}
        />
      )}

      {audiobook && (
        <AudiobookPlayerModal
          book={audiobook}
          onClose={() => setAudiobook(null)}
        />
      )}

      {/* Global Command Palette */}
      <CommandPaletteModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        books={books}
        onSelectTab={setActiveTab}
        onSelectBook={(b) => setInspectedBook(b)}
        theme={theme}
        setTheme={setTheme}
        user={currentUser}
      />

      {/* Ambient Sound Lounge */}
      <AmbientSoundModal
        isOpen={isAmbientOpen}
        onClose={() => setIsAmbientOpen(false)}
      />

    </div>
  );
}
