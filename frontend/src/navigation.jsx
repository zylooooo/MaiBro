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
import BroUpdate from './components/searching/searchingForBros.jsx';
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
    <Route path="/home/standardorder" element={<Protect><StandardOrder /></Protect>}/>
    <Route path="/home/standardordercustom" element={<Protect><StandardOrderCustom /></Protect>}/>
    <Route path="/home/customorder" element={<Protect><CustomOrder /></Protect>}/>
    
    <Route path="/transaction" element={<Protect><Transaction /></Protect>} />

    <Route path="/delivery" element={<Protect><Delivery /></Protect>} />
    <Route path="/delivery/info" element={<DeliveryInfo />} />

    <Route path= "/penalty" element= {<Penalty/>} />

    <Route path= "/home/OrderConfirmation" element= {<Protect><Confirmation/></Protect>} />

    <Route path= "/home/info" element= {<Protect><BroUpdate/></Protect>} />


    <Route path= "/chat" element= {<Protect><Chat /></Protect>} />
  </>
));

export default browserRouter;