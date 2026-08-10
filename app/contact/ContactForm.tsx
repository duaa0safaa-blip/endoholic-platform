'use client';

import { useState } from 'react';

const CONTACT_EMAIL = 'duaa0safaa@gmail.com';

export default function ContactForm(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Endoholic contact form — ${name || 'New message'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col text-sm text-slate-200">
        <span>Name</span>
        <input name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 rounded bg-slate-700 border border-white/10" placeholder="Your name" />
      </label>
      <label className="flex flex-col text-sm text-slate-200">
        <span>Email</span>
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 rounded bg-slate-700 border border-white/10" placeholder="you@example.com" />
      </label>
      <label className="flex flex-col text-sm text-slate-200">
        <span>Message</span>
        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 p-2 rounded bg-slate-700 border border-white/10" rows={6} placeholder="How can we help?" />
      </label>
      <button type="submit" className="w-full bg-brand-500 hover:bg-brand-700 text-slate-900 py-3 rounded font-semibold">Send Message</button>
    </form>
  );
}
