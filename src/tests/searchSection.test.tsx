import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchSection } from "../components/SearchSection";

describe("SearchSection", () => {
  it("should correctly render", () => {
    render(<SearchSection onSubmit={vi.fn()} isLoading={false} />);

    expect(screen.getByPlaceholderText("Введите город")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Найти" })).toBeInTheDocument();
  });

  it("should disabled submit button if input empty", () => {
    render(<SearchSection onSubmit={vi.fn()} isLoading={false} />);

    const button = screen.getByRole("button", { name: "Найти" });
    expect(button).toBeDisabled();
  });

  it("should call onSubmit with city name when submit", () => {
    const onSubmitMock = vi.fn();

    render(<SearchSection onSubmit={onSubmitMock} isLoading={false} />);

    const input = screen.getByRole("textbox", { name: "Название города" });

    const button = screen.getByRole("button", { name: "Найти" });

    fireEvent.change(input, { target: { value: "Москва" } });
    fireEvent.click(button);

    expect(onSubmitMock).toHaveBeenCalledWith("Москва");
  });

  it("should clear input when click clearBtn", () => {
    render(<SearchSection onSubmit={vi.fn()} isLoading={false} />);

    const input = screen.getByPlaceholderText(
      "Введите город",
    ) as HTMLInputElement;
    const clearButton = screen.getByLabelText("Очистить ввод");

    fireEvent.change(input, { target: { value: "Москва" } });
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
  });

  it("should show when loading", () => {
    render(<SearchSection onSubmit={vi.fn()} isLoading={true} />);

    expect(screen.getByRole("button", { name: "Загрузка..." })).toBeDisabled();
  });
});
