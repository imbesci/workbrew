import React, { useState } from 'react'
import { Map, Marker, Overlay } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'
import { Restaurant } from '../NearbyTable/NearbyTable'
import Paper from '@mui/material/Paper'

export interface MapProps {
    coords: [number, number]
}

type StringIndexedObject = {
    [key: string]: boolean
  }

export const CafeMap = React.memo((props: { mapProps: MapProps, restaurants: Restaurant[] } ) => {

    const coords = props.mapProps.coords
    const restaurants = props.restaurants
    const [center, setCenter] = useState<[number,number]>(coords)
    const [zoom, setZoom] = useState(11)
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`
    const [openStatuses, setOpenStatuses] = useState<StringIndexedObject>({})
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    
    const handleMouseEnter = (event:any, id:string) => {
        setAnchorEl(event.currentTarget)
        setOpenStatuses({...openStatuses, [id]: true})
    }

    const handleMouseLeave = (id:string) => {
        setOpenStatuses({ ...openStatuses, [id]: false });
      };

    const handleClick = () => {

    }

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
        >
        {restaurants.map((restaurant: Restaurant) => (
            <Overlay 
                anchor={[restaurant.geometry.location.lat, restaurant.geometry.location.lng]} 
                offset={[0,0]}
            >
            {openStatuses[restaurant.place_id] ? (
                <Paper elevation={3}>{restaurant.name}</Paper>
            ) : undefined }
            </Overlay>
        ))}
        {restaurants.map((restaurant: Restaurant) => (
                <Marker 
                    width={50}
                    anchor={[restaurant.geometry.location.lat, restaurant.geometry.location.lng]} 
                    color={color} 
                    onClick={() => handleClick()}
                    onMouseOver={(event) => handleMouseEnter(event, restaurant.place_id)}
                    onMouseOut={() => handleMouseLeave(restaurant.place_id)}
                />
        ))}
        </Map>
    )
})