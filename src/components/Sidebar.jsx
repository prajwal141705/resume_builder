import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Files,
  FilePlus,
  UploadCloud,
  LayoutTemplate,
  Sparkles,
  User,
  Settings,
  LogOut,
  X,
  Bot,
  ShieldCheck,
  Users,
  Briefcase,
  Layers,
  ArrowLeftRight,
  Search,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith('/admin');

  // User navigation items
  const userNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/resumes', label: 'My Resumes', icon: Files },
    { to: '/resume-builder', label: 'Create Resume', icon: FilePlus },
    { to: '/upload-resume', label: 'Upload PDF', icon: UploadCloud, badge: 'PDF' },
    { to: '/templates', label: 'Browse Templates', icon: LayoutTemplate },
    { to: '/job-matcher', label: 'AI Job Matcher', icon: Sparkles, badge: 'AI' },
    { to: '/jobs', label: 'Find Jobs', icon: Briefcase },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  // Admin navigation items
  const adminNavItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/resumes', label: 'Uploaded Resumes', icon: Files },
    { to: '/admin/templates', label: 'Resume Templates', icon: LayoutTemplate },
    { to: '/admin/jobs', label: 'Job Postings', icon: Briefcase },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const currentNavItems = isAdmin && isAdminPath ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <NavLink to={isAdmin && isAdminPath ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md ${
                isAdmin && isAdminPath 
                  ? 'bg-gradient-to-tr from-amber-600 to-amber-500 shadow-amber-500/30' 
                  : 'bg-gradient-to-tr from-brand-600 to-brand-500 shadow-brand-500/30'
              }`}>
                {isAdmin && isAdminPath ? <ShieldCheck className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 leading-tight">
                  Resum<span className={isAdmin && isAdminPath ? 'text-amber-600' : 'text-brand-600'}>AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  {isAdmin && isAdminPath ? 'Admin Console' : 'Career Intelligence'}
                </span>
              </div>
            </NavLink>

            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Mode Switcher for Admins */}
          {isAdmin && (
            <div className="p-3 mx-3 mt-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Active Mode
                </span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                  isAdminPath ? 'bg-amber-100 text-amber-800' : 'bg-brand-100 text-brand-800'
                }`}>
                  {isAdminPath ? 'ADMIN' : 'USER'}
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate(isAdminPath ? '/dashboard' : '/admin/dashboard');
                }}
                className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 px-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors shadow-2xs"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Switch to {isAdminPath ? 'User View' : 'Admin Panel'}</span>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 pb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {isAdmin && isAdminPath ? 'Administration' : 'Menu'}
              </span>
            </div>
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? isAdmin && isAdminPath
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 shadow-xs'
                          : 'bg-brand-50 text-brand-700 border border-brand-200/60 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-600 text-white rounded-md tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-xs ${
              isAdmin ? 'bg-amber-600' : 'bg-brand-600'
            }`}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
