import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardTopBar } from "../common/topTab/topTab"

export default function Delivery() {
    return (
        <>
        <div>
            <ProfileTopBar/>
            <StandardTopBar headerName="Delivery"/>
        </div>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </>
    )
}