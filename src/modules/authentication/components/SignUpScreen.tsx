import React from 'react';
import {
  SignUpFormState,
  SignUpScreenProps,
} from '../containers/SignUpScreenContainer';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {AuthFormWrapper} from './shared/AuthFormWrapper';
import {DecreeFormItem} from '../../core/DecreeFormItem';
import {AuthButton} from './shared/AuthButton';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SignUpFormValidationSchema} from '../../../utils/validation-schemas';

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  userSubmittedSignUpForm,
  userClickedLogIn,
  userClickedClose,
  loading,
}) => {
  const form = useForm<SignUpFormState>({
    resolver: yupResolver(SignUpFormValidationSchema),
    mode: 'onTouched',
  });

  return (
    <DecreePageWrapper headerType="block" color="blue">
      <AuthFormWrapper title="Create Account" onClose={userClickedClose}>
        <div className="w-full">
          <form onSubmit={form.handleSubmit(userSubmittedSignUpForm)}>
            <div className="space-y-8">
              <DecreeFormItem
                required
                label="First Name"
                placeholder="Your first name"
                errorText={form.formState.errors.firstName?.message}
                {...form.register('firstName')}
              />
              <DecreeFormItem
                required
                label="Last name"
                placeholder="Your last name"
                errorText={form.formState.errors.lastName?.message}
                {...form.register('lastName')}
              />
              <DecreeFormItem
                required
                label="Email"
                placeholder="Your email address"
                errorText={form.formState.errors.email?.message}
                {...form.register('email')}
              />
              <DecreeFormItem
                required
                label="Password"
                placeholder="Your password"
                type="password"
                errorText={form.formState.errors.password?.message}
                {...form.register('password')}
              />
            </div>
            <div className="mt-12">
              <AuthButton loading={loading} disabled={loading} type="submit">
                CREATE ACCOUNT
              </AuthButton>
            </div>
          </form>
          <div className="pt-2 pb-8 mt-6 text-center text-blue-dark">
            Already have an account?{' '}
            <a onClick={userClickedLogIn} className="underline cursor-pointer">
              Log in here.
            </a>
          </div>
          <div className="text-center">
            <small className="font-light">
              By creating an account, you agree to our{' '}
              <a className="underline cursor-pointer">Terms of Use</a> and{' '}
              <a className="underline cursor-pointer">Privacy Policy</a>.
            </small>
          </div>
        </div>
      </AuthFormWrapper>
    </DecreePageWrapper>
  );
};
