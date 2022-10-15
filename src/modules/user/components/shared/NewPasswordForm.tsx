import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {DecreeButton} from '../../../core/DecreeButton';
import {DecreeFormItem} from '../../../core/DecreeFormItem';
import {NewPasswordFormValidationSchema} from '../../../../utils/validation-schemas';

type FormState = {
  newPassword: string;
  confirmNewPassword: string;
};

export const NewPasswordForm = (props: {
  loading?: boolean;
  onSubmit: (formState: FormState) => void;
  onClose: () => void;
}) => {
  const form = useForm<FormState>({
    resolver: yupResolver(NewPasswordFormValidationSchema),
  });
  return (
    <div className="p-6 bg-white rounded">
      <div className="space-y-6">
        <DecreeFormItem
          labelClassName="text-gray-medium"
          label="New Password"
          type="password"
          {...form.register('newPassword')}
          errorText={form.formState.errors.newPassword?.message}
          disabled={props.loading}
        />
        <DecreeFormItem
          labelClassName="text-gray-medium"
          label="Confirm New Password"
          type="password"
          {...form.register('confirmNewPassword')}
          errorText={form.formState.errors.confirmNewPassword?.message}
          disabled={props.loading}
        />
        <div className="flex items-center justify-between">
          <DecreeButton
            mode="secondary"
            onClick={props.onClose}
            className="py-3"
          >
            Cancel
          </DecreeButton>
          <DecreeButton
            onClick={form.handleSubmit(props.onSubmit)}
            className="py-3"
            disabled={props.loading}
            loading={props.loading}
          >
            Update Password
          </DecreeButton>
        </div>
      </div>
    </div>
  );
};
