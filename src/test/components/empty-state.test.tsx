import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/components/empty-state";

describe("EmptyState", () => {
  it("should render with default title and message", () => {
    render(<EmptyState />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search/i)).toBeInTheDocument();
  });

  it("should render with custom title and message", () => {
    render(
      <EmptyState
        title="No favorites"
        message="Add coins to your favorites to see them here"
      />
    );
    expect(screen.getByText("No favorites")).toBeInTheDocument();
    expect(screen.getByText(/Add coins to your favorites/i)).toBeInTheDocument();
  });

  it("should render custom icon", () => {
    const { container } = render(<EmptyState icon="📭" />);
    expect(container.textContent).toContain("📭");
  });

  it("should display action button when provided", () => {
    const mockHandler = vi.fn();
    render(
      <EmptyState
        action={{ label: "Browse Coins", onClick: mockHandler }}
      />
    );
    const btn = screen.getByRole("button", { name: "Browse Coins" });
    expect(btn).toBeInTheDocument();
  });

  it("should call action handler when button clicked", () => {
    const mockHandler = vi.fn();
    render(
      <EmptyState
        action={{ label: "Retry", onClick: mockHandler }}
      />
    );
    const btn = screen.getByRole("button", { name: "Retry" });
    btn.click();
    expect(mockHandler).toHaveBeenCalled();
  });

  it("should not display button when action not provided", () => {
    render(<EmptyState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should display default search icon", () => {
    const { container } = render(<EmptyState />);
    expect(container.textContent).toContain("🔍");
  });
});
