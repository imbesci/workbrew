import { Restaurant } from "../components/NearbyTable/NearbyTable"

export const defaultRestaurant: Restaurant = {
    business_status: '',
    geometry: {
        location: {
            lat: 0,
            lng: 0
        },
        viewport: {
            northeast: {
                lat: 0,
                lng: 0
            },
            southwest: {
                lat: 0,
                lng: 0
            }
        }
    },
    icon: '',
    icon_background_color: '',
    icon_mask_base_uri: '',
    name: '',
    opening_hours: {
      open_now: false,
    },
    place_id: '',
    price_level: 0,
    rating: 0,
    reference: '',
    types: [],
    user_ratings_total: 0,
    current_opening_hours: {
        open_now: false,
        periods: [],
        weekday_text: []
      },
      formatted_address: '',
      website: '',
      distance: 0
  }
