import { Link, useLocation } from "react-router-dom";
import { FileText, CreditCard, Users, LogOut } from "lucide-react";

export function AdminSidebar() {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 border-r border-slate-200 bg-[#F9FAFB] flex flex-col justify-between hidden md:flex shrink-0">
      <div>
        {/* Sidebar Header */}
        <div className="p-6 pb-8">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-slate-900">The Tech Report</h2>
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/admin") ? "bg-[#1a2e2b] text-white" : "text-slate-600 hover:bg-slate-200/50"
            }`}
          >
            <FileText className="size-4" /> Blogs
          </Link>
          
          <Link 
            to="/admin/transactions" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/admin/transactions") ? "bg-[#1a2e2b] text-white" : "text-slate-600 hover:bg-slate-200/50"
            }`}
          >
            <CreditCard className="size-4" /> Transactions
          </Link>

          <Link 
            to="/admin/users" 
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/admin/users") ? "bg-[#1a2e2b] text-white" : "text-slate-600 hover:bg-slate-200/50"
            }`}
          >
            <Users className="size-4" /> Users
          </Link>
        </nav>
      </div>

      {/* Admin Profile (Bottom of Sidebar) */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs">
              A
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Admin</p>
              <p className="text-[10px] text-slate-500 truncate w-24">editor@thetechrepo...</p>
            </div>
          </div>
          <LogOut className="size-4 text-slate-400 cursor-pointer hover:text-slate-900 transition-colors" />
        </div>
      </div>
    </aside>
  );
}