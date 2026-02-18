# WebGL Shaders & Three.js Effects

**Status:** Active | **Domain:** GPU-powered visual effects

---

## Core Concepts

### Fragment Shaders
```glsl
// Basic gradient shader
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 color = mix(vec3(0.0), vec3(1.0), uv.y);
  gl_FragColor = vec4(color, 1.0);
}
```

### Noise Functions
```glsl
// Simplex noise for organic effects
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  // Simplex noise implementation
}
```

---

## Premium Effects

### Liquid Distortion
```glsl
uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;

void main() {
  vec2 uv = vUv;
  
  // Distance from mouse
  float dist = distance(uv, uMouse);
  
  // Ripple effect
  float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.02;
  ripple *= smoothstep(0.5, 0.0, dist);
  
  // Apply distortion
  vec2 distortedUV = uv + ripple;
  
  vec4 color = texture2D(uTexture, distortedUV);
  gl_FragColor = color;
}
```

### RGB Split / Chromatic Aberration
```glsl
void main() {
  vec2 uv = vUv;
  
  float aberration = 0.02;
  
  float r = texture2D(uTexture, uv + vec2(aberration, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(aberration, 0.0)).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
```

### Displacement Map
```glsl
uniform sampler2D uDisplacement;
uniform float uStrength;

void main() {
  vec2 uv = vUv;
  
  // Get displacement value
  float displacement = texture2D(uDisplacement, uv).r;
  
  // Offset UV based on displacement
  vec2 displacedUV = uv + vec2(displacement) * uStrength;
  
  vec4 color = texture2D(uTexture, displacedUV);
  gl_FragColor = color;
}
```

---

## Three.js Integration

### Custom Shader Material
```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture: { value: texture }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `// shader code here`
});

// Animate
function animate() {
  material.uniforms.uTime.value += 0.01;
  requestAnimationFrame(animate);
}
```

### Post-Processing Effects
```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength
  0.4, // radius
  0.85 // threshold
));
```

---

## Performance Tips

1. **Use low-res textures for displacement**
2. **Limit shader complexity on mobile**
3. **Use offscreen canvas when possible**
4. **Throttle mouse events**
5. **Use requestAnimationFrame properly**

---

## Mind-Blowing Patterns

| Effect | Technique |
|--------|-----------|
| Liquid hover | Mouse distance + sine distortion |
| Film grain | Random noise overlay |
| Vignette | Radial gradient darkening |
| Heat haze | Animated noise distortion |
| Glitch | RGB split + random offsets |
