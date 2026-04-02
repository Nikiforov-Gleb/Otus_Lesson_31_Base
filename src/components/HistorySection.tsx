import React from "react";
import type { HistoryItem } from "../data/historyItem";

interface HistorySectionProps {
  history: HistoryItem[];
  clearHistory: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  clearHistory,
}) => {
  return (
    <section className="history-section">
      <div className="card">
        <div className="section-header">
          <h2>
            <i className="fas fa-history"></i>
            История поиска
          </h2>
        </div>

        <div className="history-container">
          <div className="history-list">
            {history.map((item, index) => (
              <div className="history-item" key={index}>
                <div className="history-item-city">
                  <div className="city-icon">
                    <i className="fa-solid fa-circle-dot"></i>
                  </div>
                  <div className="city-info">
                    <h3 className="city-name">{item.name}</h3>
                    <p className="city-datetime">{item.time}</p>
                  </div>
                </div>

                <div className="history-item-weather">
                  <p className="weather-temp">{item.temp}°C</p>
                  <p className="weather-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="history-actions">
            <button className="btn-secondary" onClick={clearHistory}>
              <i className="fas fa-trash-alt"></i>
              Очистить историю
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
