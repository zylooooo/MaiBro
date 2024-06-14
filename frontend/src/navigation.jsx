import Settings from './components/settings/Settings.jsx';
import HomeMain from './components/home/home.jsx';
import Transaction from './components/transaction/transaction.jsx'
import Delivery from './components/delivery/delivery.jsx'
import Login from './components/login/Login.jsx'
import StandardOrder from './components/order/standardOrder/standardOrder.jsx';
import Penalty from './components/penalty/penalty.jsx';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// UPDATE NAVIGATION HERE
const browserRouter = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<HomeMain />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<HomeMain />}/>
    <Route path="/home/restaurant" element={<Settings />}/>
    <Route path="/home/standardorder" element={<StandardOrder />}/>

    <Route path="/transaction" element={<Transaction />} />

    <Route path="/delivery" element={<Delivery />} />

    <Route path= "/penalty" element= {<Penalty/>} />

  </>
));

export default browserRouter;