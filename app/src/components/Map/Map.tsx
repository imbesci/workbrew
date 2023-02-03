import React, { useState } from 'react'
import { Map } from 'pigeon-maps'

export function MyMap() {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    const [center, setCenter] = useState([latitude, longitude])
    const [zoom, setZoom] = useState(11)
    return (
        <Map 
        height={300}
        center={center} 
        zoom={zoom} 
        onBoundsChanged={({ center, zoom }) => { 
            setCenter(center) 
            setZoom(zoom) 
        }} 
        />
    )
})}