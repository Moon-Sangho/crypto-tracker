import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "@/components/loading-spinner";

describe("LoadingSpinner", () => {
  it("should render with default message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render with custom message", () => {
    render(<LoadingSpinner message="Fetching data..." />);
    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
  });

  it("should render without message when not provided", () => {
    render(<LoadingSpinner message="" />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should have loading spinner with correct size classes", () => {
    const { container: smallContainer } = render(
      <LoadingSpinner size="sm" message="" />
    );
    expect(smallContainer.querySelector(".w-6")).toBeInTheDocument();

    const { container: mediumContainer } = render(
      <LoadingSpinner size="md" message="" />
    );
    expect(mediumContainer.querySelector(".w-12")).toBeInTheDocument();

    const { container: largeContainer } = render(
      <LoadingSpinner size="lg" message="" />
    );
    expect(largeContainer.querySelector(".w-16")).toBeInTheDocument();
  });

  it("should have aria-label for accessibility", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByLabelText("Loading");
    expect(spinner).toBeInTheDocument();
  });
});
