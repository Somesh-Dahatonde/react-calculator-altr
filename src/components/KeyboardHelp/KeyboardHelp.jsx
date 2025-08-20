import React, { useState, memo, useCallback } from "react";
import { Button, Modal, Table } from "react-bootstrap";

const KeyboardHelp = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const shortcuts = [
    { key: "0-9", description: "Number input" },
    { key: "+, -, *, /", description: "Basic operations" },
    { key: ".", description: "Decimal point" },
    { key: "Enter or =", description: "Calculate result" },
    { key: "Escape or C", description: "Clear all" },
    { key: "Backspace", description: "Delete last digit" },
    { key: "%", description: "Percent" },
  ];

  return (
    <>
      <Button
        variant="outline-secondary"
        className="mt-3"
        size="sm"
        onClick={handleOpen}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts"
      >
        Keyboard Shortcuts
      </Button>

      <Modal show={isOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* ✅ Force semantic heading */}
          <Modal.Title as="h4">Keyboard Shortcuts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Key</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut, index) => (
                <tr key={index}>
                  <td>
                    <code>{shortcut.key}</code>
                  </td>
                  <td>{shortcut.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

KeyboardHelp.displayName = "KeyboardHelp";

export default KeyboardHelp;
