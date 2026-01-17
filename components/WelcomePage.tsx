
import React, { useEffect, useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Home, Bitcoin, Briefcase, ShoppingBag, Code, Plane, ArrowRight, Shield, Zap, Globe, Sparkles } from 'lucide-react';

interface Props {
  lang: 'en' | 'ar' | 'fr' | 'es';
  onStart: () => void;
}

export const WelcomePage: React.FC<Props> = ({ lang, onStart }) => {
  const [mounted, setMounted] = useState(false);
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;
  const isAr = lang === 'ar';

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectors = [
    { id: 're', icon: <Home />, label: t('realEstate'), color: 'from-blue-500' },
    { id: 'cr', icon: <Bitcoin />, label: t('crypto'), color: 'from-orange-500' },
    { id: 'jb', icon: <Briefcase />, label: t('jobs'), color: 'from-indigo-500' },
    { id: 'fr', icon: <Code />, label: t('freelance'), color: 'from-emerald-500' },
    { id: 'ec', icon: <ShoppingBag />, label: t('ecommerce'), color: 'from-rose-500' },
    { id: 'tr', icon: <Plane />, label: t('travel'), color: 'from-cyan-500' },
  ];

  return (
    <div className={`min-h-screen bg-[#020617] text-white overflow-hidden relative ${isAr ? 'rtl' : 'ltr'}`}>
      
      {/* Background Cinematic Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="mesh-blob absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="mesh-blob absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full" style={{animationDelay: '-5s'}}></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center items-center py-20">
        
        {/* Animated Badge */}
        <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-3xl px-6 py-2 rounded-full border border-white/10 mb-12 shadow-2xl">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200/60">Global Institutional Access 2026</span>
          </div>
        </div>

        {/* Hero Title - High Impact */}
        <div className="text-center mb-20 space-y-6">
          <h1 className={`text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.85] transition-all duration-[1.5s] delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="text-reveal block">GET WEALTH</span>
            <span className="text-blue-500 drop-shadow-[0_0_50px_rgba(37,99,235,0.3)] block mt-4">
              {isAr ? 'السيادة المالية' : 'ECOSYSTEM'}
            </span>
          </h1>
          
          <p className={`text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-[1.5s] delay-500 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {isAr 
              ? 'الجيل التالي من إدارة الأصول العالمية، التجارة العابرة للحدود، والنمو المالي الرقمي.' 
              : 'The ultimate operating system for global assets, decentralized commerce, and elite capital growth.'}
          </p>
        </div>

        {/* Interactive CTA */}
        <div className={`transition-all duration-1000 delay-700 transform ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center gap-6 bg-blue-600 text-white px-16 py-8 rounded-[2.5rem] font-black text-3xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_30px_100px_rgba(37,99,235,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {isAr ? 'ابدأ رحلة الثراء' : 'START NOW'}
            <ArrowRight className={`w-8 h-8 group-hover:translate-x-4 transition-transform duration-500 ${isAr ? 'rotate-180 group-hover:-translate-x-4' : ''}`} />
          </button>
        </div>

        {/* Sector Quick View (Video-style Staggered) */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-6 gap-6 w-full opacity-40 group hover:opacity-100 transition-opacity duration-700">
          {sectors.map((s, i) => (
            <div key={s.id} className="text-center group/item cursor-pointer" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-500 group-hover/item:scale-110`}>
                {s.icon}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/item:text-blue-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Status Bar */}
      <div className="fixed bottom-10 left-10 right-10 flex justify-between items-center z-50">
        <div className="flex gap-8">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global P2P Active</span>
          </div>
          <div className="flex items-center gap-3">
             <Globe className="w-3 h-3 text-blue-500" />
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">195 Regions Live</span>
          </div>
        </div>
        <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] opacity-40">
          WEALTH OPERATING SYSTEM v4.5
        </div>
      </div>
    </div>
  );
};
