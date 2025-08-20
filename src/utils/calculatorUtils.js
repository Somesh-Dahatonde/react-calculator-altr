// Utility functions for calculator operations

export const isNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const isOperator = (value) => {
  return ["+", "-", "×", "÷"].includes(value);
};

export const formatNumber = (num) => {
  if (typeof num !== "number") return num;
  if (Math.abs(num) > 999999999 || (Math.abs(num) < 0.000001 && num !== 0)) {
    return num.toExponential(6);
  }

  return parseFloat(num.toPrecision(10)).toString();
};

export const validateInput = (input) => {
  const decimalCount = (input.match(/\./g) || []).length;
  return decimalCount <= 1;
};

export const keyMap = {
  // Numbers
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",

  // Operations
  "+": "+",
  "-": "-",
  "*": "×",
  x: "×",
  X: "×",
  "/": "÷",

  // Special keys
  Enter: "=",
  "=": "=",
  Escape: "AC",
  Delete: "AC",
  c: "AC",
  C: "AC",
  Backspace: "backspace",
  ".": ".",
  ",": ".",

  // Percent
  "%": "%",
};

export const getKeyAction = (key) => {
  return keyMap[key] || null;
};
