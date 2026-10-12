import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CircuitGuide from "./CircuitGuide";

// Mock framer-motion to simplify DOM testing in jsdom
vi.mock("framer-motion", () => ({
  m: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    path: (props: any) => <path {...props} />,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    circle: (props: any) => <circle {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("CircuitGuide Component", () => {
  it("renders the section heading and supporting copy", () => {
    render(<CircuitGuide />);

    expect(screen.getByText("Four Tracks. Four Challenges.")).toBeDefined();
    expect(
      screen.getByText(
        "Every circuit tells a different story of endurance, precision, and performance."
      )
    ).toBeDefined();
  });

  it("renders all four circuit cards with country flags, country names, and exploration buttons", () => {
    render(<CircuitGuide />);

    expect(screen.getByText("Circuit de la Sarthe")).toBeDefined();
    expect(screen.getByText("Circuit de Spa-Francorchamps")).toBeDefined();
    expect(screen.getByText("Autodromo Enzo e Dino Ferrari")).toBeDefined();
    expect(screen.getByText("Fuji Speedway")).toBeDefined();

    // Verify country flags and country names are rendered
    expect(screen.getByText("🇫🇷")).toBeDefined();
    expect(screen.getByText("France")).toBeDefined();
    expect(screen.getByText("🇧🇪")).toBeDefined();
    expect(screen.getByText("Belgium")).toBeDefined();
    expect(screen.getByText("🇮🇹")).toBeDefined();
    expect(screen.getByText("Italy")).toBeDefined();
    expect(screen.getByText("🇯🇵")).toBeDefined();
    expect(screen.getByText("Japan")).toBeDefined();

    // Verify subjective editorial taglines have been removed
    expect(screen.queryByText("The Ultimate Endurance Test")).toBeNull();
    expect(screen.queryByText("The Art of Commitment")).toBeNull();
    expect(screen.queryByText("Racing in Italy")).toBeNull();
    expect(screen.queryByText("The Pursuit of Reliability")).toBeNull();

    const exploreButtons = screen.getAllByRole("button", { name: /Explore/i });
    expect(exploreButtons).toHaveLength(4);
  });

  it("opens the circuit explorer modal when clicking an explore button and closes on close button click", () => {
    render(<CircuitGuide />);

    // Click to explore Spa
    const spaBtn = screen.getByRole("button", {
      name: /Explore Circuit de Spa-Francorchamps/i,
    });
    fireEvent.click(spaBtn);

    // Modal should be open
    expect(screen.getByRole("dialog")).toBeDefined();
    expect(screen.getAllByText("🇧🇪").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Belgium").length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("The Art of Commitment")).toBeNull();
    expect(screen.getByText(/La Source to Kemmel Straight/i)).toBeDefined();
    expect(screen.getByText("La Source")).toBeDefined();

    // Close button
    const closeBtn = screen.getByRole("button", {
      name: /Close Circuit de Spa-Francorchamps/i,
    });
    fireEvent.click(closeBtn);

    // Modal should be closed
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
