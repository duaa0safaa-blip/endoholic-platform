export default function SiteFooter() {
  return (
    <footer className="text-xs text-slate-200 text-center py-6 z-10 bg-slate-900/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-teal-500/20 flex items-center justify-center text-teal-300 font-bold">E</div>
          <div className="text-left">
            <div className="font-semibold">Endoholic Platform</div>
            <div className="text-[11px] text-slate-300">Digital Dentistry & Endodontics</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-300 flex-wrap justify-center">
          <a href="/about" className="hover:text-white text-xs">About</a>
          <a href="/pricing" className="hover:text-white text-xs">Pricing</a>
          <a href="/contact" className="hover:text-white text-xs">Contact</a>
          <a href="/privacy" className="hover:text-white text-xs">Privacy Policy</a>
          <a href="/terms" className="hover:text-white text-xs">Terms of Service</a>
        </div>

        <div className="text-slate-400 text-[11px]">© 2026 Endoholic Platform. All rights reserved.</div>
      </div>
    </footer>
  );
}
