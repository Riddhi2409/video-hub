import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext/index.js'
import GoogleOAuthProviderWrapper from './Components/Auth/Login/GoogleOAuthProviderWrapper.js'
import { YoutubeProvider } from './contexts/youtubeContext.js/index.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <GoogleOAuthProviderWrapper>
    <AuthProvider>
    <YoutubeProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </YoutubeProvider>
    </AuthProvider>
    </GoogleOAuthProviderWrapper>
  </React.StrictMode>,
)
