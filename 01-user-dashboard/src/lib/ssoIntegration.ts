// SSO Integration utilities for TeleShop Constructor
import { API_CONFIG } from './config';

export const constructorUtils = {
  // Open constructor in new window
  openConstructor: (shopId?: string) => {
    const url = shopId 
      ? `${API_CONFIG.CONSTRUCTOR_URL}/constructor?shopId=${shopId}`
      : `${API_CONFIG.CONSTRUCTOR_URL}/constructor`;
    
    window.open(url, '_blank', 'width=1200,height=800');
  },

  // Get constructor URL
  getConstructorUrl: (shopId?: string) => {
    return shopId 
      ? `${API_CONFIG.CONSTRUCTOR_URL}/constructor?shopId=${shopId}`
      : `${API_CONFIG.CONSTRUCTOR_URL}/constructor`;
  },

  // Share auth between apps
  shareAuth: () => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    if (token) {
      // Send token to constructor via postMessage
      const constructorWindow = window.open(API_CONFIG.CONSTRUCTOR_URL);
      if (constructorWindow) {
        constructorWindow.postMessage({ type: 'AUTH_TOKEN', token }, API_CONFIG.CONSTRUCTOR_URL);
      }
    }
  },

  // Listen for constructor events
  listenForConstructorEvents: (callback: (data: any) => void) => {
    window.addEventListener('message', (event) => {
      if (event.origin === API_CONFIG.CONSTRUCTOR_URL) {
        callback(event.data);
      }
    });
  },

  // Get user display name for designs
  getUserDisplayName: () => {
    // Try to get user data from auth
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        return user.first_name || user.username || 'Пользователь';
      }
    } catch (e) {
      console.warn('Error getting user data:', e);
    }
    return 'Пользователь';
  }
};
