export const metadata = {
  title: 'Pricing — Endoholic',
  description: 'Subscription plans and institutional licenses for Endoholic.'
};

export default function PricingPage(){
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-4">Pricing</h1>
      <p className="text-slate-300 mb-6">Flexible plans for individuals and institutions. All plans include access to core courses, downloadable resources, and community support.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold text-white">Free</h3>
          <p className="text-slate-300">Sample access to books and selected lectures. Great for evaluation and students.</p>
          <div className="mt-4 text-2xl font-bold">$0</div>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft border-2 border-brand-500">
          <h3 className="text-xl font-semibold text-white">Pro</h3>
          <p className="text-slate-300">Full access to the library, premium courses, and priority support. Ideal for practicing clinicians.</p>
          <div className="mt-4 text-2xl font-bold">$29 / month</div>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold text-white">Institutional</h3>
          <p className="text-slate-300">Custom licensing for universities and clinics with user management and reporting.</p>
          <div className="mt-4 text-2xl font-bold">Contact us</div>
        </div>
      </div>

      <section className="mt-8 bg-slate-800/50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-2">Discounts & CME</h2>
        <p className="text-slate-300 text-sm">We offer group discounts and continuing education (CME) certificates for eligible courses. Contact our team for institutional pricing and CME accreditation inquiries.</p>
      </section>
    </main>
  );
}