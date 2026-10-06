import React, { useRef, useState } from 'react';
import TemplatePreview from './TemplatePreview';
import { exportToPdf } from '../utils/pdfExport';
import { Download, ZoomIn, ZoomOut, Maximize2, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const ResumePreview = ({ resumeData, template, onSave, isSaving }) => {
  const previewRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading('Generating ATS-friendly PDF...');

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

  return (
    <div className="bg-slate-900/5 rounded-2xl border border-slate-200/80 p-4 lg:p-6 flex flex-col h-full">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Real-Time A4 Preview
          </h3>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white rounded text-slate-600 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomReset}
              className="px-2 text-xs font-semibold text-slate-600 hover:bg-white rounded transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white rounded text-slate-600 transition-colors"
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Save Resume
                </>
              )}
            </button>
          )}

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-50"
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

      {/* Preview container */}
      <div className="flex-1 overflow-auto bg-slate-200/50 rounded-xl p-3 sm:p-6 flex justify-center items-start min-h-[600px]">
        <div
          className="w-full max-w-[800px] origin-top transition-transform duration-200 shadow-xl rounded-lg overflow-hidden bg-white"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Targeted printable resume container */}
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
