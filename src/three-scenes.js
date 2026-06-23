import * as THREE from 'three';

export function initMultiScenes() {
  const container = document.getElementById('flag-container');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ─── TEXTURES ───
  // High-quality Unsplash URLs for Global AI & Tech Theme
  const textureUrls = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2500&q=80', // Global Earth Network / Orbit (Hero)
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2500&q=80', // Modern AI Tech Nodes (Features)
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2500&q=80', // Advanced Circuit Board (Models)
    'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=2500&q=80', // Holographic Flowing Data (Demo)
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2500&q=80', // Optical Fiber / Fast Data (Pricing)
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=2500&q=80'  // Abstract 3D AI Matrix (About)
  ];

  const textureLoader = new THREE.TextureLoader();
  const textures = textureUrls.map(url => {
    const tex = textureLoader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  });

  // ─── SHADER MATERIAL ───
  // Crossfading and Parallax shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexCurrent;
    uniform sampler2D uTexNext;
    uniform float uProgress;
    uniform vec2 uMouse;
    uniform float uAspect;
    uniform float uImgAspect;
    
    varying vec2 vUv;

    void main() {
      // Calculate Cover aspect ratio to prevent stretching
      vec2 ratio = vec2(
        min(1.0, uAspect / uImgAspect),
        min(1.0, uImgAspect / uAspect)
      );
      
      vec2 coverUv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      // Mouse Parallax effect (subtle movement)
      vec2 parallaxUv = coverUv + uMouse * 0.02;

      // Slight zoom effect based on progress for a cinematic transition
      vec2 zoomUvCurrent = parallaxUv - 0.5;
      zoomUvCurrent *= (1.0 - uProgress * 0.1);
      zoomUvCurrent += 0.5;

      vec2 zoomUvNext = parallaxUv - 0.5;
      zoomUvNext *= (0.9 + uProgress * 0.1);
      zoomUvNext += 0.5;

      vec4 colorCurrent = texture2D(uTexCurrent, zoomUvCurrent);
      vec4 colorNext = texture2D(uTexNext, zoomUvNext);
      
      // Smooth crossfade
      vec4 finalColor = mix(colorCurrent, colorNext, smoothstep(0.0, 1.0, uProgress));
      
      // Add smoky dark layer to make text legible
      finalColor.rgb *= 0.6;

      gl_FragColor = finalColor;
    }
  `;

  const uniforms = {
    uTexCurrent: { value: textures[0] },
    uTexNext: { value: textures[0] },
    uProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAspect: { value: window.innerWidth / window.innerHeight },
    uImgAspect: { value: 16 / 9 } // General landscape aspect
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // ─── SCROLL & INTERACTION LOGIC ───
  let currentSectionIndex = 0;
  let targetProgress = 0;
  
  // Define sections mapped to textures
  const sections = ['hero', 'features', 'models', 'demo', 'pricing', 'about'];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        const id = entry.target.id;
        const newIndex = sections.indexOf(id);
        
        if (newIndex !== -1 && newIndex !== currentSectionIndex) {
          // Setup transition
          uniforms.uTexCurrent.value = textures[currentSectionIndex];
          uniforms.uTexNext.value = textures[newIndex];
          uniforms.uProgress.value = 0;
          currentSectionIndex = newIndex;
          targetProgress = 1;
        }
      }
    });
  }, { threshold: [0.3] });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  let targetMouse = new THREE.Vector2(0, 0);
  window.addEventListener('mousemove', (e) => {
    // Invert Y for correct WebGL UV mapping
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // ─── ANIMATION LOOP ───
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse parallax
    uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.05;

    // Smooth transition crossfade
    if (uniforms.uProgress.value < targetProgress) {
      uniforms.uProgress.value += 0.015; // Transition speed
      if (uniforms.uProgress.value >= 1) {
        uniforms.uProgress.value = 1;
        targetProgress = 0; // Reset
        uniforms.uTexCurrent.value = uniforms.uTexNext.value; // Swap
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.uAspect.value = window.innerWidth / window.innerHeight;
  });
}
