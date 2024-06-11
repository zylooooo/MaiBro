import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardTopBar } from "../common/topTab/topTab"

export default function Transaction() {
    return (
        <div>
            <ProfileTopBar />
            <StandardTopBar headerName="History"/>
            <div>
                <BottomTab value="Transaction"></BottomTab>
            </div>
        </div>
    )
}