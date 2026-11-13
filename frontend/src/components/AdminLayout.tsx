import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminFooter } from "./AdminFooter";

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. The Left Sidebar */}
      <AdminSidebar />

      {/* 2. The Right Side (Header + Page Content + Footer) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <AdminHeader />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* The Outlet renders whichever page the URL points to (e.g., AdminBlogsPage) */}
          <Outlet /> 
        </main>

        {/* Bottom Footer */}
        <AdminFooter />
        
      </div>
    </div>
  );
}