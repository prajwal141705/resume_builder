import React from 'react';
import { TEMPLATE_OPTIONS } from '../utils/constants';
import { Check, Layout } from 'lucide-react';

export const TemplateSwitcher = ({ currentTemplate, onSelectTemplate }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Layout className="w-4 h-4 text-brand-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Choose Resume Template
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TEMPLATE_OPTIONS.map((tmpl) => {
          const isSelected = currentTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`text-left p-3.5 rounded-xl border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-sm text-slate-900">{tmpl.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tmpl.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tmpl.accentColor }}
                  />
                  Style Preview
                </span>
                {isSelected && (
                  <span className="text-brand-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Active
                  </span>
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
