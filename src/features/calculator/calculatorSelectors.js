import { createSelector } from "reselect";

export const selectCalculatorState = (state) => state.calculator;
export const selectDisplay = (state) => state.calculator.display;
export const selectPreviousValue = (state) => state.calculator.previousValue;
export const selectOperation = (state) => state.calculator.operation;
export const selectWaitingForNewValue = (state) =>
  state.calculator.waitingForNewValue;
export const selectError = (state) => state.calculator.error;

export const selectHasError = createSelector(
  [selectError],
  (error) => error !== null
);

export const selectIsCalculating = createSelector(
  [selectPreviousValue, selectOperation],
  (previousValue, operation) => previousValue !== null && operation !== null
);

export const selectDisplayInfo = createSelector(
  [selectDisplay, selectError, selectHasError],
  (display, error, hasError) => ({
    display,
    error,
    hasError,
    isError: display === "Error",
  })
);

export const selectOperationState = createSelector(
  [selectOperation, selectPreviousValue, selectWaitingForNewValue],
  (operation, previousValue, waitingForNewValue) => ({
    operation,
    previousValue,
    waitingForNewValue,
    hasOperation: operation !== null,
    hasPreviousValue: previousValue !== null,
  })
);
