import React, { useState } from 'react';
import {
  HelpCircle, ChevronDown, ChevronUp, Phone, Mail,
  Clock, ShieldCheck, MapPin, MessageSquare, ArrowRight, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';

const faqs = [
  {
    q: 'What is SAMAVAY and how does it solve platform fragmentation (SIH26129)?',
    a: 'SAMAVAY is a unified Digital Public Infrastructure (DPI) interoperability platform. Instead of requiring citizens to visit separate websites for Municipal, Transport, Revenue, Health, and Welfare services with different logins, SAMAVAY provides a single entry point where data is verified automatically across departmental databases with zero duplicate submissions.',
    tag: 'Platform',
  },
  {
    q: 'How do I track the status of my submitted service request?',
    a: "Navigate to 'My Applications' from the navigation bar or citizen dashboard. You can search by your unique Application Number (e.g. SAM-2026-10234). The visual timeline tracker shows you exactly which department stage (Submission, Field Scrutiny, Officer Approval, or Certificate Generation) your request is in.",
    tag: 'Tracking',
  },
  {
    q: 'Are certificates and receipts issued through SAMAVAY legally valid?',
    a: 'Yes. All digital documents, receipts, and certificates generated through SAMAVAY are digitally signed by authorized government nodal officers using PKI standards and integrated directly with DigiLocker pursuant to the Information Technology Act.',
    tag: 'Certificates',
  },
  {
    q: 'What should I do if my application requires additional documents or consent?',
    a: 'If a reviewing department officer requires clarification or permission, you will receive an instant notification on your Dashboard and a plain-language consent request explaining why the information is needed under the DPDP Act 2023.',
    tag: 'Process',
  },
  {
    q: 'Is my personal identity and data secure on SAMAVAY?',
    a: 'Yes. SAMAVAY adheres strictly to the Digital Personal Data Protection (DPDP) Act 2023. Citizen information is encrypted using mTLS PKI_X509 standards and is only accessed by authorized departmental systems on an explicitly verified, purpose-bound basis.',
    tag: 'Privacy',
  },
];

const contactCards = [
  {
    icon: Phone,
    title: 'Toll-Free Helpline',
    value: '1800-11-2026',
    sub: '24×7 All India Support',
    color: 'bg-gov-50 text-gov-700',
    border: 'border-gov-200',
  },
  {
    icon: Mail,
    title: 'Email Helpdesk',
    value: 'support@samavay.gov.in',
    sub: 'Avg response < 2 hours',
    color: 'bg-saffron-50 text-saffron-700',
    border: 'border-saffron-200',
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    value: '24×7 Digital Portal',
    sub: 'Continuous Interoperability',
    color: 'bg-stone-100 text-stone-700',
    border: 'border-stone-200',
  },
];

export const HelpPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-sandstone-100">
      {/* ── DARK HERO ── */}
      <div className="bg-gov-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gov-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-gov-200 text-[10px] font-bold px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-3 h-3" />
            CITIZEN ASSISTANCE & FAQ
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-serif">
            Help & Support Center
          </h1>
          <p className="text-gov-300 text-sm max-w-xl mx-auto leading-relaxed">
            Get answers to common questions about SAMAVAY's interoperability platform or reach out to our
            dedicated government citizen support helplines.
          </p>

          {/* Quick help actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/services"
              className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-bold px-4 py-2 rounded-xl hover:bg-white/15 transition"
            >
              <ArrowRight className="w-3.5 h-3.5 text-saffron-400" />
              Browse Services
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-bold px-4 py-2 rounded-xl hover:bg-white/15 transition"
            >
              <ArrowRight className="w-3.5 h-3.5 text-saffron-400" />
              My Dashboard
            </Link>
            <Link
              to="/applications"
              className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-bold px-4 py-2 rounded-xl hover:bg-white/15 transition"
            >
              <ArrowRight className="w-3.5 h-3.5 text-saffron-400" />
              Track Applications
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* ── CONTACT CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactCards.map(({ icon: Icon, title, value, sub, color, border }) => (
            <div
              key={title}
              className={`bg-white border ${border} rounded-2xl p-4 flex items-start gap-3.5 shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 font-serif">{title}</p>
                <p className="text-sm font-bold text-gov-800 font-mono mt-0.5 leading-tight">{value}</p>
                <p className="text-[11px] text-stone-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FAQ ACCORDION ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <MessageSquare className="w-4 h-4 text-gov-700" />
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 shadow-xs ${
                    isOpen
                      ? 'border-gov-300 shadow-gov'
                      : 'border-stone-200 hover:border-gov-300 hover:shadow-card cursor-pointer'
                  }`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-start gap-3 p-4 cursor-pointer">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isOpen ? 'bg-gov-700 text-white' : 'bg-stone-100 text-stone-500'
                    }`}>
                      <span className="text-[10px] font-black">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className={`text-xs sm:text-sm font-bold font-serif ${isOpen ? 'text-gov-900' : 'text-stone-900'}`}>
                          {faq.q}
                        </h4>
                        <div className={`p-1 rounded-lg flex-shrink-0 ${isOpen ? 'text-gov-700' : 'text-stone-400'}`}>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 inline-block ${
                        isOpen
                          ? 'bg-gov-50 text-gov-700 border border-gov-200'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {faq.tag}
                      </span>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-0 border-t border-gov-100 animate-slide-up">
                      <p className="text-xs text-stone-600 leading-relaxed mt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DPDP PRIVACY ASSURANCE CARD ── */}
        <div className="bg-gov-950 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gov-grid opacity-20" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-saffron-500/20 border border-saffron-400/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-saffron-400" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-black text-white font-serif">Your Privacy is Sovereign</h3>
              <p className="text-gov-300 text-xs leading-relaxed">
                SAMAVAY is fully compliant with the Digital Personal Data Protection Act 2023. No data is stored or shared
                beyond declared service purposes. All processing is auditable and you have the right to access, correct, and erase your data.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['DPDP Act 2023', 'mTLS Encrypted', 'NIC Hosted', 'PKI Signed Certs'].map(t => (
                  <span key={t} className="text-[10px] font-bold text-gov-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
