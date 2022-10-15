import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {LoginFormValidationSchema} from '../../../utils/validation-schemas';
import {
  LoginFormState,
  LoginScreenProps,
} from '../containers/LoginScreenContainer';
import {AuthButton} from './shared/AuthButton';
import {AuthFormWrapper} from './shared/AuthFormWrapper';
import {DecreeFormItem} from '../../core/DecreeFormItem';

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const form = useForm<LoginFormState>({
    resolver: yupResolver(LoginFormValidationSchema),
    mode: 'onTouched',
  });

  return (
    <DecreePageWrapper headerType="block" color="blue">
      <AuthFormWrapper title="Log In" onClose={props.userClickedClose}>
        <div className="w-full">
          <form onSubmit={form.handleSubmit(props.userSubmittedLoginForm)}>
            <div className="space-y-8">
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
            <button
              type="button"
              className="mt-6 mb-12 italic font-light outline-none text-size-18 focus:outline-none"
              onClick={props.userClickedForgotPassword}
            >
              Forgot your password?
            </button>
            <AuthButton
              type="submit"
              disabled={props.loading}
              loading={props.loading}
            >
              LOGIN
            </AuthButton>
          </form>
          <div className="pt-2 pb-8 mt-6 text-center">
            <a
              className="cursor-pointer text-blue-dark"
              onClick={props.userClickedSignUp}
            >
              Don't have an account ? Create one!
            </a>
          </div>
        </div>
      </AuthFormWrapper>
    </DecreePageWrapper>
  );
};
