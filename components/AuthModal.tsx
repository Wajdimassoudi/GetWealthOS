
import React, { useState } from 'react';
import { X, Mail, Lock, User, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { COUNTRIES } from '../constants';
import { Country } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  lang: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: COUNTRIES[0].code
  });

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const selectedCountry = COUNTRIES.find(c => c.code === (data.user.country || formData.country)) || COUNTRIES[0];
      const userData = {
        ...data.user,
        country: selectedCountry
      };

      localStorage.setItem('gw_user', JSON.stringify(userData));
      setLoading(false);
      onSuccess(userData);
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 sm:p-10">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex bg-blue-600 w-12 h-12 rounded-2xl items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20 mb-4 mx-auto">
              W
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {isLogin 
                ? (isAr ? 'تسجيل الدخول' : 'Welcome Back') 
                : (isAr ? 'حساب جديد' : 'Create Wealth ID')}
            </h2>
            <p className="text-white/50 text-sm mt-2 font-medium uppercase tracking-widest">
              {isLogin 
                ? (isAr ? 'الوصول إلى أصولك العالمية' : 'Access your global assets') 
                : (isAr ? 'انضم إلى نخبة المستثمرين' : 'Join the elite ecosystem')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input 
                  type="text" 
                  required
                  placeholder={isAr ? 'الاسم الكامل' : 'Full Name'}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input 
                type="email" 
                required
                placeholder={isAr ? 'البريد الإلكتروني' : 'Email Address'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input 
                type="password" 
                required
                placeholder={isAr ? 'كلمة المرور' : 'Secure Password'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code} className="bg-slate-900 text-white">{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/30 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  {isLogin ? (isAr ? 'دخول' : 'Sign In') : (isAr ? 'إنشاء حساب' : 'Initialize ID')}
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/50 text-sm font-bold uppercase tracking-[0.2em] hover:text-blue-400 transition-colors"
            >
              {isLogin 
                ? (isAr ? 'ليس لديك حساب؟ أنشئ واحداً' : 'New here? Create account') 
                : (isAr ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Have an account? Log in')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
