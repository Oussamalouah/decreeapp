import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../route-list';
import {AUTHENTICATION} from '../../../api/operations/queries/authentication';
import {AuthResult} from '../../../api/models/AuthResult';
import {
  useCustomerAccessTokenCreate,
  useCustomerCreate,
} from '../../../utils/hooks/mutation-hooks';

export type SignUpFormState = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export type SignUpScreenProps = {
  userSubmittedSignUpForm: (input: SignUpFormState) => Promise<void>;
  userClickedLogIn: () => void;
  userClickedClose: () => void;
  loading: boolean;
};

export const SignUpScreenContainer = (
  Screen: React.ComponentType<SignUpScreenProps>
) => {
  return () => {
    const history = useHistory();

    /** Reacts when there is a valid token */
    const {data: authData} = useQuery<AuthResult>(AUTHENTICATION);

    // Redirects to user settings if access token is found
    useEffect(() => {
      if (authData?.accessToken) {
        history.replace(routes.USER__SETTING);
      }
    }, [authData?.accessToken]);

    const {login, loadingLogin} = useCustomerAccessTokenCreate(data => {
      const errors = data.customerAccessTokenCreate?.customerUserErrors;

      if (errors) {
        toast.error(errors?.[0]?.message);
      }
    });

    const {signUp, loadingSignUp} = useCustomerCreate();

    return (
      <Screen
        loading={loadingSignUp || loadingLogin}
        userClickedLogIn={() => {
          history.push(routes.LOGIN);
        }}
        userSubmittedSignUpForm={async input => {
          const {data, errors} = await signUp({
            variables: {input},
          });

          const customerUserErrors = data?.customerCreate?.customerUserErrors;

          if (!customerUserErrors?.length && !errors) {
            await login({
              variables: {
                input: {
                  email: input.email,
                  password: input.password,
                },
              },
            });
          }
        }}
        userClickedClose={() => history.push(routes.HOME)}
      />
    );
  };
};
