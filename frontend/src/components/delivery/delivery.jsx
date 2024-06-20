import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"

export default function Delivery() {
    return (
        <>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Delivery"/>
        </div>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </>
    )
}