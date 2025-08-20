import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  inputNumber,
  inputDecimal,
  inputOperation,
  calculate,
  clear,
  clearEntry,
  backspace,
  percent,
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

  const handleEqualsClick = useCallback(() => {
    dispatch(calculate());
  }, [dispatch]);

  const handleClearClick = useCallback(() => {
    dispatch(clear());
  }, [dispatch]);

  const handleClearEntryClick = useCallback(() => {
    dispatch(clearEntry());
  }, [dispatch]);

  const handleDecimalClick = useCallback(() => {
    dispatch(inputDecimal());
  }, [dispatch]);

  // const handleBackspaceClick = useCallback(() => {
  //   dispatch(backspace());
  // }, [dispatch]);

  const handlePercentClick = useCallback(() => {
    dispatch(percent());
  }, [dispatch]);

  return (
    <div className="p-2" style={{ backgroundColor: "#2d2d2d" }}>
      <div className="d-flex justify-content-between mb-2">
        <Button
          variant="function"
          onClick={handleClearClick}
          aria-label="All Clear"
        >
          AC
        </Button>
        <Button
          variant="function"
          onClick={handleClearEntryClick}
          aria-label="Clear Entry"
        >
          CE
        </Button>
        <Button
          variant="function"
          onClick={handlePercentClick}
          aria-label="Percent"
        >
          %
        </Button>
        <Button
          variant="operation"
          onClick={() => handleOperationClick("÷")}
          active={currentOperation === "÷"}
          aria-label="Divide"
        >
          ÷
        </Button>
      </div>
      <div className="d-flex justify-content-between mb-2">
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
          aria-label="Multiply"
        >
          ×
        </Button>
      </div>
      <div className="d-flex justify-content-between mb-2">
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
          aria-label="Subtract"
        >
          -
        </Button>
      </div>
      <div className="d-flex justify-content-between mb-2">
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
          aria-label="Add"
        >
          +
        </Button>
      </div>
      <div className="d-flex justify-content-between">
        <Button
          variant="digit"
          size="wide"
          onClick={() => handleNumberClick("0")}
        >
          0
        </Button>
        <Button
          variant="digit"
          onClick={handleDecimalClick}
          aria-label="Decimal point"
        >
          .
        </Button>
        <Button
          variant="equals"
          onClick={handleEqualsClick}
          aria-label="Equals"
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Keypad;
