import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    CreditCard,
    Wallet,
    QrCode,
    ShieldCheck,
    Lock,
    CheckCircle2,
    Sparkles,
    Calendar,
    Download,
    BookOpen,
    ArrowRight,
    Tag,
    Clock,
    AlertCircle,
    Copy,
    Check,
    Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentGatewayModal({
    isOpen,
    item,
    initialMode = 'buy',
    user,
    onClose,
    onPaymentSuccess,
    onOpenReader
}) {
    if (!isOpen || !item) return null;

    const [purchaseType, setPurchaseType] = useState(initialMode); // 'buy' | 'rent'
    const [rentalDuration, setRentalDuration] = useState(7); // 7, 14, 30 days
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'wallet' | 'upi' | 'applepay'

    // Card state
    const [cardNumber, setCardNumber] = useState('4532 8920 3481 9012');
    const [cardName, setCardName] = useState(user?.name ? user.name.toUpperCase() : 'ALEX MERCER');
    const [cardExpiry, setCardExpiry] = useState('08/29');
    const [cardCvv, setCardCvv] = useState('842');

    // Promo code state
    const [promoCode, setPromoCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [promoMsg, setPromoMsg] = useState('');

    // Flow states
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [copiedLicense, setCopiedLicense] = useState(false);

    // Calculate prices
    const baseBuyPrice = Number(item.price || 14.99);
    const baseRentPrice = Number(item.rentPrice || 2.99);

    let calculatedPrice = baseBuyPrice;
    if (purchaseType === 'rent') {
        if (rentalDuration === 7) calculatedPrice = baseRentPrice;
        else if (rentalDuration === 14) calculatedPrice = Number((baseRentPrice * 1.8).toFixed(2));
        else if (rentalDuration === 30) calculatedPrice = Number((baseRentPrice * 3.2).toFixed(2));
    }

    const discountAmount = Number(((calculatedPrice * discountPercent) / 100).toFixed(2));
    const finalTotal = Number(Math.max(0, calculatedPrice - discountAmount).toFixed(2));

    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === 'STAX20') {
            setDiscountPercent(20);
            setPromoMsg('Promo STAX20 applied! 20% discount granted.');
        } else if (promoCode.trim().toUpperCase() === 'VIP50') {
            setDiscountPercent(50);
            setPromoMsg('VIP50 applied! 50% executive discount.');
        } else {
            setPromoMsg('Invalid promo code. Try "STAX20"');
            setDiscountPercent(0);
        }
    };

    const handleProcessPayment = () => {
        // Validate wallet balance if paying via wallet
        if (paymentMethod === 'wallet' && (user?.walletBalance || 0) < finalTotal) {
            alert(`Insufficient wallet balance ($${(user?.walletBalance || 0).toFixed(2)}). Please choose another payment method.`);
            return;
        }

        setIsProcessing(true);
        setProcessingStep('Connecting to Banking Network & Fraud Filter...');

        setTimeout(() => {
            setProcessingStep('Authorizing 256-bit Encrypted Token...');
        }, 800);

        setTimeout(() => {
            setProcessingStep('Settling Digital Rights & Allocating License...');
        }, 1600);

        setTimeout(() => {
            setIsProcessing(false);
            const txnId = `TXN-STX-${Math.floor(100000 + Math.random() * 900000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
            const licenseKey = `LIC-${item.id.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

            const receiptData = {
                transactionId: txnId,
                licenseKey: licenseKey,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                itemTitle: item.title,
                itemCover: item.cover,
                format: item.format || 'DIGITAL',
                purchaseType: purchaseType,
                durationDays: purchaseType === 'rent' ? rentalDuration : null,
                totalPaid: finalTotal,
                paymentMethod: paymentMethod === 'card' ? 'Credit Card (••12)' : paymentMethod === 'wallet' ? 'STAX Digital Wallet' : paymentMethod === 'upi' ? 'Instant UPI Pay' : 'Apple / Google Pay',
                customerName: user?.name || 'Authorized Member',
                customerEmail: user?.email || 'reader@stax.io'
            };

            setReceipt(receiptData);

            // Trigger celebratory confetti
            try {
                confetti({
                    particleCount: 90,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } catch (e) { }

            // Notify parent to update inventory stock and user records
            onPaymentSuccess({
                item,
                mode: purchaseType,
                durationDays: rentalDuration,
                totalAmount: finalTotal,
                paymentMethod,
                transactionId: txnId,
                licenseKey
            });

        }, 2400);
    };

    const handleCopyLicense = (key) => {
        navigator.clipboard?.writeText?.(key);
        setCopiedLicense(true);
        setTimeout(() => setCopiedLicense(false), 2000);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/70">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
                                <ShieldCheck className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display font-black text-sm text-white tracking-wide flex items-center gap-1.5">
                                    <span>STAX SECURE CHECKOUT</span>
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                        PCI-DSS L1
                                    </span>
                                </h3>
                                <p className="text-[10px] text-slate-400 font-mono">256-Bit SSL Encrypted Payment Tunnel</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700 transition-all cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Content */}
                    {!receipt ? (
                        /* Checkout Form & Order Summary */
                        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">

                            {/* Left Column: Payment Configuration */}
                            <div className="md:col-span-7 p-6 space-y-5 text-left border-b md:border-b-0 md:border-r border-slate-800">

                                {/* Transaction Type Switch: Buy vs Rent */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                                        Select Acquisition Model
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPurchaseType('buy')}
                                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                                purchaseType === 'buy'
                                                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                                                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-xs">Buy to Keep</span>
                                                <span className="text-xs font-mono font-bold text-indigo-400">${baseBuyPrice.toFixed(2)}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1">Lifetime digital ownership & offline downloads</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPurchaseType('rent')}
                                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                                purchaseType === 'rent'
                                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500 text-white shadow-md shadow-purple-600/20'
                                                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-xs">Rent Volume</span>
                                                <span className="text-xs font-mono font-bold text-purple-400">from ${baseRentPrice.toFixed(2)}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1">Temporary reading pass (7, 14, 30 days)</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Rental Duration Selector (Only if rent) */}
                                {purchaseType === 'rent' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-2 p-3 rounded-2xl bg-purple-950/20 border border-purple-500/20"
                                    >
                                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-300">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Select Rental Duration</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { days: 7, label: '7 Days', price: baseRentPrice },
                                                { days: 14, label: '14 Days (10% off)', price: Number((baseRentPrice * 1.8).toFixed(2)) },
                                                { days: 30, label: '30 Days (25% off)', price: Number((baseRentPrice * 3.2).toFixed(2)) }
                                            ].map((plan) => (
                                                <button
                                                    key={plan.days}
                                                    type="button"
                                                    onClick={() => setRentalDuration(plan.days)}
                                                    className={`py-2 px-2 rounded-xl text-center border text-xs font-mono transition-all cursor-pointer ${
                                                        rentalDuration === plan.days
                                                            ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-sm'
                                                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-purple-500/40'
                                                    }`}
                                                >
                                                    <div className="text-[11px] font-bold">{plan.days} Days</div>
                                                    <div className="text-[10px] opacity-80">${plan.price.toFixed(2)}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Payment Method Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                                        Payment Method
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { id: 'card', label: 'Card', icon: CreditCard },
                                            { id: 'wallet', label: 'STAX Wallet', icon: Wallet },
                                            { id: 'upi', label: 'UPI / QR', icon: QrCode },
                                            { id: 'applepay', label: 'Apple Pay', icon: Sparkles }
                                        ].map(m => {
                                            const Icon = m.icon;
                                            const isSelected = paymentMethod === m.id;
                                            return (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => setPaymentMethod(m.id)}
                                                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold shadow-sm'
                                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                                    }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-[10px] whitespace-nowrap">{m.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Dynamic Payment Method Inputs */}
                                {paymentMethod === 'card' && (
                                    <div className="space-y-3">
                                        {/* Visual Card Preview */}
                                        <div className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 border border-indigo-500/30 shadow-lg relative overflow-hidden text-white font-mono space-y-3">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-indigo-300 font-bold tracking-widest">STAX PLATINUM</span>
                                                <span className="text-xs font-bold text-amber-400">VISA</span>
                                            </div>
                                            <div className="text-sm sm:text-base tracking-[0.25em] font-bold text-slate-200">
                                                {cardNumber || '•••• •••• •••• ••••'}
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                                                <div>
                                                    <div className="text-[8px] uppercase">Cardholder</div>
                                                    <div className="text-slate-200 font-semibold truncate max-w-[150px]">{cardName || 'MEMBER'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[8px] uppercase">Expires</div>
                                                    <div className="text-slate-200 font-semibold">{cardExpiry || 'MM/YY'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Input Fields */}
                                        <div className="space-y-2">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    placeholder="Card Number (16 digits)"
                                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={cardExpiry}
                                                    onChange={(e) => setCardExpiry(e.target.value)}
                                                    placeholder="MM/YY"
                                                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                                />
                                                <input
                                                    type="password"
                                                    value={cardCvv}
                                                    maxLength={4}
                                                    onChange={(e) => setCardCvv(e.target.value)}
                                                    placeholder="CVV / CVC"
                                                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'wallet' && (
                                    <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-300 font-mono">Available Wallet Balance:</span>
                                            <span className="text-sm font-mono font-bold text-emerald-400">
                                                ${(user?.walletBalance || 0).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                            {(user?.walletBalance || 0) >= finalTotal ? (
                                                <span className="text-emerald-400 flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Balance sufficient for 1-click instant debit.
                                                </span>
                                            ) : (
                                                <span className="text-amber-400 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Insufficient credits. Please top-up or choose another method.
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center space-y-2">
                                        <div className="p-2 bg-white rounded-xl shadow-md">
                                            {/* Dynamic QR SVG */}
                                            <svg viewBox="0 0 100 100" className="w-24 h-24">
                                                <rect width="100" height="100" fill="#ffffff" />
                                                <rect x="10" y="10" width="30" height="30" fill="#000000" />
                                                <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                                                <rect x="20" y="20" width="10" height="10" fill="#000000" />
                                                <rect x="60" y="10" width="30" height="30" fill="#000000" />
                                                <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
                                                <rect x="70" y="20" width="10" height="10" fill="#000000" />
                                                <rect x="10" y="60" width="30" height="30" fill="#000000" />
                                                <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
                                                <rect x="20" y="70" width="10" height="10" fill="#000000" />
                                                <circle cx="50" cy="50" r="8" fill="#4f46e5" />
                                            </svg>
                                        </div>
                                        <span className="text-[11px] font-mono text-slate-300">Scan & Pay via any UPI / Banking App</span>
                                        <span className="text-[10px] font-mono text-indigo-400">Merchant VPA: stax.vault@icici</span>
                                    </div>
                                )}

                                {paymentMethod === 'applepay' && (
                                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                                        <button
                                            type="button"
                                            onClick={handleProcessPayment}
                                            className="w-full py-3 bg-black hover:bg-slate-950 border border-slate-700 text-white rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                                        >
                                            <span className="text-base"></span>
                                            <span>Pay with Apple Pay</span>
                                        </button>
                                        <p className="text-[10px] font-mono text-slate-400">Instant biometric touch/face verification</p>
                                    </div>
                                )}

                            </div>

                            {/* Right Column: Order Summary & Pay Button */}
                            <div className="md:col-span-5 p-6 bg-slate-950/50 flex flex-col justify-between space-y-6 text-left">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                                        Order Summary
                                    </h4>

                                    {/* Item Card */}
                                    <div className="flex gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                                        <img
                                            src={item.cover}
                                            alt={item.title}
                                            className="w-14 h-20 object-cover rounded-xl border border-slate-700 shadow-md shrink-0"
                                        />
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                {item.itemType === 'magazine' ? 'Glossy Periodical' : 'E-Book Edition'}
                                            </span>
                                            <h5 className="font-display font-bold text-xs text-white truncate">{item.title}</h5>
                                            <p className="text-[10px] text-slate-400 truncate">{item.author || item.editor || 'STAX Press'}</p>
                                            <div className="text-[10px] font-mono text-slate-300">
                                                Format: <span className="text-indigo-400">{item.format}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Promo Code Input */}
                                    <div className="space-y-1.5">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Promo Code (Try STAX20)"
                                                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyPromo}
                                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {promoMsg && (
                                            <p className={`text-[10px] font-mono ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {promoMsg}
                                            </p>
                                        )}
                                    </div>

                                    {/* Breakdown */}
                                    <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                                        <div className="flex justify-between">
                                            <span>Subtotal ({purchaseType === 'rent' ? `${rentalDuration}-Day Rental` : 'Buy Edition'})</span>
                                            <span className="text-slate-200">${calculatedPrice.toFixed(2)}</span>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="flex justify-between text-emerald-400 font-bold">
                                                <span>Coupon Discount ({discountPercent}%)</span>
                                                <span>-${discountAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Platform Handling</span>
                                            <span className="text-slate-400">$0.00 (Waived)</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                                            <span>Total Due</span>
                                            <span className="text-indigo-400 text-base">${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Payment Button */}
                                <div className="space-y-3">
                                    <button
                                        type="button"
                                        disabled={isProcessing}
                                        onClick={handleProcessPayment}
                                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/40 transition-all cursor-pointer"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span className="text-[11px]">{processingStep}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Lock className="w-3.5 h-3.5" />
                                                <span>Confirm & Pay ${finalTotal.toFixed(2)}</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                        <span>Instant access & license generation guaranteed</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ) : (
                        /* Digital Receipt & Invoice View */
                        <div className="p-8 max-h-[80vh] overflow-y-auto space-y-6 text-left">
                            <div className="text-center space-y-2">
                                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="font-display font-black text-2xl text-white">
                                    Payment Authorized & Verified!
                                </h3>
                                <p className="text-xs font-mono text-slate-400">
                                    Your volume is unlocked and active in your personal library.
                                </p>
                            </div>

                            {/* Printable Receipt Card */}
                            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                    <div>
                                        <div className="font-bold text-white text-sm">STAX OFFICIAL TAX INVOICE</div>
                                        <div className="text-[10px] text-slate-500">Receipt ID: {receipt.transactionId}</div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                        PAID • SETTLED
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
                                    <div>
                                        <span className="text-slate-500 block">Date & Time</span>
                                        <span className="text-slate-200 font-semibold">{receipt.date}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block">Billed To</span>
                                        <span className="text-slate-200 font-semibold">{receipt.customerName}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block">Acquisition Mode</span>
                                        <span className="text-indigo-400 font-bold uppercase">
                                            {receipt.purchaseType === 'rent' ? `${receipt.durationDays}-Day Rental` : 'Permanent Purchase'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block">Amount Paid</span>
                                        <span className="text-emerald-400 font-bold text-sm">${receipt.totalPaid.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Volume License Key */}
                                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-400 block">Cryptographic Vault License Key</span>
                                        <span className="text-xs font-bold text-indigo-300 select-all">{receipt.licenseKey}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleCopyLicense(receipt.licenseKey)}
                                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer transition-all"
                                    >
                                        {copiedLicense ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copiedLicense ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                        if (onOpenReader) onOpenReader(item);
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>Open in Reader Now</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        window.print();
                                    }}
                                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-all"
                                >
                                    <Printer className="w-4 h-4" />
                                    <span>Print Receipt</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 cursor-pointer transition-all"
                                >
                                    Back to Catalog
                                </button>
                            </div>

                        </div>
                    )}

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
