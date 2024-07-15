import {React, useState, useEffect} from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"
import transactionlist from "./transactionListings.jsx"
import "./transaction.css"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'


var transaction = transactionlist["Listings"];


export function Transaction() {
  const [data, setData] = useState([]);
  const userName = sessionStorage.getItem("userName");

  //Fill in code to obtain transaction history from backend
  useEffect(() => { 
    const body = {
      userName: userName
    }
    // Create a async function to get the transaction history from the backend
    async function getTransactionHistory(){
      // Call your axios function HERE!
      await historyList(body).then((response) => {
        console.log(response)
        // if there is no data return nothing


        // else set the transaction state to the 
        setData(response);
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
    {transaction.map(function(data) {
      var completedOrPending;
      if(data.orderCompleted){
        completedOrPending = <div style={{ color: 'green' }}>Completed</div>
        
      }else{
        completedOrPending = <div style={{ color: 'blue' }}>Pending</div>

      }


      
      return (
        <div className="indivData">
          <div className="leftgroup">

            <div className= "image">
              {data.orderer? <RestaurantMenuIcon fontSize="large" style={{marginRight:"10px"}} />: <TwoWheelerIcon fontSize="large" style={{marginRight:"10px"}}/>}
            </div>

            <div className="leftdata">
              <div className = "restName">{data.restaurantName} </div> 
              <div className = "completedOrPending">{completedOrPending} </div> 
            </div>

            
          </div>

          <div className="rightgroup">
            <div className = "orderDate" >{data.orderDate} </div> 
            <div className = "orderTime">{data.orderTime} </div> 
            <div className = "earnings">{data.bro? "$"+ Number(data.earnings).toFixed(2): ""}</div>
            <div className = "expenditure">{data.orderer? "$"+  Number(data.expenditure).toFixed(2): ""}</div>
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

