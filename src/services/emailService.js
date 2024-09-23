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

      // JS Fetch Options from Postman
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     accept:
      //       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      //     'accept-language': 'en-GB,en;q=0.5',
      //     'cache-control': 'no-store, no-cache, must-revalidate',
      //     cookie:
      //       '_vercel_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJieXBhc3MiOiJNQUVVWXRlcTlveUVEZ3V5ZTN2WU40WmRwRHk2enNpdiIsImF1ZCI6ImVsaXRlLWFpZGUtZ2l0LXYxLXRlc3Rpbmcta2VzaGF2LWtyaXNobmFzLXByb2plY3RzLnZlcmNlbC5hcHAiLCJpYXQiOjE3MjYyODgwNjIsInN1YiI6InByb3RlY3Rpb24tYnlwYXNzLXVybCJ9.Q2nJ9_mf8w3fdqlbS2dJZm1bC3RCp8EUMBbrZ2VhxHw',
      //     priority: 'u=0, i',
      //     pragma: 'no-cache', // Disable caching for HTTP/1.0 proxies
      //     expires: '0', // Ensure the response is not cached
      //     'sec-ch-ua':
      //       '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
      //     'sec-ch-ua-mobile': '?0',
      //     'sec-ch-ua-platform': '"Linux"',
      //     'sec-fetch-dest': 'document',
      //     'sec-fetch-mode': 'navigate',
      //     'sec-fetch-site': 'none',
      //     'sec-fetch-user': '?1',
      //     'sec-gpc': '1',
      //     'upgrade-insecure-requests': '1',
      //     'user-agent':
      //       'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      //   },
      // },
      const response = await fetch(url, options);

      const data = await response.json();
      // Return true if email exists, false otherwise
      return data.message.exists === 1;
    } catch (error) {
      console.log('Error checking email:', error);
      return false; // Consider the email as not existing in case of an error
    }
  };
  