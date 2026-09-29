import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Building2,
  Server,
  Network,
  Layers,
  FileCheck,
  ShieldAlert,
  Activity,
  ScrollText,
  Settings,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ExternalLink,
  Lock,
  LogOut,
  Landmark,
  UserCheck,
  Cpu,
  Sliders,
  Database,
  ArrowLeftRight,
  Bell,
  BarChart3,
  Play,
  Lightbulb,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Grouped Navigation Structure (PART 3)
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Control Center', path: '/admin/control-center', icon: LayoutDashboard },
        { name: 'SIH Demo Mode', path: '/admin/demo', icon: Play },
        { name: 'Smart Insights', path: '/admin/insights', icon: Lightbulb },
        { name: 'Interoperability Analytics', path: '/admin/analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'PLATFORM MANAGEMENT',
      items: [
        { name: 'Departments', path: '/admin/departments', icon: Building2 },
        { name: 'Government Platforms', path: '/admin/platforms', icon: Server },
        { name: 'Integrations Hub', path: '/admin/integrations', icon: Layers },
        { name: 'Service Dependency Map', path: '/admin/service-mapping', icon: Network },
        { name: 'Data Requirements', path: '/admin/data-requirements', icon: FileCheck },
        { name: 'Data Sources & Fallbacks', path: '/admin/data-sources', icon: Database },
      ]
    },
    {
      title: 'OPERATIONS & HEALTH',
      items: [
        { name: 'Service Orchestrator', path: '/admin/orchestration', icon: Cpu },
        { name: 'Platform Status & Impact', path: '/admin/platform-status', icon: Activity },
        { name: 'Data Exchange Activity', path: '/admin/data-exchange', icon: ArrowLeftRight },
        { name: 'Monitoring & Health', path: '/admin/monitoring', icon: Server },
        { name: 'Admin Alert Center', path: '/admin/alerts', icon: Bell },
      ]
    },
    {
      title: 'GOVERNANCE & AUDIT',
      items: [
        { name: 'API Access Policies', path: '/admin/access-policies', icon: Lock },
        { name: 'Interoperability Rules', path: '/admin/rules', icon: Sliders },
        { name: 'Consent Management', path: '/admin/consents', icon: ShieldAlert },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: ScrollText },
        { name: 'System Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin/control-center' && (location.pathname === '/admin' || location.pathname === '/admin/overview' || location.pathname === '/admin/control-center')) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      {/* Admin Top Sovereign Ribbon */}
      <div className="bg-[#092119] text-stone-100 text-xs py-2 px-4 sm:px-6 flex items-center justify-between border-b border-[#164a37]">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold tracking-wider font-serif uppercase">SAMAVAY ADMINISTRATION & GATEWAY CONTROL</span>
          <span className="hidden md:inline text-stone-500">|</span>
          <span className="hidden md:inline text-stone-300 text-[11px]">Production Node • DPDP Act Governed</span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/how-samavay-works"
            className="text-saffron-300 hover:text-white transition flex items-center space-x-1 font-semibold text-[11px]"
          >
            <span>How SAMAVAY Works</span>
            <Sparkles className="w-3 h-3 ml-0.5" />
          </Link>
          <Link
            to="/dashboard"
            className="text-stone-300 hover:text-white transition flex items-center space-x-1 font-semibold text-[11px]"
          >
            <span>Citizen Portal</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar (Desktop) (PART 3) */}
        <aside
          className={`hidden lg:flex flex-col bg-white border-r border-stone-200/90 shadow-card transition-all duration-200 ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Admin Header / Role Card */}
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gov-900 text-white flex items-center justify-center font-bold shadow-xs flex-shrink-0">
                <Landmark className="w-5 h-5 text-saffron-400" />
              </div>
              {!isCollapsed && (
                <div className="truncate">
                  <p className="text-xs font-bold text-stone-900 leading-tight font-serif">Admin Console</p>
                  <span className="text-[10px] font-semibold text-gov-800 bg-gov-50 px-2 py-0.5 rounded uppercase">
                    {user?.role || 'SUPER_ADMIN'}
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="p-3 space-y-4 flex-1 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {!isCollapsed && (
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 block">
                    {section.title}
                  </span>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={isCollapsed ? item.name : undefined}
                      className={`flex items-center ${
                        isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
                      } rounded-xl text-xs font-semibold transition-all duration-150 ${
                        active
                          ? 'bg-gov-50 text-gov-800 font-bold border border-gov-200 shadow-xs'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-gov-700' : 'text-stone-400'}`} />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </div>
                      {!isCollapsed && active && <ChevronRight className="w-3.5 h-3.5 text-gov-600 flex-shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Bottom Officer Profile */}
          <div className="p-3 border-t border-stone-100">
            {!isCollapsed ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-gov-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {user?.fullName?.charAt(0) || 'A'}
                  </div>
                  <div className="truncate text-xs">
                    <p className="font-bold text-stone-900 truncate">{user?.fullName || 'Nodal Officer'}</p>
                    <p className="text-[10px] text-stone-500 truncate">{user?.email || 'officer.admin@gov.in'}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-stone-400 hover:text-rose-600 rounded transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex justify-center p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Mobile Navigation Header Bar */}
          <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-800 flex items-center gap-1.5 shadow-xs"
            >
              <Menu className="w-4 h-4" />
              <span>Admin Menu</span>
            </button>
            <span className="text-xs font-bold text-stone-900 font-serif">SAMAVAY Operations</span>
          </div>

          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm lg:hidden flex">
          <div className="w-72 bg-white h-full shadow-2xl p-4 flex flex-col justify-between space-y-4 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gov-900 text-white flex items-center justify-center font-bold">
                  <Landmark className="w-4 h-4 text-saffron-400" />
                </div>
                <span className="text-sm font-bold text-stone-900 font-serif">Admin Navigation</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-4 flex-1 overflow-y-auto text-xs">
              {navSections.map((section) => (
                <div key={section.title} className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block px-2">
                    {section.title}
                  </span>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl font-semibold ${
                          active
                            ? 'bg-gov-50 text-gov-800 font-bold border border-gov-200'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? 'text-gov-700' : 'text-stone-400'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}
    </div>
  );
};
