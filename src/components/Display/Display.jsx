import { Card } from "react-bootstrap";

const Display = () => {
  return (
    <Card className="border-0 rounded-0" style={{ backgroundColor: "#2d2d2d" }}>
      <Card.Body className="py-3 px-3 text-end">
        <output
          className={`fs-1 fw-light text-white`}
          style={{
            display: "block",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          aria-live="polite"
        >
          {0}
        </output>
      </Card.Body>
    </Card>
  );
};

export default Display;
