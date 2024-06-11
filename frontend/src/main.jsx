import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/login/Login.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Settings from './components/settings/Settings.jsx'

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

const router = createBrowserRouter([
  // Define Main Routes Here (Url Path and Component to Render -> Rmb to import)
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <App/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)


