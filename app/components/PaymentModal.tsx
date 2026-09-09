'use client';

import { FormEvent, useState } from 'react';
import { useSubscription } from '../context/SubscriptionContext';

const WHATSAPP_NUMBER = '9647732746321';

function whatsappPayLink(methodLabel: string, orderNumber: string) {
  const message = `مرحباً، أريد شراء كتاب Safe Instrumentation in Endodontics. رقم الطلب: ${orderNumber}. سأدفع عبر ${methodLabel}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function PaymentModal() {
  const { showPaymentModal, setShowPaymentModal, paymentMethod, setPaymentMethod, setAccessToken } = useSubscription();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<{ orderNumber: string; orderToken: string } | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showPaymentModal) return null;

  async function createOrder(event: FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, paymentMethod }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to create order');
      setAccessToken(result.orderToken);
      setOrder(result);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create order');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/90 border border-white/20 rounded-2xl p-6 max-w-lg w-full text-white shadow-2xl relative">
        <h2 className="text-xl font-bold text-teal-400 mb-2">Buy Safe Instrumentation in Endodontics</h2>
        <p className="text-xs text-slate-300 mb-6">$19 USD — manual payment is verified before download access is released.</p>

        {!order && <form id="book-checkout-form" onSubmit={createOrder} className="space-y-3 mb-5">
          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" className="w-full rounded-xl bg-slate-800 border border-white/10 px-3 py-2.5 text-sm" />
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email for your order" className="w-full rounded-xl bg-slate-800 border border-white/10 px-3 py-2.5 text-sm" />
        </form>}

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            onClick={() => setPaymentMethod('iq')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              paymentMethod === 'iq' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            زين كاش 🇮🇶
          </button>
          <button
            onClick={() => setPaymentMethod('int')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              paymentMethod === 'int' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            💳 Switch Card 🌍
          </button>
        </div>

        {order ? (
          <div className="space-y-4">
            <p className="text-sm text-emerald-300">Order created: <strong>{order.orderNumber}</strong></p>
            <p className="text-xs text-slate-300">Complete payment, then send the receipt through WhatsApp. Your download will unlock after verification.</p>
            <a href={whatsappPayLink(paymentMethod === 'iq' ? 'Zain Cash' : 'Switch Card', order.orderNumber)} target="_blank" rel="noopener noreferrer" className="block text-center bg-teal-600 hover:bg-teal-500 rounded-xl py-3.5 text-sm font-bold">Send payment notice on WhatsApp</a>
          </div>
        ) : paymentMethod === 'iq' ? (
          <div className="space-y-4">
            <p className="text-[11px] text-amber-300/90 text-center font-semibold">للعملاء داخل العراق 🇮🇶</p>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-teal-500/30 text-center">
              <p className="text-xs text-slate-400">رقم محفظة زين كاش:</p>
              <p className="text-lg font-mono font-bold text-teal-300 my-1">07732746321</p>
            </div>
            <a
              href="#checkout"
              onClick={(event) => { event.preventDefault(); document.getElementById('book-checkout-form')?.requestSubmit(); }}
              className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-500 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all"
            >
              ادفع الآن عبر زين كاش 💸
            </a>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              يفتح واتساب مباشرة لإرسال إشعار الدفع وتفعيل الاشتراك فوراً.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-[11px] text-amber-300/90 text-center font-semibold">للعملاء الدوليين 🌍</p>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-teal-500/30 text-center">
              <p className="text-xs text-slate-400">رقم حساب Switch Card:</p>
              <p className="text-lg font-mono font-bold text-teal-300 my-1 break-all">0000001A00679084325309</p>
            </div>
            <a
              href="#checkout"
              onClick={(event) => { event.preventDefault(); document.getElementById('book-checkout-form')?.requestSubmit(); }}
              className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-500 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all"
            >
              ادفع الآن عبر Switch Card 💳
            </a>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              يفتح واتساب مباشرة لإرسال إشعار الدفع وتفعيل الاشتراك فوراً.
            </p>
          </div>
        )}

        {error && <p className="text-xs text-rose-300 mb-3">{error}</p>}
        {!order && <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 rounded-xl py-3 font-bold text-sm">{isSubmitting ? 'Creating order...' : 'Create order'}</button>}
        <div className="flex gap-3 pt-6 mt-4 border-t border-slate-800">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="flex-1 px-5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-400 cursor-pointer py-2.5"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
