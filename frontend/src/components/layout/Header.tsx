import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Landmark, Bell, User as UserIcon, Menu, X, LogOut,
  FileText, LayoutDashboard, Layers, Lock, ShieldCheck,
  Sparkles, ChevronDown, Globe
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
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gov-950 via-gov-900 to-gov-800 flex items-center justify-center p-1 text-white shadow-gov ring-1 ring-gov-800/50 group-hover:ring-saffron-400/40 group-hover:shadow-gov-glow transition-all duration-300">
                  <NationalEmblem size="sm" variant="gold" />
                </div>
                {/* Live pulse dot */}
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-[1.2rem] font-black tracking-tight text-stone-900 font-serif leading-none">
                    SAMAVAY
                  </span>
                  <span className="text-[11px] font-bold text-gov-800 font-serif">
                    (समवाय)
                  </span>
                  <span className="text-[9px] font-bold text-saffron-700 bg-saffron-50 border border-saffron-200 px-1.5 py-0.5 rounded uppercase tracking-widest font-mono">
                    DPI
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-medium tracking-tight leading-none block mt-0.5">
                  National Interoperability & Citizen Services Mesh
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden xl:flex items-center space-x-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-150 ${
                      active
                        ? 'text-gov-800 bg-gov-50'
                        : 'text-stone-600 hover:text-gov-800 hover:bg-stone-50'
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
            <div className="hidden sm:flex items-center space-x-2">
              {/* Admin Portal Link */}
              <Link
                to="/admin/control-center"
                className="group flex items-center gap-1.5 px-3 py-2 bg-gov-950 hover:bg-gov-900 text-white text-[11px] font-bold rounded-xl transition-all duration-200 shadow-xs border border-gov-800 hover:border-saffron-600/30 hover:shadow-gov-glow"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-saffron-400 group-hover:scale-110 transition-transform" />
                <span>Admin Console</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {/* Notification Bell */}
                  <Link
                    to="/notifications"
                    className="relative p-2 rounded-xl text-stone-600 hover:text-gov-800 hover:bg-gov-50 transition border border-stone-200 hover:border-gov-300"
                  >
                    <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-60" />
                        <span className="relative">{unreadCount}</span>
                      </span>
                    )}
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl border border-stone-200 hover:border-gov-400 hover:bg-stone-50 text-[11px] font-bold text-stone-800 transition-all duration-150 cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gov-700 to-gov-900 text-white flex items-center justify-center font-black text-[10px] shadow-xs">
                        {user?.fullName?.charAt(0) || 'C'}
                      </div>
                      <span className="max-w-[90px] truncate">{user?.fullName?.split(' ')[0] || 'Citizen'}</span>
                      <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-stone-200/80 py-1.5 z-50 animate-fade-in-scale text-xs">
                        {/* User info header */}
                        <div className="px-4 py-3 border-b border-stone-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gov-700 to-gov-900 text-white flex items-center justify-center font-black text-sm shadow-xs">
                              {user?.fullName?.charAt(0) || 'C'}
                            </div>
                            <div>
                              <p className="font-bold text-stone-900">{user?.fullName}</p>
                              <p className="text-[10px] text-stone-500 truncate">{user?.email}</p>
                            </div>
                          </div>
                          <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-gov-800 bg-gov-50 border border-gov-200 px-2 py-0.5 rounded-full">
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
                              className="flex items-center justify-between px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-gov-800 transition"
                            >
                              <span className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5 text-gov-700" />
                                {label}
                              </span>
                              {badge && badge > 0 && (
                                <span className="text-[9px] font-black bg-rose-600 text-white w-4 h-4 rounded-full flex items-center justify-center">
                                  {badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-stone-100 pt-1 pb-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
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
                    className="px-3.5 py-2 text-[11px] font-bold text-stone-700 hover:text-gov-800 hover:bg-stone-100 rounded-xl transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-2 text-[11px] font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl transition shadow-xs hover:shadow-gov"
                  >
                    Register →
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-1 animate-slide-down text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
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
                className="w-full text-center py-2.5 bg-gov-950 hover:bg-gov-900 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-saffron-400" />
                Admin Console
              </Link>

              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className="text-center py-2.5 border border-stone-300 font-bold rounded-xl text-stone-800 hover:bg-stone-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
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
