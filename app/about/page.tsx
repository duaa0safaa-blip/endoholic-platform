export const metadata = {
  title: 'The Book — Safe Instrumentation in Endodontics',
  description: 'About Safe Instrumentation in Endodontics.'
};

export default function AboutPage(){
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-4">Safe Instrumentation in Endodontics</h1>
      <p className="text-slate-300 mb-6">A practical 65-page digital book for clinicians and students who want a safer, more predictable approach to endodontic instrumentation and treatment decisions.</p>

      <section className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
        <h2 className="text-xl font-semibold text-white mb-2">What you will receive</h2>
        <p className="text-slate-300">After your $19 payment is verified, you receive secure access to the complete PDF book. The first three pages are available as a free preview.</p>
      </section>

      <section className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Manual payment</h3>
          <p className="text-slate-300 text-sm">Pay through Zain Cash or Switch Card and send your receipt through WhatsApp.</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Secure delivery</h3>
          <p className="text-slate-300 text-sm">Once verified, download access is released through a short-lived protected link.</p>
        </div>
      </section>

    </main>
  );
}