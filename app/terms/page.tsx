export const metadata = {
  title: 'Terms of Service — Endoholic',
  description: 'The terms governing use of the Endoholic platform.'
};

export default function TermsPage(){
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
      <p className="text-slate-400 text-sm mb-8">Last updated: August 10, 2026</p>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using Endoholic (&quot;the Platform&quot;), you agree to these Terms of Service. If you do not agree, please do not use the Platform.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Book Access</h2>
          <p>Visitors may preview the first three pages of Safe Instrumentation in Endodontics. Full PDF access is released after the $19 payment is received and manually verified. Details are described on our <a href="/pricing" className="text-teal-300 hover:underline">book purchase page</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Payments & Refunds</h2>
          <p>Payments are handled manually through Zain Cash or Switch Card and reviewed before download access is released. If a payment is made in error or access is not released as expected, contact us and we will review the situation in good faith.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Acceptable Use</h2>
          <p>The book is provided for personal use only. You agree not to copy, redistribute, resell, or publicly share the PDF, and not to attempt to circumvent content-protection measures.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Intellectual Property</h2>
          <p>Safe Instrumentation in Endodontics remains the property of its author and rights holders. Purchase grants personal access, not ownership or redistribution rights.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. No Medical Advice</h2>
          <p>Content on the Platform is educational in nature and does not constitute clinical, medical, or professional advice for any specific patient or case. Clinicians remain responsible for their own professional judgment.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Limitation of Liability</h2>
          <p>The Platform is provided &quot;as is&quot; without warranties of any kind. To the fullest extent permitted by law, Endoholic is not liable for indirect, incidental, or consequential damages arising from use of the Platform.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. Termination</h2>
          <p>We may suspend or terminate access for users who violate these Terms, including unauthorized redistribution of content or fraudulent payment activity.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. Changes to These Terms</h2>
          <p>We may update these Terms as the Platform evolves. Continued use of the Platform after changes take effect constitutes acceptance of the updated Terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">10. Contact</h2>
          <p>Questions about these Terms can be sent to <a href="mailto:duaa0safaa@gmail.com" className="text-teal-300 hover:underline">duaa0safaa@gmail.com</a> or via our <a href="/contact" className="text-teal-300 hover:underline">Contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
