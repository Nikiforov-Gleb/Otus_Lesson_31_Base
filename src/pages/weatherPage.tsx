import { useEffect, useState, type FC } from "react";
import { SearchSection } from "../components/SearchSection";
import { WeatherSection } from "../components/WeatherSection";
import { HistorySection } from "../components/HistorySection";
import { useWeather } from "../hooks/useWeather";
import { useHistory } from "../hooks/useHistory";
import { useNavigate, useParams } from "react-router-dom";
import { LocationService } from "../services/locationService";
import { MapSection } from "../components/MapSection";

const locationService = new LocationService();
export const WeatherPage: FC = () => {
  const { weather, isLoading, fetchByCity, fetchByCoords } = useWeather();
  const { history, addItemHistory, clearHistory } = useHistory();
  const { city } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        let weather;
        if (city) {
          weather = await fetchByCity(city);
        } else {
          const position = await locationService.getCurrentPosition();
          const { latitude, longitude } = position.coords;
          weather = await fetchByCoords(latitude, longitude);
          navigate(`/weather/${weather?.name}`);
        }
        addItemHistory(weather!);
      } catch (error) {
        console.error("Ошибка загрузки погоды:", error);
      }
    }

    loadWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (city: string) => {
    try {
      setError(null);
      const weatherCity = await fetchByCity(city);
      if (weatherCity) {
        addItemHistory(weatherCity!);
        navigate(`/weather/${weatherCity?.name}`);
      }
    } catch {
      setError("Город не найден");
    }
  };

  return (
    <>
      <main className="container">
        <SearchSection
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
        <div className="desktop-container">
          <div className="main-content">
            <WeatherSection weatherData={weather} />
            <MapSection
              name={weather?.name}
              lon={weather?.coord?.lon}
              lat={weather?.coord?.lat}
            />
          </div>
          <div className="sidebar">
            <HistorySection history={history} clearHistory={clearHistory} />
          </div>
        </div>
      </main>
    </>
  );
};
