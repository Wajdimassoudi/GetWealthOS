
import React, { useEffect, useRef } from 'react';
import { Country } from '../types';
import { Home, MapPin, Maximize, ShieldCheck, Upload, ArrowUpRight } from 'lucide-react';

interface MarketProps {
  country: Country;
  lang: string;
}

export const MarketRealEstate: React.FC<MarketProps> = ({ country, lang }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isAr = lang === 'ar';

  const formatPrice = (usd: number) => {
    return new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: country.currency
    }).format(usd * country.rate);
  };

  const listings = [
    { id: 1, title: 'Luxury Villa with Sea View', price: 1200000, loc: 'Dubai, UAE', size: '450m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', lat: 25.2048, lng: 55.2708, tag: 'High Yield' },
    { id: 2, title: 'Modern Apartment Center', price: 350000, loc: 'Berlin, Germany', size: '95m²', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', lat: 52.5200, lng: 13.4050, tag: 'New' },
    { id: 3, title: 'Traditional Family Home', price: 280000, loc: 'Casablanca, Morocco', size: '200m²', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800', lat: 33.5731, lng: -7.5898, tag: 'Verified' },
    { id: 4, title: 'Silicon Valley Penthouse', price: 2500000, loc: 'San Francisco, USA', size: '150m²', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', lat: 37.7749, lng: -122.4194, tag: 'Exclusive' },
  ];

  useEffect(() => {
    if (mapRef.current && (window as any).L) {
      const L = (window as any).L;
      const map = L.map(mapRef.current).setView([20, 0], 2);
      L.tileLayer('https://{s}.tile.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

      listings.forEach(item => {
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #2563eb; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(37,99,235,0.4);"></div>`,
          iconSize: [14, 14]
        });

        L.marker([item.lat, item.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; padding: 8px;">
              <div style="font-weight: 900; color: #0f172a; margin-bottom: 4px; font-size: 14px;">${item.title}</div>
              <div style="color: #2563eb; font-weight: 800; font-size: 16px;">${formatPrice(item.price)}</div>
            </div>
          `);
      });

      return () => map.remove();
    }
  }, [country, lang]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 flex items-center gap-4">
            <Home className="text-blue-600 w-10 h-10" />
            {isAr ? 'العقارات العالمية' : 'Global Estates'}
          </h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mt-2">Institutional-Grade Asset Verification Protocol</p>
        </div>
        <button className="bg-slate-900 text-white px-10 py-5 rounded-3xl text-sm font-black flex items-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 group">
          <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          {isAr ? 'إضافة عقار' : 'List New Asset'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {listings.map((item, idx) => (
          <div 
            key={item.id} 
            className="bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(37,99,235,0.12)] transition-all duration-700 border border-slate-100 group cursor-pointer animate-in fade-in slide-in-from-bottom-8"
            style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
          >
            <div className="relative h-72 overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] shadow-2xl">
                {item.tag}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
            <div className="p-10">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {item.loc}
              </div>
              <h3 className="font-black text-slate-900 text-2xl mb-6 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">{item.title}</h3>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Asset Valuation</div>
                   <div className="text-blue-600 font-black text-2xl tracking-tighter">{formatPrice(item.price)}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2 text-slate-900 font-black text-xs">
                  <Maximize className="w-4 h-4 text-slate-300" />
                  {item.size}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative h-[600px] w-full rounded-[4rem] shadow-2xl border-8 border-white bg-slate-100 overflow-hidden animate-in zoom-in duration-1000 delay-500">
        <div ref={mapRef} className="h-full w-full z-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"></div>
        <div className="absolute top-10 left-10 z-10 bg-slate-900/90 backdrop-blur-2xl text-white px-8 py-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em]">Institutional Heatmap</div>
              <div className="text-[10px] font-bold opacity-50 tracking-widest mt-0.5">Real-time Global Asset Density Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
