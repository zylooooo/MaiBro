import Settings from './components/settings/Settings.jsx';
import HomeMain from './components/home/home.jsx';
import Transaction from './components/transaction/transaction.jsx'
import Delivery from './components/delivery/delivery.jsx'
import Login from './components/login/Login.jsx'
import SignUp from './components/signup/signup.jsx'
import StandardOrder, {StandardOrderCustom} from './components/order/standardOrder/standardOrder.jsx';
import CustomOrder from './components/order/customOrder/customOrderInput.jsx';
import Penalty from './components/penalty/penalty.jsx';
import Confirmation from './components/order/customOrder/customOrderConfirmation.jsx';
import SearchingForBros from './components/searching/searchingForBros.jsx';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Protect from './protect.jsx';
import DeliveryInfo from './components/delivery/deliveryInfo.jsx';
import Chat from './components/chat/chat.jsx';

// UPDATE NAVIGATION HERE
const browserRouter = createBrowserRouter(createRoutesFromElements(
  <>
    {/* Home */}
    <Route path="/" element={<Protect><HomeMain /></Protect>} />
    <Route path="/home" element={<Protect><HomeMain /></Protect>}/>

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
    <Route path="/delivery/info" element={<DeliveryInfo />} />

    <Route path= "/penalty" element= {<Penalty/>} />

    <Route path= "/home/OrderConfirmation" element= {<Confirmation/>} />

    <Route path= "/home/searchingForBros" element= {<SearchingForBros/>} />


    <Route path= "/chat" element= {<Chat />} />
  </>
));

export default browserRouter;