import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Briefcase,
  FileText,
  Download,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Award,
  Layers,
  Star,
  Users,
  Check,
  ChevronRight
} from 'lucide-react';
import { RESUME_TEMPLATES_LIST } from '../utils/constants';

export const LandingPage = () => {
  const steps = [
    { num: '01', title: 'Create or Upload Resume', desc: 'Start from scratch or upload your existing PDF resume for automatic parsing.' },
    { num: '02', title: 'Improve with AI', desc: 'Enhance bullet points with action verbs, generate summaries, and fill missing skills.' },
    { num: '03', title: 'Choose Template', desc: 'Switch instantly between 10+ ATS-optimized, modern, and executive designs.' },
    { num: '04', title: 'Analyze ATS Score', desc: 'Get a 0–100 score breakdown across 8 recruitment compliance categories.' },
    { num: '05', title: 'Find Matching Jobs', desc: 'Discover high-match developer and tech roles sorted by skill alignment.' },
    { num: '06', title: 'Download Pixel-Perfect PDF', desc: 'Export publication-grade, ATS-parseable A4 PDFs ready for application.' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Optimization',
      desc: 'Generate executive summaries, rewrite achievements with measurable metrics, and discover in-demand tech skills.',
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-600',
    },
    {
      icon: ShieldCheck,
      title: 'Real-Time ATS Analyzer',
      desc: 'Ensure your resume never gets filtered out. Instant compliance check across formatting, keywords, and section hierarchy.',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600',
    },
    {
      icon: Briefcase,
      title: 'Smart Job Matching Engine',
      desc: 'Compare your resume skills directly against real job postings. View percentage fit, matched keywords, and gap alerts.',
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-600',
    },
    {
      icon: Layers,
      title: '10+ Designer Templates',
      desc: 'Modern Tech, Corporate Navy, Classic Serif, Developer Monospace, and Minimalist templates with live real-time switching.',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-600',
    },
    {
      icon: Download,
      title: 'High-Fidelity PDF Export',
      desc: 'Crisp vector rendering that maintains spacing, font styling, and page break compliance without broken elements.',
      color: 'from-rose-500/20 to-pink-500/20 text-rose-600',
    },
    {
      icon: Zap,
      title: 'Version History & Rollback',
      desc: 'Never lose your changes. Create snapshots for different companies and restore any previous version with 1 click.',
      color: 'from-brand-500/20 to-indigo-500/20 text-brand-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-brand-500 selection:text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-brand-500/25">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                ResumAI <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-bold border border-brand-500/30">PRO</span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-medium">AI Career Platform</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#matching" className="hover:text-white transition-colors">Job Matcher</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-4 py-2 rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-102 active:scale-98"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-brand-300 text-xs font-semibold mb-6 shadow-inner animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Resume Builder & ATS Job Matcher
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Build a Resume That <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
            Gets Noticed by Recruiters
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Transform your career journey with automated ATS optimization, smart job description matching, modular AI bullet enhancement, and 10+ designer templates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/30 transition-all hover:scale-103 active:scale-98"
          >
            Build My Resume <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
          >
            Explore Templates
          </a>
        </div>

        {/* Hero Preview Card */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-3xl p-3 bg-gradient-to-b from-slate-700 to-slate-800/50 shadow-2xl border border-slate-700/80">
          <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> ATS Optimization Pass Rate
              </div>
              <div className="text-4xl font-black text-white">96.8%</div>
              <p className="text-xs text-slate-400">
                Resumes crafted on ResumAI pass robot parser screening and reach human recruiters faster.
              </p>
            </div>

            <div className="space-y-3 md:border-x md:border-slate-800 md:px-6">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Keyword Alignment
              </div>
              <div className="text-4xl font-black text-white">2.4x</div>
              <p className="text-xs text-slate-400">
                Increase in interview callbacks with tailored keyword suggestions and measurable achievements.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-4 h-4" /> Live Tech Job Matches
              </div>
              <div className="text-4xl font-black text-white">100+</div>
              <p className="text-xs text-slate-400">
                Immediate skill scoring against top Frontend, Backend, Java, Python, and Full Stack positions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Production-Ready Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            Everything You Need for Career Acceleration
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-3">
            Built from the ground up to keep your resume data independent, your templates modular, and your applications successful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/40 border border-slate-700/80 hover:border-slate-600 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800 bg-slate-950/40 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Streamlined Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            From Draft to Dream Job in 6 Easy Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <span className="text-2xl font-black text-slate-700 mb-3 block">{s.num}</span>
              <h4 className="text-sm font-bold text-white mb-1.5">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES SHOWCASE */}
      <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Visual Diversity</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              10+ Professional Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Switch designs without re-entering data. Your content is 100% separate from presentation.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300"
          >
            Browse all templates <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_TEMPLATES_LIST.slice(0, 6).map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-slate-800/40 border border-slate-700/80 rounded-2xl overflow-hidden group hover:border-brand-500/50 transition-all shadow-md"
            >
              <div className="h-44 bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden border-b border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
                    {tmpl.category}
                  </span>
                  {tmpl.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold border border-brand-500/30">
                      {tmpl.badge}
                    </span>
                  )}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
                  <div className="w-16 h-2 bg-slate-700 rounded mb-1.5" />
                  <div className="w-32 h-1.5 bg-slate-800 rounded" />
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-sm font-bold text-white mb-1">{tmpl.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{tmpl.description}</p>
                <Link
                  to="/register"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-700 hover:bg-brand-600 text-white font-bold text-xs transition-colors"
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOB MATCHING DEMO SECTION */}
      <section id="matching" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/50 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 inline-block">
              AI Job Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Know Exactly Where You Stand Before Applying
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ResumAI reads target job postings, isolates hard and soft skills, and calculates your match percentage. Discover what keywords to add to increase interview odds.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Instant percentage match score (0–100%)</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Color-coded matched vs missing skill tags</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Actionable suggestions to bridge qualifications</div>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all"
            >
              Try Job Matcher Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">React Developer @ PixelCraft</h5>
                <span className="text-[10px] text-slate-400">San Francisco, CA • $115k-$145k</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 font-black text-xs rounded-lg border border-emerald-500/30">
                92% Match
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">Senior Java Engineer @ Nexus FinTech</h5>
                <span className="text-[10px] text-slate-400">New York, NY • $135k-$170k</span>
              </div>
              <span className="px-2.5 py-1 bg-brand-500/20 text-brand-300 font-black text-xs rounded-lg border border-brand-500/30">
                88% Match
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">Full Stack Software Engineer @ Apex Labs</h5>
                <span className="text-[10px] text-slate-400">Remote • $120k-$155k</span>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-black text-xs rounded-lg border border-amber-500/30">
                78% Match
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-10 sm:p-14 text-white shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Create Your Professional Resume Today
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
            Join thousands of software engineers, designers, and tech professionals securing interviews at top companies.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-98"
            >
              Get Started Free <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
            R
          </div>
          <span>&copy; {new Date().getFullYear()} ResumAI Platform. Production Ready.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:text-slate-300">Sign In</Link>
          <Link to="/register" className="hover:text-slate-300">Create Account</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
