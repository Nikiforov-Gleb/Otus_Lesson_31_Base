import type { FC } from "react";
import { SearchSection } from "../components/SearchSection";
import { WeatherSection } from "../components/WeatherSection";
import { HistorySection } from "../components/HistorySection";
import { useWeather } from "../hooks/useWeather";
import { useHistory } from "../hooks/useHistory";
import { useGeolocation } from "../hooks/useGeolocation";

export const WeatherPage: FC = () => {
  const { weather, isLoading, fetchByCity, fetchByCoords } = useWeather();
  const { history, addItemHistory, clearHistory } = useHistory();

  useGeolocation(async (lat, lon) => {
    const currWeather = await fetchByCoords(lat, lon);
    addItemHistory(currWeather!);
  });

  const handleSubmit = async (city: string) => {
    try {
      const weatherCity = await fetchByCity(city);
      addItemHistory(weatherCity!);
    } catch {
      alert("Город не найден");
    }
  };

  return (
    <>
      <main className="container">
        <SearchSection onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="desktop-container">
          <div className="main-content">
            <WeatherSection weatherData={weather} />
          </div>
          <div className="sidebar">
            <HistorySection history={history} clearHistory={clearHistory} />
          </div>
        </div>
      </main>
    </>
  );
};
