import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Home from "@/pages/home";

describe("Home", () => {
  it("renders Home heading", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /cryptocurrency tracker/i })).toBeInTheDocument();
  });
});
