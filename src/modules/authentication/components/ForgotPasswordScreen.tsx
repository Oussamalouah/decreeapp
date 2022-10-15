import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {DecreePageWrapper} from '../../core/DecreePageWrapper';
import {ForgotPasswordFormValidationSchema} from '../../../utils/validation-schemas';
import {
  ForgotPasswordFormState,
  ForgotPasswordProps,
} from '../containers/ForgotPasswordContainer';
import {AuthButton} from './shared/AuthButton';
import {AuthFormWrapper} from './shared/AuthFormWrapper';
import {DecreeFormItem} from '../../core/DecreeFormItem';

export const ForgotPasswordScreen = (props: ForgotPasswordProps) => {
  const form = useForm<ForgotPasswordFormState>({
    resolver: yupResolver(ForgotPasswordFormValidationSchema),
    mode: 'onTouched',
  });

  return (
    <DecreePageWrapper headerType="block" color="blue">
      <AuthFormWrapper title="Forgot Password" onClose={props.userClickedClose}>
        <div className="w-full">
          <form onSubmit={form.handleSubmit(props.userSubmittedForm)}>
            <DecreeFormItem
              label="Email"
              placeholder="Your Email Address"
              errorText={form.formState.errors.email?.message}
              {...form.register('email')}
            />
            <div className="h-7" />
            {!!props.errorComponent && (
              <div className="my-2">{props.errorComponent}</div>
            )}
            <div className="h-7" />
            <AuthButton
              type="submit"
              disabled={props.loading}
              loading={props.loading}
            >
              RESET PASSWORD
            </AuthButton>
          </form>
        </div>
      </AuthFormWrapper>
    </DecreePageWrapper>
  );
};
