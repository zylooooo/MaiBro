import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { App, Notification } from './components/home/home';
import { requestNotificationPermissionAndGetToken } from './utils/firebaseMessaging';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C6252E',
    },
    secondary: {
      main: '#133851',
    },
    grey: {
      main: '#D3D3D3',
    },
  },
});



// DO NOT TOUCH
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Notification />
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)


// Request Notification Permission and get FCM Token
requestNotificationPermissionAndGetToken();
// Initialize Firebase Messaging Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
