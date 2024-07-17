import {React, useState, useEffect} from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"
import transactionlist from "./transactionListings.jsx"
import "./transaction.css"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import { historyList } from "../../service/axiosService.jsx"




export function Transaction() {
  const [data, setData] = useState([]);
  const userName = sessionStorage.getItem("userName");

  //Fill in code to obtain transaction history from backend
  useEffect(() => { 
    const body = {
      userId: userName
    }

    // Create a async function to get the transaction history from the backend
    async function getTransactionHistory(){
      // Call your axios function HERE!
      await historyList(body).then((response) => {
        // if there is no data return nothing
        if(response === undefined){
          console.log("No Data");
          return false
        }else{
          setData(response);
        }
        // else set the transaction state to the     
      })
    }

    getTransactionHistory();

  },[])




  return (
    <>
    <div className='test'>
<ProfileTopBar />
<StandardHeader headerName="History"/>
        
    </div>
    <div className="historyList">
    {data.map(function(individualdata) {
      var completedOrPending;
      if(individualdata.orderAccepted == false || individualdata.orderCollected == false || individualdata.orderCompleted == false ){
        completedOrPending = <div style={{ color: 'blue' }}>Pending</div>
        
      }else{
        completedOrPending = <div style={{ color: 'green' }}>Completed</div>
      }

      var icon;
      if (individualdata.buyerId == userName){
        icon = <RestaurantMenuIcon fontSize="large" style={{marginRight:"10px"}} />
      }else if(individualdata.broId == userName){
        icon = <TwoWheelerIcon fontSize="large" style={{marginRight:"10px"}}/>;
      }
      

      


      
      return (
        <div className="indivData">
          <div className="leftgroup">

            <div className= "image">{icon}

            </div>

            <div className="leftdata">
              <div className = "restName">{individualdata.restaurant} </div> 
              <div className = "completedOrPending">{completedOrPending} </div> 
            </div>

            
          </div>

          <div className="rightgroup">
            <div className = "orderDate" >{individualdata.orderDate} </div> 
            <div className = "orderTime">{individualdata.orderTime} </div> 
            {/* <div className = "earnings">{individualdata.bro? "$"+ Number(data.earnings).toFixed(2): ""}</div>
            <div className = "expenditure">{individualdata.orderer? "$"+  Number(data.expenditure).toFixed(2): ""}</div> */}
          </div>
        

        </div>
        
      )
    })}
         <div>

        <BottomTab value="Transaction"></BottomTab>

         </div>
    </div>
    </>

  )
}

export default Transaction;

// any false, pending
// all 3 true, completed