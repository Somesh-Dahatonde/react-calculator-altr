import { describe, it, expect } from "vitest";
import {
  isNumber,
  isOperator,
  formatNumber,
  validateInput,
  getKeyAction,
} from "../utils/calculatorUtils";

describe("Calculator Utility Functions", () => {
  describe("isNumber function", () => {
    it("should return true for valid numbers", () => {
      expect(isNumber("123")).toBe(true);
      expect(isNumber("0")).toBe(true);
      expect(isNumber("0.5")).toBe(true);
      expect(isNumber("-123")).toBe(true);
      expect(isNumber(123)).toBe(true);
    });

    it("should return false for non-numbers", () => {
      expect(isNumber("abc")).toBe(false);
      expect(isNumber("")).toBe(false);
      expect(isNumber("+")).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe("isOperator function", () => {
    it("should return true for valid operators", () => {
      expect(isOperator("+")).toBe(true);
      expect(isOperator("-")).toBe(true);
      expect(isOperator("×")).toBe(true);
      expect(isOperator("÷")).toBe(true);
    });

    it("should return false for non-operators", () => {
      expect(isOperator("*")).toBe(false);
      expect(isOperator("/")).toBe(false);
      expect(isOperator("=")).toBe(false);
      expect(isOperator("123")).toBe(false);
      expect(isOperator("")).toBe(false);
    });
  });

  describe("formatNumber function", () => {
    it("should properly format regular numbers", () => {
      expect(formatNumber(123)).toBe("123");
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(0.5)).toBe("0.5");
      expect(formatNumber(-123)).toBe("-123");
    });

    it("should convert very large or small numbers to exponential notation", () => {
      expect(formatNumber(1000000000)).toMatch(/^1(\.0+)?e\+9$/);
      expect(formatNumber(0.0000001)).toMatch(/^1(\.0+)?e-7$/);
    });

    it("should handle non-number inputs", () => {
      expect(formatNumber("abc")).toBe("abc");
      expect(formatNumber(null)).toBe(null);
      expect(formatNumber(undefined)).toBe(undefined);
    });

    it("should handle floating point precision issues", () => {
      expect(formatNumber(0.1 + 0.2)).toBe("0.3");
      expect(formatNumber(0.3 - 0.1)).toBe("0.2");
    });
  });

  describe("validateInput function", () => {
    it("should validate inputs with no decimal points", () => {
      expect(validateInput("123")).toBe(true);
      expect(validateInput("0")).toBe(true);
    });

    it("should validate inputs with one decimal point", () => {
      expect(validateInput("123.45")).toBe(true);
      expect(validateInput("0.5")).toBe(true);
    });

    it("should invalidate inputs with multiple decimal points", () => {
      expect(validateInput("123.45.6")).toBe(false);
      expect(validateInput("0.5.1")).toBe(false);
    });
  });

  describe("getKeyAction function", () => {
    it("should map number keys correctly", () => {
      expect(getKeyAction("0")).toBe("0");
      expect(getKeyAction("5")).toBe("5");
      expect(getKeyAction("9")).toBe("9");
    });

    it("should map operation keys correctly", () => {
      expect(getKeyAction("+")).toBe("+");
      expect(getKeyAction("-")).toBe("-");
      expect(getKeyAction("*")).toBe("×");
      expect(getKeyAction("/")).toBe("÷");
    });

    it("should map special keys correctly", () => {
      expect(getKeyAction("Enter")).toBe("=");
      expect(getKeyAction("=")).toBe("=");
      expect(getKeyAction("Escape")).toBe("AC");
      expect(getKeyAction("c")).toBe("AC");
      expect(getKeyAction("C")).toBe("AC");
      expect(getKeyAction("Backspace")).toBe("backspace");
      expect(getKeyAction(".")).toBe(".");
    });

    it("should return null for unmapped keys", () => {
      expect(getKeyAction("a")).toBe(null);
      expect(getKeyAction("F1")).toBe(null);
      expect(getKeyAction("Tab")).toBe(null);
    });
  });
});
