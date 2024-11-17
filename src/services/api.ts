import axios from 'axios';

const BASE_URL = 'https://api.eliteaide.tech/';

export const apiLogin = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}v1/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_or_username: email, password }),
  });
  if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
  return response.json(); // Expecting { access: string, refresh: string }
};

export const apiSendMessage = async (token: string, message: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}v1/tasks/prompts/`,
      { prompt: message },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Expecting SuccessResponse
  } catch (error: any) {
    throw new Error(`SendMessage failed: ${error.response?.statusText || error.message}`);
  }
};

export const apiRefreshToken = async (refreshToken: string) => {
  const response = await fetch(`${BASE_URL}v1/users/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!response.ok) throw new Error(`RefreshToken failed: ${response.statusText}`);
  return response.json(); // Expecting { access: string }
};
