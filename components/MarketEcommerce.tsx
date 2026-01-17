
import React from 'react';
import { Country, Product } from '../types';
import { ShoppingBag, Star, Filter, ChevronRight } from 'lucide-react';

interface Props {
  country: Country;
  lang: string;
  onAddToCart: (p: Product) => void;
}

export const MarketEcommerce: React.FC<Props> = ({ country, lang, onAddToCart }) => {
  const t = lang === 'ar';
  
  const products: Product[] = [
    { id: 'e1', title: 'iPhone 15 Pro Max - 256GB', price: 1199, image: 'https://picsum.photos/seed/iphone/400/400', category: 'Electronics', rating: 4.9, seller: 'Apple Store' },
    { id: 'e2', title: 'Ergonomic Office Chair', price: 299, image: 'https://picsum.photos/seed/chair/400/400', category: 'Furniture', rating: 4.7, seller: 'HomeStyle' },
    { id: 'e3', title: 'Professional DSLR Camera', price: 1500, image: 'https://picsum.photos/seed/camera/400/400', category: 'Electronics', rating: 4.8, seller: 'PhotoPro' },
    { id: 'e4', title: 'Organic Skin Care Set', price: 85, image: 'https://picsum.photos/seed/cream/400/400', category: 'Beauty', rating: 4.5, seller: 'GlowLife' },
  ];

  const formatPrice = (p: number) => (p * country.rate).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US') + ' ' + country.currency;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <ShoppingBag />
          </div>
          <h2 className="text-xl font-bold">{t ? 'متجر السلع الاستهلاكية' : 'Consumer Goods Store'}</h2>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none border px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" /> {t ? 'تصفية' : 'Filter'}
          </button>
          <button className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold">
            {t ? 'بيع سلعة' : 'Sell Item'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border p-3 hover:shadow-xl transition-all group">
            <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <button 
                onClick={() => onAddToCart(product)}
                className="absolute bottom-2 right-2 bg-white/90 backdrop-blur p-2 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
            <div className="px-1">
              <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">{product.category}</div>
              <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-1">{product.title}</h3>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold">{product.rating}</span>
                <span className="text-[10px] text-slate-400">({product.seller})</span>
              </div>
              <div className="text-blue-700 font-black">{formatPrice(product.price)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
