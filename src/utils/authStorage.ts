import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data'
};

export const authStorage = {
  async setTokens(access: string, refresh: string) {
    try {
      await AsyncStorage.multiSet([
        [AUTH_KEYS.ACCESS_TOKEN, access],
        [AUTH_KEYS.REFRESH_TOKEN, refresh]
      ]);
    } catch (error) {
      console.error('Error saving auth tokens:', error);
    }
  },

  async getTokens() {
    try {
      const tokens = await AsyncStorage.multiGet([
        AUTH_KEYS.ACCESS_TOKEN,
        AUTH_KEYS.REFRESH_TOKEN
      ]);
      return {
        accessToken: tokens[0][1],
        refreshToken: tokens[1][1]
      };
    } catch (error) {
      console.error('Error getting auth tokens:', error);
      return { accessToken: null, refreshToken: null };
    }
  },

  async clearTokens() {
    try {
      await AsyncStorage.multiRemove([
        AUTH_KEYS.ACCESS_TOKEN,
        AUTH_KEYS.REFRESH_TOKEN,
        AUTH_KEYS.USER_DATA
      ]);
    } catch (error) {
      console.error('Error clearing auth tokens:', error);
    }
  },

  async setUserData(userData: any) {
    try {
      await AsyncStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  async getUserData() {
    try {
      const data = await AsyncStorage.getItem(AUTH_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }
}; 