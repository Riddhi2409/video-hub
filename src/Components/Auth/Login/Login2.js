// src/components/GoogleLoginButton.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../../contexts/authContext';
const GoogleLoginButton = () => {
    const {login}=useAuth();
  return (
    <button onClick={() => login()}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;