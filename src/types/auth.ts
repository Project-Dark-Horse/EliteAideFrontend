export type AuthStackParamList = {
  Login: undefined;
  FPEnterEmail: undefined;
  FPEnterOtp: { email: string };
  FPNewPassword: { email: string; otp: string };
};

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 