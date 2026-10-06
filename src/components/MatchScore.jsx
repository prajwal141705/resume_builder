import React from 'react';
import { Sparkles, Award, AlertCircle } from 'lucide-react';

export const MatchScore = ({ score = 0, size = 'lg', subtitle = 'Semantic & Keyword Fit' }) => {
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  let status = {
    label: 'Low Match',
    color: 'text-rose-600',
    stroke: '#e11d48',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    description: 'Significant keyword and tech stack gaps found.',
  };

  if (normalizedScore > 85) {
    status = {
      label: 'Excellent Match',
      color: 'text-emerald-600',
      stroke: '#059669',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Your profile is highly aligned with this job description.',
    };
  } else if (normalizedScore > 70) {
    status = {
      label: 'Good Match',
      color: 'text-brand-600',
      stroke: '#026bc9',
      bgColor: 'bg-brand-50',
      borderColor: 'border-brand-200',
      description: 'Strong fit with minor keyword optimizations recommended.',
    };
  } else if (normalizedScore > 40) {
    status = {
      label: 'Moderate Match',
      color: 'text-amber-600',
      stroke: '#d97706',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'Some overlap; consider tailoring your experience and skills.',
    };
  }

  // Circular progress calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-white rounded-2xl border ${status.borderColor} shadow-sm text-center relative overflow-hidden`}>
      <div className="relative flex items-center justify-center mb-3">
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Animated Progress Ring */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke={status.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {normalizedScore}%
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Score
          </span>
        </div>
      </div>

      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${status.bgColor} ${status.color}`}>
        <Sparkles className="w-3.5 h-3.5" />
        {status.label}
      </div>

      <p className="text-xs text-slate-500 max-w-xs">{status.description}</p>
      {subtitle && <span className="text-[11px] text-slate-400 mt-2 font-medium">{subtitle}</span>}
    </div>
  );
};

export default MatchScore;
