import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileText,
  UploadCloud,
  Layout,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading Admin Command Center..." />
      </div>
    );
  }

  const kpis = [
    {
      label: 'Total Registered Users',
      value: stats?.totalUsers || 0,
      subValue: `${stats?.activeUsers || 0} active accounts`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      link: '/admin/users',
    },
    {
      label: 'Total Generated Resumes',
      value: stats?.totalResumes || 0,
      subValue: 'Created across platform',
      icon: FileText,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      link: '/admin/resumes',
    },
    {
      label: 'Uploaded PDF Resumes',
      value: stats?.totalUploadedResumes || 0,
      subValue: 'Extracted via PDFBox',
      icon: UploadCloud,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      link: '/admin/resumes',
    },
    {
      label: 'Active Resume Templates',
      value: stats?.totalTemplates || 0,
      subValue: '10 standard designs',
      icon: Layout,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      link: '/admin/templates',
    },
    {
      label: 'Active Job Postings',
      value: stats?.totalJobs || 0,
      subValue: 'Available for AI matcher',
      icon: Briefcase,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      link: '/admin/jobs',
    },
    {
      label: 'Pending Template Requests',
      value: stats?.pendingTemplateRequests || 0,
      subValue: 'Awaiting admin review',
      icon: Clock,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      link: '/admin/templates',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1.5 border border-rose-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            Admin Command Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Administrator Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time platform usage metrics, user management, job catalog, and template governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
          >
            Switch to Candidate View
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={index}
              to={kpi.link}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex items-start justify-between group"
            >
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {kpi.label}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">
                  {kpi.value}
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  {kpi.subValue}
                </p>
              </div>

              <div className={`p-3 rounded-2xl border ${kpi.color} transition-transform group-hover:scale-105`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Section: Recent Users & Recent Uploads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Users (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              Recently Registered Users
            </h3>
            <Link to="/admin/users" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {(stats?.recentUsers || []).map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{u.name || 'User'}</p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    {u.status || 'ACTIVE'}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{u.resumeCount || 0} resumes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Resume Uploads (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-purple-600" />
              Recent Resume Uploads
            </h3>
            <Link to="/admin/resumes" className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {(stats?.recentUploads || []).map((up) => (
              <div key={up.id} className="py-3 flex items-center justify-between gap-3">
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">{up.originalFileName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{up.userEmail || 'Candidate'}</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-50 text-purple-700 rounded-md border border-purple-200 whitespace-nowrap">
                  PDF
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
