import { useGLTF } from "@react-three/drei";

// Dedicated preloader utility so MachineModel only exports components (Fast Refresh compliant)
export function preloadMachineModel(path: string) {
  if (path) {
    try {
      useGLTF.preload(path);
    } catch {
      // Ignore prefetch failures
    }
  }
}
