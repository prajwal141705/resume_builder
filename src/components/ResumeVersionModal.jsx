import React, { useState, useEffect } from 'react';
import { History, Plus, RotateCcw, Eye, Clock, Check, X, Loader2, AlertCircle } from 'lucide-react';
import resumeService from '../services/resumeService';
import toast from 'react-hot-toast';

export const ResumeVersionModal = ({ isOpen, onClose, resumeId, onRestoreVersion }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSavingNew, setIsSavingNew] = useState(false);
  const [versionName, setVersionName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedVersion, setSelectedVersion] = useState(null);

  const fetchVersions = async () => {
    if (!resumeId) return;
    setLoading(true);
    try {
      const data = await resumeService.getVersions(resumeId);
      setVersions(data || []);
    } catch (err) {
      console.error('Failed to load versions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVersions();
    }
  }, [isOpen, resumeId]);

  const handleCreateSnapshot = async (e) => {
    e.preventDefault();
    if (!versionName.trim()) {
      toast.error('Please provide a version title');
      return;
    }
    setIsSavingNew(true);
    try {
      await resumeService.createVersion(resumeId, versionName, notes);
      toast.success('Version snapshot saved!');
      setVersionName('');
      setNotes('');
      fetchVersions();
    } catch (err) {
      toast.error('Failed to create version snapshot');
    } finally {
      setIsSavingNew(false);
    }
  };

  const handleRestore = async (ver) => {
    if (window.confirm(`Restore to "${ver.versionName}"? Current unsaved edits will be replaced.`)) {
      try {
        const restored = await resumeService.restoreVersion(resumeId, ver.id);
        onRestoreVersion(restored);
        toast.success(`Restored to ${ver.versionName}!`);
        onClose();
      } catch (err) {
        toast.error('Failed to restore version');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-emerald-400 border border-white/20">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                Resume Version History & Restore
              </h3>
              <p className="text-xs text-slate-300">
                Track changes, create revision milestones, and safely restore previous resume versions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {/* Create New Snapshot Form */}
          <form onSubmit={handleCreateSnapshot} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-600" /> Save Current State as New Version
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="e.g. Applied to Google / Added AWS Cert"
                className="text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden bg-white"
              />
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Change notes (optional)"
                className="text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={isSavingNew || !versionName.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              {isSavingNew ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Save Version Snapshot
            </button>
          </form>

          {/* Versions List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Saved Versions:</h4>
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-600" />
                Loading version history...
              </div>
            ) : versions.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                <AlertCircle className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                No versions recorded yet. Save a version above to enable 1-click restore points.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {versions.map((ver) => (
                  <div
                    key={ver.id}
                    className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-brand-100 text-brand-800 text-[10px] font-extrabold rounded-full">
                          v{ver.versionNumber}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900">{ver.versionName}</h5>
                      </div>
                      {ver.changeNotes && (
                        <p className="text-[11px] text-slate-500 mt-1">{ver.changeNotes}</p>
                      )}
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(ver.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRestore(ver)}
                        className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeVersionModal;
