import React from 'react';
import { Plus, Trash2, Building, Calendar, FileText } from 'lucide-react';

export const InternshipsForm = ({ internships = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: `intern-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...internships, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...internships];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = internships.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Building className="w-4 h-4 text-brand-600" />
            Internships & Training
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add your industrial internships, training bootcamps, and apprenticeships.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Internship
        </button>
      </div>

      {internships.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-xs text-slate-500 mb-3">No internships added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            + Add an internship
          </button>
        </div>
      ) : (
        internships.map((item, index) => (
          <div key={item.id || index} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">Internship #{index + 1}</span>
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
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company / Org</label>
                <input
                  type="text"
                  value={item.company || ''}
                  onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                  placeholder="e.g. Apex Tech Labs"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Role Title</label>
                <input
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => handleUpdate(index, 'role', e.target.value)}
                  placeholder="e.g. Software Intern"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Start Date</label>
                <input
                  type="text"
                  value={item.startDate || ''}
                  onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                  placeholder="e.g. Jun 2022"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">End Date</label>
                <input
                  type="text"
                  value={item.endDate || ''}
                  onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                  placeholder="e.g. Aug 2022"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Responsibilities & Learning</label>
              <textarea
                rows={2}
                value={item.description || ''}
                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                placeholder="Key projects, mentors, and technologies learned during this internship..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default InternshipsForm;
