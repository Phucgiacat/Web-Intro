import * as THREE from 'three';

export function initFlagBackground() {
  const container = document.getElementById('flag-container');
  if (!container) return;

  const scene = new THREE.Scene();
  // Using a darker ambient light and background
  scene.background = new THREE.Color(0x0a0a0a);
  
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 1.5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Geometry: plane with many segments for smooth waving
  const geometry = new THREE.PlaneGeometry(5, 3, 128, 128);

  // Shaders
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Waving motion based on time and position
      float elevation = sin(modelPosition.x * 3.0 - uTime * 2.0) * 0.15;
      elevation += sin(modelPosition.y * 2.0 - uTime * 1.5) * 0.05;
      
      // Mouse interaction
      float dist = distance(modelPosition.xy, uMouse * 2.0);
      elevation += exp(-dist * 2.0) * 0.1 * sin(uTime * 3.0);
      
      modelPosition.z += elevation;
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorBase;
    uniform vec3 uColorHighlight;
    uniform vec3 uStarColor;
    
    varying vec2 vUv;
    varying float vElevation;

    // 2D Rotation matrix
    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    // SDF for a 5-pointed star
    float sdStar5(in vec2 p, in float r, in float rf) {
        const vec2 k1 = vec2(0.809016994375, -0.587785252292); // pi/5
        const vec2 k2 = vec2(-k1.x, k1.y);
        p.x = abs(p.x);
        p -= 2.0 * max(dot(k1, p), 0.0) * k1;
        p -= 2.0 * max(dot(k2, p), 0.0) * k2;
        p.x = abs(p.x);
        p.y -= r;
        vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0,1);
        float h = clamp( dot(p, ba) / dot(ba, ba), 0.0, r );
        return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
    }

    void main() {
      // Calculate lighting based on elevation (fake shadows/highlights on folds)
      float lightIntensity = vElevation * 3.5;
      vec3 color = mix(uColorBase, uColorHighlight, lightIntensity + 0.5);

      // Star logic
      // Center UV to (0,0), adjust aspect ratio if needed (flag is wider than tall)
      vec2 p = vUv - 0.5;
      p.x *= 5.0 / 3.0; // Correct aspect ratio distortion
      
      // Adjust star size
      float r = 0.22;
      float rf = 0.45;
      
      float d = sdStar5(p, r, rf);
      
      // Smooth anti-aliased edge for the star
      float starMask = smoothstep(0.01, 0.0, d);
      
      // If star, blend with star color, but keep some fold shading
      vec3 finalStarColor = mix(uStarColor * 0.8, uStarColor, lightIntensity + 0.5);
      
      color = mix(color, finalStarColor, starMask);

      // Add a subtle vignette so edges fade to dark
      float distFromCenter = distance(vUv, vec2(0.5));
      color *= smoothstep(0.8, 0.2, distFromCenter);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Colors based on user preference: Vibrant Flag Red
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColorBase: { value: new THREE.Color('#8B0000') },      // Rich Dark Red
    uColorHighlight: { value: new THREE.Color('#DA251D') }, // Bright standard flag red
    uStarColor: { value: new THREE.Color('#FFCD00') }       // Bright yellow/gold
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Mouse and Scroll interaction
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;
  
  window.addEventListener('mousemove', (e) => {
    // Normalize mouse coordinates to -1 to 1
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    uniforms.uTime.value = elapsedTime;
    
    // Smooth mouse follow
    uniforms.uMouse.value.x += (mouseX - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (mouseY - uniforms.uMouse.value.y) * 0.05;
    
    // Scroll parallax effect (moves camera down as you scroll down)
    const targetCamY = -(scrollY * 0.001);
    
    // Slight camera movement based on mouse for parallax + scroll
    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
    camera.position.y += ((mouseY * 0.1 + targetCamY) - camera.position.y) * 0.05;
    
    // Keep looking at center but slightly shifted by scroll
    scene.position.y = targetCamY * 0.5;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
