
import { API_CONFIG } from '../constants';

export class ApiService {
  private static instance: ApiService;

  public static getInstance() {
    if (!ApiService.instance) ApiService.instance = new ApiService();
    return ApiService.instance;
  }

  private getAuthHeader() {
    const user = localStorage.getItem('gw_user');
    if (!user) return {};
    const parsed = JSON.parse(user);
    return parsed.token ? { 'Authorization': `Bearer ${parsed.token}` } : {};
  }

  async getExchangeRates(base: string = 'USD') {
    try {
      const response = await fetch(`/api/exchange?base=${base}`);
      const data = await response.json();
      return data.conversion_rates;
    } catch (err) {
      console.error("ExchangeRate API Error:", err);
      return null;
    }
  }

  async getCryptoRates() {
    try {
      const response = await fetch('/api/crypto');
      return await response.json();
    } catch (err) {
      console.error("CoinGecko API Error:", err);
      return null;
    }
  }

  async uploadToCloudinary(file: File) {
    const formData = new FormData();
    // Use the Cloudinary name from the provided URL: dxuhj3uuz
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dxuhj3uuz/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return "https://picsum.photos/800/600";
    }
  }

  async getProfile() {
    try {
      const response = await fetch('/api/profile', {
        headers: this.getAuthHeader()
      });
      if (!response.ok) throw new Error('Session expired');
      return await response.json();
    } catch (err) {
      console.error("Profile Error:", err);
      return null;
    }
  }

  async getListings(type?: string) {
    const response = await fetch(`/api/listings${type ? `?type=${type}` : ''}`);
    return await response.json();
  }

  async createListing(listingData: any) {
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify(listingData)
    });
    return await response.json();
  }
}

export const globalApi = ApiService.getInstance();
