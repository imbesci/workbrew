export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 3959; // radius of the Earth in miles
    const dLat = toRadians(lat2-lat1);
    const dLon = toRadians(lng2-lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
function toRadians(deg: number) {
    return deg * (Math.PI/180)
}