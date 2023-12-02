import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutThunk } from 'redux/auth/auth.reducer';

const UserMenu = ({ userData }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };
  return (
    <div>
      <span>Hello, {`${userData.name}! `}</span>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserMenu;
