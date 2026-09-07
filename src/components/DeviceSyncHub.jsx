import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Smartphone,
    Wifi,
    Usb,
    Send,
    CheckCircle2,
    BatteryCharging,
    RefreshCw,
    HardDrive,
    Search,
    Check,
    Zap,
    Trash2
} from 'lucide-react';
import { CONNECTED_DEVICES } from '../data/mockBooks';

export default function DeviceSyncHub({ books }) {
    const [devices, setDevices] = useState(CONNECTED_DEVICES);
    const [selectedBook, setSelectedBook] = useState(books[0] || null);
    const [selectedDevice, setSelectedDevice] = useState(CONNECTED_DEVICES[0]);

    // Transfer state
    const [isSending, setIsSending] = useState(false);
    const [progress, setProgress] = useState(0);
    const [transferSpeed, setTransferSpeed] = useState(0);
    const [syncLogs, setSyncLogs] = useState([]);
    const [sideloadedCount, setSideloadedCount] = useState(14);
    const [isScanning, setIsScanning] = useState(false);

    const sendToDevice = () => {
        if (!selectedBook || !selectedDevice) return;
        setIsSending(true);
        setProgress(0);
        setSyncLogs(['[DAEMON] Initializing Stax Sideload Protocol v3.2...']);

        // Progress Interval
        let p = 0;
        const interval = setInterval(() => {
            p += Math.floor(Math.random() * 18) + 12;
            setTransferSpeed((Math.random() * 3.5 + 2.1).toFixed(1));

            if (p >= 100) {
                p = 100;
                setProgress(100);
                clearInterval(interval);

                setSyncLogs(prev => [
                    ...prev,
                    `[WIFI] Connected to ${selectedDevice.name} (${selectedDevice.ip || 'USB'})`,
                    `[TRANSFER] Sideloading volume: "${selectedBook.title}.${selectedBook.format.toLowerCase()}" (${selectedBook.fileSize})`,
                    `[SYNC] Metadata, reading progress (${selectedBook.progressPercent}%), and highlights synced.`,
                    `[COMPLETE] Volume successfully sideloaded on ${selectedDevice.name}!`
                ]);

                // Update storage and count
                setSideloadedCount(prev => prev + 1);
                setDevices(prev => prev.map(d => {
                    if (d.id === selectedDevice.id) {
                        const currentVal = parseFloat(d.storageFree) || 10;
                        return { ...d, storageFree: `${(currentVal - 0.02).toFixed(2)} GB` };
                    }
                    return d;
                }));

                setIsSending(false);
            } else {
                setProgress(p);
            }
        }, 300);
    };

    const handleScanDevices = () => {
        setIsScanning(true);
        setTimeout(() => {
            const newDev = {
                id: `dev-${Date.now()}`,
                name: "Subhabrata's Paperwhite 11",
                model: "Kindle Paperwhite 11th Gen",
                connection: "Wi-Fi (Online)",
                battery: 92,
                storageFree: "28.5 GB",
                ip: "192.168.1.142"
            };
            setDevices(prev => [newDev, ...prev]);
            setIsScanning(false);
        }, 1200);
    };

    return (
        <div className="w-full space-y-6">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-2xl font-display font-black text-white">Device Sync & Wireless Sideloading Engine</h2>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                            Universal Send-to-Kindle delivery daemon and USB sideload manager for Kindle, Kobo, and Onyx Boox
                        </p>
                    </div>

                    <button
                        onClick={handleScanDevices}
                        disabled={isScanning}
                        className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30 flex items-center gap-2 hover:bg-emerald-500/30 transition-colors"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                        <span>{isScanning ? 'Scanning Network...' : 'Scan For Devices'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Connected Devices Telemetry */}
                <div className="lg:col-span-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Connected E-Reader Fleet</span>
                        <span className="text-xs font-mono text-slate-400">{sideloadedCount} Volumes Sideloaded</span>
                    </div>

                    <div className="space-y-3">
                        {devices.map((dev) => (
                            <div
                                key={dev.id}
                                onClick={() => setSelectedDevice(dev)}
                                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${selectedDevice.id === dev.id
                                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-white">{dev.name}</h3>
                                        <p className="text-xs text-slate-400 font-mono">{dev.model} • {dev.connection}</p>
                                    </div>
                                </div>

                                <div className="text-right font-mono text-xs space-y-1">
                                    <div className="text-emerald-400 flex items-center justify-end gap-1">
                                        <BatteryCharging className="w-3.5 h-3.5" />
                                        <span>{dev.battery}%</span>
                                    </div>
                                    <div className="text-slate-500 text-[11px]">{dev.storageFree} Free</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Send-to-Device Action */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                        <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">Wireless Sideload Action</span>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-slate-400 block">Select Target Volume</label>
                            <select
                                value={selectedBook?.id}
                                onChange={(e) => setSelectedBook(books.find(b => b.id === e.target.value))}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                            >
                                {books.map(b => (
                                    <option key={b.id} value={b.id}>{b.title} ({b.format}) • {b.fileSize}</option>
                                ))}
                            </select>
                        </div>

                        {/* Live Progress Bar */}
                        {isSending && (
                            <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                                <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                                    <span>Transferring via Sideload Daemon...</span>
                                    <span>{progress}% ({transferSpeed} MB/s)</span>
                                </div>
                                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={sendToDevice}
                            disabled={isSending || !selectedBook}
                            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                            <span>{isSending ? `Sideloading... (${progress}%)` : `Send "${selectedBook?.title}" to ${selectedDevice?.name}`}</span>
                        </button>

                        {/* Sync Telemetry Log */}
                        {syncLogs.length > 0 && (
                            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1.5 text-slate-300 max-h-40 overflow-y-auto">
                                {syncLogs.map((log, i) => (
                                    <div key={i} className={log.includes('COMPLETE') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                                        {log}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
