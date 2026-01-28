import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "@/components/search-bar";

describe("SearchBar", () => {
  it("should render with default placeholder", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Search cryptocurrencies/i);
    expect(input).toBeInTheDocument();
  });

  it("should render with custom placeholder", () => {
    render(<SearchBar onSearch={vi.fn()} placeholder="Find coins..." />);
    const input = screen.getByPlaceholderText("Find coins...");
    expect(input).toBeInTheDocument();
  });

  it("should update input value on typing", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Search cryptocurrencies/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "bitcoin" } });
    expect(input.value).toBe("bitcoin");
  });

  it("should call onSearch after debounce delay", async () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} debounceMs={300} />);
    const input = screen.getByPlaceholderText(/Search cryptocurrencies/i);

    fireEvent.change(input, { target: { value: "bitcoin" } });

    // Should not be called immediately
    expect(mockSearch).not.toHaveBeenCalled();

    // Should be called after debounce
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("bitcoin");
    });
  });

  it("should handle input value changes", async () => {
    render(<SearchBar onSearch={vi.fn()} debounceMs={50} />);
    const input = screen.getByPlaceholderText(/Search cryptocurrencies/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "bitcoin" } });
    expect(input.value).toBe("bitcoin");
  });

  it("should have search icon", () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />);
    expect(container.textContent).toContain("🔍");
  });

  it("should support custom debounce delay", async () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} debounceMs={100} />);
    const input = screen.getByPlaceholderText(/Search cryptocurrencies/i);

    fireEvent.change(input, { target: { value: "eth" } });

    // Wait for shorter debounce
    await waitFor(
      () => {
        expect(mockSearch).toHaveBeenCalledWith("eth");
      },
      { timeout: 200 }
    );
  });

  it("should have aria-label for accessibility", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByLabelText("Search cryptocurrencies");
    expect(input).toBeInTheDocument();
  });
});
