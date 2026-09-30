import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Landmark, Bell, User as UserIcon, Menu, X, LogOut,
  ShieldCheck, LayoutDashboard, FileText, Lock, ChevronDown, Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { NationalEmblem } from '../common/NationalEmblem';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 12);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Departments', path: '/departments' },
    { name: 'How It Works', path: '/how-samavay-works' },
    ...(isAuthenticated ? [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Applications', path: '/applications' },
    ] : []),
    { name: 'Help', path: '/help' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/97 backdrop-blur-md shadow-card border-b border-stone-200/80'
            : 'bg-white border-b border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── SAMAVAY Sovereign Brand Mark ── */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gov-950 via-gov-900 to-gov-800 flex items-center justify-center p-1 text-white shadow-gov ring-1 ring-gov-800/50 group-hover:ring-saffron-400/50 group-hover:shadow-gov-glow transition-all duration-300">
                  <NationalEmblem size="sm" variant="gold" />
                </div>
                {/* Live pulse dot */}
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-serif leading-none">
                    SAMAVAY
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gov-800 font-serif">
                    (समवाय)
                  </span>
                  <span className="text-[10px] font-extrabold text-saffron-800 bg-saffron-50 border border-saffron-300 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                    DPI
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] text-slate-600 font-medium tracking-tight leading-none block mt-1 truncate max-w-[165px] xs:max-w-[240px] sm:max-w-none">
                  National Interoperability & Citizen Services Mesh
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold tracking-normal transition-all duration-150 ${
                      active
                        ? 'text-gov-800 bg-gov-50 font-bold border border-gov-200/80 shadow-xs'
                        : 'text-slate-700 hover:text-gov-800 hover:bg-slate-100/80'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gov-700 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="hidden sm:flex items-center space-x-2.5">
              {/* Admin Portal Link */}
              <Link
                to="/admin/control-center"
                className="group flex items-center gap-1.5 px-3.5 py-2 bg-gov-950 hover:bg-gov-900 text-white text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 shadow-xs border border-gov-800 hover:border-saffron-500/50 hover:shadow-gov-glow"
              >
                <ShieldCheck className="w-4 h-4 text-saffron-400 group-hover:scale-110 transition-transform" />
                <span>Admin Console</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {/* Notification Bell */}
                  <Link
                    to="/notifications"
                    className="relative p-2 rounded-xl text-slate-700 hover:text-gov-800 hover:bg-gov-50 transition border border-slate-300 hover:border-gov-400"
                    title="View Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                        <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-60" />
                        <span className="relative">{unreadCount}</span>
                      </span>
                    )}
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl border border-slate-300 hover:border-gov-500 hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-150 cursor-pointer"
                    >
                      <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-br from-gov-700 to-gov-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
                        {user?.fullName?.charAt(0) || 'C'}
                      </div>
                      <span className="max-w-[100px] truncate">{user?.fullName?.split(' ')[0] || 'Citizen'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-modal border border-slate-200 py-1.5 z-50 animate-fade-in-scale text-xs sm:text-sm">
                        {/* User info header */}
                        <div className="px-4 py-3 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gov-700 to-gov-900 text-white flex items-center justify-center font-black text-sm shadow-xs">
                              {user?.fullName?.charAt(0) || 'C'}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm sm:text-base">{user?.fullName}</p>
                              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                          </div>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-gov-800 bg-gov-50 border border-gov-200 px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {user?.role || 'CITIZEN'}
                          </span>
                        </div>

                        <div className="py-1">
                          {[
                            { to: '/dashboard', icon: LayoutDashboard, label: 'Citizen Dashboard' },
                            { to: '/applications', icon: FileText, label: 'My Applications' },
                            { to: '/dashboard/permissions', icon: Lock, label: 'Data Permissions' },
                            { to: '/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
                          ].map(({ to, icon: Icon, label, badge }) => (
                            <Link
                              key={to}
                              to={to}
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center justify-between px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-gov-800 transition font-medium"
                            >
                              <span className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-gov-700" />
                                {label}
                              </span>
                              {badge && badge > 0 && (
                                <span className="text-[10px] font-black bg-rose-600 text-white w-4 h-4 rounded-full flex items-center justify-center">
                                  {badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-slate-100 pt-1 pb-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-700 hover:bg-rose-50 transition text-left cursor-pointer font-bold"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-gov-800 hover:bg-slate-100 rounded-xl transition border border-transparent hover:border-slate-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl transition shadow-xs hover:shadow-gov"
                  >
                    Register →
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Right Actions (Visible on < sm) ── */}
            <div className="flex sm:hidden items-center space-x-1.5">
              {isAuthenticated && (
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-xl text-slate-700 hover:text-gov-800 hover:bg-gov-50 transition border border-slate-300"
                  title="View Notifications"
                  aria-label="View Notifications"
                >
                  <Bell className="w-4.5 h-4.5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Desktop / Tablet Menu Button (for xl:hidden screens >= sm) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hidden sm:block xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-2 animate-slide-down text-xs">
            {/* Citizen Profile Strip for Authenticated Users */}
            {isAuthenticated && (
              <div className="p-3 bg-gradient-to-r from-gov-50 via-amber-50/40 to-stone-50 rounded-2xl border border-gov-200/90 space-y-2.5 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gov-800 to-gov-950 text-white flex items-center justify-center font-black text-sm shadow-xs">
                      {user?.fullName?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 font-serif leading-tight">
                        {user?.fullName || 'Verified Citizen'}
                      </p>
                      <span className="text-[10px] font-bold text-gov-800 bg-white px-2 py-0.5 rounded border border-gov-200 uppercase tracking-wider inline-block">
                        {user?.role || 'CITIZEN'} • VERIFIED
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/notifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-white border border-stone-200 text-slate-700 hover:text-gov-800 relative shadow-2xs"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-gov-200/60 text-[11px] font-bold">
                  <Link
                    to="/dashboard/permissions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white rounded-lg border border-gov-200 text-gov-900 text-center hover:bg-gov-50 flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Lock className="w-3 h-3 text-gov-700" />
                    <span>Data Consent</span>
                  </Link>
                  <Link
                    to="/applications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white rounded-lg border border-gov-200 text-gov-900 text-center hover:bg-gov-50 flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <FileText className="w-3 h-3 text-emerald-700" />
                    <span>My Applications</span>
                  </Link>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-xl font-bold transition ${
                  isActive(link.path)
                    ? 'bg-gov-50 text-gov-800 border border-gov-200'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <Link
                to="/admin/control-center"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-gov-950 hover:bg-gov-900 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-saffron-400" />
                Admin Console
              </Link>

              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 border border-stone-300 font-bold rounded-xl text-stone-800 hover:bg-stone-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 bg-gov-700 text-white font-bold rounded-xl hover:bg-gov-800 transition"
                  >
                    Register
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-rose-600 border border-rose-200 font-bold rounded-xl hover:bg-rose-50 transition cursor-pointer"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
