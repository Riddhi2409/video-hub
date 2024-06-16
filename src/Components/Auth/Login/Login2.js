// src/components/GoogleLoginButton.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../../contexts/authContext';
import { Navigate } from 'react-router-dom';
const GoogleLoginButton = () => {
    const {login,accesstoken}=useAuth();

  return (
    <>
    {accesstoken && (<Navigate to={'/'} replace={true} />)} 
    <button onClick={() => login()}>
      Login with Google
    </button>
    </>
  );
};

export default GoogleLoginButton;