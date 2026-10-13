import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CircuitExplorerModal from "./CircuitExplorerModal";
import { CIRCUITS } from "../../data/circuits_data";

describe("CircuitExplorerModal Component", () => {
  const spaCircuit = CIRCUITS.find((c) => c.id === "spa")!;

  it("renders circuit identity, close button, and default initial turn selection", () => {
    const handleClose = vi.fn();
    render(<CircuitExplorerModal circuit={spaCircuit} onClose={handleClose} />);

    expect(screen.getByRole("dialog")).toBeDefined();
    expect(screen.getByRole("heading", { name: "Circuit de Spa-Francorchamps" })).toBeDefined();
    expect(screen.getByText("🇧🇪")).toBeDefined();
    expect(screen.getByText("Belgium")).toBeDefined();
    expect(screen.queryByText("The Art of Commitment")).toBeNull();

    // Default selection is Turn 1 (La Source) in Sector 1
    expect(screen.getByRole("heading", { name: "La Source" })).toBeDefined();
    expect(screen.getByText("Sector 1 — La Source to Kemmel Straight")).toBeDefined();
  });

  it("switches turns when clicking next/prev corner navigation buttons", () => {
    const handleClose = vi.fn();
    render(<CircuitExplorerModal circuit={spaCircuit} onClose={handleClose} />);

    // Initially on T1
    expect(screen.getByRole("heading", { name: "La Source" })).toBeDefined();

    // Click next corner -> should move to T2 (Eau Rouge)
    const nextBtn = screen.getByRole("button", { name: /Next corner/i });
    fireEvent.click(nextBtn);

    expect(screen.getByRole("heading", { name: "Eau Rouge" })).toBeDefined();

    // Click prev corner -> should return to T1 (La Source)
    const prevBtn = screen.getByRole("button", { name: /Previous corner/i });
    fireEvent.click(prevBtn);

    expect(screen.getByRole("heading", { name: "La Source" })).toBeDefined();
  });

  it("filters and highlights sectors when clicking sector toolbar tabs", () => {
    const handleClose = vi.fn();
    render(<CircuitExplorerModal circuit={spaCircuit} onClose={handleClose} />);

    // Click Sector 2
    const sector2Tab = screen.getByRole("button", { name: /^Sector 2$/i });
    fireEvent.click(sector2Tab);

    expect(screen.getByText("Sector 2 — The Ardennes Rollercoaster")).toBeDefined();

    // Click All Circuit
    const allTab = screen.getByRole("button", { name: /^All Circuit$/i });
    fireEvent.click(allTab);

    expect(allTab.getAttribute("aria-pressed")).toBe("true");
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(<CircuitExplorerModal circuit={spaCircuit} onClose={handleClose} />);

    const closeBtn = screen.getByRole("button", {
      name: /Close Circuit de Spa-Francorchamps/i,
    });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn();
    render(<CircuitExplorerModal circuit={spaCircuit} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
