import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "./About";

describe("About Page", () => {
  it("renders author academic background and student status", () => {
    render(<About />);
    expect(screen.getByText(/BINUS University/i)).toBeDefined();
    expect(screen.getByRole("heading", { name: /Data Science Student/i })).toBeDefined();
  });

  it("renders F1 to endurance crossover drivers", () => {
    render(<About />);
    expect(screen.getByText(/Nico Hülkenberg/i)).toBeDefined();
    expect(screen.getByText(/Fernando Alonso/i)).toBeDefined();
    expect(screen.getByText(/Robert Kubica/i)).toBeDefined();
    expect(screen.getByText(/Nyck de Vries/i)).toBeDefined();
  });

  it("renders transparent scope boundaries (2011-2023, not 2026)", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: /Dataset Coverage & Methodological Transparency/i })
    ).toBeDefined();
    expect(screen.getByText(/2011 24 Hours of Le Mans/i)).toBeDefined();
    expect(screen.getByText(/2023 Bahrain 8 Hours/i)).toBeDefined();
    expect(
      screen.getByText((content) => content.includes("2024–2026 seasons"))
    ).toBeDefined();
  });
});
