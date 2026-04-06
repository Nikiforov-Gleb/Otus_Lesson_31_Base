import { useEffect } from "react";
import { LocationService } from "../services/locationService";

export function useGeolocation(onSuccess: (lat: number, lon: number) => void) {
  useEffect(() => {
    const service = new LocationService();

    service
      .getCurrentPosition()
      .then((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        onSuccess(lat, lon);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [onSuccess]);
}
