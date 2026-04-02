import React, { useEffect, useMemo, useState } from "react";
import { type WeatherData } from "../data/weatherData";
import { DateFormatter } from "../services/dateFormatter";

interface WeatherSectionProps {
  weatherData: WeatherData | null;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({
  weatherData,
}) => {
  //const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [lastUpdatedText, setLastUpdatedText] = useState(
    "Обновлено только что",
  );

  const lastUpdate = useMemo(() => {
    return weatherData ? new Date() : null;
  }, [weatherData]);

  useEffect(() => {
    if (!lastUpdate) return;

    const updateText = () => {
      const now = new Date();
      const diffMinutes = Math.floor(
        (now.getTime() - lastUpdate.getTime()) / 60000,
      );

      if (diffMinutes === 0) {
        setLastUpdatedText("Обновлено только что");
      } else if (diffMinutes === 1) {
        setLastUpdatedText("Обновлено 1 минуту назад");
      } else {
        setLastUpdatedText(`Обновлено ${diffMinutes} минут назад`);
      }
    };

    updateText();
    const interval = setInterval(updateText, 60000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  if (!weatherData) {
    return null;
  }

  const icon = weatherData.weather[0].icon;

  return (
    <section className="weather-section">
      <div className="card">
        <div id="weatherData">
          <div className="weather-header">
            <div>
              <h2 id="cityName">{weatherData.name}</h2>
              <p id="currentDateTime">{DateFormatter.getLongDate()}</p>
            </div>
            <div className="last-updated">
              <i className="fas fa-history"></i>
              <span id="lastUpdated">{lastUpdatedText}</span>
            </div>
          </div>

          <div className="weather-content">
            <div className="current-weather">
              <div className="weather-primary">
                <div className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="weather icon"
                  />
                </div>
                <div>
                  <div className="temperature">
                    {Math.round(weatherData.main.temp)}°C
                  </div>
                  <div className="weather-description">
                    {weatherData.weather[0].description}
                  </div>
                </div>
              </div>

              <div className="weather-details">
                <div className="weather-detail">
                  <i className="fas fa-wind"></i>
                  <div>
                    <p>Ветер</p>
                    <p>{weatherData.wind.speed} м/с</p>
                  </div>
                </div>

                <div className="weather-detail">
                  <i className="fas fa-tint"></i>
                  <div>
                    <p>Влажность</p>
                    <p>{weatherData.main.humidity}%</p>
                  </div>
                </div>

                <div className="weather-detail">
                  <i className="fas fa-compress-alt"></i>
                  <div>
                    <p>Давление</p>
                    <p>{weatherData.main.pressure} Па</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
