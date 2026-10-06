import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import InternshipsForm from './InternshipsForm';
import ProjectForm from './ProjectForm';
import SkillsForm from './SkillsForm';
import CertificationsForm from './CertificationsForm';
import AchievementsLanguagesHobbiesForm from './AchievementsLanguagesHobbiesForm';
import { User, GraduationCap, Briefcase, FolderGit2, Wrench, FileEdit, Building, Award, Sparkles } from 'lucide-react';

export const ResumeForm = ({ resumeData, onChange }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: resumeData?.experience?.length || 0 },
    { id: 'internships', label: 'Internships', icon: Building, count: resumeData?.internships?.length || 0 },
    { id: 'education', label: 'Education', icon: GraduationCap, count: resumeData?.education?.length || 0 },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: resumeData?.projects?.length || 0 },
    { id: 'skills', label: 'Skills', icon: Wrench, count: resumeData?.skills?.length || 0 },
    { id: 'certifications', label: 'Certificates', icon: Award, count: resumeData?.certifications?.length || 0 },
    { id: 'extras', label: 'Extras', icon: Sparkles },
  ];

  const handleFieldUpdate = (field, value) => {
    onChange({
      ...resumeData,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm flex flex-col h-full">
      {/* Resume Document Title */}
      <div className="mb-5 pb-4 border-b border-slate-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
          <FileEdit className="w-3.5 h-3.5 text-brand-600" />
          Resume Document Name
        </label>
        <input
          type="text"
          value={resumeData?.title || ''}
          onChange={(e) => handleFieldUpdate('title', e.target.value)}
          placeholder="e.g. Senior Full Stack Resume 2026"
          className="w-full text-base font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 focus:bg-white px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
      </div>

      {/* Tabs Header */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-slate-100 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Form Tab Content */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activeTab === 'personal' && (
          <PersonalInfoForm
            personalInfo={resumeData?.personalInfo}
            summary={resumeData?.summary}
            skills={resumeData?.skills}
            title={resumeData?.title}
            onChange={(val) => handleFieldUpdate('personalInfo', val)}
            onSummaryChange={(val) => handleFieldUpdate('summary', val)}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experience={resumeData?.experience}
            onChange={(val) => handleFieldUpdate('experience', val)}
          />
        )}

        {activeTab === 'internships' && (
          <InternshipsForm
            internships={resumeData?.internships}
            onChange={(val) => handleFieldUpdate('internships', val)}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            education={resumeData?.education}
            onChange={(val) => handleFieldUpdate('education', val)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectForm
            projects={resumeData?.projects}
            onChange={(val) => handleFieldUpdate('projects', val)}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            skills={resumeData?.skills}
            onChange={(val) => handleFieldUpdate('skills', val)}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsForm
            certifications={resumeData?.certifications}
            onChange={(val) => handleFieldUpdate('certifications', val)}
          />
        )}

        {activeTab === 'extras' && (
          <AchievementsLanguagesHobbiesForm
            careerObjective={resumeData?.careerObjective}
            achievements={resumeData?.achievements}
            languages={resumeData?.languages}
            hobbies={resumeData?.hobbies}
            onObjectiveChange={(val) => handleFieldUpdate('careerObjective', val)}
            onAchievementsChange={(val) => handleFieldUpdate('achievements', val)}
            onLanguagesChange={(val) => handleFieldUpdate('languages', val)}
            onHobbiesChange={(val) => handleFieldUpdate('hobbies', val)}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
