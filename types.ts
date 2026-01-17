
export enum MarketType {
  REAL_ESTATE = 'REAL_ESTATE',
  CRYPTO = 'CRYPTO',
  JOBS = 'JOBS',
  FREELANCE = 'FREELANCE',
  ECOMMERCE = 'ECOMMERCE',
  TRAVEL = 'TRAVEL'
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  seller: string;
}

export interface Freelancer {
  id: string;
  name: string;
  role: string;
  skills: string[];
  rating: number;
  hourlyRate: number;
  avatar: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface TranslationStrings {
  [key: string]: {
    en: string;
    ar: string;
    fr: string;
    es: string;
  };
}
