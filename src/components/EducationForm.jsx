import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const EducationForm = ({ education = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      startYear: '',
      endYear: '',
      description: '',
    };
    onChange([...education, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-brand-600" />
            Education
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add your degrees, diplomas, or relevant certifications.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-500 text-xs">
          No education entries added yet. Click "+ Add Education" to include your academic background.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl relative group transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                  title="Remove entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={item.institution || ''}
                    onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree / Major
                  </label>
                  <input
                    type="text"
                    value={item.degree || ''}
                    onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={item.startYear || ''}
                    onChange={(e) => handleUpdate(index, 'startYear', e.target.value)}
                    placeholder="2018"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Year / Expected
                  </label>
                  <input
                    type="text"
                    value={item.endYear || ''}
                    onChange={(e) => handleUpdate(index, 'endYear', e.target.value)}
                    placeholder="2022 (or Present)"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description / Honors / Relevant Coursework
                  </label>
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    placeholder="GPA 3.8/4.0, Dean's Honor List, Relevant coursework..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
