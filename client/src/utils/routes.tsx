import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

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

interface role {
  user: {
    role: number
  }
}

export const AdminRoute = ({ component: Component, ...rest }: any) => {
  const user = useSelector((state: role) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (user.role === 1 ? <Component {...props} /> : null)}
    />
  );
};
