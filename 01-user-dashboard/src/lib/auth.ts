// Auth utilities for TeleShop
import { authApi } from './api';

// Logout function
export const logout = async (): Promise<void> => {
  try {
    // Clear tokens from storage
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    
    // Clear cookies
    document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Call API logout
    await authApi.logout();
    
    // Redirect to login
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    // Force redirect even if API call fails
    window.location.href = '/login';
  }
};

// Get user data
export const getUserData = async (): Promise<any> => {
  try {
    const authResult = await authApi.checkAuth();
    if (!authResult.authenticated) {
      return null;
    }
    const user = await authApi.getCurrentUser();
    return user || null;
  } catch (error) {
    console.error('Get user data error:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    return !!token;
  } catch (error) {
    return false;
  }
};

// Get auth token
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  } catch (error) {
    return null;
  }
};

    return null;
  }
};
