import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Phone, Mail, ShieldCheck, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
import { NationalEmblem } from '../common/NationalEmblem';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#061e38] text-slate-300 border-t border-[#0f345c] text-sm mt-auto relative overflow-hidden">
      {/* 3-Color Sovereign Ribbon Micro Line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      {/* Top Assistance Ribbon */}
      <div className="bg-[#041628] border-b border-[#0f345c]/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gov-800 border border-gov-700 flex items-center justify-center text-amber-400 shadow-xs">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                National Citizen Assistance Toll-Free Helpdesk
              </p>
              <p className="text-sm font-bold text-white font-mono tracking-wide">
                1800-11-7262 / 1947 (24x7 Sovereign Support)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DPDP Act 2023 Compliant</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>DigiLocker Integrated</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-slate-300" />
              <span>Sovereign Data Highway</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gov-900 border border-gov-700 flex items-center justify-center text-white shadow-xs">
                <NationalEmblem size="sm" variant="gold" />
              </div>
              <div>
                <span className="text-xl font-bold text-white font-serif tracking-tight">SAMAVAY</span>
                <span className="text-[10px] text-amber-300 font-bold ml-2 uppercase tracking-wider bg-amber-900/40 border border-amber-700/50 px-2 py-0.5 rounded">
                  DPI Interoperability
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Connecting sovereign state and central government platforms behind one unified experience. Eliminating duplicate documentation and fragmented citizen navigation.
            </p>
            <div className="text-xs text-slate-400 pt-2 space-y-1">
              <p className="font-bold text-amber-300">National Digital Public Infrastructure (DPI)</p>
              <p className="text-[11px]">Ministry of Electronics & Information Technology • Republic of India</p>
            </div>
          </div>

          {/* Col 2: Citizen Portals */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 font-serif">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/services" className="hover:text-white transition">Property Tax & Municipal</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Driving Licence & Vahan RC</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Land Mutation & Records</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Ayushman PM-JAY Health Card</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Higher Education Scholarship</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">Farmer Direct Benefit (PM-KISAN)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 font-serif">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/departments" className="hover:text-white transition">Municipal Corporation</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition">Transport Department</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition">Revenue & Land Records</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition">Health & Family Welfare</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition">School & Higher Education</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition">Agriculture & Social Welfare</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 font-serif">
              System & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/how-samavay-works" className="hover:text-white transition">How SAMAVAY Works</Link>
              </li>
              <li>
                <Link to="/admin/control-center" className="hover:text-white transition flex items-center">
                  Control Center
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition">Citizen Help & FAQ</Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition">Track Application</Link>
              </li>
              <li className="pt-2 flex items-center text-slate-400">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                <span>support@samavay.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sovereign Disclaimer */}
        <div className="border-t border-[#0f345c] mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 SAMAVAY — National Digital Public Infrastructure (DPI) Initiative. Republic of India.</p>
          <div className="flex space-x-4 text-[11px]">
            <Link to="/help" className="hover:text-slate-200">Privacy Policy</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-slate-200">Terms of Service</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-slate-200">Accessibility Statement</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-slate-200">DPDP Act Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
