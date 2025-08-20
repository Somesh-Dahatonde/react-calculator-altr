import { Card } from "react-bootstrap";
import { useAppSelector } from "../../hooks/hooks";
import { selectDisplayInfo } from "../../features/calculator/calculatorSelectors";

const Display = () => {
  const { display, error, hasError, isError } =
    useAppSelector(selectDisplayInfo);

  return (
    <Card className="border-0 rounded-0" style={{ backgroundColor: "#2d2d2d" }}>
      <Card.Body
        className="py-2 px-4 text-end"
        style={{
          minHeight: 64,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <output
          className={`fw-light ${isError ? "text-danger" : "text-white"}`}
          style={{
            display: "block",
            width: "100%",
            fontSize: "2.5rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.1,
            minHeight: 48,
          }}
          aria-live="polite"
          aria-label={
            hasError ? `Error: ${error}` : `Calculator display: ${display}`
          }
        >
          {display}
        </output>
        {hasError && (
          <div className="small text-danger" role="alert">
            {error}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Display;
