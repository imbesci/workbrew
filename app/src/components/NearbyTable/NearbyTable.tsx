import React from "react";
import { useState, useRef } from "react"
import "./NearbyTable.css";
import { formatNumber } from "../../helpers/speedtest"
import { defaultRestaurant } from "../../helpers/defaultObjects"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import ClickAwayListener from "@mui/material/ClickAwayListener"

export interface Restaurant {
    business_status: string;
    geometry: {
        location: {
            lat: number,
            lng: number
        },
        viewport: {
            northeast: {
                lat: number,
                lng: number
            },
            southwest: {
                lat: number,
                lng: number
            }
        }
    },
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {
      open_now: boolean;
    };
    place_id: string;
    price_level: number;
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
    current_opening_hours: {
      open_now: boolean;
      periods: Array<{
        close: { date: string; day: number; time: string };
        open: { date: string; day: number; time: string };
      }>;
      weekday_text: string[];
    };
    formatted_address: string;
    website: string;
    distance: number;
}
  
interface Props {
    restaurants : Restaurant[];
}

export const NearbyTable: React.FC<Props> = ({ restaurants }) => {

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(defaultRestaurant);
    const [anchorEl, setAnchorEl] = useState(null)
    const spanRef = useRef(null)
    const [hover, setHover] = useState(false)
    
    const handleRowClick = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsPopupVisible(true);
        setAnchorEl(spanRef.current)
    }
    
    const handlePopupClick = (event: any) => {
      event.stopPropagation();
    };
    
    const handleClickOutside = () => {
      setIsPopupVisible(false);
    };
      
    const sortedRestaurants = [...restaurants].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.distance - b.distance;
      } else {
        return b.distance - a.distance;
      }
    });
    
    return (
        <div ref={spanRef}>
        <table>
          <thead>
            <tr>
              <th>Cafe</th>
              <th>
                Distance from you (miles)
                <button className="sortButton" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRestaurants.map((restaurant, index) => (
              <tr key={index} 
              onClick={() => handleRowClick(restaurant)} 
              className={`table-row ${hover ? 'table-row-hover' : ''}`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
                <td>
                    {restaurant.name}
                </td>
                <td>
                    {formatNumber(restaurant.distance, 2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {isPopupVisible && (
            <ClickAwayListener onClickAway={handleClickOutside}>
              <div onClick={handlePopupClick}>
                    <Popper open={isPopupVisible} style={{ position: 'fixed', top: 400, left: 275  }}>
                        <Paper elevation={5}>
                            <p>{selectedRestaurant.name}</p>
                            <p>Distance: {formatNumber(selectedRestaurant.distance, 2)}</p>
                        </Paper>
                    </Popper>
              </div>
            </ClickAwayListener>
          )}
          </div>
          
      );
    };