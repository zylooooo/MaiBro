"use client";

import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";


export default function Page(){
    return(
    <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
        <Geocoding />
    </APIProvider>
    );
}

function Geocoding(){

    const [google] = useState([]);
    const geocodingApiLoaded = useMapsLibrary("geocoding");
    const [geocodingService, setGeocodingService] = 
        useState<new google.maps.Geocoder>(null);
    const [geocodingResult, setGeocodingResult] = 
        useState<window.google.maps.GeocoderResult>(null);
    const [address, _setAddress] = useState("10 Front St, Toronto");

    useEffect(() => {
        if(!geocodingApiLoaded) return;
        setGeocodingService(new window.google.maps.Geocoder());
    }, [geocodingApiLoaded]);

    useEffect(() => {
        if(!geocodingService || !address) return;

        geocodingService.geocode({address}, (results, status) => {
            if(results && status === "OK"){
               setGeocodingResult(results[0]);
            }
        });
    }, [geocodingService, address]);

    if(!geocodingService) return <div>Loading...</div>;
    if (!geocodingResult) return <div>Geocoding...</div>;

    return <div>
        <h1>{geocodingResult.formatted_address}</h1>
        <p>Latitude: {geocodingResult.geometry.location.lat()}</p>
        <p>Longitude: {geocodingResult.geometry.location.lng()}</p>
    </div>
}