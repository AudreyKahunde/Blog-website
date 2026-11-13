import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-[#1a2e2b] text-white font-bold text-sm rounded-md w-10 h-10 flex items-center justify-center tracking-tighter">
            TR
          </div>
          <div className="flex flex-col">
            <span className="font-['Playfair_Display'] font-bold text-lg leading-tight text-slate-900">
              The Tech Report <span className="text-[10px] font-sans font-normal text-slate-500 align-top">™</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
              Notes on Technology, Architecture & Culture
            </span>
          </div>
        </NavLink>

        {/* Optional: If you want a link to the blog page in the top right, uncomment this */}
        {/* <div className="hidden md:flex items-center gap-6">
          <NavLink to="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            All Articles
          </NavLink>
        </div> */}

      </div>
    </nav>
  );
}