import * as THREE from 'three';
import {OrbitControls} from 
'three/examples/jsm/controls/OrbitControls';

import { GUI } from 'lil-gui';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbitControls = 
new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 2, 5);
orbitControls.update();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(15, 15);
const planeMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
planeMesh.rotation.x = -0.5 * Math.PI;

const sphereGeometry = new THREE.SphereGeometry(2, 50, 50);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000FF
});
const sphereMesh =
new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

const gui = new GUI();

const options = {
    color: 0x0000FF,
    wireframe: false,
    speed: 0.01
}

gui.addColor(options, 'color').onChange(function(e) {
    sphereMesh.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e) {
    sphereMesh.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

let step = 0;

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

const directionalLight = 
new THREE.DirectionalLight(0xFFFFFF, 10);
scene.add(directionalLight);
directionalLight.position.set(-5, 8, 0);
sphereMesh.position.x = 5;

const dLightHelper = 
new THREE.DirectionalLightHelper(directionalLight, 3);
scene.add(dLightHelper);

renderer.shadowMap.enabled = true;
planeMesh.receiveShadow = true;
sphereMesh.castShadow = true;
directionalLight.castShadow = true;

const dLightShadowHelper = 
new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);
directionalLight.shadow.camera.top = 7;

scene.fog = new THREE.FogExp2(0x5500AF, 0.3);

renderer.setClearColor(0x00EA00);

function animate() {
    step += options.speed;
    sphereMesh.position.y = 3 * Math.abs(Math.sin(step));

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);