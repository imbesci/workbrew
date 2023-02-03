import React, { useState } from 'react'
import { Map } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'

export interface MapProps {
    coords: [number, number]
}

export function CafeMap(props: MapProps) {

    const coords = props.coords
    const [center, setCenter] = useState<[number,number]>(coords)
    const [zoom, setZoom] = useState(11)

    return (
        <Map
        provider={osm}
        height={300}
        center={center} 
        zoom={zoom} 
        onBoundsChanged={({ center, zoom }) => { 
            setCenter(center) 
            setZoom(zoom) 
        }} 
        />
    )
}