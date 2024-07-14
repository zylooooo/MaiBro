import {React, useState} from "react";

export default function RestaurantAddress({latitude, longitude}) {
    const [address, setAddress] = useState('');
    const geocoder = new window.google.maps.Geocoder();
    const latlng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            setAddress(results[0].formatted_address);
          }
        }
      });

    return(
        <div className=''>{address}</div>
    )
}