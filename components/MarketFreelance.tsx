
import React from 'react';
import { Country, Freelancer } from '../types';
import { Code, Terminal, CheckCircle, MessageSquare } from 'lucide-react';

interface Props {
  country: Country;
  lang: string;
}

export const MarketFreelance: React.FC<Props> = ({ country, lang }) => {
  const t = lang === 'ar';
  
  const freelancers: Freelancer[] = [
    { id: 'f1', name: 'Ahmed K.', role: 'Full Stack Engineer', skills: ['React', 'NodeJS', 'Web3'], rating: 4.9, hourlyRate: 45, avatar: 'https://i.pravatar.cc/150?u=ahmed' },
    { id: 'f2', name: 'Sarah M.', role: 'UI/UX Designer', skills: ['Figma', 'Adobe XD', 'Mobile'], rating: 5.0, hourlyRate: 35, avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 'f3', name: 'John D.', role: 'AI Specialist', skills: ['Python', 'PyTorch', 'Gemini'], rating: 4.8, hourlyRate: 60, avatar: 'https://i.pravatar.cc/150?u=john' },
  ];

  const digitalProducts = [
    { title: 'SaaS Dashboard Template', price: 49, type: 'React Code' },
    { title: 'AI Chatbot Integration', price: 199, type: 'Full App' },
    { title: 'Crypto Wallet UI Kit', price: 29, type: 'Figma File' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Code className="text-blue-600" />
            {t ? 'المبرمجون والخبراء' : 'Top Developers & Experts'}
          </h2>
          <button className="text-sm text-blue-600 font-bold">{t ? 'عرض الكل' : 'View All'}</button>
        </div>

        <div className="space-y-4">
          {freelancers.map(f => (
            <div key={f.id} className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:border-blue-300 transition-colors">
              <img src={f.avatar} className="w-20 h-20 rounded-full border-4 border-blue-50" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-lg">{f.name}</h3>
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-50" />
                </div>
                <p className="text-sm text-slate-500 mb-3">{f.role}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                  {f.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="text-xl font-black text-blue-700">${f.hourlyRate}<span className="text-xs text-slate-400 font-normal">/hr</span></div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold w-full sm:w-auto flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> {t ? 'تواصل' : 'Hire'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-6 rounded-3xl">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Terminal className="text-emerald-400 w-5 h-5" />
            {t ? 'منتجات رقمية جاهزة' : 'Digital Products'}
          </h3>
          <div className="space-y-4">
            {digitalProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <div className="text-sm font-bold">{p.title}</div>
                  <div className="text-[10px] text-slate-400">{p.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">${p.price}</div>
                  <button className="text-[10px] text-white/60 underline">Buy</button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-emerald-500 text-slate-900 py-3 rounded-xl font-bold text-sm">
            {t ? 'ارفع كودك للبيع' : 'Upload Your Code'}
          </button>
        </div>
      </div>
    </div>
  );
};
