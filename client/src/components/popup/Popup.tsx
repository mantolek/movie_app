import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Globalstate } from '../../types/interfaces/index';
import { changePopup } from '../../store/actions/global_actions';

const Popup = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: Globalstate) => state.global);

  const text = () => {
    switch (global.popupErrorType) {
      case 'fetch':
        return 'Problem with fetch.';
      case 'login':
        return 'Problem with login.';
      case 'register':
        return 'Problem with register.';
      case 'validate':
        return 'Problem with form.';
      default:
      // code block
    }
  };

  return (
    <div className='popup'>
      <h2>Error</h2>
      <p className='popup-text'>{text()}</p>
      <div className='popup__btn-container'>
        <button
          className='popup__btn popup__btn-left'
          onClick={() => dispatch(changePopup(false, ''))}
        >
          Confirm
        </button>
        {/* <button className='popup__btn popup__btn-right'>Cancel</button> */}
      </div>
    </div>
  );
};

export default Popup;
