import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MachineModel from "./MachineModel";

import * as THREE from "three";

// Mock @react-three/fiber and @react-three/drei for jsdom testing
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="three-canvas">{children}</div>,
  useThree: () => ({
    camera: {
      position: { copy: vi.fn(), clone: () => ({ lerpVectors: vi.fn() }) },
      lookAt: vi.fn(),
    },
    invalidate: vi.fn(),
  }),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  useGLTF: () => ({
    scene: new THREE.Group(),
  }),
  Environment: () => null,
}));

describe("MachineModel Component", () => {
  const dummyAttribution = {
    label: "Test Prototype (2018)",
    title: "Test Prototype",
    creator: "Modeler",
    creatorUrl: "https://example.com/user",
    sourceUrl: "https://example.com/model",
    license: "CC BY 4.0",
    licenseUrl: "https://example.com/license",
  };

  it("renders the canvas container and attribution", () => {
    render(<MachineModel path="/test.glb" attribution={dummyAttribution} />);

    expect(screen.getByText("Test Prototype (2018)")).toBeDefined();
    expect(screen.getByText("Drag to rotate • Scroll to zoom")).toBeDefined();
  });

  it("renders the Reset 3D View button with accessible name", () => {
    render(<MachineModel path="/test.glb" attribution={dummyAttribution} />);

    const resetBtn = screen.getByRole("button", { name: "Reset 3D View" });
    expect(resetBtn).toBeDefined();
    expect(resetBtn.getAttribute("title")).toBe("Reset 3D View");
  });

  it("triggers view reset on click without error", () => {
    render(<MachineModel path="/test.glb" attribution={dummyAttribution} />);

    const resetBtn = screen.getByRole("button", { name: "Reset 3D View" });
    fireEvent.click(resetBtn);
    // Button remains operable for repeated resets
    fireEvent.click(resetBtn);
    expect(resetBtn).toBeDefined();
  });
});
