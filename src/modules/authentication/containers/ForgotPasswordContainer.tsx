import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {CUSTOMER_RECOVER} from '../../../api/operations/mutations/authentication';
import {routes} from '../../../route-list';

export type ForgotPasswordProps = {
  loading: boolean;
  errorComponent: React.ReactNode;
  userSubmittedForm: (formState: ForgotPasswordFormState) => void;
  userClickedClose: () => void;
};

export type ForgotPasswordFormState = {
  email: string;
};

export const ForgotPasswordContainer = (
  Screen: React.FC<ForgotPasswordProps>
) => {
  return () => {
    const history = useHistory();

    const [errorComponent, setErrorComponent] =
      useState<React.ReactNode | null>(null);

    // todo: properly type this mutation
    const [customerRecover, {loading}] = useMutation(CUSTOMER_RECOVER, {
      onCompleted: data => {
        const {customerUserErrors} = data.customerRecover;
        if (customerUserErrors.length) {
          const errorCode = customerUserErrors[0].code;
          const message = customerUserErrors[0].message;
          setErrorComponent(getErrorComponent(errorCode, {message}));
        } else {
          toast.success('A reset link was sent to your email!');
        }
      },
      onError: error => {
        const {message} = error;
        setErrorComponent(getErrorComponent(null, {message}));
      },
    });

    return (
      <Screen
        loading={loading}
        errorComponent={errorComponent}
        userSubmittedForm={({email}) => {
          setErrorComponent(null);
          customerRecover({variables: {email}});
        }}
        userClickedClose={() => history.push(routes.HOME)}
      />
    );
  };
};

/**
 * Gets the error component given [errorCode]
 *
 * @param errorCode mutation error code
 * @param args {{ message: fallback error message }}
 * @returns {React.ReactNode}
 */
const getErrorComponent = (
  errorCode: string | null,
  args?: {message?: string}
) => {
  switch (errorCode) {
    case 'UNIDENTIFIED_CUSTOMER':
      return (
        <div>
          A profile with this email does not exist. Please{' '}
          <a href="/sign-up" className="underline text-blue-dark">
            sign up
          </a>{' '}
          for a new account.
        </div>
      );
    default:
      return <div>{args?.message || 'Something went wrong!'}</div>;
  }
};
