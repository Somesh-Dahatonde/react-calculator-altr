import { describe, it, expect, beforeEach, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer, {
  inputNumber,
  inputDecimal,
  inputOperation,
  calculate,
  clear,
  percent,
  backspace,
  clearEntry,
} from "./calculatorSlice";

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  });
};

describe("Calculator Edge Cases", () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  test("should handle divide by zero", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("÷"));
    store.dispatch(inputNumber("0"));
    store.dispatch(calculate());

    const state = store.getState().calculator;
    expect(state.display).toBe("Error");
    expect(state.error).toBe("Cannot divide by zero");
  });

  test("should prevent leading zeros", () => {
    store.dispatch(inputNumber("0"));
    store.dispatch(inputNumber("0"));
    store.dispatch(inputNumber("5"));

    const state = store.getState().calculator;
    expect(state.display).toBe("5");
  });

  test("should handle decimal input correctly", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputDecimal());
    store.dispatch(inputDecimal()); // Second decimal should be ignored
    store.dispatch(inputNumber("2"));

    const state = store.getState().calculator;
    expect(state.display).toBe("5.2");
  });

  test("should limit display length", () => {
    // Input a very long number
    for (let i = 0; i < 20; i++) {
      store.dispatch(inputNumber("9"));
    }

    const state = store.getState().calculator;
    expect(state.display.length).toBeLessThanOrEqual(15);
  });

  test("should handle percent operation", () => {
    store.dispatch(inputNumber("50"));
    store.dispatch(percent());

    const state = store.getState().calculator;
    expect(state.display).toBe("0.5");
  });

  test("should handle sequential operations", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("3"));
    store.dispatch(inputOperation("×"));
    store.dispatch(inputNumber("2"));
    store.dispatch(calculate());

    const state = store.getState().calculator;
    expect(state.display).toBe("16"); // (5 + 3) × 2 = 16
  });

  test("should clear all state", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("3"));
    store.dispatch(clear());

    const state = store.getState().calculator;
    expect(state.display).toBe("0");
    expect(state.previousValue).toBe(null);
    expect(state.operation).toBe(null);
    expect(state.error).toBe(null);
  });

  test("should recover from error state", () => {
    // Create error state
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("÷"));
    store.dispatch(inputNumber("0"));
    store.dispatch(calculate());

    expect(store.getState().calculator.display).toBe("Error");

    // Should recover when inputting new number
    store.dispatch(inputNumber("7"));

    const state = store.getState().calculator;
    expect(state.display).toBe("7");
    expect(state.error).toBe(null);
  });
});

// Add additional test suite to improve coverage
describe("Calculator Additional Tests", () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  test("should handle backspace correctly", () => {
    store.dispatch(inputNumber("1"));
    store.dispatch(inputNumber("2"));
    store.dispatch(inputNumber("3"));
    store.dispatch(backspace());

    const state = store.getState().calculator;
    expect(state.display).toBe("12");

    // Test backspace on a single digit
    store.dispatch(backspace());
    store.dispatch(backspace());

    const newState = store.getState().calculator;
    expect(newState.display).toBe("0");

    // Test backspace on decimal
    store.dispatch(inputNumber("5"));
    store.dispatch(inputDecimal());
    store.dispatch(inputNumber("6"));
    store.dispatch(backspace());

    const decimalState = store.getState().calculator;
    expect(decimalState.display).toBe("5.");
  });

  test("should handle clearEntry correctly", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("3"));
    store.dispatch(clearEntry());

    const state = store.getState().calculator;
    expect(state.display).toBe("0");
    expect(state.previousValue).toBe(5); // Previous value should be preserved
    expect(state.operation).toBe("+"); // Operation should be preserved
  });

  test("should toggle sign with +/- button", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(clearEntry()); // clearEntry is also used for +/- functionality

    const state = store.getState().calculator;
    expect(state.display).toBe("-5");

    store.dispatch(clearEntry()); // Toggle again
    const toggledState = store.getState().calculator;
    expect(toggledState.display).toBe("5");
  });

  test("should handle multiple decimal inputs correctly", () => {
    store.dispatch(inputNumber("0"));
    store.dispatch(inputDecimal());
    store.dispatch(inputNumber("5"));

    const state = store.getState().calculator;
    expect(state.display).toBe("0.5");

    // Start new calculation
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("1"));
    store.dispatch(inputDecimal());
    store.dispatch(inputNumber("5"));
    store.dispatch(calculate());

    const resultState = store.getState().calculator;
    expect(resultState.display).toBe("2");
  });

  test("should handle direct operation input", () => {
    // When user starts with an operation, it should use 0 as first operand
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("5"));
    store.dispatch(calculate());

    const state = store.getState().calculator;
    expect(state.display).toBe("5");
  });

  test("should handle calculation with same operation repeatedly", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("5"));
    store.dispatch(calculate()); // 5 + 5 = 10

    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("2"));
    store.dispatch(calculate()); // 10 + 2 = 12

    const state = store.getState().calculator;
    expect(state.display).toBe("12");
  });

  test("should handle direct equals press", () => {
    // When = is pressed with no operation, it should do nothing
    store.dispatch(calculate());

    const state = store.getState().calculator;
    expect(state.display).toBe("0");
  });

  test("should handle repeated equals press", () => {
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("3"));
    store.dispatch(calculate()); // 5 + 3 = 8

    store.dispatch(calculate()); // Repeat the last operation: 8 + 3 = 11

    const state = store.getState().calculator;
    expect(state.display).toBe("11");
  });
});
