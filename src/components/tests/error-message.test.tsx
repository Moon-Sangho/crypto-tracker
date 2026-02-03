import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "@/components/error-message";

describe("ErrorMessage", () => {
  it("should render with default message", () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("should render with custom message", () => {
    render(<ErrorMessage message="Network error occurred" />);
    expect(screen.getByText("Network error occurred")).toBeInTheDocument();
  });

  it("should display button element when handler provided", () => {
    const mockHandler = vi.fn();
    const { container } = render(<ErrorMessage onRetry={mockHandler} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should not show retry button when handler not provided", () => {
    render(<ErrorMessage />);
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });

  it("should have proper role for accessibility", () => {
    render(<ErrorMessage />);
    const errorDiv = screen.getByRole("alert");
    expect(errorDiv).toBeInTheDocument();
  });

  it("should display warning icon", () => {
    const { container } = render(<ErrorMessage />);
    expect(container.textContent).toContain("⚠️");
  });
});
