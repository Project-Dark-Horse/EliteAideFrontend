export const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/exists/?email=${email}`);
      const data = await response.json();
      
      // Return true if email exists, false otherwise
      return data.message.exists === 1;
    } catch (error) {
      console.log('Error checking email:', error);
      return false; // Consider the email as not existing in case of an error
    }
  };
  
  export const sendOtp = async (email) => {
    try {
      const response = await fetch('https://localhost:8080/api/users/otp/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.status === 200) {
        return true; // OTP sent successfully
      } else {
        console.log('Failed to send OTP');
        return false;
      }
    } catch (error) {
      console.log('Error sending OTP:', error);
      return false;
    }
  };
  