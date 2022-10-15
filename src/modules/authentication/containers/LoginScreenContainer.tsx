import {useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {AuthResult} from '../../../api/models/AuthResult';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {routes} from '../../../route-list';
import {useCustomerAccessTokenCreate} from '../../../utils/hooks/mutation-hooks';

export type LoginScreenProps = {
  loading: boolean;
  userSubmittedLoginForm: (formState: LoginFormState) => void;
  userClickedForgotPassword: () => void;
  userClickedSignUp: () => void;
  userClickedClose: () => void;
};

export type LoginFormState = {
  email: string;
  password: string;
};

type LocationState = {
  redirectTo?: string;
};

export const LoginScreenContainer = (
  Screen: React.ComponentType<LoginScreenProps>
) => {
  return () => {
    const history = useHistory();
    const location = useLocation<LocationState>();
    /** Reacts when there is a valid token */
    const {data: authData} = useQuery<AuthResult>(AUTHENTICATION);

    useEffect(() => {
      if (authData?.accessToken) {
        // redirects user to their original location, or go to profile
        const nextLocation = location.state?.redirectTo || routes.USER__SETTING;
        history.replace(nextLocation);
      }
    }, [authData?.accessToken]);

    const {login, loadingLogin} = useCustomerAccessTokenCreate(
      data => {
        const errors = data.customerAccessTokenCreate?.customerUserErrors;
        if (errors?.length) {
          const hasUnidentifiedCustomer = errors.some(
            error => error.code === 'UNIDENTIFIED_CUSTOMER'
          );
          const emailDidNotMatchErrorMessage =
            'Your password and email did not match.';

          const errorMessage = hasUnidentifiedCustomer
            ? emailDidNotMatchErrorMessage
            : errors.pop()?.message;

          toast.error(errorMessage);
        }
      },
      e => {
        const genericErrorMessage =
          'We cannot process your request at the moment. Please try again later.';
        const hasExceededMaximumLogin =
          e.message === 'Login attempt limit exceeded. Please try again later.';

        toast.error(hasExceededMaximumLogin ? e.message : genericErrorMessage);
      }
    );

    return (
      <Screen
        loading={loadingLogin}
        userClickedSignUp={() => {
          history.push('/sign-up');
        }}
        userSubmittedLoginForm={async ({email, password}) => {
          await login({
            variables: {input: {email, password}},
          });
        }}
        userClickedForgotPassword={() => {
          history.push(routes.FORGOT_PASSWORD);
        }}
        userClickedClose={() => history.push(routes.HOME)}
      />
    );
  };
};
