import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { StandardTopBar } from "../common/topTab/topTab"

export default function Delivery() {
    return (
        <>
        <div>
            <StandardTopBar headerName="Delivery"/>
        </div>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </>
    )
}