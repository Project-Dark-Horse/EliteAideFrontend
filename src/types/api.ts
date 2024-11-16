// Auth Types
export interface OtpSendRequest {
  email: string;
}

export interface OtpValidateRequest {
  email: string;
  otp: string;
}

export interface RegisterRequest {
  email: string;
  otp: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  mobile_number: string;
}

export interface LoginRequest {
  email_or_username: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
  confirm_password: string;
}

export interface PasswordResetRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

// User Profile Types
export interface UserProfile {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
}

// Task Types
export interface Task {
  id: number;
  title: string;
  description: string;
  completion_date: string;
  status: 'pending' | 'completed';
  // Add other task fields
}

export interface TasksResponse {
  results: Task[];
  count: number;
  next: string | null;
  previous: string | null;
} 

import axios from 'axios';
import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '@env';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;