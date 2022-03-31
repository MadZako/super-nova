import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Planet from "./lib/Planet";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// // let bg = new THREE.Mesh(
// //     texture = new THREE.TextureLoader().load(new URL("assets/background.jpeg", import.meta.url)),
// //     material = new THREE.MeshBasicMaterial({ map: texture }),
// //     this.mesh = new THREE.Mesh(geometry, material)
    
// )
var bTexture = new THREE.TextureLoader().load( new URL("assets/star2.webp", import.meta.url) );
scene.background = bTexture
var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 0),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: bTexture
            }));
             backgroundMesh .material.depthTest = false;
             backgroundMesh .material.depthWrite = false;



const controls = new OrbitControls(camera, renderer.domElement);

var cTexture = new THREE.TextureLoader().load( new URL("assets/star2.webp", import.meta.url) );

let cage = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1000,1000,1000,200,200),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: cTexture
    })
);
// cage.position.y = cage.geometry.parameters.height / 2;
scene.add(cage);


const sun = new Planet(30, -70, new URL("assets/sun-texture.jpeg", import.meta.url));
const sunMesh = sun.getMesh();
scene.add(sunMesh);

const mercury = new Planet(2, -10, new URL("assets/mercury.png", import.meta.url));
const mercuryMesh = mercury.getMesh();
scene.add(mercuryMesh);

const venus = new Planet(3, 6, new URL("assets/venus.jpeg", import.meta.url));
const venusMesh = venus.getMesh();
scene.add(venusMesh);

const earth = new Planet(4, 22, new URL("assets/earth.jpeg", import.meta.url));
const earthMesh = earth.getMesh();
scene.add(earthMesh);

const mars = new Planet(3, 38, new URL("assets/mars.jpeg", import.meta.url));
const marsMesh = mars.getMesh();
scene.add(marsMesh);

const jupiter = new Planet(8, 54, new URL("assets/jupiter.jpeg", import.meta.url));
const jupiterMesh = jupiter.getMesh();
scene.add(jupiterMesh);

const saturn = new Planet(6, 75, new URL("assets/saturn.webp", import.meta.url));
const saturnMesh = saturn.getMesh();
scene.add(saturnMesh);

const ringGeometry = new THREE.RingGeometry( 10, 12, 32, 60, 60 );
// ringGeometry.position.set(75, 0, 0)
const texture = new THREE.TextureLoader().load(new URL("assets/saturn-ring.jpeg", import.meta.url));
const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, wireframe: true, map: texture } );
const mesh = new THREE.Mesh( ringGeometry, material );
mesh.position.set(75, 0, 0)
mesh.rotateX(-Math.PI/1.5)
scene.add( mesh );

const uranus = new Planet(5, 100, new URL("assets/uranus.jpeg", import.meta.url));
const uranusMesh = uranus.getMesh();
scene.add(uranusMesh);

const neptune = new Planet(5, 115, new URL("assets/neptune.jpeg", import.meta.url));
const neptuneMesh = neptune.getMesh();
scene.add(neptuneMesh);

camera.position.z = 128;
var render = function () {
    requestAnimationFrame(render);

    sunMesh.rotation.y += 0.01;
    // sunMesh.rotation.z += 0.1;
    // sunMesh.rotation.y += 0.1;
    mercuryMesh.rotation.y += 0.01;
    venusMesh.rotation.y += 0.01;
    earthMesh.rotation.y += 0.01;
    marsMesh.rotation.y += 0.01;
    jupiterMesh.rotation.y += 0.01;
    saturnMesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    uranusMesh.rotation.y += 0.01;
    neptuneMesh.rotation.y += 0.01;
    

    renderer.render(scene, camera);
};

render();

