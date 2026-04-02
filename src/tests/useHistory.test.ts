import type { Mock } from "vitest";
import { DateFormatter } from "../services/dateFormatter";
import type { WeatherData } from "../data/weatherData";
import { act, renderHook } from "@testing-library/react";
import { useHistory } from "../hooks/useHistory";
import type { HistoryItem } from "../data/historyItem";

vi.mock("../services/dateFormatter", () => ({
  DateFormatter: {
    getShortDateAndTime: vi.fn(),
  },
}));

describe("useHistory", () => {
  (DateFormatter.getShortDateAndTime as Mock).mockReturnValue("24 мар., 09:21");

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
  } as WeatherData;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return empty array, if localStorage empty", () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toEqual([]);
  });

  it("should return history from localStorage", () => {
    const history = [weatherData];
    localStorage.setItem("searchHistory", JSON.stringify(history));

    const { result } = renderHook(() => useHistory());

    expect(result.current.history[0]).toEqual(weatherData);
  });

  it("should add new item", () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addItemHistory(weatherData);
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0]).toEqual({
      name: "Москва",
      time: "24 мар., 09:21",
      temp: 5,
      description: "Облачно",
    });

    const stored = JSON.parse(localStorage.getItem("searchHistory") || "[]");

    expect(stored[0]).toEqual({
      name: "Москва",
      time: "24 мар., 09:21",
      temp: 5,
      description: "Облачно",
    });
  });

  it("should remove duplicates by city name", () => {
    const history = [
      { name: "Москва", temp: 10 },
      { name: "Тверь", temp: 15 },
    ];
    localStorage.setItem("searchHistory", JSON.stringify(history));

    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addItemHistory(weatherData);
    });

    expect(result.current.history.length).toBe(2);
    expect(result.current.history[0].name).toBe("Москва");
    expect(
      result.current.history.filter(
        (item: HistoryItem) => item.name === "Москва",
      ).length,
    ).toBe(1);
  });

  it("should max ten items in array", () => {
    const history = Array.from({ length: 10 }, (_, i) => ({
      name: `City${i}`,
    }));

    localStorage.setItem("searchHistory", JSON.stringify(history));

    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addItemHistory(weatherData);
    });

    expect(result.current.history.length).toBe(10);
  });

  it("Should remove data from localStorage", () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addItemHistory(weatherData);
    });
    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toEqual([]);
    expect(localStorage.getItem("searchHistory")).toBeNull();
  });
});
