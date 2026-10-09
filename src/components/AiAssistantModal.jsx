import React, { useState } from 'react';
import { Sparkles, FileText, Check, Copy, Wand2, Lightbulb, Briefcase, Plus, X, ArrowRight, Loader2 } from 'lucide-react';
import aiService from '../services/aiService';
import toast from 'react-hot-toast';

export const AiAssistantModal = ({ isOpen, onClose, resumeData, onUpdateResume }) => {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'bullets' | 'skills' | 'jd'
  const [loading, setLoading] = useState(false);

  // Summary Generator State
  const [summaryRole, setSummaryRole] = useState(resumeData?.experience?.[0]?.role || 'Full Stack Developer');
  const [summaryExp, setSummaryExp] = useState('3+');
  const [summaryTone, setSummaryTone] = useState('Impactful');
  const [generatedSummaries, setGeneratedSummaries] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState('');

  // Bullet Point Enhancer State
  const [currentBullet, setCurrentBullet] = useState('');
  const [improvedBulletResult, setImprovedBulletResult] = useState(null);

  // Skill Suggestions State
  const [skillRole, setSkillRole] = useState(resumeData?.experience?.[0]?.role || 'React Developer');
  const [suggestedSkills, setSuggestedSkills] = useState(null);

  // JD Analysis State
  const [jdText, setJdText] = useState('');
  const [jdAnalysis, setJdAnalysis] = useState(null);

  if (!isOpen) return null;

  // Handlers
  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const res = await aiService.generateSummary({
        targetRole: summaryRole,
        yearsOfExperience: summaryExp,
        keySkills: resumeData?.skills || [],
        tone: summaryTone,
      });
      const all = [res.summary, ...(res.alternateSummaries || [])];
      setGeneratedSummaries(all);
      setSelectedSummary(all[0]);
    } catch (e) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const handleApplySummary = (text) => {
    onUpdateResume({ summary: text });
    toast.success('Summary applied to your resume!');
    onClose();
  };

  const handleImproveBullet = async () => {
    if (!currentBullet.trim()) {
      toast.error('Please enter a draft bullet point or responsibility');
      return;
    }
    setLoading(true);
    try {
      const res = await aiService.improveSection({
        sectionName: 'experience',
        currentText: currentBullet,
        targetRole: summaryRole,
      });
      setImprovedBulletResult(res);
    } catch (e) {
      toast.error('Failed to enhance section');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchSkills = async () => {
    setLoading(true);
    try {
      const res = await aiService.suggestSkills({
        targetRole: skillRole,
        existingSkills: resumeData?.skills || [],
      });
      setSuggestedSkills(res);
    } catch (e) {
      toast.error('Failed to fetch skill suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = (skill) => {
    const existing = resumeData?.skills || [];
    if (!existing.includes(skill)) {
      onUpdateResume({ skills: [...existing, skill] });
      toast.success(`Added "${skill}" to skills!`);
    } else {
      toast.error(`"${skill}" already added`);
    }
  };

  const handleAnalyzeJD = async () => {
    if (!jdText.trim()) {
      toast.error('Please paste a job description');
      return;
    }
    setLoading(true);
    try {
      const res = await aiService.analyzeJobDescription(jdText);
      setJdAnalysis(res);
    } catch (e) {
      toast.error('Failed to analyze job description');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-purple-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-brand-200 border border-white/20">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                AI Resume Power Suite
              </h3>
              <p className="text-xs text-brand-200">
                Enhance your resume sections, generate summaries, and target job keywords
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-brand-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'summary', label: 'Summary Generator', icon: FileText },
            { id: 'bullets', label: 'Bullet Enhancer', icon: Wand2 },
            { id: 'skills', label: 'Skill Recommender', icon: Lightbulb },
            { id: 'jd', label: 'Job Targeter', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  active
                    ? 'bg-white text-brand-700 border-brand-600 shadow-xs'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
          {/* TAB 1: SUMMARY GENERATOR */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={summaryRole}
                    onChange={(e) => setSummaryRole(e.target.value)}
                    placeholder="e.g. React Developer"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="text"
                    value={summaryExp}
                    onChange={(e) => setSummaryExp(e.target.value)}
                    placeholder="e.g. 3+ or Senior"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tone & Positioning</label>
                  <select
                    value={summaryTone}
                    onChange={(e) => setSummaryTone(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden bg-white"
                  >
                    <option value="Impactful">Impactful & Results-Driven</option>
                    <option value="Executive">Executive Leadership</option>
                    <option value="Technical">Deep Technical / Engineering</option>
                    <option value="Entry-Level">Fresh / Early Career</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateSummary}
                disabled={loading}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Professional Summaries
              </button>

              {generatedSummaries.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Best Option:</h4>
                  {generatedSummaries.map((text, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                        selectedSummary === text
                          ? 'border-brand-500 bg-brand-50/50 shadow-xs'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-slate-800 mb-3">{text}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400">Option {idx + 1}</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(text);
                              toast.success('Copied to clipboard');
                            }}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-white border border-slate-200"
                            title="Copy text"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplySummary(text)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg flex items-center gap-1 shadow-xs transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" /> Apply to Resume
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BULLET POINT ENHANCER */}
          {activeTab === 'bullets' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Draft Bullet Point or Work Responsibility
                </label>
                <textarea
                  rows={3}
                  value={currentBullet}
                  onChange={(e) => setCurrentBullet(e.target.value)}
                  placeholder="e.g. Worked on the frontend and fixed bugs to make site faster"
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <button
                type="button"
                onClick={handleImproveBullet}
                disabled={loading}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                Enhance with Power Verbs & Measurable Impact
              </button>

              {improvedBulletResult && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                    <Sparkles className="w-3.5 h-3.5" /> Action Verbs Used: {improvedBulletResult.powerVerbsUsed?.join(', ')}
                  </div>
                  <div className="space-y-2">
                    {improvedBulletResult.bulletSuggestions?.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <span className="text-slate-800 leading-normal">{bullet}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(bullet);
                            toast.success('Copied bullet point to clipboard!');
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-semibold text-[11px] shrink-0 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SKILL RECOMMENDER */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillRole}
                  onChange={(e) => setSkillRole(e.target.value)}
                  placeholder="Target Role (e.g. Backend Java Engineer)"
                  className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleFetchSkills}
                  disabled={loading}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                  Discover Skills
                </button>
              </div>

              {suggestedSkills && (
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      High-Demand Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.recommendedTechnicalSkills?.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddSkill(s)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <Plus className="w-3 h-3 text-brand-600" /> {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Essential Tools & Methodologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.trendingTools?.map((t, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddSkill(t)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <Plus className="w-3 h-3 text-slate-600" /> {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: JOB DESCRIPTION TARGETER */}
          {activeTab === 'jd' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Paste Target Job Posting Description
                </label>
                <textarea
                  rows={4}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the full job posting requirements and responsibilities here..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <button
                type="button"
                onClick={handleAnalyzeJD}
                disabled={loading}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Briefcase className="w-4 h-4" />}
                Analyze Job & Extract Target Keywords
              </button>

              {jdAnalysis && (
                <div className="space-y-3 pt-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{jdAnalysis.jobTitle}</span>
                    <span className="px-2 py-0.5 bg-brand-100 text-brand-800 rounded text-[10px] font-bold">
                      {jdAnalysis.experienceLevel}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold uppercase text-slate-500 mb-1.5">Required Skills:</h5>
                    <div className="flex flex-wrap gap-1">
                      {jdAnalysis.requiredSkills?.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddSkill(s)}
                          className="px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded text-xs font-medium hover:border-brand-500"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold uppercase text-slate-500 mb-1.5">Critical Keywords:</h5>
                    <div className="flex flex-wrap gap-1">
                      {jdAnalysis.importantKeywords?.map((kw, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-800 rounded text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantModal;
