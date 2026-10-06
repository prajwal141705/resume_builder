import React from 'react';
import { Target, Trophy, Languages as LangIcon, Heart, Plus, Trash2 } from 'lucide-react';

export const AchievementsLanguagesHobbiesForm = ({
  careerObjective = '',
  achievements = [],
  languages = [],
  hobbies = [],
  onObjectiveChange,
  onAchievementsChange,
  onLanguagesChange,
  onHobbiesChange,
}) => {
  // Achievements Helpers
  const handleAddAchievement = () => {
    onAchievementsChange([...achievements, '']);
  };
  const handleUpdateAchievement = (idx, val) => {
    const updated = [...achievements];
    updated[idx] = val;
    onAchievementsChange(updated);
  };
  const handleRemoveAchievement = (idx) => {
    onAchievementsChange(achievements.filter((_, i) => i !== idx));
  };

  // Languages Helpers
  const handleAddLanguage = () => {
    onLanguagesChange([...languages, '']);
  };
  const handleUpdateLanguage = (idx, val) => {
    const updated = [...languages];
    updated[idx] = val;
    onLanguagesChange(updated);
  };
  const handleRemoveLanguage = (idx) => {
    onLanguagesChange(languages.filter((_, i) => i !== idx));
  };

  // Hobbies Helpers
  const handleAddHobby = () => {
    onHobbiesChange([...hobbies, '']);
  };
  const handleUpdateHobby = (idx, val) => {
    const updated = [...hobbies];
    updated[idx] = val;
    onHobbiesChange(updated);
  };
  const handleRemoveHobby = (idx) => {
    onHobbiesChange(hobbies.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* Career Objective */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-brand-600" />
          Career Objective
        </label>
        <textarea
          rows={2}
          value={careerObjective || ''}
          onChange={(e) => onObjectiveChange(e.target.value)}
          placeholder="Brief 1-2 sentence target objective for entry-level or career switcher roles..."
          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800"
        />
      </div>

      {/* Achievements */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            Key Achievements & Awards
          </label>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="text-[11px] font-bold text-brand-600 hover:text-brand-700"
          >
            + Add Award
          </button>
        </div>

        {achievements.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No achievements added yet.</p>
        ) : (
          achievements.map((ach, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={ach}
                onChange={(e) => handleUpdateAchievement(idx, e.target.value)}
                placeholder="e.g. 1st Place Winner at Hackathon 2023"
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveAchievement(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Languages */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <LangIcon className="w-4 h-4 text-brand-600" />
            Spoken Languages
          </label>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="text-[11px] font-bold text-brand-600 hover:text-brand-700"
          >
            + Add Language
          </button>
        </div>

        {languages.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No languages added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {languages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={lang}
                  onChange={(e) => handleUpdateLanguage(idx, e.target.value)}
                  placeholder="e.g. English (Fluent), German (B2)"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hobbies & Interests */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500" />
            Hobbies & Extracurriculars
          </label>
          <button
            type="button"
            onClick={handleAddHobby}
            className="text-[11px] font-bold text-brand-600 hover:text-brand-700"
          >
            + Add Hobby
          </button>
        </div>

        {hobbies.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No hobbies added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hobbies.map((hobby, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={hobby}
                  onChange={(e) => handleUpdateHobby(idx, e.target.value)}
                  placeholder="e.g. Open Source, Marathon Running, Chess"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsLanguagesHobbiesForm;
