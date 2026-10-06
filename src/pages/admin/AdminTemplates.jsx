import React, { useState, useEffect } from 'react';
import {
  Layout,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import adminService from '../../services/adminService';
import templateService from '../../services/templateService';
import { TEMPLATE_OPTIONS, INITIAL_RESUME_STATE } from '../../utils/constants';
import TemplatePreview from '../../components/TemplatePreview';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

export const AdminTemplates = () => {
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'requests'
  const [templates, setTemplates] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Review modal state
  const [reviewingRequest, setReviewingRequest] = useState(null);
  const [reviewDecision, setReviewDecision] = useState('APPROVED');
  const [adminFeedback, setAdminFeedback] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tmplData, reqData] = await Promise.all([
        adminService.getTemplates(),
        adminService.getTemplateRequests(),
      ]);
      setTemplates(Array.isArray(tmplData) && tmplData.length > 0 ? tmplData : TEMPLATE_OPTIONS);
      setRequests(Array.isArray(reqData) ? reqData : []);
    } catch (err) {
      console.error(err);
      setTemplates(TEMPLATE_OPTIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTemplate = async (template) => {
    try {
      await adminService.toggleTemplateStatus(template.id || template.slug);
      toast.success(`Template ${template.enabled !== false ? 'disabled' : 'enabled'}`);
      loadData();
    } catch (err) {
      toast.error('Failed to toggle template status.');
    }
  };

  const handleOpenReviewModal = (req, decision) => {
    setReviewingRequest(req);
    setReviewDecision(decision);
    setAdminFeedback(
      decision === 'APPROVED'
        ? 'Approved. Looks great and passes our visual design standards!'
        : 'Thank you for your submission. We are currently focusing on single-column formats.'
    );
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewingRequest) return;

    setIsReviewing(true);
    try {
      await adminService.reviewTemplateRequest(
        reviewingRequest.id,
        reviewDecision,
        adminFeedback
      );
      toast.success(`Template request marked as ${reviewDecision}!`);
      setReviewingRequest(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to submit review.');
    } finally {
      setIsReviewing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading templates and review queue..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Layout className="w-3.5 h-3.5 text-amber-600" />
            Template Governance
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Resume Templates & Review Workflow
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enable or disable templates available to users, and review community-submitted format requests.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'templates' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Templates ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'requests' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            User Requests ({requests.filter((r) => r.status === 'PENDING').length})
          </button>
        </div>
      </div>

      {activeTab === 'templates' ? (
        /* ================= ACTIVE TEMPLATES GRID ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template) => {
            const id = template.slug || template.id;
            const isEnabled = template.enabled !== false;
            return (
              <div
                key={id}
                className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                  isEnabled ? 'border-slate-200 hover:shadow-md' : 'border-slate-200/60 opacity-60 bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sm text-slate-900">{template.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isEnabled
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isEnabled ? 'Enabled for Users' : 'Disabled'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {template.description}
                  </p>

                  <div className="text-[11px] text-slate-400 mb-2 font-medium">
                    Category: <strong className="text-slate-700">{template.category || 'Standard'}</strong>
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
                    onClick={() => handleToggleTemplate(template)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      isEnabled
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                    }`}
                  >
                    {isEnabled ? 'Disable' : 'Enable Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= TEMPLATE REQUESTS REVIEW QUEUE ================= */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" />
              Community Template Submission Requests
            </h3>
            <span className="text-xs text-slate-500">
              Approved formats automatically become available in the user Resume Builder.
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Layout className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No template requests awaiting review.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {requests.map((req) => (
                <div key={req.id} className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{req.templateName}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
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

                    <p className="text-xs text-slate-600">{req.description || 'No description provided.'}</p>
                    <p className="text-[11px] text-slate-400">
                      Submitted by: <strong>{req.userName || 'User'}</strong> ({req.userEmail}) • {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                    {req.adminFeedback && (
                      <p className="text-[11px] text-brand-700 mt-1">
                        <strong>Admin Feedback:</strong> {req.adminFeedback}
                      </p>
                    )}
                  </div>

                  {req.status === 'PENDING' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenReviewModal(req, 'APPROVED')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        Approve & Publish
                      </button>

                      <button
                        onClick={() => handleOpenReviewModal(req, 'REJECTED')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      {reviewingRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {reviewDecision === 'APPROVED' ? 'Approve & Publish Template' : 'Reject Template Request'}
            </h3>
            <p className="text-xs text-slate-500">
              Template: <strong>{reviewingRequest.templateName}</strong> by {reviewingRequest.userEmail}
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback to User</label>
                <textarea
                  rows={3}
                  required
                  value={adminFeedback}
                  onChange={(e) => setAdminFeedback(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewingRequest(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isReviewing}
                  className={`px-5 py-2 text-xs font-bold text-white rounded-xl ${
                    reviewDecision === 'APPROVED' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {isReviewing ? 'Saving...' : `Confirm ${reviewDecision}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">
                Template Preview: <span className="text-brand-600 uppercase">{previewTemplate}</span>
              </h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
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
    </div>
  );
};

export default AdminTemplates;
