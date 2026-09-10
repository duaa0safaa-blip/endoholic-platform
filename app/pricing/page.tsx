export const metadata = {
  title: 'Safe Instrumentation in Endodontics — Endoholic',
  description: 'Purchase the Safe Instrumentation in Endodontics digital book.'
};

export default function PricingPage(){
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-4">Safe Instrumentation in Endodontics</h1>
      <p className="text-slate-300 mb-6">A focused 65-page digital book for clinicians and students who want a safer, more predictable approach to endodontic instrumentation.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold text-white">Sample preview</h3>
          <p className="text-slate-300">Read the first three pages before purchasing.</p>
          <div className="mt-4 text-2xl font-bold">Free</div>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft border-2 border-brand-500">
          <h3 className="text-xl font-semibold text-white">Digital book</h3>
          <p className="text-slate-300">Full 65-page PDF access after manual verification of your Zain Cash or Switch Card payment.</p>
          <div className="mt-4 text-2xl font-bold">$19 one-time</div>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold text-white">Institutional</h3>
          <p className="text-slate-300">Contact us for multi-user licensing for universities and clinics.</p>
          <div className="mt-4 text-2xl font-bold">Custom</div>
        </div>
      </div>

      <section className="mt-8 bg-slate-800/50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-2">How manual checkout works</h2>
        <p className="text-slate-300 text-sm">Create your order, pay via Zain Cash or Switch Card, and send the receipt on WhatsApp. We verify the payment manually, then your secure PDF download unlocks automatically.</p>
      </section>
    </main>
  );
}