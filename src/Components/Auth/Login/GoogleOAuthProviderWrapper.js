import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log(clientId);
const GoogleOAuthProviderWrapper = ({ children }) => (
  <GoogleOAuthProvider clientId={"552814610749-eo4c2olr3lvjmfrk7c155eobo7uge1e1.apps.googleusercontent.com"}>
    {children}
  </GoogleOAuthProvider>
);

export default GoogleOAuthProviderWrapper;