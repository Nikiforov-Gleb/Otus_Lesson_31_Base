import { renderHook, act } from "@testing-library/react";
import { useWeather } from "../hooks/useWeather";
import { WeatherService } from "../services/weatherService";
import type { WeatherData } from "../data/weatherData";

vi.mock("../services/weatherService");

describe("useWeather", () => {
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

  it("fetchByCity should return weather on success", async () => {
    const getWeatherMock = vi
      .spyOn(WeatherService.prototype, "getWeatherByCityName")
      .mockResolvedValue(weatherData);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      const data = await result.current.fetchByCity("Moscow");
      expect(data).toEqual(weatherData);
    });

    expect(result.current.weather).toEqual(weatherData);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);

    getWeatherMock.mockRestore();
  });

  it("fetchByCity should return null on fail", async () => {
    const getWeatherMock = vi
      .spyOn(WeatherService.prototype, "getWeatherByCityName")
      .mockRejectedValue(new Error("Fail"));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      const data = await result.current.fetchByCity("Moscow");
      expect(data).toBeNull();
    });

    expect(result.current.weather).toBeNull();
    expect(result.current.error).toBe("Ошибка загрузки погоды");
    expect(result.current.isLoading).toBe(false);

    getWeatherMock.mockRestore();
  });
});
