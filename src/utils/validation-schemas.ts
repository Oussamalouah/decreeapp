import * as Yup from 'yup';

export const ForgotPasswordFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
});

export const EmailSubscriptionFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
});

export const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
  password: Yup.string().required('Password is required.'),
});

export const SignUpFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Your password must be at least 6 characters long.'),
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required'),
});

export const EditProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
  country: Yup.string(),
});

export const NewPasswordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string().required('Password is required'),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match'
  ),
});

export const AddressFormValidationSchema = Yup.object().shape({
  address1: Yup.string().required('Address Line 1 is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string().required('Phone number is required'),
  province: Yup.string().required('Province is required'),
  zip: Yup.string().required('Zip Code is required'),
  country: Yup.string().required('Country is required'),
});

export const ContactUsFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string(),
  message: Yup.string().required('Message is required'),
});
