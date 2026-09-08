'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-slate-900/80 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-slate-300 mb-6">
          We hit an unexpected error loading this page. Please try again — if the problem
          continues, contact us and we&apos;ll help right away.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => retry()}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-semibold text-white cursor-pointer"
          >
            Try again
          </button>
          <a
            href="/contact"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold text-slate-200"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
