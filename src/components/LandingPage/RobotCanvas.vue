<template>
  <div ref="canvasContainer" class="robot-canvas-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvasContainer = ref(null);
let renderer, scene, camera, model, animationId;

onMounted(() => {
  initThree();
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', handleResize);
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }
});

const handleResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return;
  const width = canvasContainer.value.clientWidth;
  const height = canvasContainer.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const initThree = () => {
  const container = canvasContainer.value;
  const width = container.clientWidth || 240;
  const height = container.clientHeight || 240;

  // Scene
  scene = new THREE.Scene();

  // Camera - Conservative positioning to prevent clipping
  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.set(0, 0, 8);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Enhanced Lighting for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
  frontLight.position.set(0, 2, 5);
  scene.add(frontLight);
  
  const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
  backLight.position.set(0, 2, -5);
  scene.add(backLight);

  const sideLight = new THREE.PointLight(0x4444ff, 1); // Subtle blue tech accent
  sideLight.position.set(-5, 0, 2);
  scene.add(sideLight);

  // Load Model
  const loader = new GLTFLoader();
  loader.load(
    '/zeb.glb',
    (gltf) => {
      model = gltf.scene;
      
      // Better Centering Logic
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Shift model so its geometric center is at (0,0,0)
      model.position.sub(center);
      
      // Calculate best fit scale - Conservative to prevent any clipping
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 4.0 / maxDim; // Conservative scale to ensure full visibility
      model.scale.set(scale, scale, scale);
      
      scene.add(model);
      animate();
    },
    undefined,
    (error) => {
      console.error('Error loading 3D model:', error);
    }
  );

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    
    if (model) {
      // Rotation and float
      model.rotation.y += 0.015;
      model.position.y = Math.sin(Date.now() * 0.0015) * 0.15;
    }
    
    renderer.render(scene, camera);
  };

  window.addEventListener('resize', handleResize);
};
</script>

<style scoped>
.robot-canvas-container {
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

canvas {
  display: block;
  pointer-events: none; /* Allow drag events to pass through to the button beneath */
}
</style>
