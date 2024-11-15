import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import Config from 'react-native-config';
import { ProfileData } from '../types/profile';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const response = await axios.post(`${BASE_URL}v1/auth/token/refresh/`, {
          refresh: refreshToken
        });

        if (response.data.access) {
          await AsyncStorage.setItem('access_token', response.data.access);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        // Navigate to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const fetchTasks = async () => {
  try {
    const response = await api.get('v1/tasks/');  // Update this endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchProfile = async () => {
  try {
    const response = await api.get('v1/users/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const getProfile = async (token: string): Promise<ProfileData> => {
  const response = await fetch(`${Config.BASE_URL}v1/users/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};

export default api; 