'use client';

import { useSubscription } from '../context/SubscriptionContext';

export default function SiteHeader() {
  const { isSubscribed, setShowPaymentModal } = useSubscription();

  return (
    <header className="w-full flex flex-wrap items-center justify-between gap-3 py-3 px-4 sm:px-6 bg-slate-900/60 backdrop-blur-md border-b border-white/10 shadow-xl z-20 sticky top-0">
      <a href="/" aria-label="Endoholic home" className="flex items-center gap-3 shrink-0">
        <img src="/logo.svg" alt="Endoholic logo" className="w-24 sm:w-28 h-auto" />
        <div className="hidden sm:block leading-tight">
          <h1 className="text-lg font-bold text-white drop-shadow">Endoholic Platform</h1>
          <p className="text-[10px] text-teal-200">Digital Dentistry & Endodontics Learning</p>
        </div>
      </a>

      <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
        <div className="flex items-center gap-4">
          <a href="/about" className="text-slate-200 hover:text-white text-sm">About</a>
          <a href="/pricing" className="text-slate-200 hover:text-white text-sm">Pricing</a>
          <a href="/contact" className="text-slate-200 hover:text-white text-sm">Contact</a>
        </div>

        {isSubscribed ? (
          <span className="text-xs bg-teal-950/80 border border-teal-500 text-teal-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow">
            <span aria-hidden>✨</span>
            <span className="sr-only">You have an active subscription</span>
            Active Subscription (Pro)
          </span>
        ) : (
          <button
            onClick={() => setShowPaymentModal(true)}
            aria-label="Unlock full access"
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-lg focus:ring-2 focus:ring-amber-300"
          >
            Unlock Full Access
            <span className="ml-2" aria-hidden>💳</span>
          </button>
        )}

        <span className="hidden sm:flex text-xs bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-full items-center gap-1.5 shadow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden></span>
          DRM Protected
        </span>
      </nav>
    </header>
  );
}
