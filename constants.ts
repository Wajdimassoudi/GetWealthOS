
import { Country, TranslationStrings } from './types';

// Real-world configuration
export const API_CONFIG = {
  EXCHANGE_RATE_KEY: 'a06a5496ee0d90cef5bcb62924325393',
  CLOUDINARY_URL: 'cloudinary://935912428268229:9P_St-D8wYiG1kysaQM0dHQ7l6k@dxuhj3uuz',
  MONGODB_URI: 'mongodb+srv://getwealthos:GetWealthOS2026!@cluster0.5zffcaf.mongodb.net/getwealthos'
};

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', rate: 1 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'ر.س', rate: 3.75 },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', symbol: 'د.إ', rate: 3.67 },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currency: 'EGP', symbol: 'ج.م', rate: 48.50 },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', currency: 'TND', symbol: 'د.ت', rate: 3.10 },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', currency: 'MAD', symbol: 'د.م.', rate: 10.10 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥', rate: 151.0 },
];

export const TRANSLATIONS: TranslationStrings = {
  welcome: { en: "Welcome to GetWealthOS", ar: "مرحباً بكم في GetWealthOS", fr: "Bienvenue sur GetWealthOS", es: "Bienvenido a GetWealthOS" },
  tagline: { en: "Your Global Platform for Wealth", ar: "منصتك العالمية للثراء", fr: "Votre plateforme mondiale pour la richesse", es: "Tu plataforma global para la riqueza" },
  explore: { en: "Start Now", ar: "ابدأ الآن", fr: "Commencer", es: "Empezar" },
  realEstate: { en: "Real Estate", ar: "العقارات", fr: "Immobilier", es: "Bienes Raíces" },
  crypto: { en: "Crypto P2P", ar: "العملات الرقمية", fr: "Crypto P2P", es: "Cripto P2P" },
  jobs: { en: "Jobs", ar: "الوظائف", fr: "Emplois", es: "Empleos" },
  freelance: { en: "Freelance", ar: "العمل الحر", fr: "Freelance", es: "Freelance" },
  ecommerce: { en: "Marketplace", ar: "السوق", fr: "Marché", es: "Mercado" },
  travel: { en: "Travel", ar: "السفر", fr: "Voyage", es: "Viajes" },
  startSelling: { en: "Start Selling", ar: "ابدأ البيع", fr: "Commencer à vendre", es: "Empezar a vender" }
};
