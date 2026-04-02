import { act, render, screen } from "@testing-library/react";
import type { WeatherData } from "../data/weatherData";
import { WeatherSection } from "../components/WeatherSection";

vi.mock("../services/dateFormatter.ts", () => ({
  DateFormatter: {
    getLongDate: vi.fn(() => "24.03.2026 11:45"),
  },
}));

describe("Weather section", () => {
  const weatherData = {
    name: "Москва",
    main: {
      temp: 5,
      humidity: 80,
      pressure: 1012,
    },
    weather: [
      {
        description: "Облачно",
      },
    ],
    wind: {
      speed: 5,
    },
    coord: {
      lat: 55,
      lon: 37,
    },
  } as WeatherData;

  beforeEach(() => {
    vi.useFakeTimers();
    const start = new Date("2026-01-01T12:00:00");
    vi.setSystemTime(start);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly render weather info", () => {
    render(<WeatherSection weatherData={weatherData} />);

    expect(screen.getByText("Москва")).toBeDefined();
    expect(screen.getByText("5°C")).toBeDefined();
    expect(screen.getByText("Облачно")).toBeDefined();

    expect(screen.getByText("Ветер")).toBeDefined();
    expect(screen.getByText("5 м/с")).toBeDefined();

    expect(screen.getByText("Влажность")).toBeDefined();
    expect(screen.getByText("80%")).toBeDefined();

    expect(screen.getByText("Давление")).toBeDefined();
    expect(screen.getByText("1012 Па")).toBeDefined();

    expect(screen.getByText("24.03.2026 11:45")).toBeDefined();
    expect(screen.getByText("Обновлено только что")).toBeDefined();
  });

  it("updateLastUpdated shows the correct time", () => {
    render(<WeatherSection weatherData={weatherData} />);
    const lastUpdatedEl = screen.getByText(/Обновлено/);

    expect(lastUpdatedEl).not.toBeNull();
    expect(lastUpdatedEl!.textContent).toBe("Обновлено только что");

    act(() => {
      vi.advanceTimersByTime(60000);
    });
    expect(lastUpdatedEl!.textContent).toBe("Обновлено 1 минуту назад");
    act(() => {
      vi.advanceTimersByTime(120000);
    });
    expect(lastUpdatedEl!.textContent).toBe("Обновлено 3 минут назад");
  });
});
