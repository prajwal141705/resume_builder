import React from 'react';
import { RESUME_TEMPLATES } from '../utils/constants';
import { Mail, Phone, MapPin, Linkedin, Github, Award, Globe, Code, CheckCircle, Briefcase, GraduationCap } from 'lucide-react';

/* =========================================================================
   TEMPLATE 1: MODERN TECH
   ========================================================================= */
const ModernTechTemplate = ({ resumeData }) => {
  const {
    personalInfo = {},
    summary = '',
    careerObjective = '',
    education = [],
    experience = [],
    internships = [],
    projects = [],
    skills = [],
    certifications = [],
    achievements = [],
    languages = [],
  } = resumeData;

  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <header className="border-b-2 border-brand-500 pb-5 mb-5">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm font-semibold text-brand-600 mt-0.5 tracking-wide">
          {experience[0]?.role || 'FULL STACK SOFTWARE ENGINEER'}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-600" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-600" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-600" />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5 text-brand-700"><Linkedin className="w-3.5 h-3.5 text-brand-600" />{personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="flex items-center gap-1.5 text-brand-700"><Github className="w-3.5 h-3.5 text-brand-600" />{personalInfo.github}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2 border-l-4 border-brand-600">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-normal text-justify">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2 border-l-4 border-brand-600">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span key={index} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded font-medium text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2.5 border-l-4 border-brand-600">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                  <span className="text-xs font-medium text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-semibold text-brand-700 mb-1.5">{exp.company}</div>
                {exp.description && <div className="text-slate-700 whitespace-pre-line text-xs pl-2 border-l border-slate-200 space-y-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2.5 border-l-4 border-brand-600">
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{proj.title} {proj.technologies && <span className="text-[11px] text-slate-500 font-mono">| {proj.technologies}</span>}</span>
                  {proj.link && <span className="text-xs text-brand-600 font-medium">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-slate-700 text-xs mt-1 leading-normal">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2.5 border-l-4 border-brand-600">
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                  <div className="text-xs text-slate-700 font-medium">{edu.institution}</div>
                  {edu.description && <p className="text-xs text-slate-500 mt-0.5">{edu.description}</p>}
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2 border-l-4 border-brand-600">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start gap-1.5 text-slate-700">
                <Award className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                <span><strong>{cert.name}</strong> – {cert.issuer} ({cert.issueDate})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 2: CLASSIC TRADITIONAL
   ========================================================================= */
const ClassicTraditionalTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [], certifications = [] } = resumeData;
  return (
    <div className="bg-white text-slate-900 p-9 font-serif leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <header className="text-center border-b-2 border-slate-900 pb-3 mb-4">
        <h1 className="text-2xl font-bold tracking-normal uppercase text-slate-950 font-serif">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-3 text-xs text-slate-700 mt-1 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
            Executive Summary
          </h2>
          <p className="text-slate-800 text-xs text-justify leading-relaxed">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-1.5 font-sans">
            Core Competencies
          </h2>
          <p className="text-xs text-slate-800 font-sans leading-relaxed">{skills.join(' • ')}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-xs font-sans">
                  <span>{exp.company} — {exp.role}</span>
                  <span className="text-slate-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-xs text-slate-800 whitespace-pre-line mt-1 leading-relaxed">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Education
          </h2>
          <div className="space-y-2 font-sans text-xs">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between">
                <div><strong>{edu.degree}</strong>, {edu.institution}</div>
                <span className="text-slate-600">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 3: PROFESSIONAL CORPORATE
   ========================================================================= */
const ProfessionalCorporateTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <div className="bg-teal-800 text-white p-6 rounded-xl mb-5 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
          <p className="text-teal-200 text-xs font-semibold tracking-wider uppercase mt-0.5">{experience[0]?.role || 'Professional'}</p>
        </div>
        <div className="text-xs space-y-0.5 text-teal-100 text-right">
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone} • {personalInfo.location}</div>
          <div>{personalInfo.linkedin}</div>
        </div>
      </div>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase text-teal-800 tracking-wider border-b-2 border-teal-800 pb-1 mb-2">Profile Overview</h2>
          <p className="text-slate-700 leading-normal">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase text-teal-800 tracking-wider border-b-2 border-teal-800 pb-1 mb-2">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-teal-50 text-teal-900 border border-teal-200 rounded text-xs font-medium">{s}</span>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase text-teal-800 tracking-wider border-b-2 border-teal-800 pb-1 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-teal-700 pl-3">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>{exp.role} <span className="font-normal text-teal-700">@ {exp.company}</span></span>
                  <span className="text-slate-500 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-slate-700 text-xs whitespace-pre-line mt-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase text-teal-800 tracking-wider border-b-2 border-teal-800 pb-1 mb-2">Education</h2>
          <div className="space-y-2 text-xs">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <span><strong>{edu.degree}</strong> – {edu.institution}</span>
                <span className="text-slate-500">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 4: MINIMAL CLEAN
   ========================================================================= */
const MinimalCleanTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <header className="mb-6">
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-4 text-xs text-slate-500 mt-2">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          <span>{personalInfo.linkedin}</span>
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <p className="text-slate-700 text-xs leading-relaxed">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Capabilities</h2>
          <p className="text-xs text-slate-800 leading-relaxed font-mono">{skills.join(', ')}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-semibold text-slate-900">
                  <span>{exp.role}, {exp.company}</span>
                  <span className="text-slate-400 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Education</h2>
          <div className="space-y-2 text-xs">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <span>{edu.degree}, {edu.institution}</span>
                <span className="text-slate-400">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 5: CREATIVE PORTFOLIO
   ========================================================================= */
const CreativePortfolioTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white p-6 rounded-2xl mb-6 shadow-md">
        <h1 className="text-2xl font-black uppercase tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mt-1">Creative Engineer & Builder</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-purple-100">
          <span>{personalInfo.email}</span>
          <span>• {personalInfo.phone}</span>
          <span>• {personalInfo.location}</span>
          <span>• {personalInfo.github}</span>
        </div>
      </div>

      {summary && (
        <section className="mb-5 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
          <h2 className="text-xs font-bold uppercase text-purple-900 tracking-wider mb-1">About Me</h2>
          <p className="text-slate-700 text-xs leading-normal">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase text-purple-800 tracking-wider mb-2">Skills & Toolkit</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">{s}</span>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase text-purple-800 tracking-wider mb-3">Work History</h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span className="text-purple-900">{exp.role} @ {exp.company}</span>
                  <span className="text-slate-500 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-slate-700 text-xs whitespace-pre-line mt-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase text-purple-800 tracking-wider mb-2">Education</h2>
          <div className="space-y-2 text-xs">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <span><strong>{edu.degree}</strong>, {edu.institution}</span>
                <span className="text-slate-500">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 6: DEVELOPER MONOSPACE
   ========================================================================= */
const DeveloperMonospaceTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-slate-950 text-slate-200 p-8 font-mono leading-relaxed text-[12px] shadow-sm min-h-[950px] border border-slate-800 rounded-lg">
      <header className="border-b border-emerald-500/40 pb-4 mb-4">
        <div className="text-emerald-400 text-xs">// developer.resume.json</div>
        <h1 className="text-2xl font-bold text-white mt-1">const developer = &quot;{personalInfo.fullName || 'YOUR NAME'}&quot;;</h1>
        <div className="flex flex-wrap gap-x-4 text-[11px] text-slate-400 mt-2">
          <span>email: &quot;{personalInfo.email}&quot;</span>
          <span>github: &quot;{personalInfo.github}&quot;</span>
          <span>location: &quot;{personalInfo.location}&quot;</span>
        </div>
      </header>

      {summary && (
        <section className="mb-4">
          <div className="text-emerald-400 text-xs font-bold mb-1">/** SUMMARY **/</div>
          <p className="text-slate-300 text-[11px] pl-2 border-l border-emerald-500/30 leading-relaxed">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-4">
          <div className="text-emerald-400 text-xs font-bold mb-1.5">/** TECH_STACK **/</div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px]">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-4">
          <div className="text-emerald-400 text-xs font-bold mb-2">/** EXPERIENCE **/</div>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className="pl-2 border-l border-slate-800">
                <div className="flex justify-between text-xs text-white">
                  <span className="font-bold text-emerald-300">{exp.role} @ {exp.company}</span>
                  <span className="text-slate-500 text-[11px]">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-slate-400 text-[11px] whitespace-pre-line mt-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-4">
          <div className="text-emerald-400 text-xs font-bold mb-2">/** PROJECTS **/</div>
          <div className="space-y-2">
            {projects.map((proj, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between text-white">
                  <span>&gt; {proj.title}</span>
                  {proj.link && <span className="text-emerald-400">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-slate-400 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <div className="text-emerald-400 text-xs font-bold mb-1">/** EDUCATION **/</div>
          <div className="text-[11px] text-slate-300">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between py-0.5">
                <span>{edu.degree} - {edu.institution}</span>
                <span className="text-slate-500">{edu.startYear} - {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 7: CORPORATE NAVY
   ========================================================================= */
const CorporateNavyTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <div className="border-t-8 border-blue-900 pt-4 pb-4 mb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-blue-950 uppercase">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="flex flex-wrap gap-x-4 text-xs text-slate-600 mt-1">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          <span>{personalInfo.linkedin}</span>
        </div>
      </div>

      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase text-blue-900 border-b border-blue-200 pb-1 mb-1.5">Executive Summary</h2>
          <p className="text-slate-700 text-xs leading-normal">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase text-blue-900 border-b border-blue-200 pb-1 mb-1.5">Key Competencies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-xs text-slate-700">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0" />{s}</div>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase text-blue-900 border-b border-blue-200 pb-1 mb-2">Professional Experience</h2>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>{exp.role} — <span className="font-semibold text-blue-800">{exp.company}</span></span>
                  <span className="text-slate-500 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-xs text-slate-700 whitespace-pre-line mt-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase text-blue-900 border-b border-blue-200 pb-1 mb-1.5">Education</h2>
          <div className="space-y-1.5 text-xs">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <span><strong>{edu.degree}</strong>, {edu.institution}</span>
                <span className="text-slate-500">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 8: EXECUTIVE LEADERSHIP
   ========================================================================= */
const ExecutiveLeadershipTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-white text-slate-900 p-9 font-serif leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <header className="border-b-4 border-slate-900 pb-4 mb-5">
        <div className="flex justify-between items-end flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 font-serif">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-sans uppercase tracking-widest text-slate-600 mt-1">
              Executive Profile & Strategy Leader
            </p>
          </div>
          <div className="text-right font-sans text-xs text-slate-600 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-slate-800 leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Key Competencies & Technical Mastery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 font-sans text-xs text-slate-700">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Professional Experience & Career History
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline font-sans">
                  <h3 className="font-bold text-slate-950 text-sm">{exp.role}</h3>
                  <span className="text-xs text-slate-600 italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-serif font-bold text-slate-800 mb-1.5">
                  {exp.company}
                </div>
                {exp.description && (
                  <div className="text-slate-800 text-xs whitespace-pre-line pl-2 leading-relaxed">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2 font-sans text-xs">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-950">{edu.degree}</span>
                  <div className="text-slate-700">{edu.institution}</div>
                </div>
                <span className="text-slate-600">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 9: ATS OPTIMIZED
   ========================================================================= */
const AtsFriendlyTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;
  return (
    <div className="bg-white text-black p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      <header className="border-b border-black pb-3 mb-3">
        <h1 className="text-2xl font-bold uppercase text-black">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="text-xs text-gray-800 mt-1">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location} | {personalInfo.linkedin}
        </div>
      </header>

      {summary && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 pb-0.5 mb-1">SUMMARY</h2>
          <p className="text-xs leading-normal">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 pb-0.5 mb-1">SKILLS</h2>
          <p className="text-xs font-medium">{skills.join(', ')}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 pb-0.5 mb-2">WORK EXPERIENCE</h2>
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold">
                  <span>{exp.company} - {exp.role}</span>
                  <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <div className="text-xs whitespace-pre-line mt-0.5 leading-normal">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase border-b border-gray-400 pb-0.5 mb-1">EDUCATION</h2>
          <div className="space-y-1 text-xs">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <span>{edu.degree}, {edu.institution}</span>
                <span>{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 10: TWO COLUMN COMPACT
   ========================================================================= */
const TwoColumnCompactTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [], certifications = [] } = resumeData;

  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[12px] shadow-sm min-h-[950px]">
      <header className="border-b-2 border-cyan-700 pb-4 mb-5">
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <p className="text-xs font-bold text-cyan-700 uppercase tracking-wider">{experience[0]?.role || 'Software Engineer'}</p>
      </header>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column (4 cols) */}
        <div className="col-span-4 bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-700 pb-1 mb-2">Contact</h3>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              <div className="truncate">{personalInfo.email}</div>
              <div>{personalInfo.phone}</div>
              <div>{personalInfo.location}</div>
              <div className="truncate text-cyan-800">{personalInfo.linkedin}</div>
            </div>
          </div>

          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-700 pb-1 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[10px]">{s}</span>
                ))}
              </div>
            </div>
          )}

          {education && education.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-700 pb-1 mb-2">Education</h3>
              <div className="space-y-2 text-[11px]">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-[10px] text-slate-400">{edu.startYear} - {edu.endYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (8 cols) */}
        <div className="col-span-8 space-y-4">
          {summary && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-700 pb-1 mb-1.5">Profile</h3>
              <p className="text-slate-700 text-xs leading-normal">{summary}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-700 pb-1 mb-2">Work History</h3>
              <div className="space-y-3">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between font-bold text-xs">
                      <span>{exp.role} <span className="font-normal text-cyan-800">@ {exp.company}</span></span>
                      <span className="text-slate-400 text-[11px] font-normal">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <div className="text-slate-700 text-[11px] whitespace-pre-line mt-0.5">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-700 pb-1 mb-2">Projects</h3>
              <div className="space-y-2">
                {projects.map((proj, i) => (
                  <div key={i} className="text-[11px]">
                    <div className="font-bold text-slate-900">{proj.title}</div>
                    {proj.description && <p className="text-slate-600 mt-0.5">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   MAIN TEMPLATE PREVIEW DISPATCHER
   ========================================================================= */
export const TemplatePreview = ({ template = RESUME_TEMPLATES.MODERN, resumeData }) => {
  const normTemplate = (template || 'modern').toLowerCase();

  switch (normTemplate) {
    case 'classic':
    case 'classic-traditional':
      return <ClassicTraditionalTemplate resumeData={resumeData} />;
    case 'professional':
    case 'professional-corporate':
      return <ProfessionalCorporateTemplate resumeData={resumeData} />;
    case 'minimal':
    case 'minimalist':
      return <MinimalCleanTemplate resumeData={resumeData} />;
    case 'creative':
    case 'creative-portfolio':
      return <CreativePortfolioTemplate resumeData={resumeData} />;
    case 'developer':
    case 'developer-mono':
      return <DeveloperMonospaceTemplate resumeData={resumeData} />;
    case 'corporate':
    case 'corporate-navy':
      return <CorporateNavyTemplate resumeData={resumeData} />;
    case 'executive':
      return <ExecutiveLeadershipTemplate resumeData={resumeData} />;
    case 'ats-friendly':
    case 'ats':
      return <AtsFriendlyTemplate resumeData={resumeData} />;
    case 'two-column':
      return <TwoColumnCompactTemplate resumeData={resumeData} />;
    case 'modern':
    default:
      return <ModernTechTemplate resumeData={resumeData} />;
  }
};

export default TemplatePreview;
