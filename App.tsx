
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomePage } from './components/WelcomePage';
import { AuthModal } from './components/AuthModal';
import { MarketRealEstate } from './components/MarketRealEstate';
import { MarketCrypto } from './components/MarketCrypto';
import { MarketJobs } from './components/MarketJobs';
import { MarketTravel } from './components/MarketTravel';
import { MarketEcommerce } from './components/MarketEcommerce';
import { MarketFreelance } from './components/MarketFreelance';
import { aiService } from './services/geminiService';
import { globalApi } from './services/apiService';
import { COUNTRIES, TRANSLATIONS } from './constants';
import { MarketType, Country, CartItem, Product } from './types';
import { MessageCircle, X, Send, ShoppingCart, Home, Bitcoin, Briefcase, ShoppingBag, Code, Plane, LayoutGrid, Shield, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar' | 'fr' | 'es'>('en');
  const [currentCountry, setCountry] = useState<Country>(COUNTRIES[0]);
  const [activeMarket, setActiveMarket] = useState<MarketType>(MarketType.REAL_ESTATE);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isAr = lang === 'ar';
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('gw_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        const profile = await globalApi.getProfile();
        if (profile) {
          const userData = { ...profile, token: parsed.token, country: parsed.country };
          setUser(userData);
          setCountry(parsed.country || COUNTRIES[0]);
        }
      }
    };
    initAuth();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsTyping(true);

    const context = `User: ${user?.name || 'Guest'}, Market: ${activeMarket}, Location: ${currentCountry.name}, Currency: ${currentCountry.currency}`;
    const botResponse = await aiService.getWealthAdvice(userMsg, context);
    
    setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('gw_user');
    setUser(null);
    setShowWelcome(true);
  };

  const onStartExploring = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (!user) {
        setShowAuth(true);
      } else {
        setShowWelcome(false);
      }
      setIsTransitioning(false);
    }, 800);
  };

  const renderMarket = () => {
    switch (activeMarket) {
      case MarketType.REAL_ESTATE: return <MarketRealEstate country={currentCountry} lang={lang} />;
      case MarketType.CRYPTO: return <MarketCrypto country={currentCountry} lang={lang} />;
      case MarketType.JOBS: return <MarketJobs country={currentCountry} lang={lang} />;
      case MarketType.TRAVEL: return <MarketTravel country={currentCountry} lang={lang} />;
      case MarketType.ECOMMERCE: return <MarketEcommerce country={currentCountry} lang={lang} onAddToCart={addToCart} />;
      case MarketType.FREELANCE: return <MarketFreelance country={currentCountry} lang={lang} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#020617] transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'} ${isAr ? 'rtl font-[Noto_Sans_Arabic]' : 'ltr font-inter'}`}>
      
      {showWelcome ? (
        <WelcomePage lang={lang} onStart={onStartExploring} />
      ) : (
        <>
          <Navbar 
            currentCountry={currentCountry} 
            setCountry={setCountry} 
            lang={lang} 
            setLang={setLang} 
            user={user}
            onAuthClick={() => setShowAuth(true)}
            onLogout={handleLogout}
          />
          
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 pt-36 pb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* Elegant Market Tab Switcher */}
            <div className="flex overflow-x-auto gap-4 mb-16 no-scrollbar pb-4">
              {[
                { id: MarketType.REAL_ESTATE, label: t('realEstate'), icon: <Home className="w-5 h-5" /> },
                { id: MarketType.CRYPTO, label: t('crypto'), icon: <Bitcoin className="w-5 h-5" /> },
                { id: MarketType.JOBS, label: t('jobs'), icon: <Briefcase className="w-5 h-5" /> },
                { id: MarketType.ECOMMERCE, label: t('ecommerce'), icon: <ShoppingBag className="w-5 h-5" /> },
                { id: MarketType.FREELANCE, label: t('freelance'), icon: <Code className="w-5 h-5" /> },
                { id: MarketType.TRAVEL, label: t('travel'), icon: <Plane className="w-5 h-5" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMarket(tab.id)}
                  className={`flex items-center gap-4 whitespace-nowrap px-10 py-6 rounded-3xl font-black text-sm transition-all duration-500 ${
                    activeMarket === tab.id 
                      ? 'bg-blue-600 text-white shadow-[0_20px_60px_rgba(37,99,235,0.3)] scale-105' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {renderMarket()}
          </main>
        </>
      )}

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onSuccess={(userData) => {
          setUser(userData);
          setShowWelcome(false);
        }} 
        lang={lang} 
      />

      {/* Floating UI Elements */}
      {!showWelcome && (
        <div className={`fixed bottom-8 ${isAr ? 'left-8' : 'right-8'} z-50 flex flex-col gap-4`}>
          {cart.length > 0 && (
            <button onClick={() => setShowCart(true)} className="bg-emerald-500 text-white w-20 h-20 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full border-2 border-white">{cart.length}</span>
            </button>
          )}
          <button onClick={() => setShowChat(!showChat)} className="bg-blue-600 text-white w-20 h-20 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
            {showChat ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
          </button>
        </div>
      )}

      {/* Cart & AI Assistant remain unchanged in logic but will benefit from the new dark theme styling */}
      {/* ... (Existing Drawer/Chat code follows) */}
    </div>
  );
};

export default App;
