'use client';

import React from 'react';

export default function ContactForm(){
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message submitted (demo)');
  };

  return (
    <form className="mt-6 grid gap-4" action="#" onSubmit={handleSubmit}>
      <label className="flex flex-col text-sm text-slate-200">
        <span>Name</span>
        <input name="name" className="mt-1 p-2 rounded bg-slate-700 border border-white/10" placeholder="Your name" />
      </label>
      <label className="flex flex-col text-sm text-slate-200">
        <span>Email</span>
        <input name="email" className="mt-1 p-2 rounded bg-slate-700 border border-white/10" placeholder="you@example.com" />
      </label>
      <label className="flex flex-col text-sm text-slate-200">
        <span>Message</span>
        <textarea name="message" className="mt-1 p-2 rounded bg-slate-700 border border-white/10" rows={6} placeholder="How can we help?" />
      </label>
      <button type="submit" className="w-full bg-brand-500 hover:bg-brand-700 text-slate-900 py-3 rounded font-semibold">Send Message</button>
    </form>
  );
}
