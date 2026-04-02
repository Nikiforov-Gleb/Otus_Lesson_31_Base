import { useState, useCallback } from "react";
import { type WeatherData } from "../data/weatherData";
import { type HistoryItem } from "../data/historyItem";
import { DateFormatter } from "../services/dateFormatter";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    return JSON.parse(localStorage.getItem("searchHistory") || "[]");
  });

  const addItemHistory = useCallback(
    (weatherData: WeatherData) => {
      const cityName = weatherData.name;

      const newItem: HistoryItem = {
        name: weatherData.name,
        time: DateFormatter.getShortDateAndTime(),
        temp: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
      };

      const modifiedHistory = history.filter((item) => item.name !== cityName);
      modifiedHistory.unshift(newItem);
      const trimmedHistory = modifiedHistory.slice(0, 10);

      localStorage.setItem("searchHistory", JSON.stringify(trimmedHistory));
      setHistory(trimmedHistory);
    },
    [history],
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  }, []);

  return { history, addItemHistory, clearHistory };
}
