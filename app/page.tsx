'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Load the client-only PdfViewer component (which itself dynamically imports react-pdf)
const PdfViewer = dynamic(() => import('./reader/PdfViewer'), { ssr: false });

export default function BookReader() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'iq' | 'int'>('iq');
  const [activeTab, setActiveTab] = useState<string>('books');
  
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Persist subscription in localStorage so access survives refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem('endoholic:isSubscribed');
      if (stored === 'true') setIsSubscribed(true);
    } catch (e) {
      // ignore (SSR safety)
    }
  }, []);

  useEffect(() => {
    try {
      if (isSubscribed) localStorage.setItem('endoholic:isSubscribed','true');
      else localStorage.removeItem('endoholic:isSubscribed');
    } catch (e) {}
  }, [isSubscribed]);
  
  const samplePdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
  
  const [pdfFile, setPdfFile] = useState<string | File>(samplePdf);
  const [fileName, setFileName] = useState<string>('Endodontics Safe Instrumentation (Sample Preview).pdf');


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
      className="min-h-screen text-slate-100 flex flex-col justify-between select-none font-sans relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/bg-platform.jpg')" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0"></div>

      <header className="w-full flex justify-between items-center py-3 px-6 bg-slate-900/60 backdrop-blur-md border-b border-white/10 shadow-xl z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <a href="/" aria-label="Endoholic home" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Endoholic logo" className="w-28 h-auto" />
          </a>
        </div>
          <div className="flex items-center gap-3">
          <div aria-hidden="true" className="w-10 h-10 rounded-xl bg-teal-500/30 border border-teal-400/50 flex items-center justify-center text-teal-300 font-extrabold text-xl shadow-inner">
            E
          </div>
          <div>
            <h1 className="text-lg font-bold text-white drop-shadow">Endoholic Platform</h1>
            <p className="text-[10px] text-teal-200">Digital Dentistry & Endodontics Learning</p>
          </div>
        </div>

        <nav aria-label="Primary" className="flex items-center gap-4">
          <a href="/about" className="text-slate-200 hover:text-white text-sm">About</a>
          <a href="/pricing" className="text-slate-200 hover:text-white text-sm">Pricing</a>
          <a href="/contact" className="text-slate-200 hover:text-white text-sm">Contact</a>

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

          <span className="text-xs bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden></span>
            DRM Protected
          </span>
        </nav>
      </header>

      <section className="w-full max-w-7xl mx-auto px-4 py-8 z-10">
        <div className="bg-slate-900/60 border border-white/6 rounded-2xl p-8 shadow-soft flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Endodontics education for clinicians and students</h2>
            <p className="text-slate-300 mt-3 max-w-2xl">Practical courses, peer-reviewed resources, and a curated library designed to help you deliver better endodontic care. Learn from specialists and improve clinical outcomes.</p>
            <div className="mt-6 flex gap-3">
              <a href="/pricing" className="inline-block bg-brand-500 hover:bg-brand-700 text-slate-900 font-semibold px-5 py-3 rounded-lg">Get Started</a>
              <a href="/about" className="inline-block text-slate-200 px-4 py-3 rounded-lg border border-white/10">Learn more</a>
            </div>
          </div>

          <div className="w-full md:w-96 bg-white/5 p-4 rounded-lg">
            <div className="text-sm text-slate-300">Trusted by</div>
            <div className="mt-4 flex gap-3 items-center">
              <div className="bg-slate-800/50 px-3 py-2 rounded">University Clinics</div>
              <div className="bg-slate-800/50 px-3 py-2 rounded">Specialist Practices</div>
              <div className="bg-slate-800/50 px-3 py-2 rounded">Residents</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-6 z-10 items-start">
        
        <aside className="w-full md:w-64 bg-slate-900/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
          <p className="text-xs font-bold text-teal-300 px-3 py-1 uppercase tracking-wider border-b border-white/10 mb-1">
            Platform Menu
          </p>

          <button 
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'books' ? 'bg-teal-600/80 text-white shadow-lg border border-teal-400/30' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <span>📚</span>
            <span>Books & E-Kits</span>
          </button>

          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'videos' ? 'bg-teal-600/80 text-white shadow-lg border border-teal-400/30' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <span>🎥</span>
            <span>Video Lectures</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile' ? 'bg-teal-600/80 text-white shadow-lg border border-teal-400/30' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <span>👤</span>
            <span>Account & Subscriptions</span>
          </button>
        </aside>

        <main className="flex-1 w-full bg-slate-900/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col items-center border border-white/20 min-h-[600px]">
          
          <div className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2 mb-3 flex items-center justify-between text-xs text-slate-300 z-10">
            <span>Book: <strong className="text-teal-300">{fileName}</strong></span>
            <span className="text-amber-300 font-medium">
              {isSubscribed ? '🟢 Full Version Unlocked' : '🔒 Sample Preview Mode (Max 3 Pages)'}
            </span>
          </div>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.05] rotate-12 select-none z-20">
            <p className="text-6xl sm:text-7xl font-black tracking-widest text-white uppercase text-center">
              Endoholic Platform<br/>Protected Content
            </p>
          </div>

          <div className="z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex justify-center p-2 my-2 min-h-[500px] w-full max-w-2xl border border-white/40">
            <PdfViewer
              file={pdfFile}
              pageNumber={pageNumber}
              onLoadSuccess={onDocumentLoadSuccess}
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
        </main>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/90 border border-white/20 rounded-2xl p-6 max-w-lg w-full text-white shadow-2xl relative">
            <h2 className="text-xl font-bold text-teal-400 mb-2">تفعيل اشتراك منصة Endoholic</h2>
            <p className="text-xs text-slate-300 mb-6">اختر طريقة الدفع للحصول على الوصول الكامل للكتب والمقالات العلمية.</p>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6">
              <button
                onClick={() => setPaymentMethod('iq')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'iq' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                داخل العراق 🇮🇶 (زين كاش)
              </button>
              <button
                onClick={() => setPaymentMethod('int')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'int' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                دولي 🌍 (فيزا / ماستر)
              </button>
            </div>

            {paymentMethod === 'iq' ? (
              <div className="space-y-4">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-teal-500/30 text-center">
                  <p className="text-xs text-slate-400">حول رسوم الاشتراك إلى محفظة زين كاش:</p>
                  <p className="text-lg font-mono font-bold text-teal-300 my-1">0780XXXXXXX</p>
                </div>
                <div>
                  يتم التحويل وإرسال الوصل للمراجعة لتفعيل حسابك فوراً.
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-sm font-medium mb-1">الدفع الإلكتروني السريع</p>
                  <button 
                    onClick={() => {
                      setIsSubscribed(true);
                      setShowPaymentModal(false);
                      alert('تم محاكاة الدفع بنجاح! أهلاً بكِ، تم فتح الكتاب كاملاً.');
                    }}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all text-sm cursor-pointer mt-2"
                  >
                    إتمام الدفع التجريبي (محاكاة التفعيل الفوري) 💳
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-6 mt-4 border-t border-slate-800">
              <button 
                onClick={() => {
                  setIsSubscribed(true);
                  setShowPaymentModal(false);
                  alert('تم تفعيل الاشتراك يدوياً بنجاح!');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                محاكاة تفعيل المشرف (Admin Activation)
              </button>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="px-5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-400 cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-xs text-slate-200 text-center py-4 z-10 bg-slate-900/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold">E</div>
            <div>
              <div className="font-semibold">Endoholic Platform</div>
              <div className="text-[11px] text-slate-300">Digital Dentistry & Endodontics</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a href="/about" className="hover:text-white text-xs">About</a>
            <a href="/pricing" className="hover:text-white text-xs">Pricing</a>
            <a href="/contact" className="hover:text-white text-xs">Contact</a>
          </div>

          <div className="text-slate-400 text-[11px]">© 2026 Endoholic Platform. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}