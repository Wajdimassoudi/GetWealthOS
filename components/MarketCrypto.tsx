
import React, { useState, useEffect } from 'react';
import { Country } from '../types';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import { Bitcoin, ArrowUpCircle, ArrowDownCircle, ShieldCheck, RefreshCcw } from 'lucide-react';
import { globalApi } from '../services/apiService';

interface MarketProps {
  country: Country;
  lang: string;
}

export const MarketCrypto: React.FC<MarketProps> = ({ country, lang }) => {
  const isAr = lang === 'ar';
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    setLoading(true);
    const data = await globalApi.getCryptoRates();
    setCryptoData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: '10am', price: 68000 }, { name: '12pm', price: 69500 },
    { name: '2pm', price: 67000 }, { name: '4pm', price: 71000 },
    { name: '6pm', price: 70200 }, { name: '8pm', price: 72500 },
  ];

  const btcPrice = cryptoData?.bitcoin?.usd || 71245;
  const btcChange = cryptoData?.bitcoin?.usd_24h_change?.toFixed(2) || "+4.5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-full text-white shadow-lg shadow-orange-200">
                <Bitcoin />
              </div>
              <div>
                <h2 className="text-xl font-black">Bitcoin (BTC)</h2>
                <div className="flex items-center gap-2">
                   <span className={`text-sm font-bold ${parseFloat(btcChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {btcChange}% 24h
                  </span>
                  <button onClick={fetchRates} className={`p-1 hover:bg-slate-100 rounded ${loading ? 'animate-spin' : ''}`}>
                    <RefreshCcw className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900">${btcPrice.toLocaleString()}</div>
              <div className="text-sm text-slate-400 font-bold">≈ {(btcPrice * country.rate).toLocaleString()} {country.currency}</div>
            </div>
          </div>
          
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={4} dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" />
            {isAr ? 'عروض P2P الآمنة' : 'Secure P2P Offers'}
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-2xl hover:border-blue-400 transition-all bg-slate-50/30">
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-bold text-blue-700">W{i}</div>
                  <div>
                    <div className="font-black text-slate-800">ProMerchant_{i}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Escrow Verified • 1.2k Trades</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="font-black text-blue-700 text-lg">{(btcPrice * country.rate * 1.01).toLocaleString()} {country.currency}</div>
                    <div className="text-[10px] text-slate-400 font-bold">1 BTC Rate</div>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-black text-sm hover:bg-blue-600 transition-colors">
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-indigo-300 mb-6 uppercase tracking-widest text-xs">Your Wealth Portfolio</h3>
            <div className="text-4xl font-black mb-1">0.0248 BTC</div>
            <div className="text-sm text-indigo-200/50 mb-8 font-medium">≈ {((btcPrice * 0.0248) * country.rate).toLocaleString()} {country.currency}</div>
            
            <div className="space-y-3">
              <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
                <ArrowUpCircle className="w-5 h-5" /> Deposit
              </button>
              <button className="w-full bg-white/10 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10">
                <ArrowDownCircle className="w-5 h-5" /> Withdraw
              </button>
            </div>
          </div>
          <Bitcoin className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 rotate-12" />
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h4 className="font-bold mb-4">Payment Methods</h4>
          <div className="grid grid-cols-2 gap-3">
            {['Stripe', 'PayPal', 'CIB Bank', 'Tunis Bank'].map(method => (
              <div key={method} className="bg-slate-100 p-3 rounded-xl text-center text-[10px] font-black text-slate-500 uppercase">
                {method}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] text-slate-400 text-center italic">Payments powered by GetWealth Escrow™</p>
        </div>
      </div>
    </div>
  );
};
