import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Sparkles,
  CheckCircle2,
  Eye,
  ArrowRight,
  Plus,
  Send,
  Clock,
  Check,
  XCircle,
  FileText,
} from 'lucide-react';
import templateService from '../services/templateService';
import { TEMPLATE_OPTIONS } from '../utils/constants';
import TemplatePreview from '../components/TemplatePreview';
import { INITIAL_RESUME_STATE } from '../utils/constants';
import toast from 'react-hot-toast';

export const ResumeTemplatesGallery = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    templateName: '',
    description: '',
    previewUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['All', 'Standard', 'Tech', 'Corporate', 'Creative', 'ATS'];

  useEffect(() => {
    loadTemplates();
    loadMyRequests();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await templateService.getActiveTemplates();
      setTemplates(Array.isArray(data) && data.length > 0 ? data : TEMPLATE_OPTIONS);
    } catch (err) {
      setTemplates(TEMPLATE_OPTIONS);
    }
  };

  const loadMyRequests = async () => {
    try {
      const data = await templateService.getMyRequests();
      setMyRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUseTemplate = (templateId) => {
    navigate(`/resume-builder?template=${templateId}`);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!requestForm.templateName.trim()) {
      toast.error('Please provide a template name.');
      return;
    }

    setIsSubmitting(true);
    try {
      await templateService.submitTemplateRequest(requestForm);
      toast.success('Template request submitted! An administrator will review it.');
      setIsRequestModalOpen(false);
      setRequestForm({ templateName: '', description: '', previewUrl: '' });
      loadMyRequests();
    } catch (err) {
      toast.error(err.message || 'Failed to submit template request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTemplates = activeCategory === 'All'
    ? templates
    : templates.filter((t) => t.category === activeCategory || t.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Layout className="w-3.5 h-3.5 text-brand-600" />
            Template Gallery
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Professional Resume Designs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Choose from modern, corporate, ATS-friendly, and developer-tailored templates engineered to pass applicant tracking systems.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-brand-600" />
            Request Custom Template
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const id = template.slug || template.id;
          return (
            <div
              key={id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-slate-900">{template.name}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-50 text-brand-700 rounded-full border border-brand-200/60">
                    {template.category || 'Standard'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {template.description}
                </p>

                {/* Micro Preview Card */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 text-[10px] text-slate-400 space-y-1 font-mono">
                  <div className="w-1/3 h-2 bg-slate-300 rounded" />
                  <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
                  <div className="w-full h-1 bg-slate-200 rounded mt-2" />
                  <div className="w-5/6 h-1 bg-slate-200 rounded" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>

                <button
                  type="button"
                  onClick={() => handleUseTemplate(id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
                >
                  Use Template
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Submitted Template Requests Section */}
      {myRequests.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            My Submitted Template Requests
          </h3>

          <div className="divide-y divide-slate-100">
            {myRequests.map((req) => (
              <div key={req.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">{req.templateName}</p>
                  <p className="text-[11px] text-slate-500">{req.description || 'No description'}</p>
                  {req.adminFeedback && (
                    <p className="text-[11px] text-brand-700 mt-0.5"><strong>Admin feedback:</strong> {req.adminFeedback}</p>
                  )}
                </div>
                <span
                  className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${
                    req.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : req.status === 'REJECTED'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {req.status || 'PENDING'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">
                Template Preview: <span className="text-brand-600 uppercase">{previewTemplate}</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
                >
                  Use in Resume Builder
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
              <TemplatePreview
                template={previewTemplate}
                resumeData={INITIAL_RESUME_STATE}
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Template Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Request New Resume Template
              </h3>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Found or designed a unique resume layout? Submit it for admin review. Once approved, it will become an active template for all users.
            </p>

            <form onSubmit={handleSubmitRequest} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Template Name *</label>
                <input
                  type="text"
                  required
                  value={requestForm.templateName}
                  onChange={(e) => setRequestForm({ ...requestForm, templateName: e.target.value })}
                  placeholder="e.g. Nordic Dark Developer CV"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Key Highlights</label>
                <textarea
                  rows={3}
                  value={requestForm.description}
                  onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                  placeholder="Explain why this design is effective, who it is for, and font/color suggestions..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preview Image / Figma URL (Optional)</label>
                <input
                  type="url"
                  value={requestForm.previewUrl}
                  onChange={(e) => setRequestForm({ ...requestForm, previewUrl: e.target.value })}
                  placeholder="https://example.com/preview.png or Figma link"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplatesGallery;
