
import React from 'react';
import { Country } from '../types';
import { Plane, Building, CreditCard, ShieldCheck, Map } from 'lucide-react';

interface MarketProps {
  country: Country;
  lang: string;
}

export const MarketTravel: React.FC<MarketProps> = ({ country, lang }) => {
  const t = lang === 'ar';
  
  const packages = [
    { title: 'Hajj & Umrah 2024', loc: 'Mecca & Medina', price: 2500, img: 'https://picsum.photos/seed/kaaba/800/500' },
    { title: 'Europe Summer Tour', loc: 'Paris, Rome, Zurich', price: 1800, img: 'https://picsum.photos/seed/paris/800/500' },
    { title: 'Digital Nomad Visa', loc: 'Bali, Indonesia', price: 450, img: 'https://picsum.photos/seed/bali/800/500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plane className="text-blue-600" />
            {t ? 'حجز رحلات وفنادق' : 'Book Flights & Hotels'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">From</label>
              <input type="text" placeholder="Origin City" className="w-full bg-slate-100 p-3 rounded-xl focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">To</label>
              <input type="text" placeholder="Destination" className="w-full bg-slate-100 p-3 rounded-xl focus:outline-none" />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            {t ? 'بحث عن عروض' : 'Search Best Deals'}
          </button>
        </div>

        <div className="w-full md:w-80 bg-gradient-to-br from-indigo-900 to-blue-800 text-white p-6 rounded-2xl">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-blue-300" />
            {t ? 'خدمات التأشيرات' : 'Visa Services'}
          </h3>
          <ul className="space-y-4 text-sm opacity-90">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Schengen Express</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> US B1/B2 Application</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Work Permits Guide</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> GCC Resident Entry</li>
          </ul>
          <button className="mt-8 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold border border-white/20">
            Get Visa Help
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((p, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border group">
            <div className="h-40 overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <h4 className="font-bold mb-1">{p.title}</h4>
              <p className="text-xs text-slate-500 mb-4">{p.loc}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">From {(p.price * country.rate).toFixed(0)} {country.currency}</span>
                <button className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
