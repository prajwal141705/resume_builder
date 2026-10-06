import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FilePlus,
  Files,
  Sparkles,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  ExternalLink,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import resumeService from '../services/resumeService';
import jobService from '../services/jobService';
import LoadingSpinner from '../components/LoadingSpinner';
import SkillBadge from '../components/SkillBadge';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [resumesData, jobsData] = await Promise.all([
          resumeService.getUserResumes(),
          jobService.getAllJobs(),
        ]);
        setResumes(Array.isArray(resumesData) ? resumesData : []);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const latestResume = resumes.length > 0 ? resumes[0] : null;

  if (loading) {
    return (
      <div className="py-16">
        <LoadingSpinner size="lg" message="Loading your career workspace..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-100 text-xs font-semibold mb-3 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            AI Career Assistant Online
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Developer'}! 👋
          </h1>
          <p className="text-brand-100 text-sm sm:text-base mt-2 leading-relaxed">
            Ready to tailor your resume for top tech roles? Use our AI matcher to score keyword relevance and boost interview callback rates.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              to="/resume-builder"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-brand-800 hover:bg-brand-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm"
            >
              <FilePlus className="w-4 h-4 text-brand-600" />
              Create New Resume
            </Link>
            <Link
              to="/job-matcher"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500/30 hover:bg-brand-500/40 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 transition-all backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-brand-200" />
              AI Job Matcher
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Resumes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Resumes
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{resumes.length}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">ATS-compliant formats</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
            <Files className="w-6 h-6" />
          </div>
        </div>

        {/* Total Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Available Jobs
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{jobs.length}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Matched with your stack</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Average Match Potential */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Match Potential
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">85%</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> High profile strength
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Backend Status
            </p>
            <h3 className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              REST API Ready
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Spring Boot + Mongo</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Latest Resume + Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Latest Resume Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Files className="w-4 h-4 text-brand-600" />
              Latest Resume
            </h2>
            <Link
              to="/resumes"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View All ({resumes.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {latestResume ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1">
                      {latestResume.title || 'Untitled Resume'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target Role: {latestResume.experience?.[0]?.role || 'Full Stack Engineer'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-brand-50 text-brand-700 uppercase tracking-wider">
                    {latestResume.template || 'Modern'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {latestResume.summary || 'No summary entered yet.'}
                </p>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Key Highlights ({latestResume.skills?.length || 0} skills)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(latestResume.skills || []).slice(0, 6).map((s, idx) => (
                      <SkillBadge key={idx} name={s} size="sm" />
                    ))}
                    {(latestResume.skills?.length || 0) > 6 && (
                      <span className="text-xs text-slate-400 self-center">
                        +{latestResume.skills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/resume-builder?id=${latestResume.id || latestResume._id}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Resume
                </button>

                <button
                  onClick={() => navigate(`/job-matcher?resumeId=${latestResume.id || latestResume._id}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Match with Jobs
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center flex-1 flex flex-col items-center justify-center">
              <Files className="w-10 h-10 text-slate-300 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm">No resumes created yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
                Build your first ATS-friendly resume to start matching with relevant job openings.
              </p>
              <Link
                to="/resume-builder"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 shadow-xs"
              >
                <FilePlus className="w-3.5 h-3.5" />
                Create First Resume
              </Link>
            </div>
          )}
        </div>

        {/* Recent Job Postings */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Recent Job Postings
            </h2>
            <Link
              to="/jobs"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Browse All Jobs ({jobs.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 shrink-0">
                    {job.company ? job.company.charAt(0) : 'J'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm hover:text-brand-600 transition-colors cursor-pointer" onClick={() => navigate('/jobs')}>
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {job.company} • {job.location}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(job.requiredSkills || []).slice(0, 3).map((sk, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded-md font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs font-semibold text-emerald-600">
                    {job.salary || 'Competitive'}
                  </span>
                  <button
                    onClick={() => {
                      const resId = latestResume?.id || latestResume?._id || '';
                      navigate(`/job-matcher?resumeId=${resId}&jobTitle=${encodeURIComponent(job.title)}&jobDesc=${encodeURIComponent(job.description + ' ' + (job.fullDescription || ''))}`);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-brand-600" />
                    Match AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
