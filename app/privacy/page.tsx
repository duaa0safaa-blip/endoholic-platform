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
          <p>Endoholic ("we", "us", "our") provides an online platform for endodontics and dental education content, including sample previews, courses, and subscription-based access to books and articles. This policy explains what information we collect, how we use it, and the choices you have.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Information We Collect</h2>
          <p>We collect information you provide directly, such as your name and email address when you contact us or request access. We also store a subscription status flag in your browser's local storage to remember whether you have unlocked full access on that device — this is not synced to an account or server-side database.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Payments</h2>
          <p>Domestic (Iraq) subscriptions are currently processed manually via bank/mobile-wallet transfer; you send a payment receipt to our contact address for manual verification. We do not collect or store card numbers, CVV codes, or other card credentials. International card payments are not yet available; if enabled in the future, they will be processed by a licensed third-party payment provider, who will handle your card details directly — Endoholic will never see or store full card numbers.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. How We Use Information</h2>
          <p>We use the information you provide to respond to inquiries, verify manual payments, and activate subscriptions. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Cookies & Local Storage</h2>
          <p>We use browser local storage to remember your subscription status on a given device. We do not currently use tracking or advertising cookies.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Content Protection</h2>
          <p>To protect copyrighted course and book content, the reader disables certain actions such as right-click, printing, and screenshot shortcuts, and displays a visible watermark. This is a deterrent measure, not a guarantee against all forms of copying.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Data Retention & Your Choices</h2>
          <p>You can clear your subscription status at any time by clearing your browser's local storage for this site. To request deletion of any information you've sent us directly (e.g. via the contact form or email), contact us using the details below.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. Changes to This Policy</h2>
          <p>We may update this policy as the platform evolves, particularly as we add real user accounts and payment processing. We will update the "Last updated" date above when changes are made.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. Contact Us</h2>
          <p>Questions about this policy can be sent to <a href="mailto:duaa0safaa@gmail.com" className="text-teal-300 hover:underline">duaa0safaa@gmail.com</a> or via our <a href="/contact" className="text-teal-300 hover:underline">Contact page</a>.</p>
        </section>
      </div>
    </main>
  );
}
