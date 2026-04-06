import type { Mock } from "vitest";
import { WeatherService } from "../services/weatherService";

globalThis.fetch = vi.fn();

describe("WeatherService", () => {
  let service: WeatherService;

  const weatherData = {
    name: "Москва",
    main: {
      temp: 5,
    },
    weather: [
      {
        description: "Облачно",
      },
    ],
  };

  beforeEach(() => {
    service = new WeatherService();
    (fetch as Mock).mockClear();
  });

  it("should fetch weather by city and return json", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(weatherData),
    });

    const result = await service.getWeatherByCityName("Москва");

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("q=Москва"));

    expect(result).toEqual(weatherData);
  });

  it("should throw error when city not found (response.ok = false)", async () => {
    const errorResponse = {
      ok: false,
      json: vi.fn().mockResolvedValueOnce({ message: "City not found" }),
    };
    (fetch as Mock).mockResolvedValueOnce(errorResponse);

    await expect(service.getWeatherByCityName("VV")).rejects.toThrow(
      "City not found",
    );
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("q=VV"));
  });

  it("should fetch weather by geolocation and return json with Russian name", async () => {
    const weatherDataWithWrongName = {
      name: "Ulyanka",
      main: {
        temp: 5,
      },
      weather: [
        {
          description: "Облачно",
        },
      ],
    };
    const geoData = [
      {
        local_names: {
          ru: "Санкт-Петербург",
        },
      },
    ];

    (fetch as Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(weatherDataWithWrongName),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(geoData),
      });

    const result = await service.getWeatherByGeolocation(55, 37);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("lat=55&lon=37"),
    );

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("geo/1.0/reverse"),
    );

    expect(result.name).toBe("Санкт-Петербург");
    expect(result.main.temp).toBe(5);
  });
});
