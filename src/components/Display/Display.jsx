import { Card } from "react-bootstrap";
import { useAppSelector } from "../../hooks/hooks";
import { selectDisplayInfo } from "../../features/calculator/calculatorSelectors";

const Display = () => {
  const { display, error, hasError, isError, history } =
    useAppSelector(selectDisplayInfo);

  return (
    <Card className="border-0 rounded-0" style={{ backgroundColor: "#2d2d2d" }}>
      <Card.Body
        className="py-2 px-4 text-end"
        style={{
          minHeight: 84,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: "4px",
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
          {history && (
            <div
              className="text-white-50 small"
              style={{
                minHeight: 20,
                marginBottom: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: "right",
              }}
            >
              {history}
            </div>
          )}

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
