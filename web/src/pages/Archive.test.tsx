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

vi.mock("./Teams", () => ({
  default: () => <div data-testid="teams-experience">Teams &amp; Dynasties Content</div>,
}));

describe("Archive Page Separation & Navigation", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("renders the archive title, intro, and all three destination navigation tabs", () => {
    render(<Archive />);

    expect(screen.getByText("The WEC Archive")).toBeDefined();
    expect(
      screen.getByText(
        /A user-driven exploration of the machines and circuits that defined the 2011–2023 era/i
      )
    ).toBeDefined();

    const machinesTab = screen.getByRole("tab", { name: /Machines/i });
    const tracksTab = screen.getByRole("tab", { name: /Tracks/i });
    const teamsTab = screen.getByRole("tab", { name: /Teams/i });

    expect(machinesTab).toBeDefined();
    expect(tracksTab).toBeDefined();
    expect(teamsTab).toBeDefined();
  });

  it("defaults to Machines tab and displays MachinesExperience", async () => {
    const { container } = render(<Archive />);

    const machinesTab = screen.getByRole("tab", { name: /Machines/i });
    const tracksTab = screen.getByRole("tab", { name: /Tracks/i });
    const teamsTab = screen.getByRole("tab", { name: /Teams/i });

    expect(machinesTab.getAttribute("aria-selected")).toBe("true");
    expect(tracksTab.getAttribute("aria-selected")).toBe("false");
    expect(teamsTab.getAttribute("aria-selected")).toBe("false");

    const machinesPanel = container.querySelector("#panel-machines")!;
    const paddockPanel = container.querySelector("#panel-paddock")!;
    const teamsPanel = container.querySelector("#panel-teams")!;

    expect(machinesPanel.hasAttribute("hidden")).toBe(false);
    expect(paddockPanel.hasAttribute("hidden")).toBe(true);
    expect(teamsPanel.hasAttribute("hidden")).toBe(true);

    expect(await screen.findByTestId("machines-experience")).toBeDefined();
  });

  it("switches to Tracks destination on click and updates hash", async () => {
    const { container } = render(<Archive />);

    const tracksTab = screen.getByRole("tab", { name: /Tracks/i });
    fireEvent.click(tracksTab);

    expect(tracksTab.getAttribute("aria-selected")).toBe("true");
    expect(window.location.hash).toBe("#paddock");

    const machinesPanel = container.querySelector("#panel-machines")!;
    const paddockPanel = container.querySelector("#panel-paddock")!;

    expect(machinesPanel.hasAttribute("hidden")).toBe(true);
    expect(paddockPanel.hasAttribute("hidden")).toBe(false);

    expect(await screen.findByTestId("circuit-guide")).toBeDefined();
  });

  it("switches to Teams destination on click and updates hash", async () => {
    const { container } = render(<Archive />);

    const teamsTab = screen.getByRole("tab", { name: /Teams/i });
    fireEvent.click(teamsTab);

    expect(teamsTab.getAttribute("aria-selected")).toBe("true");
    expect(window.location.hash).toBe("#teams");

    const machinesPanel = container.querySelector("#panel-machines")!;
    const teamsPanel = container.querySelector("#panel-teams")!;

    expect(machinesPanel.hasAttribute("hidden")).toBe(true);
    expect(teamsPanel.hasAttribute("hidden")).toBe(false);

    expect(await screen.findByTestId("teams-experience")).toBeDefined();
  });

  it("initializes directly to Tracks when window.location.hash is #paddock", async () => {
    window.location.hash = "#paddock";
    const { container } = render(<Archive />);

    const tracksTab = screen.getByRole("tab", { name: /Tracks/i });
    expect(tracksTab.getAttribute("aria-selected")).toBe("true");

    const paddockPanel = container.querySelector("#panel-paddock")!;
    expect(paddockPanel.hasAttribute("hidden")).toBe(false);

    expect(await screen.findByTestId("circuit-guide")).toBeDefined();
  });

  it("initializes directly to Teams when window.location.hash is #teams", async () => {
    window.location.hash = "#teams";
    const { container } = render(<Archive />);

    const teamsTab = screen.getByRole("tab", { name: /Teams/i });
    expect(teamsTab.getAttribute("aria-selected")).toBe("true");

    const teamsPanel = container.querySelector("#panel-teams")!;
    expect(teamsPanel.hasAttribute("hidden")).toBe(false);

    expect(await screen.findByTestId("teams-experience")).toBeDefined();
  });
});
