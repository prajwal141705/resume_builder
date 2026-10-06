import React from 'react';
import { RESUME_TEMPLATES } from '../utils/constants';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

/* =========================================================================
   TEMPLATE 1: MODERN TECH
   ========================================================================= */
const ModernTechTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;

  return (
    <div className="bg-white text-slate-800 p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      {/* Header */}
      <header className="border-b-2 border-brand-500 pb-5 mb-5">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm font-semibold text-brand-600 mt-0.5 tracking-wide">
          {experience[0]?.role || 'SOFTWARE ENGINEER'}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-600" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5 text-brand-700">
              <Linkedin className="w-3.5 h-3.5 text-brand-600" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5 text-brand-700">
              <Github className="w-3.5 h-3.5 text-brand-600" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2 border-l-4 border-brand-600">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-normal text-justify">{summary}</p>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2 border-l-4 border-brand-600">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded font-medium text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
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
                  <span className="text-xs font-medium text-slate-500">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-brand-700 mb-1.5">
                  {exp.company}
                </div>
                {exp.description && (
                  <div className="text-slate-700 whitespace-pre-line text-xs pl-2 border-l border-slate-200 space-y-1">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2.5 border-l-4 border-brand-600">
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{proj.title}</h3>
                    {proj.technologies && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        | {proj.technologies}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="text-xs text-brand-600 font-medium">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-slate-700 text-xs mt-1 leading-normal">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50/80 px-2 py-1 rounded mb-2.5 border-l-4 border-brand-600">
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                  <div className="text-xs text-slate-700 font-medium">{edu.institution}</div>
                  {edu.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{edu.description}</p>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 2: MINIMALIST (ATS OPTIMIZED)
   ========================================================================= */
const MinimalistTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;

  return (
    <div className="bg-white text-black p-8 font-sans leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      {/* Header */}
      <header className="text-center border-b border-black pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-normal uppercase text-black">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-x-3 text-xs text-gray-700 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-gray-900 text-xs leading-normal">{summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1.5">
            Core Competencies & Skills
          </h2>
          <p className="text-xs text-gray-900 font-medium leading-relaxed">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="text-xs italic font-medium text-gray-800 mb-1">
                  {exp.role}
                </div>
                {exp.description && (
                  <div className="text-xs text-gray-900 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-2">
            Technical Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs font-bold">
                  <span>
                    {proj.title} {proj.technologies && <span className="font-normal text-gray-600">({proj.technologies})</span>}
                  </span>
                  {proj.link && <span className="font-normal text-gray-600 text-[11px]">{proj.link}</span>}
                </div>
                {proj.description && (
                  <p className="text-xs text-gray-900 mt-0.5 leading-normal">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold">{edu.institution}</span> — <span>{edu.degree}</span>
                  {edu.description && <p className="text-gray-600 text-[11px] mt-0.5">{edu.description}</p>}
                </div>
                <span className="font-medium text-gray-700 whitespace-nowrap">
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 3: EXECUTIVE CLASSIC
   ========================================================================= */
const ExecutiveTemplate = ({ resumeData }) => {
  const { personalInfo = {}, summary = '', education = [], experience = [], projects = [], skills = [] } = resumeData;

  return (
    <div className="bg-white text-slate-800 p-9 font-serif leading-relaxed text-[13px] shadow-sm min-h-[950px]">
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-4 mb-5">
        <div className="flex justify-between items-end flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 font-serif">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-sans uppercase tracking-widest text-slate-600 mt-1">
              Executive Profile
            </p>
          </div>
          <div className="text-right font-sans text-xs text-slate-600 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="text-slate-900 font-medium">{personalInfo.linkedin}</div>}
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-slate-800 leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {/* Core Competencies */}
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

      {/* Leadership & Experience */}
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
                    {exp.startDate} – {exp.endDate}
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

      {/* Key Strategic Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
            Key Strategic Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between font-sans text-xs">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  {proj.link && <span className="text-slate-600">{proj.link}</span>}
                </div>
                {proj.technologies && (
                  <div className="text-[11px] font-sans text-slate-500 italic">
                    Tools: {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <p className="text-slate-800 text-xs mt-1 leading-normal">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic Credentials */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Education & Certifications
          </h2>
          <div className="space-y-2 font-sans text-xs">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-950">{edu.degree}</span>
                  <div className="text-slate-700">{edu.institution}</div>
                  {edu.description && <div className="text-[11px] text-slate-500">{edu.description}</div>}
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

export const TemplatePreview = ({ template = RESUME_TEMPLATES.MODERN, resumeData }) => {
  switch (template) {
    case RESUME_TEMPLATES.MINIMALIST:
      return <MinimalistTemplate resumeData={resumeData} />;
    case RESUME_TEMPLATES.EXECUTIVE:
      return <ExecutiveTemplate resumeData={resumeData} />;
    case RESUME_TEMPLATES.MODERN:
    default:
      return <ModernTechTemplate resumeData={resumeData} />;
  }
};

export default TemplatePreview;
