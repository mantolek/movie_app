import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/user_actions';
import { LoginProp } from '../../types/interfaces/index';
import { useRemember } from '../../utils/useRemember';

const Login: React.FC<LoginProp> = (props) => {
  const dispatch = useDispatch();
  const { userSaved, setUserSaved, initialEmail } = useRemember();

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await dispatch(login(formData));

      if (userSaved === true) {
        localStorage.setItem('userSaved', email);
      } else {
        localStorage.removeItem('userSaved');
      }

      setFormData({ email: '', password: '' });
      props.history.push('/');
    } catch (err) {
      console.log(err.response.data.err || err.message);
    }
  };

  return (
    <form>
      <input
        type='email'
        name='email'
        value={email}
        onChange={(e) => change(e)}
        placeholder={initialEmail ? initialEmail : 'email'}
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={(e) => change(e)}
        placeholder='password'
      />
      <input
        type='checkbox'
        id='rememberMe'
        onChange={() => setUserSaved(!userSaved)}
        checked={userSaved}
      />

      <button type='button' onClick={(e) => submitForm(e)}>
        ok
      </button>
    </form>
  );
};

export default Login;
