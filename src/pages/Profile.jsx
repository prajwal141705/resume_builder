import React, { useState } from 'react';
import { User, Mail, Shield, Server, Database, Save, CheckCircle2, Sparkles, Key, Check } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user, updateUser, token } = useAuth();

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@example.com');
  const [headline, setHeadline] = useState('Senior Full Stack Software Engineer');
  const [bio, setBio] = useState(
    'Passionate about distributed backend systems in Java/Spring Boot and responsive, accessible UI in React.'
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUser({ name, email });
      setIsSaving(false);
      toast.success('Profile settings updated successfully!');
    }, 400);
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <User className="w-6 h-6 text-brand-600" />
          User Profile & Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your account credentials, target titles, and backend microservice connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Profile Card (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-brand-500/20 ring-4 ring-brand-50">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 className="font-bold text-base text-slate-900">{name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full border border-brand-200/60">
              <Sparkles className="w-3.5 h-3.5" />
              Pro Job Seeker
            </div>
          </div>

          {/* Backend Info Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              <Server className="w-4 h-4 text-emerald-600" />
              System Architecture
            </div>

            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>API Endpoint:</span>
                <span className="font-mono text-[11px] text-slate-900 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                  {apiBaseUrl}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Database:</span>
                <span className="font-semibold text-slate-900">MongoDB Atlas</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Security:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> JWT Bearer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form (8 cols) */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Account Details
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Personal Biography / Notes
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl transition-all shadow-sm shadow-brand-500/25 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
