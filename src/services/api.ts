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
  const response = await fetch(`${BASE_URL}v1/tasks/prompts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error(`SendMessage failed: ${response.statusText}`);
  return response.json(); // Expecting ApiResponse
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
