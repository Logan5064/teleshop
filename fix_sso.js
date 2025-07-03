const fs = require('fs');

const content = `// SSO Integration utilities for TeleShop Constructor
import { API_CONFIG } from './config';

export const constructorUtils = {
  // Open constructor in new window
  openConstructor: (shopId?: string) => {
    const url = shopId 
      ? \`\${API_CONFIG.CONSTRUCTOR_URL}/constructor?shopId=\${shopId}\`
      : \`\${API_CONFIG.CONSTRUCTOR_URL}/constructor\`;
    
    window.open(url, '_blank', 'width=1200,height=800');
  },

  // Get constructor URL
  getConstructorUrl: (shopId?: string) => {
    return shopId 
      ? \`\${API_CONFIG.CONSTRUCTOR_URL}/constructor?shopId=\${shopId}\`
      : \`\${API_CONFIG.CONSTRUCTOR_URL}/constructor\`;
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

  // Get user ID (demo implementation)
  getUserId: () => {
    return 'demo_user';
  },

  // Get user display name (demo implementation)
  getUserDisplayName: () => {
    return 'Demo User';
  }
};

// Simple Auth implementation for Constructor
export const ConstructorAuth = {
  // Initialize auth (demo implementation)
  initialize: async () => {
    // For demo purposes, always return authenticated
    return {
      isAuthenticated: true,
      user: {
        id: 'demo_user',
        username: 'demo_user',
        telegram_id: 'demo_user'
      }
    };
  },

  // Redirect to login (demo implementation)
  redirectToLogin: () => {
    // For demo, just reload the page
    window.location.reload();
  }
};
`;

fs.writeFileSync('ssoIntegration.ts', content);
console.log('✅ Fixed ssoIntegration.ts'); 