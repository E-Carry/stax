export const INITIAL_BOOKS = [
    {
        id: "stax-001",
        title: "Dune: Master Edition",
        author: "Frank Herbert",
        publisher: "Chilton Books / Ace",
        publishedYear: "1965",
        isbn: "978-0441172719",
        format: "EPUB",
        fileSize: "14.2 MB",
        pages: 688,
        rating: 4.9,
        category: "Sci-Fi",
        series: "Dune Chronicles #1",
        language: "English",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
        readingStatus: "Reading",
        progressPercent: 64,
        currentPage: 440,
        highlights: [
            { id: "h1", text: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.", chapter: "Chapter 1", page: 18, color: "yellow" },
            { id: "h2", text: "The mystery of life isn't a problem to solve, but a reality to experience.", chapter: "Chapter 4", page: 82, color: "purple" }
        ],
        toc: [
            { title: "Book I: Dune", page: 1 },
            { title: "Chapter 1: House Atreides", page: 15 },
            { title: "Chapter 2: The Spice Arrakis", page: 45 },
            { title: "Book II: Muad'Dib", page: 220 },
            { title: "Book III: The Prophet", page: 480 }
        ],
        content: `
# Book I: Dune

## Chapter 1: House Atreides

A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows. To begin your study of the life of Muad'Dib, then, take care that you first place him in his time: born in the 57th year of the Padishah Emperor, Shaddam IV. And take special care that you locate Muad'Dib in his place: the planet Arrakis. Do not be deceived by the fact that he was born on Caladan and lived his first fifteen years there. Arrakis, the planet known as Dune, is forever his place.

The old woman sat in the shadow of the doorway, watching Paul Atreides as he prepared for sleep. In the dim glow of the glowglobe, the boy seemed tall for his fifteen years, slender with dark hair and the fierce Atreides eyes in an oval, olive-skinned face.

"He's small for his age, Jessica," the old woman said. Her voice rasped like a dry saw.

"His father is tall, Reverend Mother," Paul's mother replied. "And the Atreides grow late, I'm told."

"So they say, so they say," the old woman wheezed. "Yet he is already fifteen."

"Did you dream again last night, Paul?" she asked suddenly.

Paul felt a cold shiver run down his spine. "Yes," he admitted quietly. "I dreamed of a world with no clouds, no rain. Only endless dunes of red sand, and a sun like a burning coal in the sky."
    `
    },
    {
        id: "stax-002",
        title: "Neuromancer: Cyberpunk Classic",
        author: "William Gibson",
        publisher: "Ace Books",
        publishedYear: "1984",
        isbn: "978-0441569564",
        format: "AZW3",
        fileSize: "8.6 MB",
        pages: 271,
        rating: 4.8,
        category: "Cyberpunk",
        series: "Sprawl Trilogy #1",
        language: "English",
        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        description: "Case was the freshest cowboy on the matrix, until he crossed the wrong people and they burnt his nervous system. Now a mysterious employer named Armitage offers him a cure.",
        readingStatus: "Unread",
        progressPercent: 0,
        currentPage: 1,
        highlights: [],
        toc: [
            { title: "Part 1: Chiba City Blues", page: 1 },
            { title: "Part 2: The Shopping Expedition", page: 65 },
            { title: "Part 3: Midnight in London", page: 130 }
        ],
        content: `
# Part 1: Chiba City Blues

The sky above the port was the color of television, tuned to a dead channel.

"It's not like I'm using," Case heard someone say, as he elbowed his way through the crowd outside the door of the Chatsubo. "It's like my body's developed this massive drug deficiency." It was a Sprawl voice and a Sprawl joke. The Chatsubo was a bar for professional expatriates; you could drink there for a week and never hear two words of Japanese.

Ratz was tending bar. His prosthetic arm whined monotonously as he filled a glass of draft Kirin. Ratz was a quiet man with a face like a dark turnip and a skin graft from an unknown donor.

"Case," Ratz said, grunting as he slid the beer across the stained wood. "The artist of the deal. What brings you to Chiba tonight?"
    `
    },
    {
        id: "stax-003",
        title: "Akira: Vol 1 (Sequential Comic)",
        author: "Katsuhiro Otomo",
        publisher: "Kodansha Comics",
        publishedYear: "1982",
        isbn: "978-1935429005",
        format: "CBZ",
        fileSize: "142.5 MB",
        pages: 360,
        rating: 5.0,
        category: "Manga",
        series: "Akira #1",
        language: "Japanese / English",
        cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
        description: "Neo-Tokyo, 2019. High-speed motorcycle gangs, secret government esper experiments, and the apocalyptic awakening of Akira.",
        readingStatus: "Reading",
        progressPercent: 35,
        currentPage: 126,
        isManga: true,
        comicPanels: [
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80"
        ],
        highlights: [],
        toc: []
    },
    {
        id: "stax-004",
        title: "Atomic Habits (Audiobook)",
        author: "James Clear",
        publisher: "Penguin Audio",
        publishedYear: "2018",
        isbn: "978-0735211292",
        format: "M4B",
        fileSize: "320.0 MB",
        pages: 320,
        duration: "5h 35m",
        rating: 4.9,
        category: "Audiobook",
        series: "Self Improvement",
        language: "English",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
        description: "An easy & proven way to build good habits and break bad ones. Small changes, remarkable results.",
        readingStatus: "Reading",
        progressPercent: 75,
        currentPage: 240,
        isAudiobook: true,
        audioSrc: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
        audioChapters: [
            { title: "Chapter 1: The Surprising Power of Atomic Habits", duration: "18:24", timestamp: 0 },
            { title: "Chapter 2: How Your Habits Shape Your Identity", duration: "22:10", timestamp: 1104 },
            { title: "Chapter 3: Four Simple Steps to Build Better Habits", duration: "19:45", timestamp: 2434 }
        ],
        highlights: [],
        toc: []
    },
    {
        id: "stax-005",
        title: "Clean Code: Refactoring Handbook",
        author: "Robert C. Martin",
        publisher: "Prentice Hall",
        publishedYear: "2008",
        isbn: "978-0132350884",
        format: "PDF",
        fileSize: "18.4 MB",
        pages: 464,
        rating: 4.7,
        category: "Technology",
        series: "Software Craftsmanship",
        language: "English",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
        readingStatus: "Completed",
        progressPercent: 100,
        currentPage: 464,
        highlights: [
            { id: "h3", text: "Leave the code cleaner than you found it. (The Boy Scout Rule)", chapter: "Chapter 2", page: 14, color: "green" }
        ],
        toc: [
            { title: "Chapter 1: Clean Code", page: 1 },
            { title: "Chapter 2: Meaningful Names", page: 17 },
            { title: "Chapter 3: Functions", page: 39 }
        ],
        content: `
# Chapter 1: Clean Code

There will be code. One might think that a book about code is a bit dated. That code is no longer the issue; that we should be concerned with models and requirements instead.

Nonsense. We will never be rid of code, because code represents the ultimate detailed specification of requirements.

## Small Functions & Clear Intention
The first rule of functions is that they should be small. The second rule of functions is that *they should be smaller than that*.
    `
    },
    {
        id: "stax-006",
        title: "The Three-Body Problem",
        author: "Cixin Liu",
        publisher: "Tor Books",
        publishedYear: "2008",
        isbn: "978-0765377067",
        format: "MOBI",
        fileSize: "11.1 MB",
        pages: 400,
        rating: 4.8,
        category: "Sci-Fi",
        series: "Remembrance of Earth's Past #1",
        language: "English",
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        description: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens.",
        readingStatus: "Unread",
        progressPercent: 0,
        currentPage: 1,
        highlights: [],
        toc: [
            { title: "Part I: Silent Spring", page: 1 },
            { title: "Part II: Red Coast", page: 88 }
        ],
        content: `
# Part I: Silent Spring

China, 1967. The Red Guards rampaged through the streets of Beijing. Ye Zhetai, a professor of physics, stood on the stage of the athletic field. The crowd chanted slogans into the autumn wind.
    `
    },
    {
        id: "stax-007",
        title: "1984: Definitive Edition",
        author: "George Orwell",
        publisher: "Secker & Warburg",
        publishedYear: "1949",
        isbn: "978-0451524935",
        format: "EPUB",
        fileSize: "5.4 MB",
        pages: 328,
        rating: 4.9,
        category: "Dystopian",
        series: "Classics",
        language: "English",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80",
        description: "Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human action with Big Brother watching.",
        readingStatus: "Completed",
        progressPercent: 100,
        currentPage: 328,
        highlights: [
            { id: "h4", text: "Big Brother is Watching You.", chapter: "Chapter 1", page: 3, color: "yellow" }
        ],
        toc: [{ title: "Chapter 1", page: 1 }, { title: "Chapter 2", page: 24 }],
        content: `
It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions.
    `
    },
    {
        id: "stax-008",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        publisher: "Harper",
        publishedYear: "2014",
        isbn: "978-0062316097",
        format: "EPUB",
        fileSize: "12.8 MB",
        pages: 443,
        rating: 4.8,
        category: "History",
        series: "Non-Fiction",
        language: "English",
        cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
        description: "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.",
        readingStatus: "Reading",
        progressPercent: 42,
        currentPage: 186,
        highlights: [],
        toc: [{ title: "Part 1: The Cognitive Revolution", page: 1 }],
        content: `
About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics.
    `
    },
    {
        id: "stax-009",
        title: "Snow Crash",
        author: "Neal Stephenson",
        publisher: "Bantam Books",
        publishedYear: "1992",
        isbn: "978-0553380958",
        format: "AZW3",
        fileSize: "9.2 MB",
        pages: 480,
        rating: 4.7,
        category: "Cyberpunk",
        series: "Sprawl Era",
        language: "English",
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        description: "In reality, Hiro Protagonist delivers pizza for Uncle Enzo's CosoNostra Pizza Inc. But in the Metaverse he's a warrior prince.",
        readingStatus: "Unread",
        progressPercent: 0,
        currentPage: 1,
        highlights: [],
        toc: [{ title: "Chapter 1: The Deliverator", page: 1 }],
        content: `
The Deliverator belongs to an elite order, a sacred knighthood. When he gets the pizza into the car, his nerve endings fuse with the engine.
    `
    },
    {
        id: "stax-010",
        title: "Foundation",
        author: "Isaac Asimov",
        publisher: "Gnome Press",
        publishedYear: "1951",
        isbn: "978-0553293357",
        format: "EPUB",
        fileSize: "7.1 MB",
        pages: 255,
        rating: 4.9,
        category: "Sci-Fi",
        series: "Foundation #1",
        language: "English",
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        description: "Hari Seldon uses psychohistory to predict the fall of the Galactic Empire and establish a Foundation to preserve human knowledge.",
        readingStatus: "Completed",
        progressPercent: 100,
        currentPage: 255,
        highlights: [],
        toc: [{ title: "Part I: The Psychohistorians", page: 1 }],
        content: `
Hari Seldon was an old man, his hair white and thin. But his mind cut through the mathematical probabilities of thirty millennia of Galactic Empire.
    `
    },
    {
        id: "stax-011",
        title: "Ghost in the Shell (Manga)",
        author: "Masamune Shirow",
        publisher: "Kodansha",
        publishedYear: "1989",
        isbn: "978-1608860128",
        format: "CBZ",
        fileSize: "185.0 MB",
        pages: 350,
        rating: 4.9,
        category: "Manga",
        series: "Section 9",
        language: "Japanese / English",
        cover: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
        description: "Major Motoko Kusanagi leads Public Security Section 9 against cyber-crimes in 2029 New Port City.",
        readingStatus: "Reading",
        progressPercent: 50,
        currentPage: 175,
        isManga: true,
        comicPanels: [
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
        ],
        highlights: [],
        toc: []
    },
    {
        id: "stax-012",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        publisher: "George Allen & Unwin",
        publishedYear: "1937",
        isbn: "978-0547928227",
        format: "EPUB",
        fileSize: "9.8 MB",
        pages: 310,
        rating: 4.9,
        category: "Fantasy",
        series: "Middle-Earth",
        language: "English",
        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        description: "In a hole in the ground there lived a hobbit. Bilbo Baggins embarks on a quest with thirteen dwarves and Gandalf to reclaim Lonely Mountain.",
        readingStatus: "Unread",
        progressPercent: 0,
        currentPage: 1,
        highlights: [],
        toc: [{ title: "Chapter 1: An Unexpected Party", page: 1 }],
        content: `
In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.
    `
    },
    {
        id: "stax-013",
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        publisher: "Beacon Press",
        publishedYear: "1946",
        isbn: "978-0807014295",
        format: "EPUB",
        fileSize: "4.2 MB",
        pages: 165,
        rating: 4.9,
        category: "Philosophy",
        series: "Classics",
        language: "English",
        cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
        description: "Psychiatrist Viktor Frankl's memoir has riveted generations of readers with its descriptions of life in Nazi death camps and its lessons for spiritual survival.",
        readingStatus: "Completed",
        progressPercent: 100,
        currentPage: 165,
        highlights: [
            { id: "h5", text: "Those who have a 'why' to live, can bear with almost any 'how'.", chapter: "Part I", page: 76, color: "purple" }
        ],
        toc: [{ title: "Part I: Experiences in a Concentration Camp", page: 1 }],
        content: `
We who lived in concentration camps can remember the men who walked through the huts comforting others, giving away their last piece of bread. They may have been few in number, but they offer sufficient proof that everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances.
    `
    },
    {
        id: "stax-014",
        title: "Steve Jobs Biography (Audio)",
        author: "Walter Isaacson",
        publisher: "Simon & Schuster Audio",
        publishedYear: "2011",
        isbn: "978-1451648539",
        format: "M4B",
        fileSize: "450.0 MB",
        pages: 656,
        duration: "25h 10m",
        rating: 4.8,
        category: "Audiobook",
        series: "Biography",
        language: "English",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
        description: "Based on more than forty interviews with Jobs conducted over two years, this is the riveting story of the roller-coaster life and intense personality of a creative entrepreneur.",
        readingStatus: "Reading",
        progressPercent: 15,
        currentPage: 98,
        isAudiobook: true,
        audioSrc: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
        audioChapters: [
            { title: "Chapter 1: Childhood & Silicon Valley", duration: "32:10", timestamp: 0 },
            { title: "Chapter 2: An Odd Couple - Woz & Jobs", duration: "41:05", timestamp: 1930 }
        ],
        highlights: [],
        toc: []
    },
    {
        id: "stax-015",
        title: "Design Systems Engine",
        author: "Alla Kholmatova",
        publisher: "Smashing Media",
        publishedYear: "2017",
        isbn: "978-3945749586",
        format: "PDF",
        fileSize: "22.1 MB",
        pages: 290,
        rating: 4.8,
        category: "Technology",
        series: "Design OS",
        language: "English",
        cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        description: "A practical guide to creating and maintaining design systems for digital products.",
        readingStatus: "Reading",
        progressPercent: 80,
        currentPage: 232,
        highlights: [],
        toc: [{ title: "Chapter 1: Design Principles", page: 1 }],
        content: `
Design systems are not static pattern libraries. They are living, breathing operational frameworks that unify design, code, and product architecture.
    `
    },
    {
        id: "stax-016",
        title: "STAX Periodicals Vol. 1",
        author: "Stax Editorial Board",
        publisher: "Stax Archive Press",
        publishedYear: "2026",
        isbn: "978-0000000016",
        format: "EPUB",
        fileSize: "15.0 MB",
        pages: 120,
        rating: 5.0,
        category: "Magazine",
        series: "Quarterly",
        language: "English",
        cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        description: "Official inaugural issue of Stax Quarterly, covering digital libraries, 3D CSS perspective transforms, and GPU-accelerated reading.",
        readingStatus: "Unread",
        progressPercent: 0,
        currentPage: 1,
        highlights: [],
        toc: [{ title: "Article 1: Glassmorphic UI Systems", page: 1 }],
        content: `
Welcome to Stax Periodicals. In this issue, we explore the intersection of spatial computing, e-paper display technologies, and hyper-realistic reading environments.
    `
    }
];

export const CONNECTED_DEVICES = [
    { id: "dev-1", name: "Subhabrata's Kindle Oasis", model: "Kindle Oasis 3rd Gen", connection: "Wi-Fi (Online)", battery: 88, storageFree: "12.4 GB", ip: "192.168.1.104" },
    { id: "dev-2", name: "Kobo Clara 2E", model: "Kobo E-Reader", connection: "USB Sideloaded", battery: 64, storageFree: "8.1 GB", path: "E:\\" },
    { id: "dev-3", name: "Onyx Boox Palma", model: "Android E-Ink Phone", connection: "Sync Cloud", battery: 95, storageFree: "42.0 GB", ip: "192.168.1.189" }
];

export const RSS_FEEDS = [
    { id: "rss-1", title: "Hacker News Top Stories", source: "news.ycombinator.com", category: "Tech & Coding", unreadCount: 14 },
    { id: "rss-2", title: "Literary Hub Daily", source: "lithub.com", category: "Books & Essays", unreadCount: 8 },
    { id: "rss-3", title: "MIT Technology Review", source: "technologyreview.com", category: "AI & Future", unreadCount: 12 },
    { id: "rss-4", title: "ArXiv Quantum Physics Digest", source: "arxiv.org", category: "Science", unreadCount: 22 }
];
