import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"

export default function Transaction() {
    return (
        <div>
            <ProfileTopBar />
            <StandardHeader headerName="History"/>
            <div>
                <BottomTab value="Transaction"></BottomTab>
            </div>
        </div>
    )
}