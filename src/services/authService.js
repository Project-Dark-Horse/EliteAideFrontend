import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://your-api.com/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('jwtToken', data.token);
      return { success: true, token: data.token };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred' };
  }
};

export const registerUser = async (fullName, password) => {
  try {
    const response = await fetch('https://your-api.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, password }),
    });

    const data = await response.json(); 

    return data.success;
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
};

