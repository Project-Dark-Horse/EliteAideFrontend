// otpService.js
import { baseUrl, cookie } from "../../config";

export const verifyOtp = async (email, userOtp) => {
  const url = `https://${baseUrl}/v1/users/otp/validate/`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      cookie,
    },
    body: JSON.stringify({ email, otp: userOtp }),
  }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.message === "OTP Verified"
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  export const sendOtp = async email => {
    try {
      const url = `https://${baseUrl}/v1/users/otp/send/`;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          cookie,
        },
        body: JSON.stringify({email}),
      };

      const response = await fetch(url, options);

      if (response.status === 200)
        return true; // OTP sent successfully
      else
        return false;
    } catch (error) {
      console.log('Error sending OTP:', error);
      return false;
    }
  };
  