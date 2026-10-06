import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Eye,
  History,
  Download,
  FileCode,
} from 'lucide-react';
import uploadService from '../services/uploadService';
import resumeService from '../services/resumeService';
import TemplatePreview from '../components/TemplatePreview';
import TemplateSwitcher from '../components/TemplateSwitcher';
import toast from 'react-hot-toast';

export const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [uploadHistory, setUploadHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'history'

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await uploadService.getUploadHistory();
      setUploadHistory(Array.isArray(history) ? history : []);
    } catch (err) {
      console.error('Failed to load upload history:', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      toast.error('Only PDF files are supported.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB.');
      return;
    }
    setFile(selectedFile);
  };

  const handleUploadAndExtract = async () => {
    if (!file) {
      toast.error('Please select a PDF file first.');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Extracting resume content with PDFBox & AI parser...');

    try {
      const response = await uploadService.uploadPdfResume(file);
      setParsedData(response.parsedResume);
      setExtractedText(response.extractedText || '');
      toast.success(response.message || 'Resume parsed successfully!', { id: toastId });
      loadHistory();
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error(err.message || 'Failed to parse resume.', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenInBuilder = () => {
    if (!parsedData) return;
    try {
      localStorage.setItem('resumai_builder_draft', JSON.stringify({
        ...parsedData,
        template: selectedTemplate,
      }));
      toast.success('Loaded into Resume Builder!');
      navigate('/resume-builder');
    } catch (err) {
      console.error(err);
      navigate('/resume-builder');
    }
  };

  const handleSaveToMyResumes = async () => {
    if (!parsedData) return;
    try {
      const saved = await resumeService.createResume({
        ...parsedData,
        template: selectedTemplate,
      });
      toast.success('Resume saved to My Resumes!');
      navigate('/resumes');
    } catch (err) {
      toast.error('Failed to save resume.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <UploadCloud className="w-3.5 h-3.5 text-brand-600" />
            PDF Resume Extractor & Re-Styler
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Upload & Convert Existing Resume
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Upload your existing PDF resume to automatically extract text, personal info, skills, experience, and place it into any modern template.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'history' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Upload History ({uploadHistory.length})
          </button>
        </div>
      </div>

      {activeTab === 'history' ? (
        /* ================= UPLOAD HISTORY TAB ================= */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <History className="w-4 h-4 text-brand-600" />
            Uploaded Resumes Archive
          </h3>
          {uploadHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No previous PDF resumes uploaded yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {uploadHistory.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      PDF
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.originalFileName}</p>
                      <p className="text-[11px] text-slate-400">
                        {item.fileSizeBytes ? `${(item.fileSizeBytes / 1024).toFixed(1)} KB` : 'PDF document'} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    {item.status || 'PARSED'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : !parsedData ? (
        /* ================= UPLOAD DROPZONE ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-5">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-10 sm:p-14 border-2 border-dashed rounded-3xl text-center transition-all bg-white ${
                isDragging
                  ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50/50'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                <UploadCloud className="w-8 h-8" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                Drag & drop your PDF resume here
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                Support for Adobe PDF format up to 10MB. We preserve your original file securely.
              </p>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl cursor-pointer transition-all shadow-sm">
                <span>Browse Local Files</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {file && (
                <div className="mt-6 p-4 bg-brand-50/60 rounded-2xl border border-brand-200/80 max-w-md mx-auto flex items-center justify-between text-left">
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-5 h-5 text-brand-600 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                      <p className="text-[11px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {file && (
              <button
                type="button"
                onClick={handleUploadAndExtract}
                disabled={isUploading}
                className="w-full inline-flex items-center justify-center gap-2 py-4 text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-brand-700 to-slate-900 hover:from-brand-700 hover:to-slate-950 rounded-2xl transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Parsing text & structuring sections...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-brand-300" />
                    Extract & Convert Resume Now
                  </>
                )}
              </button>
            )}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                How the Extractor Works
              </h4>
              <ol className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>1. <strong>PDF Text Extraction:</strong> Extracts raw text content using PDFBox.</li>
                <li>2. <strong>Structure Parsing:</strong> Discovers contact details, skills, experience, and education.</li>
                <li>3. <strong>Re-styling:</strong> Places your data into any of our 10 templates.</li>
                <li>4. <strong>Download or Edit:</strong> Edit details further in Resume Builder or export directly.</li>
              </ol>
            </div>
          </div>
        </div>
      ) : (
        /* ================= PARSED RESULTS & LIVE PREVIEW WORKSPACE ================= */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold">Resume Extracted Successfully!</p>
                <p className="text-[11px] text-emerald-700">Choose a template below and open in editor or save to your account.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setParsedData(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl"
              >
                Upload Different File
              </button>
              <button
                onClick={handleSaveToMyResumes}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs"
              >
                Save to My Resumes
              </button>
              <button
                onClick={handleOpenInBuilder}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
              >
                Open in Resume Builder
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <TemplateSwitcher
            currentTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Extracted Text Overview (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Extracted Candidate Info
                </h4>
                <div className="space-y-1 text-xs">
                  <div><strong>Name:</strong> {parsedData.personalInfo?.fullName}</div>
                  <div><strong>Email:</strong> {parsedData.personalInfo?.email}</div>
                  <div><strong>Phone:</strong> {parsedData.personalInfo?.phone}</div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-100">
                  Discovered Skills ({parsedData.skills?.length || 0})
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(parsedData.skills || []).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Rendered Template (7 cols) */}
            <div className="lg:col-span-7 bg-slate-100 p-4 rounded-2xl border border-slate-200">
              <TemplatePreview
                template={selectedTemplate}
                resumeData={{
                  ...parsedData,
                  template: selectedTemplate,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
