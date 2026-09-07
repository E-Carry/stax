import React, { useState, useEffect } from 'react';
import { INITIAL_BOOKS, CONNECTED_DEVICES } from './data/mockBooks';
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

export default function App() {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [activeTab, setActiveTab] = useState('vault'); // vault, magazine, ai, analytics, converter, quotes, sync, rss
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
    } catch (e) {}
    return 'dark';
  });

  // Sync document root classes whenever theme updates
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark', 'light', 'sepia');
      root.classList.add(theme);
      localStorage.setItem('stax-theme', theme);
    } catch (e) {}
  }, [theme]);

  // Modals Active State
  const [inspectedBook, setInspectedBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [comicBook, setComicBook] = useState(null);
  const [audiobook, setAudiobook] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAmbientOpen, setIsAmbientOpen] = useState(false);

  // Search filtering
  const displayedBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.format.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenReader = (book) => {
    if (book.isAudiobook) {
      setAudiobook(book);
    } else if (book.isManga) {
      setComicBook(book);
    } else {
      setReadingBook(book);
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

  const handleAddBook = (newBook) => {
    setBooks(prev => [newBook, ...prev]);
  };

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
      />

      {/* Main Container */}
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

        {/* Module 2: Live Magazine Studio */}
        {activeTab === 'magazine' && (
          <LiveMagazineStudio />
        )}

        {/* Module 3: Codex AI Engine */}
        {activeTab === 'ai' && (
          <CodexAiStudio books={books} />
        )}

        {/* Module 4: Reading Analytics & Streak Studio */}
        {activeTab === 'analytics' && (
          <ReadingAnalyticsStudio />
        )}

        {/* Module 5: Universal Format Converter Studio */}
        {activeTab === 'converter' && (
          <FormatConverterStudio books={books} />
        )}

        {/* Module 6: Quote Wall & Poster Generator */}
        {activeTab === 'quotes' && (
          <QuoteWallStudio books={books} />
        )}

        {/* Module 7: Metadata Studio */}
        {activeTab === 'metadata' && (
          <MetadataStudio books={books} onUpdateBook={() => { }} />
        )}

        {/* Module 8: Device Sync Hub */}
        {activeTab === 'sync' && (
          <DeviceSyncHub books={books} />
        )}

        {/* Module 9: News Digest Studio */}
        {activeTab === 'rss' && (
          <NewsDigestStudio onAddBook={handleAddBook} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 dark:border-slate-800/60 py-6 px-4 text-center text-xs font-mono text-slate-500">
        <span>STAX PRO ULTRA v3.5 • Engineered E-Book Management OS</span>
      </footer>

      {/* SUPER PROFESSIONAL CORNER THEME TOGGLE CONTROLLER */}
      <ThemeToggleCorner
        theme={theme}
        setTheme={setTheme}
      />

      {/* Modals */}
      {inspectedBook && (
        <BookModal
          book={inspectedBook}
          onClose={() => setInspectedBook(null)}
          onRead={handleOpenReader}
          onConvert={() => setActiveTab('converter')}
          onSync={() => setActiveTab('sync')}
        />
      )}

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

      <CommandPaletteModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        books={books}
        onSelectTab={setActiveTab}
        onSelectBook={(b) => setInspectedBook(b)}
        theme={theme}
        setTheme={setTheme}
      />

      <AmbientSoundModal
        isOpen={isAmbientOpen}
        onClose={() => setIsAmbientOpen(false)}
      />

    </div>
  );
}
