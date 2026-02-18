# Three.js 3D Web Skill

**Status:** Active | **Domain:** 3D Web Graphics

---

## Setup

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

---

## Basic Scene

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

---

## Common Geometries

```typescript
// Box
<boxGeometry args={[width, height, depth]} />

// Sphere
<sphereGeometry args={[radius, widthSegments, heightSegments]} />

// Plane
<planeGeometry args={[width, height]} />

// Cylinder
<cylinderGeometry args={[radiusTop, radiusBottom, height, segments]} />

// Torus (donut)
<torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />
```

---

## Materials

```typescript
// Standard (reacts to light)
<meshStandardMaterial 
  color="#ff0000"
  roughness={0.5}
  metalness={0.5}
/>

// Basic (no lighting)
<meshBasicMaterial color="blue" wireframe={true} />

// Physical (realistic)
<meshPhysicalMaterial
  color="white"
  transmission={1}  // Glass-like
  thickness={0.5}
  roughness={0.1}
/>
```

---

## Animation

```typescript
import { useRef, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function RotatingBox() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
```

---

## Drei Helpers

```typescript
import { 
  OrbitControls,      // Mouse control
  PerspectiveCamera,  // Camera
  Environment,        // HDRI lighting
  ContactShadows,     // Realistic shadows
  Float,              // Floating animation
  MeshDistort,        // Distortion effect
  Sphere, Box, Plane  // Primitives
} from '@react-three/drei';

// Auto-center and resize
<Center>
  <Box />
</Center>

// Float animation
<Float speed={2} rotationIntensity={1} floatIntensity={2}>
  <Box />
</Float>

// Environment lighting
<Environment preset="city" />

// Contact shadows
<ContactShadows 
  position={[0, -1, 0]} 
  opacity={0.5} 
  scale={10} 
  blur={2} 
/>
```

---

## Physics with Cannon

```bash
npm install @react-three/cannon
```

```typescript
import { Physics, useBox, usePlane } from '@react-three/cannon';

function PhysicsScene() {
  return (
    <Physics gravity={[0, -9.8, 0]}>
      <Ground />
      <FallingBox />
    </Physics>
  );
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0]
  }));
  
  return (
    <mesh ref={ref}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
}

function FallingBox() {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0]
  }));
  
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
```

---

## Post-Processing Effects

```bash
npm install @react-three/postprocessing
```

```typescript
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

<EffectComposer>
  <Bloom 
    intensity={0.5}
    luminanceThreshold={0.9}
  />
  <ChromaticAberration offset={[0.002, 0.002]} />
</EffectComposer>
```

---

## Performance Tips

- Use `instancedMesh` for repeated objects
- Enable `frustumCulled` on meshes
- Use `useLoader` with caching
- Lower geometry segments on mobile
- Use `drei/Detailed` for LOD

```typescript
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model() {
  const gltf = useLoader(GLTFLoader, '/model.glb');
  return <primitive object={gltf.scene} />;
}
```
