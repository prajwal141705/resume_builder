import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Sparkles,
  Shield,
  Save,
  Check,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 019-2834');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({ name, phone });
    toast.success('Account preferences saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
          <SettingsIcon className="w-3.5 h-3.5 text-slate-600" />
          User Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Account & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal details, AI tailoring options, and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-2 shadow-xs space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all text-left ${
              activeTab === 'general' ? 'bg-brand-50 text-brand-700 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            General Profile
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all text-left ${
              activeTab === 'ai' ? 'bg-brand-50 text-brand-700 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Intelligence Options
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all text-left ${
              activeTab === 'security' ? 'bg-brand-50 text-brand-700 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            Password & Security
          </button>
        </div>

        {/* Content Area (8 cols) */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          {activeTab === 'general' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                Profile Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Email address is your primary account key.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                AI Alignment & Optimization Settings
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">Enable Smart Skill Suggestions</p>
                    <p className="text-[11px] text-slate-500">Automatically discover missing keywords from job descriptions.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiSuggestions}
                    onChange={(e) => setAiSuggestions(e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">1-Click AI Professional Summaries</p>
                    <p className="text-[11px] text-slate-500">Allow AI to craft customized professional summaries in Resume Builder.</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                Authentication & Security
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password (min. 8 characters)"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toast.success('Password updated successfully!')}
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
