import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Landmark, Eye, EyeOff, ShieldCheck, ArrowRight, UserCheck,
  AlertCircle, Zap, Lock, Building2, Globe, Check,
  FileText, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

// ── Trust indicators row ──
const trustItems = [
  { icon: ShieldCheck, text: 'DPDP Act 2023 Compliant', color: 'text-gov-700' },
  { icon: Lock,        text: 'mTLS PKI_X509 Secure',   color: 'text-gov-700' },
  { icon: FileText,    text: 'Sovereign Citizen Account',color: 'text-saffron-700' },
];

// ── The live DPI mesh behind the split panel ──
const DPIMeshSVG: React.FC = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
    <defs>
      <radialGradient id="meshGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#0284c7" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#062648" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="400" fill="url(#meshGrad)" />

    {/* Grid lines */}
    {[50,100,150,200,250,300,350].map(v => (
      <React.Fragment key={v}>
        <line x1={v} y1={0} x2={v} y2={400} stroke="#38bdf8" strokeWidth="0.4" strokeOpacity="0.25" />
        <line x1={0} y1={v} x2={400} y2={v} stroke="#38bdf8" strokeWidth="0.4" strokeOpacity="0.25" />
      </React.Fragment>
    ))}

    {/* Animated data flow lines */}
    <path d="M 80 80 Q 200 120 320 200" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeDasharray="6 4" className="animate-dash-flow" />
    <path d="M 80 200 Q 180 150 320 120" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="6 4" className="animate-dash-flow-fast" />
    <path d="M 80 320 Q 200 280 320 300" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeDasharray="6 4" className="animate-dash-flow" style={{animationDelay:'1s'}} />

    {/* Platform nodes */}
    {[
      { cx: 80,  cy: 80,  label: 'Bhoomi',    color: '#0369a1' },
      { cx: 80,  cy: 200, label: 'SARATHI',   color: '#0284c7' },
      { cx: 80,  cy: 320, label: 'DigiLocker',color: '#075985' },
      { cx: 320, cy: 120, label: 'Municipal', color: '#0c4a6e' },
      { cx: 320, cy: 200, label: 'Health',    color: '#0284c7' },
      { cx: 320, cy: 300, label: 'Welfare',   color: '#0369a1' },
      { cx: 200, cy: 200, label: 'SAMAVAY',   color: '#0054a3' },
    ].map(({ cx, cy, label, color }) => (
      <g key={label} className="animate-pulse-node" style={{animationDelay: `${Math.random()*2}s`}}>
        <circle cx={cx} cy={cy} r={label === 'SAMAVAY' ? 22 : 14} fill={color} fillOpacity="0.9" />
        <circle cx={cx} cy={cy} r={label === 'SAMAVAY' ? 30 : 20} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={label === 'SAMAVAY' ? '8' : '6'} fontWeight="bold" fontFamily="monospace">
          {label}
        </text>
      </g>
    ))}

    {/* Connecting lines from center to all */}
    {[[80,80],[80,200],[80,320],[320,120],[320,200],[320,300]].map(([x,y], i) => (
      <line key={i} x1={200} y1={200} x2={x} y2={y}
        stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4 4"
        className="animate-dash-flow" style={{animationDelay:`${i*0.3}s`}}
      />
    ))}
  </svg>
);

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo, isLoading } = useAuth();

  const [identifier, setIdentifier]       = useState('citizen.demo@samavay.gov.in');
  const [password, setPassword]           = useState('DemoPass@2026');
  const [showPassword, setShowPassword]   = useState(false);
  const [rememberMe, setRememberMe]       = useState(true);
  const [errorMsg, setErrorMsg]           = useState('');
  const [loginRole, setLoginRole]         = useState<'CITIZEN' | 'OFFICER'>('CITIZEN');
  const [mounted, setMounted]             = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await login(identifier, password);
      if (loginRole === 'OFFICER' || identifier.includes('admin') || identifier.includes('officer')) {
        navigate('/admin/control-center');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleDemoCitizenLogin = async () => {
    setErrorMsg('');
    try {
      await loginAsDemo();
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Demo login failed.');
    }
  };

  const handleOfficerSwitch = () => {
    setLoginRole('OFFICER');
    setIdentifier('officer.admin@samavay.gov.in');
    setPassword('OfficerPass@2026');
  };

  const handleCitizenSwitch = () => {
    setLoginRole('CITIZEN');
    setIdentifier('citizen.demo@samavay.gov.in');
    setPassword('DemoPass@2026');
  };

  return (
    <div className="min-h-screen bg-sandstone-100 grid lg:grid-cols-2">
      {/* ── LEFT PANEL: Animated DPI Visual ── */}
      <div className="hidden lg:flex flex-col bg-gov-950 relative overflow-hidden">
        {/* Mesh animation */}
        <div className="absolute inset-0">
          <DPIMeshSVG />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-saffron-400" />
            </div>
            <div>
              <span className="text-white font-black text-lg font-serif">SAMAVAY</span>
              <p className="text-gov-300 text-[10px] font-medium">National DPI • SIH26129</p>
            </div>
          </div>

          {/* Center message */}
          <div className={`space-y-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-gov-200 text-[10px] font-bold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              LIVE INTEROPERABILITY MESH
            </div>

            <h2 className="text-3xl font-black text-white font-serif leading-tight">
              One Account.<br />
              <span className="text-saffron-400">Every Government Service.</span>
            </h2>

            <p className="text-gov-300 text-sm leading-relaxed max-w-sm">
              SAMAVAY connects Bhoomi LRS, SARATHI, e-NagarPalika, DigiLocker — and auto-verifies
              your documents so you never upload the same file twice.
            </p>

            {/* Live stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '62%', label: 'Data Auto-Reuse' },
                { value: '98.4%', label: 'Uptime SLA' },
                { value: '1.66M+', label: 'Citizens Served' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/8 border border-white/12 rounded-xl p-3">
                  <p className="text-white font-black text-xl font-mono">{value}</p>
                  <p className="text-gov-400 text-[10px] font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom trust strip */}
          <div className="flex flex-wrap gap-3 text-[10px] text-gov-400 font-medium">
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" />DPDP Act 2023</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" />mTLS Encrypted</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" />NIC Hosted</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 bg-sandstone-100">
        <div className={`w-full max-w-md mx-auto space-y-6 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gov-950 flex items-center justify-center">
              <Landmark className="w-4.5 h-4.5 w-[18px] h-[18px] text-saffron-400" />
            </div>
            <span className="font-black text-stone-900 font-serif text-lg">SAMAVAY</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              {loginRole === 'CITIZEN' ? 'Citizen Sign In' : 'Officer Console Access'}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Sovereign digital identity — secured under DPDP Act 2023
            </p>
          </div>

          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-white border border-stone-200 rounded-2xl shadow-xs text-xs font-bold">
            <button
              type="button"
              onClick={handleCitizenSwitch}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                loginRole === 'CITIZEN'
                  ? 'bg-gov-950 text-white shadow-gov'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Citizen Portal</span>
            </button>
            <button
              type="button"
              onClick={handleOfficerSwitch}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                loginRole === 'OFFICER'
                  ? 'bg-gov-950 text-white shadow-gov'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Officer / Admin</span>
            </button>
          </div>

          {/* 1-Click Demo */}
          <button
            type="button"
            onClick={loginRole === 'CITIZEN' ? handleDemoCitizenLogin : handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gov-300 hover:border-gov-500 hover:bg-gov-50 rounded-2xl text-xs font-bold text-stone-900 transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-gov"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gov-100 flex items-center justify-center">
                <Zap className="w-4 h-4 text-gov-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <p className="font-bold text-stone-900">
                  {loginRole === 'CITIZEN' ? '1-Click Citizen Demo Login' : '1-Click Admin Console Access'}
                </p>
                <p className="text-[10px] text-stone-500 font-medium">Pre-filled demo credentials for SIH evaluation</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gov-700 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-sandstone-100 px-3 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                or sign in with credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 animate-fade-in-scale">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Input
              label="Email Address or Mobile Number"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. citizen.demo@samavay.gov.in"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-stone-800">Password</label>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); alert('Demo environment password: DemoPass@2026 (citizen) or OfficerPass@2026 (admin)'); }}
                  className="text-[11px] text-gov-700 hover:text-gov-900 font-semibold hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs text-stone-900 bg-white border border-stone-300 rounded-xl py-2.5 pl-3.5 pr-10 focus:border-gov-600 focus:ring-1 focus:ring-gov-600 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-gov-600 focus:ring-gov-500 cursor-pointer"
              />
              <span className="text-xs text-stone-600">Remember this device for 30 days</span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-gov hover:shadow-gov-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-4 pt-1">
            {trustItems.map(({ icon: Icon, text, color }) => (
              <span key={text} className={`flex items-center gap-1 text-[10px] font-medium ${color}`}>
                <Icon className="w-3 h-3" />
                {text}
              </span>
            ))}
          </div>

          {/* Register link */}
          <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-200">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-gov-700 hover:text-gov-900 hover:underline">
              Register as a Citizen →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
