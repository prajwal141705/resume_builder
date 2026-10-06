import React from 'react';
import { MapPin, Building2, Clock, Sparkles, Briefcase, ChevronRight, DollarSign } from 'lucide-react';
import SkillBadge from './SkillBadge';

export const JobCard = ({ job, onMatch, onViewDetails }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/60 border border-brand-200/60 flex items-center justify-center text-brand-700 font-bold text-lg shadow-inner">
              {job.company ? job.company.charAt(0) : 'J'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>

          {job.type && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
              {job.type}
            </span>
          )}
        </div>

        {/* Location, Salary, Time info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mb-4 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location || 'Remote'}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1 font-medium text-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.postedDate || 'Recently posted'}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {job.description}
        </p>

        {/* Skills list */}
        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Key Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.slice(0, 5).map((skill, index) => (
                <SkillBadge key={index} name={skill} size="sm" />
              ))}
              {job.requiredSkills.length > 5 && (
                <span className="text-xs text-slate-400 self-center font-medium">
                  +{job.requiredSkills.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(job)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            View Specs
          </button>
        )}
        <button
          onClick={() => onMatch(job)}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-sm shadow-brand-500/20 active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Match with this Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;
