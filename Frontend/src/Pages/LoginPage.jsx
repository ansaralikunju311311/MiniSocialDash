import React, { useEffect } from 'react';
import Login from '../Components/Auth/Login';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login - Loop Link';
  }, []);

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
