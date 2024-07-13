import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"
import transactionlist from "./transactionListings.jsx"


var transaction = transactionlist["Listings"];


export function Transaction() {
  return (
    <>
    <div>
<ProfileTopBar />
<StandardHeader headerName="History"/>
        
         </div>
    {transaction.map(function(data) {
      var completedOrPending;
      if(data.orderCompleted){
        completedOrPending = "Completed";
      }else{
        completedOrPending = "Pending";
      }
      return (
        <div>
        {data.restaurantName} {data.orderDate} {data.orderTime} {completedOrPending}

        </div>
        
      )
    })}
         <div>

        <BottomTab value="Transaction"></BottomTab>

         </div>
    </>

  )
}

export default Transaction;

// export default function Transaction() {
//     var transaction = transactionlist["Listings"]

//     return (
//         <>
//         <div>
//             <ProfileTopBar />
//             <StandardHeader headerName="History"/>
        
//         </div>
        
//         <div>

//         </div>
        
//         <div>

//             <BottomTab value="Transaction"></BottomTab>

//         </div>
//         </>
        
//     )
// }

// export default function Transaction() {
//     var transaction = transactionlist["Listings"]

//     return (
//         <>
//         <div>
//             <ProfileTopBar />
//             <StandardHeader headerName="History"/>
        
//         </div>
        
//         <div>
//         {
//             transaction.map(function(data)){
//                 return(
//                     <div>
//                     {data.restaurantName}
//                     </div>
//                 )
            
//             })}
//         </div>
        
//         <div>

//             <BottomTab value="Transaction"></BottomTab>

//         </div>
//         </>
        
//     )
// }