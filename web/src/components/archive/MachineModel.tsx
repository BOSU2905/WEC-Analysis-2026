import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import styles from "./MachineModel.module.css";

// The model component using useGLTF to load the glb
function CarModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  // Clone the scene so we don't mutate the cached GLTF object, fixing the React immutability warning
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    // 1. Traverse and configure materials/shadows
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Fix for Porsche 911 RSR left wheel rendering defect:
        // Diagnosis: The left wheel nodes (e.g., LOD_A_BRAKE_CALIPER_FRONT_LEFT) have a negative
        // determinant in their transform matrices, meaning the geometry was mirrored. Because
        // the material is shared with the right wheel, Three.js cannot automatically assign BackSide
        // without breaking the right wheel. The left wheel ends up front-face culled.
        // Fix: Clone the material for mirrored meshes and set DoubleSide.
        if (path.includes("2018_porsche_911_rsr")) {
          child.updateMatrixWorld(true);
          if (child.matrixWorld.determinant() < 0) {
            child.material = child.material.clone();
            child.material.side = THREE.DoubleSide;
          }
        }

        // Fix for Porsche 919 Hybrid (2015) black spots and headlights:
        // Diagnosis 1 (Shadow Acne & Backfaces): Double-sided materials on thin car body panels
        // cause self-shadowing precision artifacts when rendered with directional light shadows.
        // Fix: Use single-sided front face rendering for exterior body panels and set shadow normal bias.
        // Diagnosis 2 (Z-fighting): The main livery (material 'material') geometrically overlaps
        // the chassis underbody ('.001'), causing Z-fighting (black spots).
        // Fix: Clone material, apply negative polygonOffset (-2, -4) to bring livery forward.
        // Diagnosis 3 (Headlights): The glass cover ('.003') was opaque dark gray, and internal LEDs
        // ('Vehicle_Exterior_mm_lights') had black base color.
        // Fix: Glass made transparent; LEDs given authentic bright white emissive tint.
        if (path.includes("porsche_919_hybrid_2015")) {
          if (child.material) {
            const m = child.material as THREE.MeshStandardMaterial;
            const mName = m.name;
            if (mName === ".003") {
              child.material = m.clone();
              const glassMat = child.material as THREE.MeshStandardMaterial;
              glassMat.transparent = true;
              glassMat.opacity = 0.25;
              glassMat.roughness = 0.05;
              glassMat.metalness = 0.2;
              glassMat.depthWrite = false;
            } else if (mName === "material") {
              child.material = m.clone();
              const bodyMat = child.material as THREE.MeshStandardMaterial;
              bodyMat.polygonOffset = true;
              bodyMat.polygonOffsetFactor = -2;
              bodyMat.polygonOffsetUnits = -4;
              bodyMat.side = THREE.FrontSide;
            } else if (mName === "Vehicle_Exterior_mm_lights") {
              child.material = m.clone();
              const ledMat = child.material as THREE.MeshStandardMaterial;
              ledMat.color = new THREE.Color(0.95, 0.95, 1.0);
              ledMat.emissive = new THREE.Color(0.4, 0.4, 0.45);
              ledMat.polygonOffset = true;
              ledMat.polygonOffsetFactor = -2;
              ledMat.polygonOffsetUnits = -4;
            }
          }
        }

        // Fix for potentially overly bright/white materials:
        // Ensure standard PBR materials aren't blowing out
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });

    // 2. Deterministic Bounding Box Scaling
    // Reset scale/position first in case useEffect runs multiple times
    clonedScene.scale.set(1, 1, 1);
    clonedScene.position.set(0, 0, 0);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Normalize scale so the longest side (usually Z for cars) is exactly 5 units long
    const targetLength = 5;
    const scale = targetLength / maxDim;
    clonedScene.scale.setScalar(scale);
    clonedScene.updateMatrixWorld(true);

    // 3. Center the model at [0,0,0] and rest on floor (Y=0)
    const newBox = new THREE.Box3().setFromObject(clonedScene);
    const center = newBox.getCenter(new THREE.Vector3());

    clonedScene.position.set(-center.x, -newBox.min.y, -center.z);
  }, [clonedScene, path]);

  return <primitive object={clonedScene} />;
}

export interface MachineAttribution {
  label: string;
  title: string;
  creator: string;
  creatorUrl: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}

export interface MachineModelProps {
  path: string;
  attribution: MachineAttribution;
}

export default function MachineModel({ path, attribution }: MachineModelProps) {
  return (
    <div className={styles.canvasContainer}>
      <div className={styles.instructionLayer}>
        <span className={styles.instructionText}>
          Drag to rotate &bull; Scroll to zoom
        </span>
      </div>

      <Suspense
        fallback={<div className={styles.loader}>Loading 3D Model...</div>}
      >
        <Canvas
          frameloop="demand"
          shadows
          camera={{ position: [5.5, 2.0, 5.5], fov: 35 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.9, // Prevent blowout of white livery
          }}
        >
          {/* Subtle ambient lighting so dark shadows aren't pitch black */}
          <ambientLight intensity={0.6} />

          {/* Key light for volume and contrast */}
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={1024}
            shadow-bias={-0.0001}
            shadow-normalBias={0.02}
          />
          {/* Fill light to soften harsh shadows */}
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />

          {/* Balanced environment map for realistic glossy car reflections without overwhelming base colors */}
          <Environment preset="city" background={false} />

          <CarModel path={path} />

          {/* User controls with restricted rotation and zoom */}
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping={true}
            minPolarAngle={Math.PI / 6} // Allow viewing slightly from above
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground
            minDistance={3}
            maxDistance={12}
            target={[0, 0.6, 0]} // Orbit around the car's volumetric center, not its tires
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* Attribution and License Metadata */}
      <div className={styles.attributionPanel}>
        <p className={styles.carLabel}>{attribution.label}</p>
        <p className={styles.licenseInfo}>
          3D model: {attribution.title} by{" "}
          <a href={attribution.creatorUrl} target="_blank" rel="noreferrer">
            {attribution.creator}
          </a>
          , via{" "}
          <a href={attribution.sourceUrl} target="_blank" rel="noreferrer">
            Sketchfab
          </a>
          . Licensed under{" "}
          <a href={attribution.licenseUrl} target="_blank" rel="noreferrer">
            {attribution.license}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
