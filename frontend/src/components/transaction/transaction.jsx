import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"
import transactionlist from "./transactionListings.jsx"
import "./transaction.css"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'


var transaction = transactionlist["Listings"];


export function Transaction() {
  return (
    <>
    <div className='test'>
<ProfileTopBar />
<StandardHeader headerName="History"/>
        
    </div>
    <div className="body">
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

            <div className="leftdata">
              <div className = "restName">{data.restaurantName} </div> 
              <div className = "completedOrPending">{completedOrPending} </div> 
            </div>

            <div className= "image">
              {data.orderer? <RestaurantMenuIcon fontSize="large" />: <TwoWheelerIcon fontSize="large" />}
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

