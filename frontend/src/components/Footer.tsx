import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-[#F3F4F6] border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-slate-300/60">
          <div className="flex items-center gap-4">
            <div className="bg-[#e8e5dc] text-slate-900 font-bold text-lg rounded-lg w-12 h-12 flex items-center justify-center tracking-tighter">
              TR
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] font-semibold text-lg text-slate-900 flex items-center gap-1">
                The Tech Report <span className="text-xs font-sans font-normal text-slate-500 mt-1">™</span>
              </h3>
              <p className="text-sm text-slate-500">Archival explorations in technology, architectural restraint, and culture.</p>
            </div>
          </div>

          <Link to="/admin">
            <Button variant="outline" className="rounded-full bg-white border-slate-300 text-slate-700">
              <Lock className="mr-2 size-4 text-slate-400" /> Admin Portal <ArrowRight className="ml-2 size-4 text-slate-400" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-xs text-slate-500">
          <p>© 2026 The Tech Report. All rights reserved.</p>
          <p>Kampala · Uganda</p>
        </div>

      </div>
    </footer>
  );
}