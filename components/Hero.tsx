
import React, { useEffect, useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { ArrowRight, Zap, Globe2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  // Use specific union type for lang to fix translation indexing error
  lang: 'en' | 'ar' | 'fr' | 'es';
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExplore }) => {
  const [isVisible, setIsVisible] = useState(false);
  // Fixed translation helper by using the typed lang instead of invalid typeof indexing
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden animate-gradient text-white px-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         {/* Simulated pulsing pins on world map */}
         <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white rounded-full animate-ping"></div>
         <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
         <div className="absolute top-1/3 left-3/4 w-3 h-3 bg-white rounded-full animate-ping"></div>
      </div>

      <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} max-w-4xl text-center z-10`}>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Powered by AI & Blockchain</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          {t('welcome')}
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light max-w-2xl mx-auto">
          {t('tagline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onExplore}
            className="group flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
          >
            {t('explore')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
            {t('startSelling')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 text-blue-100">
          <div className="flex flex-col items-center gap-2">
            <Globe2 className="w-8 h-8 text-blue-400" />
            <span className="font-semibold">195+ Countries</span>
            <p className="text-xs opacity-70">Universal Accessibility</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-green-400" />
            <span className="font-semibold">Secure Escrow</span>
            <p className="text-xs opacity-70">Fraud-Free Transactions</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            <span className="font-semibold">Instant Exchange</span>
            <p className="text-xs opacity-70">Real-time Currency FX</p>
          </div>
        </div>
      </div>
    </div>
  );
};
