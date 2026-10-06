import React, { useState } from 'react';
import { TEMPLATE_OPTIONS } from '../utils/constants';
import { Check, Layout, Sparkles } from 'lucide-react';

export const TemplateSwitcher = ({ currentTemplate, onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Standard', 'Tech', 'Corporate', 'Creative', 'ATS'];

  const filteredTemplates = activeCategory === 'All'
    ? TEMPLATE_OPTIONS
    : TEMPLATE_OPTIONS.filter((t) => t.category === activeCategory);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Select Resume Design Template
            </h4>
            <p className="text-xs text-slate-500">
              Switch anytime — your resume data stays safe and adapts instantly.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-h-[280px] overflow-y-auto pr-1">
        {filteredTemplates.map((tmpl) => {
          const isSelected = currentTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`text-left p-3 rounded-xl border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="font-bold text-xs text-slate-900 truncate">{tmpl.name}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tmpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-slate-400">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tmpl.accentColor }}
                  />
                  {tmpl.category}
                </span>
                {isSelected ? (
                  <span className="text-brand-600 font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                    Selected
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">Use</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSwitcher;
