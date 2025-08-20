import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import {
  inputNumber,
  inputDecimal,
  inputOperation,
  calculate,
  clear,
  backspace,
  percent,
} from "../features/calculator/calculatorSlice";
import { getKeyAction } from "../utils/calculatorUtils";

export const useKeyboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      const action = getKeyAction(key);

      if (action) {
        event.preventDefault();

        if (/^[0-9]$/.test(action)) {
          dispatch(inputNumber(action));
        } else if (action === ".") {
          dispatch(inputDecimal());
        } else if (["+", "-", "×", "÷"].includes(action)) {
          dispatch(inputOperation(action));
        } else if (action === "=") {
          dispatch(calculate());
        } else if (action === "AC") {
          dispatch(clear());
        } else if (action === "backspace") {
          dispatch(backspace());
        } else if (action === "%") {
          dispatch(percent());
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);
};

export default useKeyboard;
