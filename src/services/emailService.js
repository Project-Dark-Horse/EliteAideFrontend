import { baseUrl, cookie } from "../../config";

export const checkEmailExists = async (email) => {
    try {
      const url = `https://${baseUrl}/v1/users/exists/?email=${email}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          cookie,
        },
      };
      const response = await fetch(url, options);

      const data = await response.json();
      // Return true if email exists, false otherwise
      return data.message.exists === 1;
    } catch (error) {
      console.log('Error checking email:', error);
      return false; // Consider the email as not existing in case of an error
    }
  };
  