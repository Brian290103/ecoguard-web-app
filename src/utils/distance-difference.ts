// utils/distance.ts

interface Location {
  lat: number;
  long: number;
}

/**
 * Calculate the distance (in kilometers) between two locations
 */
export function getDistanceInKm(
  locationA: Location,
  locationB: Location,
): number {
  const { lat: lat1, long: lon1 } = locationA;
  const { lat: lat2, long: lon2 } = locationB;

  const R = 6371; // Radius of Earth in KM
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in KM
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
