import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, FileCheck, ShieldCheck, Zap, CheckCircle2,
  ArrowRight, Landmark, Building2, Car, HeartPulse,
  GraduationCap, Layers, Sparkles, Database, Lock,
  Activity, Server, Globe
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

// ── Connected platforms
const platforms = [
  { name: 'Bhoomi LRS',       domain: 'Revenue & Land',     color: 'bg-gov-700',    delay: 0 },
  { name: 'SARATHI 4.0',      domain: 'Transport',          color: 'bg-gov-800',    delay: 100 },
  { name: 'VAHAN',            domain: 'Vehicle Registry',   color: 'bg-gov-600',    delay: 200 },
  { name: 'e-NagarPalika',    domain: 'Municipal',          color: 'bg-saffron-700',delay: 300 },
  { name: 'DigiLocker',       domain: 'Document Store',     color: 'bg-gov-800',    delay: 400 },
  { name: 'National Registry',domain: 'Citizen ID',         color: 'bg-gov-950',    delay: 500 },
];

const steps = [
  {
    number: '01',
    icon: Compass,
    title: 'Discover Any Service',
    subtitle: 'Unified Search & Directory',
    description:
      'Instead of visiting multiple portals, search by your natural requirement — "Renew licence", "Pay property tax", or "Apply for birth certificate". SAMAVAY identifies the governing department automatically across all connected systems.',
    tags: ['Unified Search', 'Departmental Routing', 'Natural Language'],
    color: 'gov',
  },
  {
    number: '02',
    icon: Database,
    title: 'Automated Data Preparation',
    subtitle: '62% Auto-Verified Information',
    description:
      'SAMAVAY queries authoritative registries (Bhoomi LRS, SARATHI/VAHAN, e-NagarPalika) via secure mTLS-encrypted data pipelines. Verified citizen fields are auto-populated — reducing form burden by up to 62%.',
    tags: ['Zero Duplicate Entry', 'mTLS Encrypted', 'Real-Time Verification'],
    color: 'gov',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Explicit DPDP Consent',
    subtitle: 'Digital Personal Data Protection Act 2023',
    description:
      'You review clear, plain-language access disclosures before any data is shared. You decide what data each service can access, and you retain full power to revoke consent at any time from your Data Permissions page.',
    tags: ['Purpose-Bound Sharing', 'Citizen Revocability', 'DPDP Act 2023'],
    color: 'saffron',
  },
  {
    number: '04',
    icon: Activity,
    title: 'Track & Receive',
    subtitle: 'Live Multi-Stage Journey Tracker',
    description:
      'Track cross-department review milestones in real time. Once approved, your digitally signed certificate is delivered to your dashboard and synced with DigiLocker — legally valid under the IT Act.',
    tags: ['Live Stage Tracker', 'DigiLocker Synced', 'PKI-Signed Certificate'],
    color: 'emerald',
    isLast: true,
  },
];

export const HowItWorksPage: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step'));
            setVisibleSteps((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.2 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-sandstone-100">
      {/* ── DARK HERO ── */}
      <div className="bg-gov-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gov-grid opacity-25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-gov-200 text-[10px] font-bold px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3 text-saffron-400" />
            CITIZEN ARCHITECTURE & INTEROPERABILITY GUIDE
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif leading-tight">
            How SAMAVAY Works
          </h1>
          <p className="text-gov-300 text-sm max-w-2xl mx-auto leading-relaxed">
            A modern interoperability layer bridging disconnected departmental systems into one seamless citizen portal —
            powered by secure mTLS pipelines and governed by the DPDP Act 2023.
          </p>

          {/* Connected platform nodes strip */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {platforms.map(({ name, domain, color, delay }) => (
              <div
                key={name}
                className="flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-xl px-3 py-1.5 animate-fade-in"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
                <span className="text-[10px] font-bold text-white">{name}</span>
                <span className="text-[10px] text-gov-400 hidden sm:inline">· {domain}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 bg-saffron-500/20 border border-saffron-400/30 rounded-xl px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
              <span className="text-[10px] font-black text-saffron-300">SAMAVAY Hub</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4-STEP JOURNEY ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gov-700 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full">
            SIMPLE 4-STEP PROCESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif mt-3">
            Your Journey Through SAMAVAY
          </h2>
        </div>

        {/* Steps with connecting pipe */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gov-200 hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.has(i);
              const isLast = step.isLast;

              return (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  data-step={i}
                  className={`relative flex gap-6 items-start transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step number node */}
                  <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-lg font-serif shadow-gov z-10 ${
                      isLast ? 'bg-gradient-to-br from-gov-600 to-gov-800' : 'bg-gov-950'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    {!isLast && (
                      <div className="w-0.5 flex-1 bg-gov-200 mt-2 min-h-[2rem]" />
                    )}
                  </div>

                  {/* Step content card */}
                  <div className={`flex-1 pb-2 bg-white border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 ${
                    isLast ? 'border-gov-300' : 'border-stone-200'
                  }`}>
                    {/* Card top stripe */}
                    <div className={`h-1 w-full ${isLast ? 'bg-gradient-to-r from-gov-600 to-gov-800' : 'bg-gov-200'}`} />

                    <div className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        {/* Mobile icon */}
                        <div className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isLast ? 'bg-gov-100 text-gov-800' : 'bg-stone-100 text-stone-700'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[10px] font-black text-stone-400 font-mono">{step.number}</span>
                            <h3 className="text-base font-bold text-stone-900 font-serif">{step.title}</h3>
                          </div>
                          <p className="text-[11px] font-semibold text-gov-700 mt-0.5">{step.subtitle}</p>
                        </div>
                        {isLast && (
                          <span className="bg-gov-50 border border-gov-200 text-gov-800 text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0">
                            ✓ Complete
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">{step.description}</p>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              step.color === 'saffron'
                                ? 'bg-saffron-50 text-saffron-800 border border-saffron-200'
                                : step.color === 'emerald'
                                ? 'bg-gov-50 text-gov-800 border border-gov-200'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TECH ARCHITECTURE STRIP ── */}
        <div className="mt-12 bg-gov-950 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gov-grid opacity-20" />
          <div className="relative p-6 sm:p-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-gov-200 text-[10px] font-bold px-3.5 py-1.5 rounded-full">
              <Server className="w-3 h-3" />
              TECHNICAL FOUNDATION
            </div>
            <h3 className="text-xl font-black text-white font-serif">
              Built on Open Government Standards
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'ABDM-FHIR Protocol', 'mTLS PKI_X509', 'OAuth 2.0 Federated Auth',
                'REST/OpenAPI Gateway', 'Spring Boot Backend', 'DigiLocker API',
                'DPDP Act 2023', 'Aadhaar eKYC'
              ].map((tech) => (
                <span key={tech} className="bg-white/8 border border-white/12 text-gov-200 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-10 space-y-3">
          <h3 className="text-lg font-bold text-stone-900 font-serif">Ready to experience SAMAVAY?</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/services">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Explore Government Services
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Create Citizen Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
