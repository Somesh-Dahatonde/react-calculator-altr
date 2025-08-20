import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "../features/calculator/calculatorSlice";
import Calculator from "../components/Calculator/Calculator";

const createTestStore = () => {
  return configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  });
};

describe("Calculator Flow Tests", () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it("should perform a basic calculation flow: 5 × 2 = 10", () => {
    render(
      <Provider store={store}>
        <Calculator />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "×" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));
    const display = screen.getByLabelText(/Calculator display/i);
    expect(display).toHaveTextContent("10");
  });

  it("should clear the calculation when AC is pressed", () => {
    render(
      <Provider store={store}>
        <Calculator />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "7" }));
    fireEvent.click(screen.getByRole("button", { name: "8" }));
    fireEvent.click(screen.getByRole("button", { name: "9" }));
    const display = screen.getByLabelText(/Calculator display/i);
    expect(display).toHaveTextContent("789");
    fireEvent.click(screen.getByRole("button", { name: "AC" }));
    expect(display).toHaveTextContent("0");
  });
});
