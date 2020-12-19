import { useState } from 'react';

export const useRemember = () => {
  // Check if email was saved
  const initialEmail = localStorage.getItem('userSaved')
    ? localStorage.getItem('userSaved')
    : '';
    
  // If email was saved then check the box
  const [userSaved, setUserSaved] = useState(!!initialEmail);

  return {userSaved, setUserSaved, initialEmail} as const;
};
