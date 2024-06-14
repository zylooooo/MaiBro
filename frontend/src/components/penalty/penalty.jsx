import React from "react";
import ReactDOM from "react-dom";

import BottomTab from "../common/bottomTab/bottomTab";
import {ProfileTopBar} from "../common/topTab/topTab";

import "./penalty.css";

export default function Penalty() {
    // change score accordingly to user's social score
    return (
        <>
            <ProfileTopBar />

            <center><b><h1>Social Score</h1></b>
                <div style={{fontSize:"2.5em",fontWeight:"bold"}}>100</div></center>
            <div className="penaltyText">
            <p><b>All users will start off with the maximum social score of 100</b></p>
            <p><b>Any users who commit any of the following behaviour will be subjected to a penalty:</b></p>
            <p><b>Cancellation of order after food ordered</b></p>
            <p style={{textAlign:"left"}}><b>- 10 points</b></p>
            <p><b>Failure to collect (customer)/deliver(BRO) food</b></p>
            <p><b>- 15 points</b></p>
            <p><b>Getting a score of 70 will result in a warning, and a score of 50 results in a permanent ban of account</b></p>
            <p><b>Users can increase their social score by fulfilling orders as BROs</b></p>
            </div>
            <BottomTab />

        </>)
}




export function Penalty2() {
    return (
        <div>
            <center><b><h1>Social Score</h1></b>
                <h1 style={{ color: 'red' }}>Warning</h1>
                <h1>70</h1>
            </center>

            <p><b>All users will start off with the maximum social score of 100</b></p>
            <p><b>Any users who commit any of the following behaviour will be subjected to a penalty:</b></p>
            <p><b>Cancellation of order after food ordered</b></p>
            <p><b>- 10 points</b></p>
            <p><b>Failure to collect (customer)/deliver(BRO) food</b></p>
            <p><b>- 15 points</b></p>
            <p><b>Getting a score of 70 will result in a warning, and a score of 50 results in a permanent ban of account</b></p>
            <p><b>Users can increase their social score by fulfilling orders as BROs</b></p>

        </div>)
}
