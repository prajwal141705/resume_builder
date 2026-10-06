import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Github, FileText, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export const PersonalInfoForm = ({ personalInfo, summary, skills = [], title = '', onChange, onSummaryChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const handleChange = (field, value) => {
    onChange({
      ...personalInfo,
      [field]: value,
    });
  };

  const handleAiGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const candidateTitle = title || personalInfo?.fullName ? `${personalInfo?.fullName ? personalInfo.fullName + ' - ' : ''}Software Engineer` : 'Software Professional';
      const skillList = skills && skills.length > 0 ? skills.slice(0, 5).join(', ') : 'modern software development, system design, and agile methodologies';
      
      const templates = [
        `Results-driven software engineer with extensive hands-on experience in ${skillList}. Proven track record of designing scalable applications, optimizing database performance, and delivering high-quality web solutions. Adept at collaborative problem solving, code quality standards, and rapid continuous delivery.`,
        `Passionate and detail-oriented technical professional specialized in ${skillList}. Demonstrated ability to architect robust full-stack systems and enhance user engagement through modern best practices. Eager to bring strong analytical and engineering skills to high-impact challenges.`,
        `Dedicated engineer with comprehensive expertise across ${skillList}. Experienced in translating business requirements into scalable, maintainable architectures. Committed to technical excellence, automated testing, and cross-functional team success.`
      ];

      const chosen = templates[Math.floor(Math.random() * templates.length)];
      onSummaryChange(chosen);
      setIsGenerating(false);
      toast.success('AI summary generated successfully!');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-600" />
          Personal Information
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter your contact details and professional links.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={personalInfo?.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={personalInfo?.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="prajwal@gmail.com"
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              value={personalInfo?.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={personalInfo?.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={personalInfo?.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            GitHub / Portfolio
          </label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={personalInfo?.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary with AI Generator */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-brand-600" />
            Professional Summary
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAiGenerateSummary}
              disabled={isGenerating}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/80 rounded-lg transition-all shadow-2xs hover:shadow-xs active:scale-95 disabled:opacity-50"
              title="Generate tailored professional summary using AI"
            >
              <Sparkles className="w-3 h-3 text-brand-600 animate-pulse" />
              {isGenerating ? 'Generating...' : summary ? 'AI Enhance Summary' : 'AI Generate Summary'}
            </button>
            <span className="text-[11px] text-slate-400">
              {summary?.length || 0} chars
            </span>
          </div>
        </div>
        <textarea
          rows={4}
          value={summary || ''}
          onChange={(e) => onSummaryChange(e.target.value)}
          placeholder="Brief 2-4 sentence summary highlighting your core skills, years of experience, and key accomplishments..."
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400 leading-relaxed"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
