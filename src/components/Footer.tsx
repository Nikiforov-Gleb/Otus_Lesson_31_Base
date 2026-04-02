import type { FC } from "react";
import "../styles/styles.css";

export const Footer: FC = () => {
  return (
    <footer>
      <div className="container">
        <p>
          Weather Forecast App &copy;
          <script>document.write(new Date().getFullYear());</script>
        </p>
        <p>Weather data provided by OpenWeatherMap</p>
      </div>
    </footer>
  );
};
