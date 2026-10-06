import React from 'react';
import { FolderGit2, Plus, Trash2, ExternalLink } from 'lucide-react';

export const ProjectForm = ({ projects = [], onChange }) => {
  const handleAdd = () => {
    const newItem = {
      id: `proj-${Date.now()}`,
      title: '',
      technologies: '',
      description: '',
      link: '',
    };
    onChange([...projects, newItem]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-brand-600" />
            Projects & Portfolio
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Highlight impactful side projects, open-source work, or case studies.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-500 text-xs">
          No projects added yet. Click "+ Add Project" to highlight your practical builds.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl relative group transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                  title="Remove project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                    placeholder="e.g. AI-Powered Resume Matcher"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tech Stack Used
                  </label>
                  <input
                    type="text"
                    value={item.technologies || ''}
                    onChange={(e) => handleUpdate(index, 'technologies', e.target.value)}
                    placeholder="React, Spring Boot, MongoDB, Tailwind"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Link / Repository URL
                  </label>
                  <div className="relative">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="url"
                      value={item.link || ''}
                      onChange={(e) => handleUpdate(index, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description & Key Features
                  </label>
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    placeholder="Describe what the application does, problems solved, and technical architecture..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400 leading-relaxed"
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

export default ProjectForm;
