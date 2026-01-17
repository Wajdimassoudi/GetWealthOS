
import React, { useState } from 'react';
import { COUNTRIES, TRANSLATIONS } from '../constants';
import { Country } from '../types';
import { Globe, User, Bell, Search, LogOut, Shield } from 'lucide-react';

interface NavbarProps {
  currentCountry: Country;
  setCountry: (c: Country) => void;
  lang: 'en' | 'ar' | 'fr' | 'es';
  setLang: (l: any) => void;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentCountry, setCountry, lang, setLang, user, onAuthClick, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
      <nav className="max-w-7xl mx-auto glass rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
            W
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent hidden sm:block">
            GetWealthOS
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'ابحث في الأسواق العالمية...' : 'Search global markets...'} 
              className="bg-transparent rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none w-64 transition-all focus:w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
            <span className="text-lg">{currentCountry.flag}</span>
            <select 
              className="bg-transparent border-none outline-none text-[10px] font-black cursor-pointer appearance-none"
              value={currentCountry.code}
              onChange={(e) => {
                const selected = COUNTRIES.find(c => c.code === e.target.value);
                if (selected) setCountry(selected);
              }}
            >
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

          <div className="flex items-center gap-3 relative">
            <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold hidden md:inline">{user.name.split(' ')[0]}</span>
                </button>
                
                {showProfile && (
                  <div className="absolute top-full mt-4 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 animate-in fade-in zoom-in slide-in-from-top-4">
                    <div className="p-4 bg-slate-50 rounded-2xl mb-4 text-center">
                      <div className="text-sm font-black text-slate-800">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.email}</div>
                    </div>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors">
                        <Shield className="w-4 h-4 text-blue-500" /> Security Settings
                      </button>
                      <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 text-xs font-bold transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> {lang === 'ar' ? 'تسجيل الخروج' : 'Logout System'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                <User className="w-4 h-4" />
                <span className="text-xs font-bold">{lang === 'ar' ? 'دخول' : 'Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
