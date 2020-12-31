import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { AppProp, Globalstate } from './types/interfaces/index';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './pages/Navbar/Navbar';
import Movie from './pages/Movie/Movie';
import Favorite from './pages/Favorite/Favorite';
import Admin from './pages/Admin/Admin';
import Popup from './components/popup/Popup';
import { auth } from './store/actions/user_actions';
import { AdminRoute, PrivateRoute } from './utils/routes';

const App: React.FC<AppProp> = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: Globalstate) => state.global);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <div className='body'>
      <Navbar />
      <Switch>
        <AdminRoute exact path='/admin' component={Admin} />
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/movie/:id' component={Movie} />
        <PrivateRoute exact path='/favorite' component={Favorite} />
      </Switch>
      {global.popup && <Popup />}
    </div>
  );
};

export default App;
