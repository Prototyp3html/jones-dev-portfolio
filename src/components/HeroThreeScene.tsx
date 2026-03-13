import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { memo, useMemo, useRef } from "react";
import type { Mesh } from "three";

type HeroThreeSceneProps = {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
};

type ShapeType = "box" | "sphere" | "cylinder";

type ShapeConfig = {
  id: string;
  type: ShapeType;
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  color: string;
  roughness: number;
  metalness: number;
};

const SHAPES: ShapeConfig[] = [
  // cubes
  {
    id: "box-1",
    type: "box",
    position: [-4.4, 1.8, -2.6],
    scale: 0.8,
    rotationSpeed: [0.17, 0.21, 0.09],
    floatSpeed: 0.76,
    floatAmplitude: 0.24,
    color: "#e2e8f0",
    roughness: 0.3,
    metalness: 0.5,
  },
  {
    id: "box-2",
    type: "box",
    position: [1.8, -0.8, 1.8],
    scale: 0.72,
    rotationSpeed: [0.15, 0.11, 0.13],
    floatSpeed: 0.74,
    floatAmplitude: 0.26,
    color: "#c4b5fd",
    roughness: 0.4,
    metalness: 0.35,
  },
  {
    id: "box-3",
    type: "box",
    position: [2.2, 2.6, 0.4],
    scale: 0.58,
    rotationSpeed: [0.14, 0.12, 0.1],
    floatSpeed: 0.95,
    floatAmplitude: 0.16,
    color: "#e2e8f0",
    roughness: 0.25,
    metalness: 0.55,
  },
  // spheres
  {
    id: "sphere-1",
    type: "sphere",
    position: [-2.6, -1.6, 1.2],
    scale: 0.74,
    rotationSpeed: [0.12, 0.19, 0.07],
    floatSpeed: 0.92,
    floatAmplitude: 0.28,
    color: "#ddd6fe",
    roughness: 0.2,
    metalness: 0.6,
  },
  {
    id: "sphere-2",
    type: "sphere",
    position: [3.8, 1.6, -2.1],
    scale: 0.62,
    rotationSpeed: [0.13, 0.17, 0.08],
    floatSpeed: 0.88,
    floatAmplitude: 0.2,
    color: "#e2e8f0",
    roughness: 0.28,
    metalness: 0.5,
  },
  // cylinders
  {
    id: "cylinder-1",
    type: "cylinder",
    position: [-0.3, 2.2, -1.8],
    scale: 0.66,
    rotationSpeed: [0.1, 0.14, 0.16],
    floatSpeed: 0.83,
    floatAmplitude: 0.22,
    color: "#a5b4fc",
    roughness: 0.35,
    metalness: 0.45,
  },
  {
    id: "cylinder-2",
    type: "cylinder",
    position: [4.8, -1.1, 0.6],
    scale: 0.64,
    rotationSpeed: [0.08, 0.16, 0.12],
    floatSpeed: 0.68,
    floatAmplitude: 0.22,
    color: "#e2e8f0",
    roughness: 0.38,
    metalness: 0.4,
  },
];

const FloatingShape = memo(function FloatingShape({
  type,
  position,
  scale,
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
  color,
  roughness,
  metalness,
}: ShapeConfig) {
  const meshRef = useRef<Mesh>(null);
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime() + phaseOffset;

    meshRef.current.rotation.x = t * rotationSpeed[0];
    meshRef.current.rotation.y = t * rotationSpeed[1];
    meshRef.current.rotation.z = t * rotationSpeed[2];
    meshRef.current.position.y =
      position[1] + Math.sin(t * floatSpeed) * floatAmplitude;
    meshRef.current.position.x =
      position[0] + Math.cos(t * (floatSpeed * 0.4)) * 0.1;
    meshRef.current.position.z =
      position[2] + Math.sin(t * (floatSpeed * 0.3) + 1.2) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
      {type === "box" && <boxGeometry args={[1, 1, 1]} />}
      {type === "sphere" && <sphereGeometry args={[0.62, 20, 20]} />}
      {type === "cylinder" && <cylinderGeometry args={[0.42, 0.42, 1.1, 20]} />}
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
});

const CameraRig = ({ mouse }: { mouse: HeroThreeSceneProps["mouseRef"] }) => {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();

    // base slow drift
    const baseX = Math.sin(t * 0.16) * 0.6;
    const baseY = 0.12 + Math.cos(t * 0.12) * 0.12;

    // parallax offset — lerp camera toward mouse direction
    const targetX = baseX + mouse.current.x * 4.5;
    const targetY = baseY + mouse.current.y * 3.0;

    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.z += (8 - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const HeroThreeScene = memo(({ mouseRef }: HeroThreeSceneProps) => {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas
        className="h-full w-full"
        shadows
        dpr={[1, 1.4]}
        camera={{ position: [0, 0.1, 8], fov: 46 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[4, 5, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-bias={-0.0001}
        />
        <pointLight color="#8b5cf6" position={[-3, 2, 2]} intensity={1.0} />
        <pointLight color="#6d28d9" position={[4, -2, -1]} intensity={0.5} />

        {SHAPES.map((shape) => (
          <FloatingShape key={shape.id} {...shape} />
        ))}

        <CameraRig mouse={mouseRef} />

        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.2}
          scale={20}
          blur={3}
          far={10}
        />
      </Canvas>
    </div>
  );
});

export default HeroThreeScene;