import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { Appstate, AppProp } from './types/interfaces/index';
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { auth } from './store/actions/user_actions'

const PrivateRoute = ({ component: Component, ...rest }: any) => (
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

const App: React.FC<AppProp> = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: Appstate) => state.user);
  console.log(user)

  useEffect(() => {
    dispatch(auth())
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </div>
  );
};

export default App;
