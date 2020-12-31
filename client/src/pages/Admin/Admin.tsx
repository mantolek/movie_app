import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeMode } from '../../store/actions/global_actions';

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('white');

  const setProperties = (name: string, color: string) => {
    setName(name);
    document.documentElement.style.setProperty('--bg', color);
    localStorage.setItem('bg', name);
  };

  const changeBg = useCallback(() => {
    const bg = localStorage.getItem('bg');

    if (bg === 'pink') {
      setProperties('white', '#fff');
    } else {
      setProperties('pink', 'rgb(221, 172, 172)');
    }

    dispatch(changeMode(bg));
  }, [dispatch]);

  useEffect(() => {
    const bg = localStorage.getItem('bg');
    if (bg === null || bg === 'white') {
      setProperties('white', '#fff');
    } else {
      setProperties('pink', 'rgb(221, 172, 172)');
    }
  }, []);

  return (
    <div>
      <p>Mode: {name}</p>
      <button onClick={() => changeBg()}>Switch</button>
    </div>
  );
};

export default Admin;
