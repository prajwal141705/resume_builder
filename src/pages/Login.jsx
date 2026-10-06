import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Bot, Loader2, CheckCircle2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      toast.success('Welcome back!');
      
      const isAdm = Boolean(
        res?.user?.roles?.includes('ROLE_ADMIN') ||
        res?.user?.email?.toLowerCase() === 'prajwal@gmail.com'
      );
      
      const destination = location.state?.from?.pathname || (isAdm ? '/admin/dashboard' : '/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Brand Promo */}
        <div className="lg:col-span-5 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />

          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-brand-200" />
              </div>
              <span className="text-xl font-black tracking-tight">ResumAI</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-4">
              Supercharge your career with AI intelligence.
            </h2>
            <p className="text-brand-100 text-sm leading-relaxed mb-6">
              Create ATS-friendly resumes and match against real-world job requirements with semantic precision.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-brand-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                <span>Real-time ATS resume preview & instant PDF export</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-brand-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                <span>AI keyword & semantic job match scoring</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-brand-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                <span>Spring Boot & MongoDB cloud backed</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-xs text-brand-200/80 border-t border-white/10 mt-8">
            AI-Powered Resume Builder & Job Matcher Platform © 2026
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Sign in to your account
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Enter your credentials to access your resume workspace or admin console.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-xs text-brand-600 hover:text-brand-700 font-medium cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl transition-all shadow-md shadow-brand-500/25 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-brand-600 hover:text-brand-700 font-bold transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
