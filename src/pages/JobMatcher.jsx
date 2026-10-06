import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  FileText,
  Briefcase,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FileSearch,
  Cpu,
  Loader2,
} from 'lucide-react';
import resumeService from '../services/resumeService';
import aiService from '../services/aiService';
import MatchScore from '../components/MatchScore';
import SkillBadge from '../components/SkillBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export const JobMatcher = () => {
  const [searchParams] = useSearchParams();
  const urlResumeId = searchParams.get('resumeId');
  const urlJobTitle = searchParams.get('jobTitle');
  const urlJobDesc = searchParams.get('jobDesc');

  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(urlResumeId || '');
  const [jobDescription, setJobDescription] = useState(urlJobDesc || '');
  const [jobTitle, setJobTitle] = useState(urlJobTitle || '');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [matchResults, setMatchResults] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoadingResumes(true);
        const list = await resumeService.getUserResumes();
        const safeList = Array.isArray(list) ? list : [];
        setResumes(safeList);

        if (!selectedResumeId && safeList.length > 0) {
          setSelectedResumeId(safeList[0].id || safeList[0]._id);
        }
      } catch (err) {
        console.error('Error loading resumes for matcher:', err);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    fetchResumes();
  }, []);

  // Update selection if query param changes
  useEffect(() => {
    if (urlResumeId) setSelectedResumeId(urlResumeId);
    if (urlJobDesc) setJobDescription(urlJobDesc);
    if (urlJobTitle) setJobTitle(urlJobTitle);
  }, [urlResumeId, urlJobDesc, urlJobTitle]);

  const selectedResume = resumes.find(
    (r) => (r.id || r._id) === selectedResumeId
  );

  const handleAnalyzeMatch = async () => {
    if (!selectedResumeId) {
      toast.error('Please select a resume first.');
      return;
    }

    if (!jobDescription.trim()) {
      toast.error('Please paste or write the job description.');
      return;
    }

    setIsAnalyzing(true);
    setMatchResults(null);

    try {
      const results = await aiService.matchResumeWithJob(
        selectedResumeId,
        jobDescription,
        selectedResume
      );
      setMatchResults(results);
      toast.success('AI semantic analysis completed!');
    } catch (err) {
      console.error('AI match analysis error:', err);
      toast.error(err.message || 'AI matching failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetAnalysis = () => {
    setMatchResults(null);
  };

  if (isLoadingResumes) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading AI Job Matcher..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          AI Semantic Alignment Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          AI Resume & Job Matcher
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Compare your resume keywords, skills, and technical depth against any job description to discover exact gaps and boost recruiter callbacks.
        </p>
      </div>

      {resumes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Resumes Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            You need at least one saved resume before running an AI job match analysis.
          </p>
          <Link
            to="/resume-builder"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm"
          >
            Create Your First Resume
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : !matchResults ? (
        /* ================= INPUT WORKFLOW (STEPS 1, 2, 3) ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Step 1 & 2 Form Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: Select Resume */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Select Your Candidate Resume
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose which resume you want to benchmark against the job role.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resumes.map((resume) => {
                  const id = resume.id || resume._id;
                  const isSelected = selectedResumeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedResumeId(id)}
                      className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {resume.title || 'Untitled Resume'}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {resume.skills?.length || 0} skills • {resume.experience?.length || 0} roles
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Paste Job Description */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Paste Target Job Description
                  </h3>
                  <p className="text-xs text-slate-500">
                    Copy and paste the responsibilities, tech requirements, and qualifications.
                  </p>
                </div>
              </div>

              {jobTitle && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center gap-2 font-medium text-slate-700">
                  <Briefcase className="w-4 h-4 text-brand-600" />
                  <span>Job Target: <strong>{jobTitle}</strong></span>
                </div>
              )}

              <div>
                <textarea
                  rows={8}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job posting here (e.g. We are hiring a Senior Full Stack Software Engineer skilled in React, Spring Boot, Java, MongoDB, Docker, REST APIs...)"
                  className="w-full p-4 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400 transition-all leading-relaxed"
                />
              </div>

              {/* Sample job quick paste helper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  {jobDescription.length} characters entered
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setJobTitle('Senior Full Stack Engineer');
                    setJobDescription(
                      'Looking for a Senior Full Stack Engineer with extensive experience in React.js, Spring Boot, Java, MongoDB, REST APIs, Microservices, and Docker. Must have strong understanding of database optimization, state management, and CI/CD pipelines.'
                    );
                  }}
                  className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
                >
                  Paste Sample Job Description
                </button>
              </div>
            </div>

            {/* STEP 3: Action Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAnalyzeMatch}
                disabled={isAnalyzing}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-brand-700 to-slate-900 hover:from-brand-700 hover:to-slate-950 active:scale-[0.99] rounded-2xl transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing keyword density and semantic fit...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-brand-300" />
                    Analyze Match with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-gradient-to-br from-brand-500/10 via-slate-50 to-white rounded-2xl border border-brand-200/60 p-5 space-y-4">
              <div className="flex items-center gap-2 text-brand-800 font-bold text-sm">
                <Cpu className="w-4 h-4 text-brand-600" />
                How the AI Matcher Works
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>Keyword Density Extraction</strong>: Identifies hard technical skills, tools, and libraries mentioned in the vacancy.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    <strong>Semantic Fit Scoring</strong>: Evaluates alignment between your summarized experience and the core job expectations.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>Actionable Recommendations</strong>: Gives bullet-by-bullet adjustments to help pass Applicant Tracking Systems (ATS).
                  </span>
                </div>
              </div>
            </div>

            {selectedResume && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Selected Profile
                </h4>
                <div className="text-sm font-bold text-slate-900">
                  {selectedResume.title}
                </div>
                <div className="flex flex-wrap gap-1">
                  {(selectedResume.skills || []).slice(0, 6).map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] bg-slate-100 rounded text-slate-700 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= MATCH RESULTS DASHBOARD ================= */
        <div className="space-y-6">
          {/* Top Results Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  AI Match Analysis Completed
                </h3>
                <p className="text-xs text-slate-500">
                  Resume: <strong>{selectedResume?.title}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={handleResetAnalysis}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Analyze Again
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Score Gauge (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <MatchScore score={matchResults.matchScore} />

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Score Breakdown
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Matched Skills Found:</span>
                    <span className="font-bold text-emerald-600">
                      {matchResults.matchedSkills?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Missing Key Skills:</span>
                    <span className="font-bold text-rose-600">
                      {matchResults.missingSkills?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">ATS Keyword Fit:</span>
                    <span className="font-bold text-brand-600">
                      {matchResults.matchScore >= 70 ? 'High' : 'Medium'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Skills & AI Advice (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Matched Skills Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Matched Skills in Your Resume ({matchResults.matchedSkills?.length || 0})
                </div>
                <p className="text-xs text-slate-500">
                  These keywords directly match the requirements found in the job description.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(matchResults.matchedSkills || []).map((skill, index) => (
                    <SkillBadge key={index} name={skill} variant="matched" size="md" />
                  ))}
                </div>
              </div>

              {/* Missing Skills Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Missing Skills & Target Keywords ({matchResults.missingSkills?.length || 0})
                </div>
                <p className="text-xs text-slate-500">
                  The employer is looking for these technologies. If you have experience with them, add them to your resume.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(matchResults.missingSkills || []).length === 0 ? (
                    <span className="text-xs text-emerald-600 font-medium italic">
                      Great job! No major required skills were missing.
                    </span>
                  ) : (
                    matchResults.missingSkills.map((skill, index) => (
                      <SkillBadge key={index} name={skill} variant="missing" size="md" />
                    ))
                  )}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-brand-800 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  AI Tailoring Recommendations
                </div>
                <div className="space-y-3">
                  {(matchResults.aiRecommendations || []).map((rec, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    to={`/resume-builder?id=${selectedResumeId}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
                  >
                    Apply Changes in Resume Builder
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatcher;
