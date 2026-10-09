import React, { useState } from 'react';
import { User, Mail, Shield, Server, Database, Save, CheckCircle2, Sparkles, Key, Check, Phone, MapPin, Linkedin, Github, FilePlus, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'prajwal@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [location, setLocation] = useState('San Francisco, CA');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/alexmorgan');
  const [github, setGithub] = useState('github.com/alexmorgan');
  const [headline, setHeadline] = useState('Senior Full Stack Software Engineer');
  const [bio, setBio] = useState(
    'Passionate about distributed backend systems in Java/Spring Boot and responsive, accessible UI in React.'
  );
  const [isSaving, setIsSaving] = useState(false);

  // Compute profile completeness
  const computeCompletion = () => {
    const fields = [
      { name: 'Full Name', value: name, weight: 15 },
      { name: 'Email Address', value: email, weight: 15 },
      { name: 'Phone Number', value: phone, weight: 15 },
      { name: 'Location', value: location, weight: 15 },
      { name: 'LinkedIn Profile', value: linkedin, weight: 15 },
      { name: 'GitHub Profile', value: github, weight: 15 },
      { name: 'Professional Headline', value: headline, weight: 10 },
    ];

    let score = 0;
    const missing = [];

    fields.forEach((f) => {
      if (f.value && f.value.trim().length > 0) {
        score += f.weight;
      } else {
        missing.push(f.name);
      }
    });

    return { score, missing };
  };

  const { score: completionScore, missing: missingFields } = computeCompletion();

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUser({ name, email, phone });
      setIsSaving(false);
      toast.success('Profile updated successfully!');
    }, 350);
  };

  const handleCreateResumeFromProfile = () => {
    const prefill = {
      title: `${headline || 'Professional'} Resume`,
      personalInfo: {
        fullName: name,
        email: email,
        phone: phone,
        location: location,
        linkedin: linkedin,
        github: github,
      },
      summary: bio,
      template: 'modern',
    };

    localStorage.setItem('resumai_builder_draft', JSON.stringify(prefill));
    toast.success('Profile loaded into Resume Builder!');
    navigate('/resume-builder');
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <User className="w-6 h-6 text-brand-600" />
            Candidate Profile & Identity
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain your master profile to auto-populate future resumes and match with jobs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateResumeFromProfile}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm"
        >
          <FilePlus className="w-3.5 h-3.5" />
          Create Resume from Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Profile Card & Completion Status (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-brand-500/20 ring-4 ring-brand-50">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 className="font-bold text-base text-slate-900">{name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full border border-brand-200/60">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Candidate
            </div>
          </div>

          {/* Profile Completion Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Profile Completion
              </span>
              <span className="text-sm font-black text-brand-600">{completionScore}%</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completionScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${completionScore}%` }}
              />
            </div>

            {missingFields.length > 0 ? (
              <div className="pt-2 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                <p className="font-semibold text-slate-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Complete to reach 100%:
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500 pl-1">
                  {missingFields.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1 border-t border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Profile Completed!
              </div>
            )}
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
                  <Shield className="w-3.5 h-3.5" /> JWT Auth Guard
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form (8 cols) */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Edit Master Profile Information
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
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
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                    />
                  </div>
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
                  placeholder="e.g. Senior Full Stack Software Engineer"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Executive Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-hidden leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? 'Saving Changes...' : 'Save Profile Details'}
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
