import { Container, Row, Col } from "react-bootstrap";
import Calculator from "./components/Calculator/Calculator";
import KeyboardHelp from "./components/KeyboardHelp/KeyboardHelp";

function App() {
  // Apply dark theme using Bootstrap classes
  return (
    <div
      className="bg-dark min-vh-100 d-flex align-items-center text-white"
      style={{
        background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)",
      }}
    >
      <Container className="py-4 text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h1 className="mb-4 fw-light">React Redux Calculator</h1>
            <Calculator />
            <KeyboardHelp />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
