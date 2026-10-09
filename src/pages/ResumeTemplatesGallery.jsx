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
  Search,
  ShieldCheck,
  Star,
  Award,
} from 'lucide-react';
import templateService from '../services/templateService';
import { TEMPLATE_OPTIONS, RESUME_TEMPLATES_LIST, INITIAL_RESUME_STATE } from '../utils/constants';
import TemplatePreview from '../components/TemplatePreview';
import toast from 'react-hot-toast';

export const ResumeTemplatesGallery = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    templateName: '',
    description: '',
    previewUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'All',
    'ATS',
    'Modern',
    'Classic',
    'Corporate',
    'Minimal',
    'Creative',
    'Developer',
    'Executive',
    'Two Column',
    'Professional',
    'Free',
  ];

  useEffect(() => {
    loadTemplates();
    loadMyRequests();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await templateService.getActiveTemplates();
      setTemplates(Array.isArray(data) && data.length > 0 ? data : RESUME_TEMPLATES_LIST);
    } catch (err) {
      setTemplates(RESUME_TEMPLATES_LIST);
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
      toast.success('Template design submitted! Admin will review and approve it shortly.');
      setIsRequestModalOpen(false);
      setRequestForm({ templateName: '', description: '', previewUrl: '' });
      loadMyRequests();
    } catch (err) {
      toast.error(err.message || 'Failed to submit template request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTemplates = templates.filter((t) => {
    const nameMatch = (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!nameMatch) return false;

    if (activeCategory === 'All') return true;
    if (activeCategory === 'Free') return true; // all templates are free
    if (activeCategory === 'ATS') return (t.category || '').toLowerCase().includes('ats') || (t.slug || '').includes('ats');
    return (t.category || '').toLowerCase().includes(activeCategory.toLowerCase()) ||
      (t.name || '').toLowerCase().includes(activeCategory.toLowerCase()) ||
      (t.slug || '').toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Layout className="w-3.5 h-3.5 text-brand-600" />
            10+ Production Resume Templates
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Template Library & Design Customizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Switch between 10+ pixel-perfect templates anytime without losing resume content. Built for ATS robots and human recruiters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-brand-600" />
            Submit Custom Format
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by name, style, or role..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const id = template.slug || template.id;
          return (
            <div
              key={id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                      {template.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {template.category || 'Professional'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {template.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-50 text-brand-700 rounded-md border border-brand-200">
                        {template.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                      Free
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {template.description}
                </p>

                {/* Visual Preview Snapshot Box */}
                <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 p-3 mb-4 overflow-hidden relative shadow-inner">
                  <div className="w-1/3 h-2 bg-slate-300 rounded mb-1.5" />
                  <div className="w-1/2 h-1.5 bg-slate-200 rounded mb-3" />
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-slate-200 rounded" />
                    <div className="w-5/6 h-1 bg-slate-200 rounded" />
                    <div className="w-4/5 h-1 bg-slate-200 rounded" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 to-transparent" />
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

      {/* User-Submitted Templates Status */}
      {myRequests.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            My Submitted Template Designs
          </h3>

          <div className="divide-y divide-slate-100">
            {myRequests.map((req) => (
              <div key={req.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">{req.templateName}</p>
                  <p className="text-[11px] text-slate-500">{req.description || 'Custom template proposal'}</p>
                  {req.adminFeedback && (
                    <p className="text-[11px] text-brand-700 mt-0.5"><strong>Admin note:</strong> {req.adminFeedback}</p>
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">
                Template Preview: <span className="text-brand-600 uppercase">{previewTemplate}</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Submit New Resume Template
              </h3>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Have a unique resume layout? Submit it for administrator review. Approved formats will become available in the library for all users!
            </p>

            <form onSubmit={handleSubmitRequest} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Template Name *</label>
                <input
                  type="text"
                  required
                  value={requestForm.templateName}
                  onChange={(e) => setRequestForm({ ...requestForm, templateName: e.target.value })}
                  placeholder="e.g. Nordic Dark Tech CV"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Layout Highlights</label>
                <textarea
                  rows={3}
                  value={requestForm.description}
                  onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                  placeholder="Explain why this design is effective, which industry it is for, font choices..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preview Image / Figma Link (Optional)</label>
                <input
                  type="url"
                  value={requestForm.previewUrl}
                  onChange={(e) => setRequestForm({ ...requestForm, previewUrl: e.target.value })}
                  placeholder="https://example.com/preview.png"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
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
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Design'}
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
