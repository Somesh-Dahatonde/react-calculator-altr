import Button from "../Button/Button";

const Keypad = () => {
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
