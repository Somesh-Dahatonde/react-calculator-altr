import { Card } from "react-bootstrap";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";
import useKeyboard from "../../hooks/useKeyboard";

const Calculator = () => {
  useKeyboard();

  return (
    <Card
      className="shadow border-0 mx-auto"
      role="application"
      aria-label="Calculator"
      style={{
        maxWidth: "320px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#2d2d2d",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Card.Body className="p-0" tabIndex={0}>
        <Display />
        <Keypad />
      </Card.Body>
    </Card>
  );
};

export default Calculator;
