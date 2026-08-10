export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 text-2xl font-extrabold mb-6">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-slate-300 text-sm max-w-md mb-8">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <a
        href="/"
        className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-lg text-sm"
      >
        Back to home
      </a>
    </main>
  );
}
