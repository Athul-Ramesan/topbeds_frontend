import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
// import dotenv from "dotenv"
// dotenv.config()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId='799222331820-24bj3u4c9heg7njlo6obtdsd76i204mm.apps.googleusercontent.com'>
  <React.StrictMode>
    <Provider store={store}> 
    <App />
    </Provider>
  </React.StrictMode>,
    </GoogleOAuthProvider>
)
