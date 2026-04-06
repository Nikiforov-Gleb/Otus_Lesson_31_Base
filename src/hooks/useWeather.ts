import { WeatherService } from "../services/weatherService";
import { type WeatherData } from "../data/weatherData";
import { useCallback, useMemo, useState } from "react";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const weatherService = useMemo(() => new WeatherService(), []);

  const fetchByCity = useCallback(
    async (city: string): Promise<WeatherData | null> => {
      setLoading(true);
      setError(null);
      try {
        const data = await weatherService.getWeatherByCityName(city);
        setWeather(data);
        return data;
      } catch (err) {
        setError("Ошибка загрузки погоды");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [weatherService],
  );

  const fetchByCoords = useCallback(
    async (lat: number, lon: number): Promise<WeatherData | null> => {
      setLoading(true);
      setError(null);
      try {
        const data = await weatherService.getWeatherByGeolocation(lat, lon);
        setWeather(data);
        return data;
      } catch (err) {
        setError("Ошибка загрузки погоды");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [weatherService],
  );

  return { weather, isLoading, error, fetchByCity, fetchByCoords };
}
