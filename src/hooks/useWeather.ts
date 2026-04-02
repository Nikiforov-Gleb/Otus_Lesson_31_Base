import { WeatherService } from "../services/weatherService";
import { type WeatherData } from "../data/weatherData";
import { useState } from "react";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const weatherService = new WeatherService();

  const fetchByCity = async (city: string): Promise<WeatherData | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeatherByCityName(city);
      setWeather(data);
      return data;
    } catch {
      setError("Ошибка загрузки погоды");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchByCoords = async (
    lat: number,
    lon: number,
  ): Promise<WeatherData | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeatherByGeolocation(lat, lon);
      setWeather(data);
      return data;
    } catch {
      setError("Ошибка загрузки погоды");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { weather, isLoading, error, fetchByCity, fetchByCoords };
}
