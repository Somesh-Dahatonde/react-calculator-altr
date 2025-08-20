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
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#2d2d2d",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Mac window bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "18px 0 10px 18px",
          background: "transparent",
          height: "32px",
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#ff5f56",
            display: "inline-block",
            border: "1.5px solid #222",
          }}
        />
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#ffbd2e",
            display: "inline-block",
            border: "1.5px solid #222",
          }}
        />
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#27c93f",
            display: "inline-block",
            border: "1.5px solid #222",
          }}
        />
      </div>
      <Card.Body className="p-0" tabIndex={0}>
        <Display />
        <Keypad />
      </Card.Body>
    </Card>
  );
};

export default Calculator;
