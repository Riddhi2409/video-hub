import React, { useContext, useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const[accesstoken,setAccesstoken]=useState('');
  const[photo,setPhoto]=useState('');
  const [email,setEmail]=useState('');
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      setAccesstoken(tokenResponse.access_token);
      // Handle token response (e.g., send to backend for further validation)
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const data = await response.json();
        console.log("eee",data)

        // console.log("feeee",data)
        setPhoto(data.picture);
        setEmail(data.email)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
    },
    onError: errorResponse => {
      console.error(errorResponse);
    },
  });

  const logout=()=>{
    setAccesstoken('');
    setEmail('');
    setPhoto('');
  }

  const value = {
    accesstoken,
    login,
    photo,
    email,
    logout
  };
console.log(value.url);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
