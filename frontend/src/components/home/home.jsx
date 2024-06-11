import React from "react"
import Restaurant from "./home_components/restaurantDetails"
import data from "./home_test"
import BottomTab from "../common/bottomTab/bottomTab"

export default function Home() {
    const restaurant = data.map(item => {
        return (
            <Restaurant
                key={item.id}
                {...item}
                
            />
        )
    })        
    
    return (
        <div>
            <div>
                <section className="restaurant-list">
                    {restaurant}
                </section>
            </div>
            <div>
                <BottomTab></BottomTab>
            </div>
        </div>
    )
}