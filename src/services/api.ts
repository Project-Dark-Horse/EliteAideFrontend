import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterRequest, LoginRequest, ForgotPasswordRequest, UserProfile, PasswordResetRequest, Task } from '../types/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  sendOtp: (email: string) => 
    api.post('/v1/users/otp/send/', { email }),
    
  validateOtp: (email: string, otp: string) =>
    api.post('/v1/users/otp/validate/', { email, otp }),
    
  checkEmailExists: (email: string) =>
    api.get(`/v1/users/exists/?email=${email}`),
    
  register: (data: RegisterRequest) =>
    api.post('/v1/users/register/', data),
    
  login: (data: LoginRequest) =>
    api.post('/v1/users/login/', data),
    
  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post('/v1/users/forgot-password/', data),
    
  logout: (refresh_token: string) =>
    api.post('/v1/users/logout/', { refresh_token }),
    
  logoutAll: () =>
    api.post('/v1/user/logout-all/'),
};

export const userService = {
  getProfile: () => 
    api.get('/v1/users/profile/'),
    
  updateProfile: (data: Partial<UserProfile>) =>
    api.patch('/v1/user/profile/update/', data),
    
  resetPassword: (data: PasswordResetRequest) =>
    api.post('/v1/users/password-reset/', data),
    
  deleteAccount: () =>
    api.delete('/v1/users/profile/delete/'),
};

export const taskService = {
  createTaskWithPrompt: (prompt: string) =>
    api.post('/v1/tasks/prompts/', { prompt }),
    
  createTask: (taskData: Partial<Task>) =>
    api.post('/v1/tasks/', taskData),
    
  updateTask: (id: number, taskData: Partial<Task>) =>
    api.put(`/v1/tasks/${id}/`, taskData),
    
  patchTask: (id: number, taskData: Partial<Task>) =>
    api.patch(`/v1/tasks/${id}/`, taskData),
    
  getUserTasks: (page = 1, items_per_page = 10) =>
    api.get('/v1/tasks/user-tasks/', { params: { page, items_per_page } }),
    
  getTasksByRange: (start_date: string, end_date: string, range_type: string, page = 1, items_per_page = 10) =>
    api.get('/v1/tasks/range/', {
      params: {
        start_date,
        end_date,
        range_type,
        page,
        items_per_page,
      },
    }),
}; 