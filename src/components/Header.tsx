import { type FC } from "react";
import "../styles/styles.css";

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <h1>
          <i className="fa-solid fa-cloud"></i>
          Прогноз погоды
        </h1>
        {/* <button className="about-button">О приложении</button> */}
      </div>
    </header>
  );
};
