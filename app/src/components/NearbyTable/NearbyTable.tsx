import React from "react";
import "./NearbyTable.css";

export interface Restaurant {
    business_status: string;
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
  }
  
  interface Props {
    restaurants : Restaurant[];
  }
  
export const NearbyTable: React.FC<Props> = ({ restaurants }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant, index) => (
          <tr key={index}>
            <td>{restaurant.name}</td>
            <td>{restaurant.formatted_address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};