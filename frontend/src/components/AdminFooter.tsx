import { MapPin } from "lucide-react";

export function AdminFooter() {
  return (
    <footer className="border-t border-slate-200 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 bg-white shrink-0">
      
      {/* Left Side: Branding */}
      <div className="flex items-center gap-3">
        <div className="bg-[#1a2e2b] text-white font-bold text-xs rounded w-8 h-8 flex items-center justify-center tracking-tighter">
          TR
        </div>
        <div>
          <p className="font-semibold text-slate-900">The Tech Report ™</p>
          <p>Archival explorations in technology, architectural restraint, and culture.</p>
        </div>
      </div>

      {/* Right Side: Location & Copyright */}
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3" /> Kampala · Uganda
        </span>
        <span>© 2026 The Tech Report. All rights reserved.</span>
      </div>
      
    </footer>
  );
}