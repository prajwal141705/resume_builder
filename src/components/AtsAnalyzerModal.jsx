import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, ArrowRight, ShieldCheck, Loader2, X, RefreshCw } from 'lucide-react';
import aiService from '../services/aiService';
import toast from 'react-hot-toast';

export const AtsAnalyzerModal = ({ isOpen, onClose, resumeData, onApplySuggestions }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const runAnalysis = async () => {
    if (!resumeData) return;
    setLoading(true);
    try {
      let result;
      if (resumeData.id && !resumeData.id.startsWith('res-') && !resumeData.id.startsWith('demo-')) {
        result = await aiService.getAtsScore(resumeData.id);
      }
      if (!result) {
        result = await aiService.analyzeAtsDirect(resumeData);
      }
      setAnalysis(result);
    } catch (err) {
      console.error('ATS analysis failed:', err);
      toast.error('Failed to compute ATS score');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runAnalysis();
    }
  }, [isOpen, resumeData]);

  if (!isOpen) return null;

  const score = analysis?.overallScore || 0;
  const getScoreColor = (s) => {
    if (s >= 85) return 'text-emerald-500 stroke-emerald-500 stroke-emerald-500';
    if (s >= 70) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-400/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                ATS Resume Score & Compliance Analyzer
              </h3>
              <p className="text-xs text-slate-300">
                Evaluating format compliance, recruiter keywords, and parser visibility
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={runAnalysis}
              disabled={loading}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Re-analyze"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-10 h-10 text-brand-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Scanning resume sections against ATS rules...</p>
              <p className="text-xs text-slate-400">Checking contact info, keywords, formatting, and impact metrics</p>
            </div>
          ) : analysis ? (
            <>
              {/* Top Score Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 items-center">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${score >= 85 ? 'text-emerald-500' : score >= 70 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                        strokeDasharray={`${score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-slate-900">{score}</span>
                      <span className="text-[9px] font-bold uppercase text-slate-400">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Rating</span>
                    <h4 className="text-base font-extrabold text-slate-900">{analysis.grade}</h4>
                    <p className="text-[11px] text-slate-500">Industry benchmark: 75+</p>
                  </div>
                </div>

                {/* Score Categories Preview */}
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {analysis.categoryScores &&
                    Object.entries(analysis.categoryScores).map(([cat, val]) => (
                      <div key={cat} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <div className="text-[10px] font-semibold text-slate-500 truncate" title={cat}>
                          {cat}
                        </div>
                        <div className={`text-sm font-black mt-0.5 ${val >= 80 ? 'text-emerald-600' : val >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {val}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 3 Pillars: Strong, Areas to Improve, Missing Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Strong Areas */}
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Strong Areas
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {analysis.strongAreas?.length ? (
                      analysis.strongAreas.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-emerald-600 font-bold">✓</span> {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-emerald-700 italic">No standout areas detected yet.</li>
                    )}
                  </ul>
                </div>

                {/* Areas to Improve */}
                <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> Areas to Improve
                  </div>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {analysis.areasToImprove?.length ? (
                      analysis.areasToImprove.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-amber-600 font-bold">⚠</span> {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-amber-700 italic">No critical improvement areas found!</li>
                    )}
                  </ul>
                </div>

                {/* Missing Information */}
                <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4 text-rose-600" /> Missing Information
                  </div>
                  <ul className="space-y-2 text-xs text-rose-950">
                    {analysis.missingInformation?.length ? (
                      analysis.missingInformation.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-rose-600 font-bold">❌</span> {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-rose-700 font-medium italic">All essential fields populated.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Actionable Suggestions */}
              {analysis.actionableSuggestions?.length > 0 && (
                <div className="bg-brand-50/50 border border-brand-100 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" /> Actionable Recommendations
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    {analysis.actionableSuggestions.map((sug, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-brand-100">
                        <ArrowRight className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] text-slate-400 text-center italic">
                * Note: ATS compatibility score is an automated heuristic estimation based on industry recruitment parser standards. Actual results may vary depending on company-specific software.
              </p>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Client-Side Privacy Guaranteed
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtsAnalyzerModal;
