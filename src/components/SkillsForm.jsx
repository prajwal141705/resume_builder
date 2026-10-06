import React, { useState } from 'react';
import { Wrench, Plus, Sparkles } from 'lucide-react';
import SkillBadge from './SkillBadge';

const POPULAR_SKILLS = [
  'React', 'JavaScript', 'Java', 'Spring Boot', 'MongoDB', 'REST API',
  'Node.js', 'Docker', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Git',
  'AWS', 'Microservices', 'GraphQL', 'Kubernetes', 'Redis', 'Python'
];

export const SkillsForm = ({ skills = [], onChange }) => {
  const [inputVal, setInputVal] = useState('');

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || inputVal).trim();
    if (trimmed && !skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...skills, trimmed]);
      setInputVal('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const unusedSuggestions = POPULAR_SKILLS.filter(
    (ps) => !skills.some((s) => s.toLowerCase() === ps.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-brand-600" />
          Technical & Soft Skills
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Add the programming languages, frameworks, libraries, and developer tools you master.
        </p>
      </div>

      {/* Input + Add button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React.js, Spring Boot, MongoDB (Press Enter)"
          className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={() => handleAddSkill()}
          disabled={!inputVal.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Active skills list */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Your Selected Skills ({skills.length})
        </label>
        {skills.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No skills added yet. Type above or choose from recommendations below.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 p-3 bg-slate-50/70 border border-slate-200 rounded-xl min-h-[52px] items-center">
            {skills.map((skill, index) => (
              <SkillBadge
                key={index}
                name={skill}
                variant="brand"
                onRemove={() => handleRemoveSkill(skill)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      {unusedSuggestions.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Add Suggested Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {unusedSuggestions.slice(0, 10).map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSkill(suggestion)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 bg-white hover:bg-brand-50 hover:text-brand-700 border border-slate-200 rounded-lg transition-colors group"
              >
                <Plus className="w-3 h-3 text-slate-400 group-hover:text-brand-600" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
