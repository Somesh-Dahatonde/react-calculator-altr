import { describe, it, expect } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import KeyboardHelp from "../components/KeyboardHelp/KeyboardHelp";

describe("KeyboardHelp Component", () => {
  it("closes the modal when close button is clicked", async () => {
    render(<KeyboardHelp />);
    fireEvent.click(
      screen.getByRole("button", { name: /keyboard shortcuts/i })
    );
    const modal = screen.getByRole("dialog");
    const closeButton = within(modal).getByLabelText(/close/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /keyboard shortcuts/i })
      ).not.toBeInTheDocument();
    });
  });

  it("closes the modal when clicking outside", async () => {
    render(<KeyboardHelp />);
    fireEvent.click(
      screen.getByRole("button", { name: /keyboard shortcuts/i })
    );
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog, { target: dialog });

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /keyboard shortcuts/i })
      ).not.toBeInTheDocument();
    });
  });
});
