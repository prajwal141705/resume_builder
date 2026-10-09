import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FilePlus,
  Files,
  Edit,
  Trash2,
  Download,
  Sparkles,
  Eye,
  Clock,
  Briefcase,
  Wrench,
  X,
  AlertTriangle,
  Loader2,
  Copy,
  UploadCloud,
  ShieldCheck,
} from 'lucide-react';
import resumeService from '../services/resumeService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import TemplatePreview from '../components/TemplatePreview';
import AtsAnalyzerModal from '../components/AtsAnalyzerModal';
import { exportToPdf } from '../utils/pdfExport';
import toast from 'react-hot-toast';

export const ResumeList = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [previewResume, setPreviewResume] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [duplicatingId, setDuplicatingId] = useState(null);
  const [atsAnalysisResume, setAtsAnalysisResume] = useState(null);

  const modalPreviewRef = useRef(null);

  const loadResumes = async () => {
    try {
      setIsLoading(true);
      const data = await resumeService.getUserResumes();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load resumes:', err);
      toast.error('Failed to load your resumes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleDuplicate = async (resume) => {
    const id = resume.id || resume._id;
    try {
      setDuplicatingId(id);
      const toastId = toast.loading('Duplicating resume...');
      const duplicated = await resumeService.duplicateResume(id);
      setResumes((prev) => [duplicated, ...prev]);
      toast.success('Resume duplicated successfully!', { id: toastId });
    } catch (err) {
      console.error('Duplicate error:', err);
      toast.error(err.message || 'Failed to duplicate resume.');
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const toastId = toast.loading('Deleting resume...');

    try {
      const id = deleteTarget.id || deleteTarget._id;
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((r) => (r.id || r._id) !== id));
      toast.success('Resume deleted.', { id: toastId });
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.message || 'Failed to delete resume.', { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadSinglePdf = async (resume) => {
    setPreviewResume(resume);
    setIsExporting(true);
    const toastId = toast.loading('Exporting PDF...');

    setTimeout(async () => {
      try {
        if (modalPreviewRef.current) {
          const fileName = `${(resume.title || 'resume').toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
          await exportToPdf(modalPreviewRef.current, fileName);
          toast.success('Downloaded PDF!', { id: toastId });
        }
      } catch (err) {
        console.error('Download error:', err);
        toast.error('Failed to generate PDF.', { id: toastId });
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading your resumes..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Files className="w-6 h-6 text-brand-600" />
            My Resumes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, duplicate, analyze ATS compliance, and download your resumes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/upload-resume"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <UploadCloud className="w-4 h-4 text-slate-500" />
            Upload PDF
          </Link>
          <Link
            to="/resume-builder"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl transition-all shadow-sm shadow-brand-500/25"
          >
            <FilePlus className="w-4 h-4" />
            Create New Resume
          </Link>
        </div>
      </div>

      {/* Resumes Grid / Empty State */}
      {resumes.length === 0 ? (
        <EmptyState
          icon={Files}
          title="No resumes created yet"
          description="Build tailored resumes for different roles or upload an existing PDF to maximize your interview chances."
          actionText="Create Your First Resume"
          onAction={() => navigate('/resume-builder')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => {
            const resumeId = resume.id || resume._id;
            const updatedDate = resume.updatedAt
              ? new Date(resume.updatedAt).toLocaleDateString()
              : 'Recent';

            return (
              <div
                key={resumeId}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top line: Title & Template Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors line-clamp-1">
                      {resume.title || 'Untitled Resume'}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-brand-50 text-brand-700 uppercase tracking-wider shrink-0">
                      {resume.template || 'Modern'}
                    </span>
                  </div>

                  {/* Candidate Name & Role */}
                  <p className="text-xs text-slate-600 font-medium mb-3">
                    {resume.personalInfo?.fullName || 'Candidate Profile'} •{' '}
                    <span className="text-slate-400">
                      {resume.experience?.[0]?.role || 'Software Engineer'}
                    </span>
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50/70 p-3 rounded-xl border border-slate-100 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                      <span>{resume.skills?.length || 0} Skills</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{resume.experience?.length || 0} Positions</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                      <Clock className="w-3 h-3" />
                      <span>Updated {updatedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() => navigate(`/resume-builder?id=${resumeId}`)}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      title="Edit Resume"
                    >
                      <Edit className="w-3.5 h-3.5 text-slate-500" />
                      Edit
                    </button>

                    <button
                      onClick={() => setPreviewResume(resume)}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      title="Quick Preview"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      View
                    </button>

                    <button
                      onClick={() => handleDuplicate(resume)}
                      disabled={duplicatingId === resumeId}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                      title="Duplicate Resume"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      Copy
                    </button>

                    <button
                      onClick={() => handleDownloadSinglePdf(resume)}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      PDF
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setAtsAnalysisResume(resume)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors shadow-2xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      ATS Score
                    </button>

                    <button
                      onClick={() => navigate(`/job-matcher?resumeId=${resumeId}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl transition-all shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Find Jobs
                    </button>

                    <button
                      onClick={() => setDeleteTarget(resume)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ATS Analyzer Modal */}
      {atsAnalysisResume && (
        <AtsAnalyzerModal
          isOpen={!!atsAnalysisResume}
          onClose={() => setAtsAnalysisResume(null)}
          resumeData={atsAnalysisResume}
        />
      )}

      {/* Quick Preview Modal */}
      {previewResume && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {previewResume.title || 'Resume Preview'}
                </h3>
                <p className="text-xs text-slate-500">
                  Format: {previewResume.template || 'Modern Tech'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSinglePdf(previewResume)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
                <button
                  onClick={() => setPreviewResume(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Preview */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-100 flex justify-center">
              <div
                ref={modalPreviewRef}
                className="w-full max-w-[760px] bg-white shadow-lg rounded-xl overflow-hidden"
              >
                <TemplatePreview
                  template={previewResume.template}
                  resumeData={previewResume}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50/50">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Delete Resume?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete{' '}
                <strong className="text-slate-800">
                  "{deleteTarget.title || 'Untitled'}"
                </strong>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeList;
