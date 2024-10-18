// localStorageService.js

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const IS_AUTHENTICATED = 'isAuthenticated';
export const USER = 'user';

export const LocalStorageService = {
  // Set a value in localStorage
  setItem(key: string, value: any) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  },

  // Get a value from localStorage
  getItem(key: string) {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  },

  // Remove a value from localStorage
  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage', error);
    }
  },

  // Clear all localStorage data
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  },
};
