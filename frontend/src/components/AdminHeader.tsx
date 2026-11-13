import { Link } from "react-router-dom";

export function AdminHeader() {
  return (
    <header className="h-20 border-b border-slate-200 flex items-center px-8 shrink-0 bg-white">
      <Link 
        to="/" 
        className="bg-[#1a2e2b] text-white font-bold text-sm rounded-md w-10 h-10 flex items-center justify-center tracking-tighter hover:bg-[#12201e] transition-colors"
      >
        TR
      </Link>
    </header>
  );
}