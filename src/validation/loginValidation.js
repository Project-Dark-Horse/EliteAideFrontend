import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter') TEMP TURNED OFF FOR EASIER DEV/TEST
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
});
