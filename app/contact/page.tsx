export const metadata = {
  title: 'Contact — Endoholic',
  description: 'Contact Endoholic support and partnership inquiries.'
};

import ContactForm from './ContactForm';

export default function ContactPage(){
  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
      <p className="text-slate-300 mb-6">For help with your book order, payment verification, or download access, reach out and our team will respond within 48 hours.</p>

      <div className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
        <h2 className="text-lg font-semibold text-white">General Inquiries</h2>
        <p className="text-slate-300 text-sm">Email: <a className="text-brand-500 hover:underline" href="mailto:duaa0safaa@gmail.com">duaa0safaa@gmail.com</a></p>
      </div>

      <ContactForm />
    </main>
  );
}