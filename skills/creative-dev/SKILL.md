# Creative Web Development

**Status:** Active | **Domain:** Novelty, Generative Art, Experimental UI

---

## Three.js Fundamentals

```bash
npm install three @react-three/fiber @react-three/drei
```

```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Sphere args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
        />
      </Sphere>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

---

## WebGL Shaders

### Fragment Shader Basics

```glsl
// Basic gradient
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 color = mix(vec3(1.0, 0.0, 0.5), vec3(0.0, 0.5, 1.0), uv.y);
  gl_FragColor = vec4(color, 1.0);
}

// Animated noise
uniform float uTime;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float noise = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime);
  gl_FragColor = vec4(vec3(noise), 1.0);
}
```

### React Three Fiber Shader

```jsx
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const WaveMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.2, 0.4, 0.8) },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 5.0 + uTime) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
      float strength = distance(vUv, vec2(0.5));
      gl_FragColor = vec4(uColor * (1.0 - strength), 1.0);
    }
  `
)

extend({ WaveMaterial })
```

---

## Generative Art Patterns

### 1. Flow Fields

```javascript
function generateFlowField() {
  const particles = [];
  const noiseScale = 0.01;
  
  for (let i = 0; i < 1000; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0
    });
  }
  
  function update() {
    particles.forEach(p => {
      const angle = noise(p.x * noiseScale, p.y * noiseScale) * Math.PI * 4;
      p.vx += Math.cos(angle) * 0.1;
      p.vy += Math.sin(angle) * 0.1;
      p.x += p.vx;
      p.y += p.vy;
      
      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;
    });
  }
  
  return { particles, update };
}
```

### 2. Particle Systems

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

function ParticleField({ count = 1000 }) {
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])
  
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.05
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03
  })
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" />
    </points>
  )
}
```

### 3. Fractals

```javascript
// Mandelbrot set
function mandelbrot(cx, cy, maxIter = 100) {
  let x = 0, y = 0;
  let iter = 0;
  
  while (x * x + y * y <= 4 && iter < maxIter) {
    const xTemp = x * x - y * y + cx;
    y = 2 * x * y + cy;
    x = xTemp;
    iter++;
  }
  
  return iter;
}

// Render to canvas
function renderMandelbrot(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  
  for (let px = 0; px < canvas.width; px++) {
    for (let py = 0; py < canvas.height; py++) {
      const x = (px / canvas.width) * 3.5 - 2.5;
      const y = (py / canvas.height) * 2 - 1;
      
      const iter = mandelbrot(x, y);
      const color = iter === 100 ? 0 : (iter / 100) * 255;
      
      const index = (py * canvas.width + px) * 4;
      imageData.data[index] = color;
      imageData.data[index + 1] = color * 0.5;
      imageData.data[index + 2] = color * 0.8;
      imageData.data[index + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}
```

---

## Novel UI Effects

### 1. Text Scramble Effect

```javascript
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end } = this.queue[i];
      let char = this.queue[i].char;
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    
    this.el.innerText = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Usage
const scrambler = new TextScramble(document.querySelector('.text'));
scrambler.setText('HELLO WORLD');
```

### 2. Magnetic Buttons

```javascript
function magneticButton(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
}

// Usage
document.querySelectorAll('.magnetic').forEach(magneticButton);
```

### 3. Cursor Trail

```javascript
function cursorTrail() {
  const dots = [];
  const dotCount = 20;
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${10 - i * 0.5}px;
      height: ${10 - i * 0.5}px;
      background: rgba(139, 92, 246, ${1 - i / dotCount});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }
  
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animate() {
    dots.forEach((dot, i) => {
      const prevDot = dots[i - 1] || { x: mouseX, y: mouseY };
      dot.x += (prevDot.x - dot.x) * 0.5;
      dot.y += (prevDot.y - dot.y) * 0.5;
      dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}
```

---

## Audio-Reactive Visuals

```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function visualize() {
      analyser.getByteFrequencyData(dataArray);
      
      // Use dataArray to drive animations
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      document.body.style.background = `hsl(${average}, 50%, 50%)`;
      
      requestAnimationFrame(visualize);
    }
    
    visualize();
  });
```

---

## Resources

- **Three.js Journey:** https://threejs-journey.com/
- **Shaders Book:** https://thebookofshaders.com/
- **Generative Design:** https://generative-design.github.io/
- **Codrops:** https://tympanus.net/codrops/
- **Chrome Experiments:** https://experiments.withgoogle.com/
