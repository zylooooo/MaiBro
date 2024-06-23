import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { App } from './components/home/home';


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
    <App/>
    </ThemeProvider>
  </React.StrictMode>,
)


