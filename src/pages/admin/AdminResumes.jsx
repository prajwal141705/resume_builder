import React, { useState, useEffect } from 'react';
import {
  FileText,
  UploadCloud,
  Eye,
  Download,
  Search,
  ExternalLink,
} from 'lucide-react';
import adminService from '../../services/adminService';
import resumeService from '../../services/resumeService';
import TemplatePreview from '../../components/TemplatePreview';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

export const AdminResumes = () => {
  const [activeTab, setActiveTab] = useState('created'); // 'created' | 'uploaded'
  const [createdResumes, setCreatedResumes] = useState([]);
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [previewResume, setPreviewResume] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userResumes, uploads] = await Promise.all([
        resumeService.getUserResumes(),
        adminService.getUploadedResumes(),
      ]);
      setCreatedResumes(Array.isArray(userResumes) ? userResumes : []);
      setUploadedResumes(Array.isArray(uploads) ? uploads : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCreated = createdResumes.filter((r) =>
    (r.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.personalInfo?.fullName || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredUploaded = uploadedResumes.filter((u) =>
    (u.originalFileName || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.userEmail || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading platform resumes..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            Resume Repository
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Platform Resumes & Uploads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review all created candidate resumes and inspect original uploaded PDF files.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'created' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Created Resumes ({createdResumes.length})
          </button>
          <button
            onClick={() => setActiveTab('uploaded')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'uploaded' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            PDF Uploads ({uploadedResumes.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by resume title, candidate name, or filename..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {activeTab === 'created' ? (
        /* ================= CREATED RESUMES TABLE ================= */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-5">Resume Title</th>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Template</th>
                  <th className="py-3.5 px-4">Skills Count</th>
                  <th className="py-3.5 px-4">Last Updated</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCreated.map((res) => (
                  <tr key={res.id || res._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      {res.title || 'Untitled Resume'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {res.personalInfo?.fullName || 'Candidate'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200/60 uppercase">
                        {res.template || 'modern'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {res.skills?.length || 0} skills
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {res.updatedAt ? new Date(res.updatedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => setPreviewResume(res)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ================= UPLOADED PDF ARCHIVE TABLE ================= */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-5">Original File Name</th>
                  <th className="py-3.5 px-4">User Email</th>
                  <th className="py-3.5 px-4">File Size</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Uploaded Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUploaded.map((up) => (
                  <tr key={up.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                      <span className="truncate">{up.originalFileName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {up.userEmail || 'User'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {up.fileSizeBytes ? `${(up.fileSizeBytes / 1024).toFixed(1)} KB` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {up.status || 'PARSED'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {up.createdAt ? new Date(up.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {previewResume && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">
                {previewResume.title}
              </h3>
              <button
                onClick={() => setPreviewResume(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
              <TemplatePreview
                template={previewResume.template || 'modern'}
                resumeData={previewResume}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResumes;
