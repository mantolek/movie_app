import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/actions/user_actions';
import { MenuMobileProps, Appstate } from '../../../types/interfaces/index';

const MenuMobile: React.FC<MenuMobileProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: Appstate) => state.user);

  const logoutHandler = async () => {
    try {
      await dispatch(logout());
      props.history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const signin = () => {
    props.history.push('/login');
  };

  const signup = () => {
    props.history.push('/register');
  };

  const goToFavorite = () => {
    props.history.push('/favorite');
  };

  if (user.loginSuccess) {
    return (
      <div className='navbar__wrapper-mobile__menu'>
        <button
          type='button'
          className='btn'
          onClick={() => goToFavorite()}
        >
          Favorite
        </button>
        <button type='button' className='btn' onClick={logoutHandler}>
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className='navbar__wrapper-mobile__menu'>
      <button
        type='button'
        className='btn'
        onClick={() => signin()}
      >
        Signin
      </button>
      <button type='button' className='btn' onClick={() => signup()}>
        Signup
      </button>
    </div>
  );
};

export default withRouter(MenuMobile);
