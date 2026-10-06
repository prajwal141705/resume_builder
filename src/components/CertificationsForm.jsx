import React from 'react';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

export const CertificationsForm = ({ certifications = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-600" />
            Certifications & Licenses
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add recognized certifications (AWS, Oracle, Google, Scrum Master, etc.).
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Certificate
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-xs text-slate-500 mb-3">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            + Add a certificate
          </button>
        </div>
      ) : (
        certifications.map((item, index) => (
          <div key={item.id || index} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Certificate #{index + 1}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={item.issuer || ''}
                  onChange={(e) => handleUpdate(index, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Issue Year / Date</label>
                <input
                  type="text"
                  value={item.issueDate || ''}
                  onChange={(e) => handleUpdate(index, 'issueDate', e.target.value)}
                  placeholder="e.g. 2023"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Verification URL / Credential ID</label>
                <input
                  type="text"
                  value={item.credentialUrl || ''}
                  onChange={(e) => handleUpdate(index, 'credentialUrl', e.target.value)}
                  placeholder="e.g. https://aws.amazon.com/verify/123"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CertificationsForm;
