import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Appstate } from '../types/interfaces/index';

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('userLoggedIn') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const AdminRoute = ({ component: Component, ...rest }: any) => {
  const user = useSelector((state: Appstate) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (user.isAdmin ? <Component {...props} /> : null)}
    />
  );
};
