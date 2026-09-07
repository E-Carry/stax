import React, { useEffect, useRef } from 'react';
import { Sparkles, BookOpen, Cpu, RefreshCw, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

export default function HeroHeader({ totalBooks, storageMB, connectedDevices, onAction }) {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const statsRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Particle Canvas Background
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let animationFrameId;

            const resizeCanvas = () => {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            };
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const particles = Array.from({ length: 45 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                color: ['#818cf8', '#c084fc', '#60a5fa', '#f472b6'][Math.floor(Math.random() * 4)],
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.2
            }));

            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.fill();
                });
                animationFrameId = requestAnimationFrame(render);
            };
            render();

            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', resizeCanvas);
            };
        }
    }, []);

    useEffect(() => {
        // GSAP Staggered Kinetic Text Reveal
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (titleRef.current && subtitleRef.current && statsRef.current) {
            tl.fromTo(
                titleRef.current.children,
                { opacity: 0, y: 30, skewY: 4 },
                { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.15 }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 },
                    '-=0.4'
                )
                .fromTo(
                    statsRef.current.children,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
                    '-=0.3'
                );
        }
    }, []);

    return (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800/80 p-6 lg:p-10 my-6 shadow-2xl">
            {/* Background Canvas Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

            {/* Ambient Gradient Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Column: Kinetic Text & Taglines */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
                        <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span>HYPER-REALISTIC ENGINE ONLINE</span>
                    </div>

                    <h1 ref={titleRef} className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                        <span className="block">Catalog. Convert.</span>
                        <span className="block text-gradient-purple my-1">Sync & Read.</span>
                        <span className="block text-slate-300 font-light text-3xl sm:text-4xl">Without Boundaries.</span>
                    </h1>

                    <p ref={subtitleRef} className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-sans">
                        <strong className="text-white font-semibold">Stax</strong> is your ultimate digital reading fortress. Organize virtual shelves, convert EPUBs/PDFs/CBZs instantly, auto-fetch high-resolution covers, sync directly with Kindle & Kobo, and stream audiobooks in hyper-fidelity.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => onAction('converter')}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Format Engine Studio</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                            onClick={() => onAction('sync')}
                            className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-slate-600 transition-all"
                        >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>Connect E-Reader</span>
                        </button>
                    </div>
                </div>

                {/* Right Column: Live Telemetry Cards */}
                <div ref={statsRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                            <span className="text-xs font-mono uppercase tracking-wider">Total Library</span>
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="text-3xl font-black font-display text-white">{totalBooks}</div>
                        <span className="text-[11px] text-slate-400 mt-1 font-mono">Volumes Indexed</span>
                    </div>

                    <div className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                            <span className="text-xs font-mono uppercase tracking-wider">Archive Size</span>
                            <Cpu className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-3xl font-black font-display text-white">{storageMB} MB</div>
                        <span className="text-[11px] text-emerald-400 mt-1 font-mono">99.8% Compressed</span>
                    </div>

                    <div className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                            <span className="text-xs font-mono uppercase tracking-wider">Active Devices</span>
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-3xl font-black font-display text-white">{connectedDevices}</div>
                        <span className="text-[11px] text-slate-400 mt-1 font-mono">Kindle & Kobo Ready</span>
                    </div>

                    <div className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                            <span className="text-xs font-mono uppercase tracking-wider">Format Engines</span>
                            <Sparkles className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="text-3xl font-black font-display text-white">6</div>
                        <span className="text-[11px] text-amber-300 mt-1 font-mono">EPUB, PDF, CBZ, AZW3</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
