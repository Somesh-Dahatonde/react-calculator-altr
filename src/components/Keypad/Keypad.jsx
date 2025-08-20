import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  inputNumber,
  inputDecimal,
  inputOperation,
  calculate,
  clear,
  clearEntry,
  percent,
  toggleSign,
} from "../../features/calculator/calculatorSlice";
import { selectOperation } from "../../features/calculator/calculatorSelectors";
import Button from "../Button/Button";
import { useCallback } from "react";

const Keypad = () => {
  const dispatch = useAppDispatch();
  const currentOperation = useAppSelector(selectOperation);

  const handleNumberClick = useCallback(
    (value) => {
      dispatch(inputNumber(value));
    },
    [dispatch]
  );

  const handleOperationClick = useCallback(
    (operation) => {
      dispatch(inputOperation(operation));
    },
    [dispatch]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // 4 equal cols
        gap: "1px", // thin borders between buttons
        backgroundColor: "#2d2d2d", // border color effect
      }}
    >
      {/* Top row */}
      <Button variant="function" onClick={() => dispatch(clear())}>
        AC
      </Button>
      <Button variant="function" onClick={() => dispatch(toggleSign())}>
        +/−
      </Button>
      <Button variant="function" onClick={() => dispatch(percent())}>
        %
      </Button>
      <Button
        variant="operation"
        onClick={() => handleOperationClick("÷")}
        active={currentOperation === "÷"}
      >
        ÷
      </Button>

      {/* Second row */}
      <Button variant="digit" onClick={() => handleNumberClick("7")}>
        7
      </Button>
      <Button variant="digit" onClick={() => handleNumberClick("8")}>
        8
      </Button>
      <Button variant="digit" onClick={() => handleNumberClick("9")}>
        9
      </Button>
      <Button
        variant="operation"
        onClick={() => handleOperationClick("×")}
        active={currentOperation === "×"}
      >
        ×
      </Button>

      {/* Third row */}
      <Button variant="digit" onClick={() => handleNumberClick("4")}>
        4
      </Button>
      <Button variant="digit" onClick={() => handleNumberClick("5")}>
        5
      </Button>
      <Button variant="digit" onClick={() => handleNumberClick("6")}>
        6
      </Button>
      <Button
        variant="operation"
        onClick={() => handleOperationClick("-")}
        active={currentOperation === "-"}
      >
        −
      </Button>

      {/* Fourth row */}
      <Button variant="digit" onClick={() => handleNumberClick("1")}>
        1
      </Button>
      <Button variant="digit" onClick={() => handleNumberClick("2")}>
        2
      </Button>
      <Button variant="digit" onClick={() => handleNumberClick("3")}>
        3
      </Button>
      <Button
        variant="operation"
        onClick={() => handleOperationClick("+")}
        active={currentOperation === "+"}
      >
        +
      </Button>

      {/* Bottom row */}
      <Button
        variant="digit"
        spanValue={"span 2"}
        onClick={() => handleNumberClick("0")}
      >
        0
      </Button>
      <Button variant="digit" onClick={() => dispatch(inputDecimal())}>
        .
      </Button>
      <Button variant="equals" onClick={() => dispatch(calculate())}>
        =
      </Button>
    </div>
  );
};

export default Keypad;
