import React from 'react';
import { Menu, Sparkles, PlusCircle, UploadCloud, ShieldCheck, LayoutTemplate } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Navbar = ({ onOpenSidebar }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left side: Hamburger + Page context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Spring Boot REST API • AI Job Engine Ready</span>
        </div>

        {isAdmin && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            {isAdminPath ? 'Admin Portal' : 'Admin Account'}
          </span>
        )}
      </div>

      {/* Right side: Quick actions + User profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/upload-resume"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        >
          <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">Upload PDF</span>
        </Link>

        <Link
          to="/resume-builder"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm shadow-brand-500/20 active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Resume</span>
        </Link>

        <Link
          to="/job-matcher"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span className="hidden sm:inline">AI Matcher</span>
        </Link>

        {/* User avatar indicator */}
        <Link
          to="/profile"
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
            isAdmin
              ? 'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
          title="Go to Profile"
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
