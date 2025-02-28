import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js";

// Obtém o vídeo pelo ID
const video = document.getElementById('video');

// Adiciona um listener para o evento 'ended', que é disparado quando o vídeo termina
video.addEventListener('ended', function() {
  // Remove o vídeo da página após ele terminar
  video.remove();
});


// Scene
const scene = new THREE.Scene();

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  metalness: 0.9,
  roughness: 0.4,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizer = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizer.width / sizer.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
if (!canvas) {
  console.error("Canvas não encontrado! Verifique o ID no HTML.");
} 

// Fora do bloco if, para que o renderer seja acessível no resize
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizer.width, sizer.height);
renderer.setPixelRatio(2);

// Controls
const controls = new OrbitControls(camera, canvas); // Instanciado após o canvas ser carregado
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true; // Auto-rotate habilitado
controls.autoRotateSpeed = 2.0; // Ajuste a velocidade do auto-rotate
controls.enableRotate = true; // Permitir rotação

// Animation loop
const loop = () => {
  mesh.rotation.x += 0.02; // Aumentei a rotação para tornar a animação mais visível
  mesh.rotation.y += 0.02; // Adicionei rotação no eixo Y também
  controls.update(); // Atualiza o controle para o movimento suave
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop(); // Inicia o loop de animação

// Resize
window.addEventListener("resize", () => {
  // Update Sizes
  sizer.width = window.innerWidth;
  sizer.height = window.innerHeight;

  // Update camera
  camera.aspect = sizer.width / sizer.height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(sizer.width, sizer.height);
});

// TimeLine magic
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
tl.fromTo('nav', {y: '-100%'}, {y: '0%'});
tl.fromTo('.title', {opacity: 0}, {opacity: 1});

// Mouse Animation Color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
   
    // Calculando os valores RGB
    rgb = [
      Math.round((e.pageX / sizer.width) * 255),  // Corrigido o cálculo para RGB entre 0 e 255
      Math.round((e.pageY / sizer.height) * 255), // Corrigido o cálculo para RGB entre 0 e 255
      150, // Terceira cor fixada para 150
    ];

    // Criando uma nova cor a partir dos valores RGB
    let newColor = new THREE.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);

    // Animando a cor do material da esfera
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
