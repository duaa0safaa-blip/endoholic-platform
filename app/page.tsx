'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSubscription } from './context/SubscriptionContext';

// Load the client-only PdfViewer component (which itself dynamically imports react-pdf)
const PdfViewer = dynamic(() => import('./reader/PdfViewer'), { ssr: false });

export default function BookReader() {
  const { isSubscribed, accessToken, orderIdentity, setShowPaymentModal } = useSubscription();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Served through our own cached proxy (see app/api/book/route.ts) instead of
  // hitting GitHub directly from every visitor's browser.
  const samplePdf = isSubscribed && accessToken
    ? `/api/download?token=${encodeURIComponent(accessToken)}`
    : '/api/book';

  const pdfFile = samplePdf;
  const [fileName] = useState<string>('Safe Instrumentation in Endodontics.pdf');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u'))
      ) {
        e.preventDefault();
        alert('Notice: Endoholic Platform content is protected. Printing or saving is disabled.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Enforce sample limit for unsubscribed users: clamp pageNumber to 3
  useEffect(() => {
    if (!isSubscribed && pageNumber > 3) {
      setPageNumber(3);
    }
  }, [isSubscribed, pageNumber]);

  return (
    <div
      className="flex-1 flex flex-col text-slate-100 select-none relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/bg-platform.jpg')" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0"></div>

      <section className="w-full max-w-7xl mx-auto px-4 py-6 z-10 hidden md:block">
        <div className="bg-slate-900/60 border border-white/6 rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">Safe Instrumentation in Endodontics</h2>
            <p className="text-slate-300 mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base">A practical 70-page clinical guide to safer access, canal instrumentation, and predictable endodontic treatment decisions for clinicians and students.</p>
            <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
              <button onClick={() => setShowPaymentModal(true)} className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-sm">Buy the book — $19</button>
              <a href="/about" className="inline-block text-slate-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-white/10 text-sm">Learn more</a>
            </div>
          </div>

          <div className="w-full md:w-96 bg-white/5 p-3 sm:p-4 rounded-lg">
            <div className="text-xs sm:text-sm text-slate-300">Built for</div>
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <div className="bg-slate-800/50 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs">University Clinics</div>
              <div className="bg-slate-800/50 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs">Specialist Practices</div>
              <div className="bg-slate-800/50 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs">Residents</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 flex flex-col w-full px-2 sm:px-4 py-4 sm:py-6 gap-4 z-10 justify-center items-center">

        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2 sm:p-4 shadow-2xl w-full max-w-2xl min-w-0">

          <div className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2 mb-3 flex items-center justify-between text-xs text-slate-300 z-10">
            <span>Book: <strong className="text-teal-300">{fileName}</strong> <span className="text-slate-400">(70 pages)</span></span>
            <span className="text-amber-300 font-medium">
              {isSubscribed ? '🟢 Full Version Unlocked' : '🔒 Sample Preview Mode (Max 3 Pages)'}
            </span>
          </div>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05] rotate-0 sm:rotate-12 select-none z-20 overflow-hidden">
            <p className="max-w-full px-4 text-2xl sm:text-7xl font-black tracking-widest text-white uppercase text-center break-words">
              Endoholic Platform<br/>Protected Content
            </p>
          </div>

          <div className="z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex justify-center p-2 my-2 min-h-[500px] w-full max-w-2xl min-w-0 border border-white/40">
            <PdfViewer
              file={pdfFile}
              pageNumber={pageNumber}
              onLoadSuccess={onDocumentLoadSuccess}
              watermarkIdentity={isSubscribed && orderIdentity ? `Order ${orderIdentity.orderNumber} — ${orderIdentity.email}` : undefined}
              className="shadow-lg rounded"
            />
          </div>

          {!isSubscribed && pageNumber > 3 && (
            <div className="absolute inset-x-4 bottom-20 bg-slate-950/95 border border-amber-500/50 p-4 rounded-2xl text-center z-30 backdrop-blur-xl shadow-2xl animate-bounce">
              <p className="text-sm font-bold text-amber-300 mb-1">🔒 هذه الصفحة مدفوعة ومقفلة</p>
              <p className="text-xs text-slate-300 mb-3">لقد وصلت إلى نهاية النسخة التجريبية (Sample). يرجى إتمام الاشتراك لقراءة الكتاب كاملاً.</p>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-6 py-2 rounded-xl shadow cursor-pointer"
              >
                شراء وافتح الكتاب الآن 💳
              </button>
            </div>
          )}

          <div className="flex items-center gap-4 z-10 bg-slate-900/70 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg mt-3">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(prev => prev - 1)}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-30 text-white rounded-lg text-xs font-medium transition-all shadow cursor-pointer"
            >
              Previous
            </button>

            <span className="text-xs font-semibold text-slate-200 px-2">
              Page <span className="text-teal-300 font-bold">{pageNumber}</span> of <span className="text-white">{isSubscribed ? (numPages || '--') : '3 (Sample)'}</span>
            </span>

            <button
              disabled={isSubscribed ? (numPages ? pageNumber >= numPages : true) : pageNumber >= 3}
              onClick={() => {
                if (!isSubscribed && pageNumber >= 3) {
                  setShowPaymentModal(true);
                } else {
                  setPageNumber(prev => prev + 1);
                }
              }}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-30 text-white rounded-lg text-xs font-medium transition-all shadow cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
