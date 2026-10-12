import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Archive from "./Archive";

// Mock lazy-loaded child components
vi.mock("../components/archive/MachinesExperience", () => ({
  default: () => <div data-testid="machines-experience">Machines Experience Content</div>,
}));

vi.mock("../components/circuits/CircuitGuide", () => ({
  default: () => <div data-testid="circuit-guide">Circuit Guide Content</div>,
}));

describe("Archive Page Separation & Navigation", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("renders the archive title, intro, and destination navigation tabs", () => {
    render(<Archive />);

    expect(screen.getByText("The WEC Archive")).toBeDefined();
    expect(
      screen.getByText(
        /A user-driven exploration of the machines and circuits that defined the 2011–2023 era/i
      )
    ).toBeDefined();

    const machinesTab = screen.getByRole("tab", { name: /Machines/i });
    const paddockTab = screen.getByRole("tab", { name: /The Paddock/i });

    expect(machinesTab).toBeDefined();
    expect(paddockTab).toBeDefined();
  });

  it("defaults to Machines tab and displays MachinesExperience", async () => {
    const { container } = render(<Archive />);

    const machinesTab = screen.getByRole("tab", { name: /Machines/i });
    const paddockTab = screen.getByRole("tab", { name: /The Paddock/i });

    expect(machinesTab.getAttribute("aria-selected")).toBe("true");
    expect(paddockTab.getAttribute("aria-selected")).toBe("false");

    const machinesPanel = container.querySelector("#panel-machines")!;
    const paddockPanel = container.querySelector("#panel-paddock")!;

    expect(machinesPanel.hasAttribute("hidden")).toBe(false);
    expect(paddockPanel.hasAttribute("hidden")).toBe(true);

    expect(await screen.findByTestId("machines-experience")).toBeDefined();
  });

  it("switches to The Paddock destination on click and updates hash", async () => {
    const { container } = render(<Archive />);

    const paddockTab = screen.getByRole("tab", { name: /The Paddock/i });
    fireEvent.click(paddockTab);

    expect(paddockTab.getAttribute("aria-selected")).toBe("true");
    expect(window.location.hash).toBe("#paddock");

    const machinesPanel = container.querySelector("#panel-machines")!;
    const paddockPanel = container.querySelector("#panel-paddock")!;

    expect(machinesPanel.hasAttribute("hidden")).toBe(true);
    expect(paddockPanel.hasAttribute("hidden")).toBe(false);

    expect(await screen.findByTestId("circuit-guide")).toBeDefined();
  });

  it("initializes directly to The Paddock when window.location.hash is #paddock", async () => {
    window.location.hash = "#paddock";
    const { container } = render(<Archive />);

    const paddockTab = screen.getByRole("tab", { name: /The Paddock/i });
    expect(paddockTab.getAttribute("aria-selected")).toBe("true");

    const paddockPanel = container.querySelector("#panel-paddock")!;
    expect(paddockPanel.hasAttribute("hidden")).toBe(false);

    expect(await screen.findByTestId("circuit-guide")).toBeDefined();
  });
});
