import { describe, it, expect, beforeEach, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer, {
  inputNumber,
  inputOperation,
} from "./calculatorSlice";
import { selectDisplayInfo, selectOperationState } from "./calculatorSelectors";
import Calculator from "../../components/Calculator/Calculator";

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  });
};

describe("Performance Optimizations", () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  test("selectors should be memoized and not recompute unnecessarily", () => {
    const state1 = {
      calculator: {
        display: "5",
        error: null,
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
      },
    };

    const state2 = {
      calculator: {
        display: "5",
        error: null,
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
      },
    };

    // Same state should return same reference (memoized)
    const result1 = selectDisplayInfo(state1);
    const result2 = selectDisplayInfo(state2);

    expect(result1).toBe(result2); // Same reference due to memoization
  });

  test("selectors should recompute when relevant state changes", () => {
    const state1 = {
      calculator: {
        display: "5",
        error: null,
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
      },
    };

    const state2 = {
      calculator: {
        display: "10", // Changed
        error: null,
        previousValue: null,
        operation: null,
        waitingForNewValue: false,
      },
    };

    const result1 = selectDisplayInfo(state1);
    const result2 = selectDisplayInfo(state2);

    expect(result1).not.toBe(result2); // Different reference due to change
    expect(result1.display).toBe("5");
    expect(result2.display).toBe("10");
  });

  test("operation state selector should work correctly", () => {
    const state = {
      calculator: {
        display: "5",
        error: null,
        previousValue: 10,
        operation: "+",
        waitingForNewValue: true,
      },
    };

    const result = selectOperationState(state);

    expect(result).toEqual({
      operation: "+",
      previousValue: 10,
      waitingForNewValue: true,
      hasOperation: true,
      hasPreviousValue: true,
    });
  });

  test("Calculator component should render without performance issues", () => {
    const TestWrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { rerender } = render(
      <TestWrapper>
        <Calculator />
      </TestWrapper>
    );

    // Initial render
    expect(screen.getByRole("application")).toBeInTheDocument();
    expect(screen.getByLabelText(/Calculator display/i)).toBeInTheDocument();

    // Dispatch some actions
    store.dispatch(inputNumber("5"));
    store.dispatch(inputOperation("+"));
    store.dispatch(inputNumber("3"));

    // Re-render should work smoothly
    rerender(
      <TestWrapper>
        <Calculator />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/Calculator display: 3/)).toBeInTheDocument();
  });

  test("Multiple rapid state changes should not cause performance issues", () => {
    const startTime = performance.now();

    // Simulate rapid state changes
    for (let i = 0; i < 100; i++) {
      store.dispatch(inputNumber(String(i % 10)));
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete within reasonable time (less than 100ms)
    expect(duration).toBeLessThan(100);
  });
});
