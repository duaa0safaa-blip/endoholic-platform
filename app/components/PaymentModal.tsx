'use client';

import { useSubscription } from '../context/SubscriptionContext';

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
              <p className="text-lg font-mono font-bold text-teal-300 my-1">07732746321</p>
            </div>
            <div>
              بعد التحويل، أرسلي صورة الوصل عبر صفحة{' '}
              <a href="/contact" className="text-teal-300 underline hover:text-teal-200">تواصل معنا</a>
              {' '}وسيتم تفعيل حسابك يدوياً خلال وقت قصير.
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center py-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <p className="text-sm font-medium mb-1">الدفع بالبطاقة (فيزا / ماستركارد)</p>
              <p className="text-xs text-slate-400">
                الدفع الإلكتروني المباشر قيد التفعيل حالياً. تواصلي معنا عبر{' '}
                <a href="/contact" className="text-teal-300 underline hover:text-teal-200">صفحة التواصل</a>
                {' '}وسنرسل لكِ رابط دفع آمن فور توفره.
              </p>
            </div>
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
