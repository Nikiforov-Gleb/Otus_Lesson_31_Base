import { useRef, useState, type FC } from "react";
import "../styles/styles.css";

interface SearchSectionProps {
  onSubmit: (city: string) => void;
  isLoading: boolean;
}

export const SearchSection: FC<SearchSectionProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [cityName, setCityName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (cityName.trim()) {
      onSubmit(cityName);
      handleClear();
    }
  };

  const handleClear = () => {
    setCityName("");
    inputRef.current?.focus();
  };

  return (
    <section className="search-section">
      <div className="card">
        <h2>Поиск</h2>
        <form
          id="cityForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              id="cityInput"
              placeholder="Введите город"
              aria-label="Название города"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              type="button"
              id="clearButton"
              className="clear-button"
              aria-label="Очистить ввод"
              onClick={handleClear}
            >
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
          <button
            type="submit"
            id="submitButton"
            className="btn-primary"
            disabled={!cityName.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i> Загрузка...
              </>
            ) : (
              "Найти"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
