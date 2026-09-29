import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Car,
  Landmark,
  HeartPulse,
  GraduationCap,
  Users,
  Sprout,
  ShoppingBag,
  HardHat,
  Coins,
  Baby,
  Zap,
  ArrowRight
} from 'lucide-react';

export const CategoryVisualGrid: React.FC = () => {
  const categories = [
    {
      id: 'MUNICIPAL',
      title: 'Municipal & Urban Services',
      subtitle: 'Property tax, trade licences, building permits & civic assessments',
      servicesCount: 18,
      icon: Building2,
      deptLink: '/services?category=MUNICIPAL',
      color: 'from-amber-700/10 to-amber-900/5 border-amber-200 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'TRANSPORT',
      title: 'Transport & Highways',
      subtitle: 'SARATHI Driving licence renewal, VAHAN vehicle registration & e-challans',
      servicesCount: 14,
      icon: Car,
      deptLink: '/services?category=TRANSPORT',
      color: 'from-emerald-700/10 to-emerald-900/5 border-emerald-200 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    },
    {
      id: 'REVENUE',
      title: 'Revenue & Land Administration',
      subtitle: 'Bhoomi cadastral records, mutation certificates, Encumbrance (EC) & survey maps',
      servicesCount: 12,
      icon: Landmark,
      deptLink: '/services?category=REVENUE',
      color: 'from-gov-700/10 to-gov-900/5 border-gov-200 text-gov-900',
      badgeColor: 'bg-gov-100 text-gov-900 border-gov-200'
    },
    {
      id: 'HEALTH',
      title: 'Health & Family Welfare',
      subtitle: 'Ayushman Bharat PM-JAY cards, hospital empanelment & vital records',
      servicesCount: 9,
      icon: HeartPulse,
      deptLink: '/services?category=HEALTH',
      color: 'from-rose-700/10 to-rose-900/5 border-rose-200 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-200'
    },
    {
      id: 'EDUCATION',
      title: 'Education & Scholarships',
      subtitle: 'NSP national merit scholarships, degree verification & school admissions',
      servicesCount: 11,
      icon: GraduationCap,
      deptLink: '/services?category=EDUCATION',
      color: 'from-purple-700/10 to-purple-900/5 border-purple-200 text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200'
    },
    {
      id: 'WELFARE',
      title: 'Social Welfare & Pensions',
      subtitle: 'Senior citizen pensions, disability benefits & direct benefit transfers (DBT)',
      servicesCount: 15,
      icon: Users,
      deptLink: '/services?category=WELFARE',
      color: 'from-stone-700/10 to-stone-900/5 border-stone-200 text-stone-900',
      badgeColor: 'bg-stone-100 text-stone-900 border-stone-200'
    },
    {
      id: 'AGRICULTURE',
      title: 'Agriculture & Farmers Welfare',
      subtitle: 'PM-KISAN DBT ₹6,000, PM Fasal Bima crop insurance & soil health cards',
      servicesCount: 16,
      icon: Sprout,
      deptLink: '/services?category=AGRICULTURE',
      color: 'from-emerald-700/10 to-emerald-900/5 border-emerald-200 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    },
    {
      id: 'FOOD_SUPPLIES',
      title: 'Food & Civil Supplies (NFSA)',
      subtitle: 'One Nation One Ration Card (ONORC), digital smart ration cards & FPS quotas',
      servicesCount: 12,
      icon: ShoppingBag,
      deptLink: '/services?category=FOOD_SUPPLIES',
      color: 'from-amber-700/10 to-amber-900/5 border-amber-200 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'LABOUR',
      title: 'Labour & Employment',
      subtitle: 'e-Shram unorganized worker cards, EPFO UAN transfers & BOCW welfare grants',
      servicesCount: 14,
      icon: HardHat,
      deptLink: '/services?category=LABOUR',
      color: 'from-blue-700/10 to-blue-900/5 border-blue-200 text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      id: 'FINANCE',
      title: 'Finance & Commercial Taxes',
      subtitle: 'GSTIN verification, digital e-stamping, PM SVANidhi loans & P-Tax clearance',
      servicesCount: 13,
      icon: Coins,
      deptLink: '/services?category=FINANCE',
      color: 'from-yellow-700/10 to-yellow-900/5 border-yellow-200 text-yellow-900',
      badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-200'
    },
    {
      id: 'WOMEN_CHILD',
      title: 'Women & Child Development',
      subtitle: 'PMMVY ₹5,000 maternity benefits, Sukanya Samriddhi accounts & Poshan tracker',
      servicesCount: 10,
      icon: Baby,
      deptLink: '/services?category=WOMEN_CHILD',
      color: 'from-pink-700/10 to-pink-900/5 border-pink-200 text-pink-900',
      badgeColor: 'bg-pink-100 text-pink-900 border-pink-200'
    },
    {
      id: 'POWER',
      title: 'Power & Renewable Energy',
      subtitle: 'PM Surya Ghar ₹78,000 rooftop solar subsidy, load enhancements & smart metering',
      servicesCount: 11,
      icon: Zap,
      deptLink: '/services?category=POWER',
      color: 'from-orange-700/10 to-orange-900/5 border-orange-200 text-orange-900',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((cat) => {
        const Icon = cat.icon;

        return (
          <Link
            key={cat.id}
            to={cat.deptLink}
            className={`p-6 bg-white bg-gradient-to-br border-2 rounded-3xl shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between space-y-4 group cursor-pointer ${cat.color}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-gov-800 shadow-xs group-hover:scale-110 group-hover:bg-gov-50 transition-all duration-200">
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${cat.badgeColor}`}>
                  {cat.servicesCount} Services
                </span>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif group-hover:text-gov-800 transition">
                  {cat.title}
                </h4>
                <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed mt-1 font-medium">
                  {cat.subtitle}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-gov-800">
              <span className="text-sm uppercase tracking-wider">Access Interoperable Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
