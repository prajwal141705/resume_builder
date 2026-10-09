import React, { useRef, useState } from 'react';
import TemplatePreview from './TemplatePreview';
import { exportToPdf } from '../utils/pdfExport';
import { Download, ZoomIn, ZoomOut, Loader2, Sparkles, Sliders, Palette, Type, Layout, ShieldCheck, History } from 'lucide-react';
import toast from 'react-hot-toast';

export const ResumePreview = ({
  resumeData,
  template,
  onSave,
  isSaving,
  onOpenAtsModal,
  onOpenAiModal,
  onOpenVersionModal,
  onUpdateCustomization,
}) => {
  const previewRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading('Generating ATS-ready PDF...');

    try {
      const fileName = `${(resumeData?.personalInfo?.fullName || 'resume')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')}_resume.pdf`;

      await exportToPdf(previewRef.current, fileName);
      toast.success('Resume downloaded successfully!', { id: toastId });
    } catch (err) {
      console.error('PDF export failed:', err);
      toast.error('Failed to generate PDF. Please try again.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.7));
  const handleZoomReset = () => setZoomLevel(1);

  const colors = [
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Teal', value: '#0d9488' },
    { name: 'Slate', value: '#334155' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Rose', value: '#e11d48' },
    { name: 'Navy', value: '#1e3a8a' },
  ];

  return (
    <div className="bg-slate-900/5 rounded-2xl border border-slate-200/80 p-4 lg:p-6 flex flex-col h-full space-y-3">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Live Preview
          </h3>
          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-semibold">
            {template || resumeData?.template || 'modern'}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Customizer Toggle */}
          <button
            type="button"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              showCustomizer
                ? 'bg-brand-50 text-brand-700 border-brand-300 ring-2 ring-brand-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Design
          </button>

          {/* AI Tools */}
          {onOpenAiModal && (
            <button
              type="button"
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-all shadow-xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              AI Tools
            </button>
          )}

          {/* ATS Score */}
          {onOpenAtsModal && (
            <button
              type="button"
              onClick={onOpenAtsModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all shadow-xs active:scale-95"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ATS Score
            </button>
          )}

          {/* Version History */}
          {onOpenVersionModal && (
            <button
              type="button"
              onClick={onOpenVersionModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-xs active:scale-95"
            >
              <History className="w-3.5 h-3.5 text-slate-600" />
              Versions
            </button>
          )}

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 hover:bg-white rounded-lg text-slate-600 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomReset}
              className="px-2 text-xs font-semibold text-slate-600 hover:bg-white rounded-lg transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 hover:bg-white rounded-lg text-slate-600 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Save Button */}
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors shadow-xs disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Save
                </>
              )}
            </button>
          )}

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Customization Control Drawer */}
      {showCustomizer && (
        <div className="bg-white p-4 rounded-2xl border border-brand-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Accent Color */}
          <div>
            <label className="font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Palette className="w-3.5 h-3.5 text-brand-600" /> Accent Color
            </label>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => onUpdateCustomization?.({ accentColor: c.value })}
                  style={{ backgroundColor: c.value }}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    resumeData?.accentColor === c.value ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'hover:scale-105'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <label className="font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Type className="w-3.5 h-3.5 text-brand-600" /> Typography
            </label>
            <select
              value={resumeData?.fontFamily || 'Inter, sans-serif'}
              onChange={(e) => onUpdateCustomization?.({ fontFamily: e.target.value })}
              className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Inter, sans-serif">Modern Clean (Inter)</option>
              <option value="Georgia, serif">Classic Serif (Georgia)</option>
              <option value="'Roboto', sans-serif">Corporate (Roboto)</option>
              <option value="'Fira Code', monospace">Technical (Monospace)</option>
            </select>
          </div>

          {/* Spacing & Sizing */}
          <div>
            <label className="font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Sliders className="w-3.5 h-3.5 text-brand-600" /> Spacing & Size
            </label>
            <div className="grid grid-cols-2 gap-1">
              <select
                value={resumeData?.fontSize || 'medium'}
                onChange={(e) => onUpdateCustomization?.({ fontSize: e.target.value })}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="small">Small Text</option>
                <option value="medium">Medium Text</option>
                <option value="large">Large Text</option>
              </select>
              <select
                value={resumeData?.spacing || 'normal'}
                onChange={(e) => onUpdateCustomization?.({ spacing: e.target.value })}
                className="w-full text-[11px] p-1.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="relaxed">Relaxed</option>
              </select>
            </div>
          </div>

          {/* Layout Structure */}
          <div>
            <label className="font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Layout className="w-3.5 h-3.5 text-brand-600" /> Column Layout
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onUpdateCustomization?.({ layout: 'one-column' })}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] border transition-colors ${
                  (resumeData?.layout || 'one-column') === 'one-column'
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                1 Column
              </button>
              <button
                type="button"
                onClick={() => onUpdateCustomization?.({ layout: 'two-column' })}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] border transition-colors ${
                  resumeData?.layout === 'two-column'
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                2 Column
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview container */}
      <div className="flex-1 overflow-auto bg-slate-200/50 rounded-2xl p-3 sm:p-6 flex justify-center items-start min-h-[600px]">
        <div
          className="w-full max-w-[820px] origin-top transition-transform duration-200 shadow-2xl rounded-xl overflow-hidden bg-white"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Printable resume container */}
          <div ref={previewRef} id="resume-document" className="w-full bg-white print:p-0">
            <TemplatePreview
              template={template || resumeData?.template}
              resumeData={resumeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
