
import React from 'react';
import { Country } from '../types';
import { Briefcase, MapPin, Clock, Star } from 'lucide-react';

interface MarketProps {
  country: Country;
  lang: string;
}

export const MarketJobs: React.FC<MarketProps> = ({ country, lang }) => {
  const t = lang === 'ar';
  
  const jobs = [
    { title: 'Senior React Developer', company: 'TechFlow Global', salary: '$120k - $160k', type: 'Remote', logo: 'https://picsum.photos/seed/tech/100' },
    { title: 'Marketing Manager', company: 'BrandBoost', salary: '$80k - $110k', type: 'Hybrid', logo: 'https://picsum.photos/seed/mark/100' },
    { title: 'Project Coordinator', company: 'BuildWise', salary: '$70k - $90k', type: 'On-site', logo: 'https://picsum.photos/seed/build/100' },
    { title: 'AI Research Engineer', company: 'MindCore', salary: '$200k+', type: 'Remote', logo: 'https://picsum.photos/seed/ai/100' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-700 text-white p-10 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">{t ? 'جد وظيفة أحلامك العالمية' : 'Find Your Global Dream Job'}</h1>
          <p className="max-w-xl opacity-80 mb-8">{t ? 'آلاف الوظائف في التقنية والمبيعات والإدارة تنتظرك' : 'Connect with top companies worldwide. Browse tech, sales, and management roles with localized salary estimations.'}</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-2xl">
            <input type="text" placeholder="Job title or keywords" className="flex-1 bg-white text-slate-800 px-4 py-3 rounded-xl focus:outline-none" />
            <button className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold">{t ? 'بحث' : 'Search'}</button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border shadow-sm hover:border-blue-400 transition-colors flex gap-4">
            <img src={job.logo} className="w-16 h-16 rounded-xl object-cover" alt="" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{job.title}</h3>
                <Star className="w-5 h-5 text-slate-300 cursor-pointer hover:text-yellow-400" />
              </div>
              <p className="text-blue-600 font-medium mb-3">{job.company}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.salary}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Worldwide</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold flex-1">{t ? 'التفاصيل' : 'Details'}</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex-1">{t ? 'تقدم الآن' : 'Apply Now'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
