import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: "0",
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
  error: null,
};

const performCalculation = (prev, current, operation) => {
  const prevNum = parseFloat(prev);
  const currentNum = parseFloat(current);

  switch (operation) {
    case "+":
      return prevNum + currentNum;
    case "-":
      return prevNum - currentNum;
    case "×":
      return prevNum * currentNum;
    case "÷":
      if (currentNum === 0) {
        throw new Error("Cannot divide by zero");
      }
      return prevNum / currentNum;
    case "%":
      return prevNum * (currentNum / 100);
    default:
      return currentNum;
  }
};

const formatDisplayValue = (value) => {
  if (typeof value === "number") {
    if (
      Math.abs(value) > 999999999 ||
      (Math.abs(value) < 0.000001 && value !== 0)
    ) {
      return value.toExponential(6);
    }
    return parseFloat(value.toPrecision(10)).toString();
  }
  return value.toString();
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    inputNumber: (state, action) => {
      const digit = action.payload;
      state.error = null;
      if (state.display === "Error") {
        state.display = digit;
        state.waitingForNewValue = false;
        return;
      }

      if (state.waitingForNewValue) {
        state.display = digit;
        state.waitingForNewValue = false;
      } else {
        if (state.display === "0" && digit !== ".") {
          state.display = digit;
        } else {
          if (state.display.length < 15) {
            state.display = state.display + digit;
          }
        }
      }
    },

    inputDecimal: (state) => {
      state.error = null;

      // Reset if display shows error
      if (state.display === "Error") {
        state.display = "0.";
        state.waitingForNewValue = false;
        return;
      }

      if (state.waitingForNewValue) {
        state.display = "0.";
        state.waitingForNewValue = false;
      } else if (state.display.indexOf(".") === -1) {
        // Only add decimal if display length allows
        if (state.display.length < 14) {
          state.display = state.display + ".";
        }
      }
    },

    inputOperation: (state, action) => {
      const nextOperation = action.payload;
      const inputValue = parseFloat(state.display);

      state.error = null;

      // Handle error state
      if (state.display === "Error") {
        return;
      }

      // Validate input value
      if (isNaN(inputValue)) {
        state.error = "Invalid input";
        state.display = "Error";
        state.previousValue = null;
        state.operation = null;
        state.waitingForNewValue = true;
        return;
      }

      if (state.previousValue === null) {
        state.previousValue = inputValue;
      } else if (state.operation && !state.waitingForNewValue) {
        try {
          const result = performCalculation(
            state.previousValue,
            inputValue,
            state.operation
          );

          // Check for invalid results
          if (!isFinite(result)) {
            throw new Error("Result is too large");
          }

          state.display = formatDisplayValue(result);
          state.previousValue = result;
        } catch (error) {
          state.error = error.message;
          state.display = "Error";
          state.previousValue = null;
          state.operation = null;
          state.waitingForNewValue = true;
          return;
        }
      }

      state.waitingForNewValue = true;
      state.operation = nextOperation;
    },

    calculate: (state) => {
      const inputValue = parseFloat(state.display);

      // Handle error state
      if (state.display === "Error") {
        return;
      }

      // Validate input
      if (isNaN(inputValue)) {
        state.error = "Invalid input";
        state.display = "Error";
        state.previousValue = null;
        state.operation = null;
        state.waitingForNewValue = true;
        return;
      }

      if (state.previousValue !== null && state.operation) {
        try {
          const result = performCalculation(
            state.previousValue,
            inputValue,
            state.operation
          );

          // Check for invalid results
          if (!isFinite(result)) {
            throw new Error("Result is too large");
          }

          state.display = formatDisplayValue(result);
          state.previousValue = null;
          state.operation = null;
          state.waitingForNewValue = true;
          state.error = null;
        } catch (error) {
          state.error = error.message;
          state.display = "Error";
          state.previousValue = null;
          state.operation = null;
          state.waitingForNewValue = true;
        }
      }
    },

    clear: (state) => {
      Object.assign(state, initialState);
    },

    clearEntry: (state) => {
      state.display = "0";
      state.error = null;
    },

    backspace: (state) => {
      if (state.display.length > 1 && state.display !== "Error") {
        state.display = state.display.slice(0, -1);
      } else {
        state.display = "0";
      }
      state.error = null;
    },

    percent: (state) => {
      // Handle error state
      if (state.display === "Error") {
        return;
      }

      const currentValue = parseFloat(state.display);
      if (!isNaN(currentValue) && isFinite(currentValue)) {
        const result = currentValue / 100;
        if (isFinite(result)) {
          state.display = formatDisplayValue(result);
          state.error = null;
        } else {
          state.error = "Result is too large";
          state.display = "Error";
        }
      } else {
        state.error = "Invalid input";
        state.display = "Error";
      }
    },
  },
});

export const {
  inputNumber,
  inputDecimal,
  inputOperation,
  calculate,
  clear,
  clearEntry,
  backspace,
  percent,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
