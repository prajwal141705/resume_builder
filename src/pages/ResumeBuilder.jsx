import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSwitcher from '../components/TemplateSwitcher';
import LoadingSpinner from '../components/LoadingSpinner';
import { INITIAL_RESUME_STATE, RESUME_TEMPLATES } from '../utils/constants';
import resumeService from '../services/resumeService';
import { Sparkles, Save, RotateCcw, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resumeId = searchParams.get('id');

  const [resumeData, setResumeData] = useState(() => {
    // If not editing specific ID, check for cached draft
    try {
      const cached = localStorage.getItem('resumai_builder_draft');
      if (cached && !resumeId) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RESUME_STATE;
  });

  const [template, setTemplate] = useState(
    resumeData.template || RESUME_TEMPLATES.MODERN
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Fetch resume data if editing existing
  useEffect(() => {
    if (!resumeId) return;

    const loadResume = async () => {
      try {
        setIsLoading(true);
        const data = await resumeService.getResumeById(resumeId);
        if (data) {
          setResumeData(data);
          if (data.template) {
            setTemplate(data.template);
          }
        }
      } catch (err) {
        console.error('Error loading resume:', err);
        toast.error('Failed to load resume details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  // Persist draft in local storage for safety
  const handleDataChange = (updated) => {
    setResumeData(updated);
    try {
      localStorage.setItem('resumai_builder_draft', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleTemplateChange = (newTemplate) => {
    setTemplate(newTemplate);
    setResumeData((prev) => ({
      ...prev,
      template: newTemplate,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading('Saving resume...');

    try {
      const payload = {
        ...resumeData,
        template,
        updatedAt: new Date().toISOString(),
      };

      let saved;
      if (resumeId || resumeData.id || resumeData._id) {
        const idToUpdate = resumeId || resumeData.id || resumeData._id;
        saved = await resumeService.updateResume(idToUpdate, payload);
      } else {
        saved = await resumeService.createResume(payload);
      }

      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      toast.success('Resume saved successfully!', { id: toastId });

      if (!resumeId && saved?.id) {
        // Update URL to reflect saved ID
        navigate(`/resume-builder?id=${saved.id}`, { replace: true });
      }
    } catch (err) {
      console.error('Error saving resume:', err);
      toast.error(err.message || 'Failed to save resume.', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToSample = () => {
    if (window.confirm('Reset all fields to sample developer resume data?')) {
      setResumeData(INITIAL_RESUME_STATE);
      setTemplate(RESUME_TEMPLATES.MODERN);
      toast.success('Sample resume loaded.');
    }
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading resume builder..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/resumes')}
            className="p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            title="Back to Resumes"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {resumeData?.title || 'Resume Editor'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit on the left, see instant live rendering on the right.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {lastSavedTime && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Saved at {lastSavedTime}
            </span>
          )}

          <button
            type="button"
            onClick={handleResetToSample}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
            title="Reset to default mock content"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Sample Data
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl transition-all shadow-sm shadow-brand-500/25 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? 'Saving...' : 'Save Resume'}
          </button>
        </div>
      </div>

      {/* Template Switcher Bar */}
      <TemplateSwitcher
        currentTemplate={template}
        onSelectTemplate={handleTemplateChange}
      />

      {/* Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className="lg:col-span-6 xl:col-span-5 h-[calc(100vh-280px)] min-h-[600px] sticky top-20">
          <ResumeForm
            resumeData={resumeData}
            onChange={handleDataChange}
          />
        </div>

        {/* Right Column: Live A4 Preview (7 cols) */}
        <div className="lg:col-span-6 xl:col-span-7 h-[calc(100vh-280px)] min-h-[600px] sticky top-20">
          <ResumePreview
            resumeData={resumeData}
            template={template}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
