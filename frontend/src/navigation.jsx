import Settings from './components/settings/Settings.jsx';
import HomeMain from './components/home/home.jsx';
import Transaction from './components/transaction/transaction.jsx'
import Delivery from './components/delivery/delivery.jsx'
import Login from './components/login/login.jsx'
import SignUp from './components/signup/signup.jsx'
import StandardOrder, {StandardOrderCustom} from './components/order/standardOrder/standardOrder.jsx';
import CustomOrder from './components/order/customOrder/customOrderInput.jsx';
import Penalty from './components/penalty/penalty.jsx';
import Order from './components/order/customOrder/customOrderLocationFound.jsx';
import Confirmation from './components/order/customOrder/customOrderConfirmation.jsx';
import SearchingForBros from './components/searching/searchingForBros.jsx';
import BroFound from './components/searching/broFound.jsx';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// UPDATE NAVIGATION HERE
const browserRouter = createBrowserRouter(createRoutesFromElements(
  <>
    {/* Home */}
    <Route path="/" element={<HomeMain />} />
    <Route path="/home" element={<HomeMain />}/>

    {/* Authentication Pages */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    <Route path="/home/restaurant" element={<Settings />}/>

    {/* Order */}
    <Route path="/home/standardorder" element={<StandardOrder />}/>
    <Route path="/home/standardordercustom" element={<StandardOrderCustom />}/>
    <Route path="/home/customorder" element={<CustomOrder />}/>
    
    <Route path="/transaction" element={<Transaction />} />

    <Route path="/delivery" element={<Delivery />} />

    <Route path= "/penalty" element= {<Penalty/>} />

    <Route path= "/customOrder" element= {<CustomOrder/>} />
    <Route path= "/customOrdering" element= {<Order/>} />
    <Route path= "/customOrderConfirmation" element= {<Confirmation/>} />

    <Route path= "/searchingForBros" element= {<SearchingForBros/>} />
    <Route path= "/broFound" element= {<BroFound/>} />
  </>
));

export default browserRouter;