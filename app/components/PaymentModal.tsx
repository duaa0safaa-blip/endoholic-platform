'use client';

import { useSubscription } from '../context/SubscriptionContext';

const WHATSAPP_NUMBER = '9647732746321';

function whatsappPayLink(methodLabel: string) {
  const message = `مرحباً، أرغب بتفعيل اشتراك منصة Endoholic. سأقوم بالدفع عبر ${methodLabel}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function PaymentModal() {
  const { showPaymentModal, setShowPaymentModal, paymentMethod, setPaymentMethod } = useSubscription();

  if (!showPaymentModal) return null;

  return (
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

        {paymentMethod === 'iq' ? (
          <div className="space-y-4">
            <p className="text-[11px] text-amber-300/90 text-center font-semibold">للعملاء داخل العراق 🇮🇶</p>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-teal-500/30 text-center">
              <p className="text-xs text-slate-400">رقم محفظة زين كاش:</p>
              <p className="text-lg font-mono font-bold text-teal-300 my-1">07732746321</p>
            </div>
            <a
              href={whatsappPayLink('زين كاش')}
              target="_blank"
              rel="noopener noreferrer"
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
              href={whatsappPayLink('Switch Card')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-500 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all"
            >
              ادفع الآن عبر Switch Card 💳
            </a>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              يفتح واتساب مباشرة لإرسال إشعار الدفع وتفعيل الاشتراك فوراً.
            </p>
          </div>
        )}

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
