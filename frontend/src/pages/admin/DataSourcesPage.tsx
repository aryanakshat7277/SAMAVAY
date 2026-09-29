import React, { useState, useEffect } from 'react';
import { dataSourceApi } from '../../services/api';
import { DataSourceMapping } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { SearchBar } from '../../components/common/SearchBar';
import {
  Database,
  Layers,
  ArrowRight,
  ShieldCheck,
  Server,
  Plus,
  Search,
  CheckCircle2
} from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  const [sources, setSources] = useState<DataSourceMapping[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dataSourceApi.getAll().then((data) => setSources(data));
  }, []);

  const filteredSources = sources.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.dataField.toLowerCase().includes(q) ||
        s.dataCategory.toLowerCase().includes(q) ||
        s.departmentName.toLowerCase().includes(q) ||
        s.platformName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <PageHeader
        category="DISCOVERY & SOURCE PRIORITY CATALOG"
        categoryIcon={Database}
        title="Authoritative Data Sources & Fallback Priority"
        description="Configure primary, secondary, and fallback government data sources for automated citizen information verification across connected systems."
      />

      {/* 2. Search Toolbar */}
      <Card padding="md" className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white border-stone-200 shadow-xs">
        <div className="w-full sm:w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search data field, category, or platform..."
          />
        </div>
        <span className="text-xs text-stone-500 font-medium">
          Showing <strong className="text-stone-900">{filteredSources.length}</strong> registered data mappings
        </span>
      </Card>

      {/* 3. Data Sources Table Card */}
      <Card padding="none" className="overflow-hidden bg-white border-stone-200 shadow-card">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            Registered Data Fields & Source Mappings ({filteredSources.length})
          </h3>
          <span className="text-xs text-stone-500 font-mono">Auto-Discovered Interoperability Pipes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Data Field</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Authoritative Department</th>
                <th className="py-3.5 px-4">Registered Platform</th>
                <th className="py-3.5 px-4">Routing Priority</th>
                <th className="py-3.5 px-4">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSources.map((src) => (
                <tr key={src.id} className="hover:bg-gov-50/30 transition">
                  <td className="py-3.5 px-4 font-bold text-stone-900 font-serif">{src.dataField}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-semibold text-[10px] border border-stone-200">
                      {src.dataCategory}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-800 font-medium">{src.departmentName}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gov-800 font-bold">{src.platformName}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        src.priority === 'PRIMARY'
                          ? 'bg-gov-50 text-gov-800 border-gov-200'
                          : src.priority === 'SECONDARY'
                          ? 'bg-saffron-50 text-saffron-800 border-saffron-200'
                          : 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {src.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {src.availabilityStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
