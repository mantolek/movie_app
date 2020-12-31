import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions/user_actions';
import { RegisterProp } from '../../types/interfaces/index';
import { changePopup } from '../../store/actions/global_actions';
import { validate } from '../../utils/validation';

const Register: React.FC<RegisterProp> = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, lastName, email, password, confirmPassword } = formData;

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!validate(formData)) {
      dispatch(changePopup(true, 'validate'));
      return;
    }

    try {
      await dispatch(register(formData));

      setFormData({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      props.history.push('/login');
    } catch (err) {
      dispatch(changePopup(true, 'register'));
    }
  };

  return (
    <form>
      <input
        type='text'
        name='name'
        value={name}
        onChange={(e) => change(e)}
        placeholder='name'
      />
      <input
        type='text'
        name='lastName'
        value={lastName}
        onChange={(e) => change(e)}
        placeholder='lastName'
      />
      <input
        type='email'
        name='email'
        value={email}
        onChange={(e) => change(e)}
        placeholder='email'
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={(e) => change(e)}
        placeholder='password'
      />
      <input
        type='password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={(e) => change(e)}
        placeholder='password confirm'
      />

      <button type='button' onClick={(e) => submitForm(e)}>
        ok
      </button>
    </form>
  );
};

export default Register;
