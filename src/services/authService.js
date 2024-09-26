import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl, cookie } from '../../config';

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log('accessToken and refreshToken successfully cleared!');
  } catch (error) {
    console.error('Error clearing tokens from AsyncStorage:', error);
  }
};

export const loginUser = async (email, password) => {
  const url = `https://${baseUrl}/v1/users/login/`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify({ email_or_username: email, password }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
      console.error("Login Error: ", data.error);
      return { success: false, error: data.error };
    }
    
    clearTokens();
    console.log("User Logged successfully:", data.message);
    return {
      success: true,
      message: data.message,
      accessToken: data.message.access,
      refreshToken: data.message.refresh,
    };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred' };
  }
};

export const registerUser = async (first_name, last_name, username, password, otp, email) => {
  const url = `https://${baseUrl}/v1/users/register/`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify({ first_name, last_name, username, password, otp, email }),
  }
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Check if response contains an error
    if (data.error) {
      // Handle error cases
      if (data.error.email) {
        console.error("Error: Email already exists.", data.error.email);
      }
      return { success: false, error: data.error };
    }

    clearTokens();
    // Successful registration
    console.log("User registered successfully:", data.message);
    return {
      success: true,
      message: data.message,
      accessToken: data.message.access,
      refreshToken: data.message.refresh,
      userDetails: data.message.user_details,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error: error.message };
  }
};

export const forgotPassword = async (password, otp, email) => {
  const url = `https://${baseUrl}/v1/users/forgot-password/`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify({ new_password: password, confirm_password: password, otp, email }),
  }
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // Check if response contains an error
    if (data.error) {
      return { success: false, error: data.error };
    }

    clearTokens();
    console.log(data.message);
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Error during password reset:", error);
    return { success: false, error: error.message };
  }
};

