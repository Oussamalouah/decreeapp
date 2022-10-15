import {useQuery} from '@apollo/client';
import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {routes} from '../../route-list';
import {AUTHENTICATION} from '../../api/operations/queries/authentication';
import {AuthResult} from '../../api/models/AuthResult';

/**
 * A wrapper for <Route> that redirects to the login screen
 * if you're not yet authenticated.
 * @component
 * @param children
 * @param rest
 * @constructor
 */
export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  component: Component,
  ...rest
}) => {
  const {data} = useQuery<AuthResult>(AUTHENTICATION);
  const isAuthenticated = !!data?.accessToken;
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          children || (Component && <Component {...props} />)
        ) : (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: {from: props.location},
            }}
          />
        )
      }
      {...rest}
    />
  );
};
