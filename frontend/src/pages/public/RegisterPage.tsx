import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Landmark, ShieldCheck, ArrowRight, AlertCircle, Check,
  Lock, Globe, RefreshCw, Eye, EyeOff, User as UserIcon, FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';

const benefits = [
  {
    icon: RefreshCw,
    title: 'Zero Duplicate Uploads',
    desc: 'Your Aadhaar, PAN, and land records are auto-fetched and verified from source databases.',
  },
  {
    icon: ShieldCheck,
    title: '62% Auto-Verified Data',
    desc: 'Over half your application data is pre-filled from SAMAVAY\'s connected government registries.',
  },
  {
    icon: Lock,
    title: 'DPDP Act 2023 Protected',
    desc: 'Your data is never stored beyond the stated purpose. You can revoke consent anytime.',
  },
];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [fullName,         setFullName]         = useState('');
  const [email,            setEmail]            = useState('');
  const [mobileNumber,     setMobileNumber]     = useState('');
  const [password,         setPassword]         = useState('');
  const [confirmPassword,  setConfirmPassword]  = useState('');
  const [showPassword,     setShowPassword]     = useState(false);
  const [dpdpConsent,      setDpdpConsent]      = useState(false);
  const [errorMsg,         setErrorMsg]         = useState('');
  const [mounted,          setMounted]          = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Password strength
  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel  = ['', 'Weak', 'Medium', 'Strong'][passwordStrength];
  const strengthColor  = ['', 'bg-rose-500', 'bg-saffron-500', 'bg-gov-600'][passwordStrength];
  const strengthWidth  = ['0%', '33%', '66%', '100%'][passwordStrength];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!dpdpConsent) {
      setErrorMsg('You must accept the DPDP Act terms to register.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    try {
      await register(fullName, email, mobileNumber, password);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen bg-sandstone-100 grid lg:grid-cols-2">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col bg-gov-950 relative overflow-hidden">
        {/* Atmospheric grid */}
        <div className="absolute inset-0 bg-gov-grid opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-gov-radial" />

        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-saffron-400" />
            </div>
            <div>
              <span className="text-white font-black text-lg font-serif">SAMAVAY</span>
              <p className="text-gov-300 text-[10px] font-medium">National Digital Public Infrastructure</p>
            </div>
          </div>

          {/* Center content */}
          <div className={`space-y-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <div className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-400/30 text-saffron-300 text-[10px] font-bold px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-pulse" />
                JOIN 1.66 MILLION CITIZENS
              </div>
              <h2 className="text-3xl font-black text-white font-serif leading-tight">
                India's Unified<br />
                <span className="text-saffron-400">Government Service Platform</span>
              </h2>
              <p className="text-gov-300 text-sm mt-3 leading-relaxed max-w-sm">
                Register once. Access all state and central government services with automatic
                data verification and zero repeated uploads.
              </p>
            </div>

            {/* Benefit cards */}
            <div className="space-y-3">
              {benefits.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`flex gap-3 p-4 bg-white/6 border border-white/10 rounded-2xl transition-all duration-500 ${
                    mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-saffron-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs">{title}</p>
                    <p className="text-gov-400 text-[11px] mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom trust strip */}
          <div className="flex flex-wrap gap-3 text-[10px] text-gov-400 font-medium">
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" />Ministry of Electronics & IT</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" />NIC Hosted</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" />DigiLocker Integration</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 bg-sandstone-100 overflow-y-auto">
        <div className={`w-full max-w-md mx-auto space-y-5 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gov-950 flex items-center justify-center">
              <Landmark className="w-4 h-4 text-saffron-400" />
            </div>
            <span className="font-black text-stone-900 font-serif text-lg">SAMAVAY</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              Create Citizen Account
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Sovereign digital identity — register once, access everything
            </p>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 animate-fade-in-scale">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Citizen Full Name (as on Identity Records)"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav.sharma@example.in"
            />

            <Input
              label="Mobile Number (linked to Aadhaar for OTP)"
              type="tel"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="10-digit mobile number"
            />

            {/* Password with strength meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-stone-800">Create Password</label>
                {password && (
                  <span className={`text-[10px] font-bold ${
                    passwordStrength === 1 ? 'text-rose-600' : passwordStrength === 2 ? 'text-saffron-600' : 'text-gov-700'
                  }`}>
                    {strengthLabel}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
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
              {password && (
                <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColor} rounded-full transition-all duration-500`}
                    style={{ width: strengthWidth }}
                  />
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
            />

            {/* DPDP Consent */}
            <label className="flex items-start gap-3 p-3 bg-gov-50 border border-gov-200 rounded-xl cursor-pointer group hover:bg-gov-100 transition">
              <input
                type="checkbox"
                checked={dpdpConsent}
                onChange={(e) => setDpdpConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gov-300 text-gov-700 focus:ring-gov-500 flex-shrink-0"
              />
              <div className="text-[11px] text-gov-900 leading-snug">
                <span className="font-bold text-gov-800">I accept the DPDP Act 2023 Terms — </span>
                my details will be governed with purpose-bound consent and I may revoke access at any time from my Data Permissions page.
              </div>
            </label>

            <button
              type="submit"
              disabled={isLoading || !dpdpConsent}
              className="w-full py-3 px-6 bg-gov-700 hover:bg-gov-800 disabled:bg-stone-400 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-gov hover:shadow-gov-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Citizen Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <span className="flex items-center gap-1 text-[10px] font-medium text-gov-700">
              <ShieldCheck className="w-3 h-3" />DPDP Compliant
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-gov-700">
              <Lock className="w-3 h-3" />mTLS Secure
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-gov-700">
              <Globe className="w-3 h-3" />NIC Hosted
            </span>
          </div>

          {/* Sign in link */}
          <div className="text-center text-xs text-stone-500 pt-1 border-t border-stone-200">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-gov-700 hover:text-gov-900 hover:underline">
              Sign In here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
