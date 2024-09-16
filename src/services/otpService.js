// otpService.js

export const verifyOtp = async (email, userOtp) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/otp/validate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: userOtp }),
      });
  
      const data = await response.json();
  
      return data.success;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };
  
  export const resendOtp = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/otp/resend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      return data.success;
    } catch (error) {
      console.error('Error resending OTP:', error);
      return false;
    }
  };
  