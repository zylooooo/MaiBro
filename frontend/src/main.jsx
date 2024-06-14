import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Settings from './components/settings/Settings.jsx';
import Home from './components/home/home.jsx';
import Transaction from './components/transaction/transaction.jsx'
import Delivery from './components/delivery/delivery.jsx'
import CustomOrder from './components/order/customOrder/customOrder.jsx'
import Page from './components/order/customOrder/geocoding.jsx'

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


