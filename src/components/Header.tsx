import { type FC } from "react";
import "../styles/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAboutPage = location.pathname === "/about";

  const handleAboutClick = () => {
    navigate(`/about`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <h1 style={{ cursor: "pointer" }} onClick={handleBackClick}>
          <i className="fa-solid fa-cloud"></i>
          Прогноз погоды
        </h1>
        {!isAboutPage && (
          <button className="about-button" onClick={handleAboutClick}>
            О приложении
          </button>
        )}
      </div>
    </header>
  );
};
