import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Castle Components

// Base
const baseGeometry = new THREE.BoxGeometry(6, 1, 3); // width, height, depth - adjusted based on image
const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color
const base = new THREE.Mesh(baseGeometry, blueMaterial);
scene.add(base);

// Towers
const towerRadius = 0.7; // Radius of the towers
const towerHeight = 3; // Height of the towers
const towerRadialSegments = 32; // Smoothness of the towers

const towerGeometry = new THREE.CylinderGeometry(towerRadius, towerRadius, towerHeight, towerRadialSegments);
const yellowMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Yellow color

const tower1 = new THREE.Mesh(towerGeometry, yellowMaterial);
tower1.position.set(-2, towerHeight / 2 + 0.5, 0); // Position adjusted based on base and image
scene.add(tower1);

const tower2 = new THREE.Mesh(towerGeometry, yellowMaterial);
tower2.position.set(2, towerHeight / 2 + 0.5, 0); // Position adjusted based on base and image
scene.add(tower2);

// Crenellations (simplified - add more for detailed look)
const crenellationGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

// Example crenellation positioning for tower 1 (simplified)
const crenellation1_1 = new THREE.Mesh(crenellationGeometry, yellowMaterial);
crenellation1_1.position.set(-2.3, towerHeight + 0.5 + 0.25, 0);
scene.add(crenellation1_1);

const crenellation1_2 = new THREE.Mesh(crenellationGeometry, yellowMaterial);
crenellation1_2.position.set(-1.7, towerHeight + 0.5 + 0.25, 0);
scene.add(crenellation1_2);

// Example crenellation positioning for tower 2 (simplified)
const crenellation2_1 = new THREE.Mesh(crenellationGeometry, yellowMaterial);
crenellation2_1.position.set(1.7, towerHeight + 0.5 + 0.25, 0);
scene.add(crenellation2_1);

const crenellation2_2 = new THREE.Mesh(crenellationGeometry, yellowMaterial);
crenellation2_2.position.set(2.3, towerHeight + 0.5 + 0.25, 0);
scene.add(crenellation2_2);

// Connecting Wall (simplified)
const wallGeometry = new THREE.BoxGeometry(4, 1, 0.5); // width, height, depth
const connectingWall = new THREE.Mesh(wallGeometry, blueMaterial);
connectingWall.position.set(0, towerHeight + 0.5, 0); // Position adjusted
scene.add(connectingWall);

camera.position.z = 8; // Move camera back to see the whole castle

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
