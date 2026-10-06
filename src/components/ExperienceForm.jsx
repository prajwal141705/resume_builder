import React from 'react';
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';

export const ExperienceForm = ({ experience = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange([...experience, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-600" />
            Work Experience
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add relevant professional roles, internships, or freelance work.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-6 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-500 text-xs">
          No work experience records added yet. Click "+ Add Experience" to showcase your career history.
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl relative group transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Position #{index + 1}
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={item.company || ''}
                    onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                    placeholder="e.g. Google, Acme Corp"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={item.role || ''}
                    onChange={(e) => handleUpdate(index, 'role', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={item.startDate || ''}
                    onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                    placeholder="e.g. Jan 2021"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={item.endDate || ''}
                    onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                    placeholder="e.g. Present (or Aug 2023)"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Responsibilities & Key Achievements
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Tip: Use bullet points (•) & metrics
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={item.description || ''}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    placeholder="• Built microservices using Spring Boot and MongoDB, reducing latency by 30%&#10;• Led frontend revamp with React and Tailwind CSS for 100k+ active users&#10;• Automated deployment pipelines via Docker & GitHub Actions"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400 font-mono text-xs leading-relaxed"
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

export default ExperienceForm;
