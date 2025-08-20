import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useKeyboard from "../hooks/useKeyboard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer, {
  inputNumber,
  inputDecimal,
  inputOperation,
  calculate,
  clear,
  backspace,
  percent,
} from "../features/calculator/calculatorSlice";

vi.mock("../features/calculator/calculatorSlice", () => {
  return {
    inputNumber: vi.fn(() => ({ type: "calculator/inputNumber" })),
    inputDecimal: vi.fn(() => ({ type: "calculator/inputDecimal" })),
    inputOperation: vi.fn(() => ({ type: "calculator/inputOperation" })),
    calculate: vi.fn(() => ({ type: "calculator/calculate" })),
    clear: vi.fn(() => ({ type: "calculator/clear" })),
    backspace: vi.fn(() => ({ type: "calculator/backspace" })),
    percent: vi.fn(() => ({ type: "calculator/percent" })),
    default: () => ({}),
  };
});

describe("useKeyboard Hook", () => {
  let store;

  // Create a wrapper component with Redux Provider
  const wrapper = ({ children }) => {
    store = configureStore({
      reducer: {
        calculator: calculatorReducer,
      },
    });

    return <Provider store={store}>{children}</Provider>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should set up a keyboard event listener", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useKeyboard(), { wrapper });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should handle number keys correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    const event = new KeyboardEvent("keydown", { key: "5" });
    document.dispatchEvent(event);

    expect(inputNumber).toHaveBeenCalledWith("5");
  });

  it("should handle decimal key correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    const event = new KeyboardEvent("keydown", { key: "." });
    document.dispatchEvent(event);

    expect(inputDecimal).toHaveBeenCalled();
  });

  it("should handle operation keys correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "+" }));
    expect(inputOperation).toHaveBeenCalledWith("+");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "-" }));
    expect(inputOperation).toHaveBeenCalledWith("-");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "*" }));
    expect(inputOperation).toHaveBeenCalledWith("×");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
    expect(inputOperation).toHaveBeenCalledWith("÷");
  });

  it("should handle equals and Enter keys correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "=" }));
    expect(calculate).toHaveBeenCalled();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(calculate).toHaveBeenCalledTimes(2);
  });

  it("should handle clear keys correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(clear).toHaveBeenCalled();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "c" }));
    expect(clear).toHaveBeenCalledTimes(2);
  });

  it("should handle backspace key correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));

    expect(backspace).toHaveBeenCalled();
  });

  it("should handle percent key correctly", () => {
    renderHook(() => useKeyboard(), { wrapper });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "%" }));

    expect(percent).toHaveBeenCalled();
  });
});
