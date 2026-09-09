export const metadata = {
  title: 'Privacy Policy — Endoholic',
  description: 'How Endoholic collects, uses, and protects your information.'
};

export default function PrivacyPage(){
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-slate-400 text-sm mb-8">Last updated: August 10, 2026</p>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Overview</h2>
          <p>Endoholic (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides access to the Safe Instrumentation in Endodontics digital book, including a sample preview and manually verified purchases. This policy explains what information we collect, how we use it, and the choices you have.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Information We Collect</h2>
          <p>We collect your name and email address when you create a book order. We store your order, payment method, and verification status securely so we can process payment confirmation and provide download access.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Payments</h2>
          <p>Zain Cash and Switch Card payments are processed manually; you send a payment receipt to our WhatsApp contact for verification. We do not collect or store card numbers, CVV codes, or other card credentials.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. How We Use Information</h2>
          <p>We use the information you provide to respond to inquiries, verify manual payments, and release your book download. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Cookies & Local Storage</h2>
          <p>We use a temporary browser session token to remember a verified book order during your visit. We do not currently use tracking or advertising cookies.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Content Protection</h2>
          <p>To protect the copyrighted book, the reader disables certain actions such as right-click, printing, and screenshot shortcuts, and displays a visible watermark. This is a deterrent measure, not a guarantee against all forms of copying.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Data Retention & Your Choices</h2>
          <p>You can clear your temporary access token by closing your browser session. To request deletion of order or contact information, contact us using the details below.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. Changes to This Policy</h2>
          <p>We may update this policy as the platform evolves, particularly as we add real user accounts and payment processing. We will update the &quot;Last updated&quot; date above when changes are made.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. Contact Us</h2>
          <p>Questions about this policy can be sent to <a href="mailto:duaa0safaa@gmail.com" className="text-teal-300 hover:underline">duaa0safaa@gmail.com</a> or via our <a href="/contact" className="text-teal-300 hover:underline">Contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
