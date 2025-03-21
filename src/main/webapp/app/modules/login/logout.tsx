import React, { useEffect, useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';
import { useNavigate } from 'react-router';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, []);
  
  return (
    <div className="p-5">
      <h4>Você foi desconectado!</h4>
    </div>
  );
};

export default Logout;