import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Car, Rocket } from './three-elements.js';

let camera, scene, renderer, vroom, spaceX, controls;

function createWall() {
	let wall = new THREE.PlaneGeometry(50, 50, 1, 1);
	let wallMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.DoubleSide});
	let wallElement = new THREE.Mesh( wall, wallMaterial);
	return wallElement;
}

function init() {
	scene = new THREE.Scene();
	const axesHelper = new THREE.AxesHelper( 15 );
	scene.add( axesHelper );

	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set(10, 10, 40);
	camera.lookAt(0,0,0);

	const spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 10, 10, 10 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );

	
	const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
	scene.add( light );
	
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	controls = new OrbitControls( camera, renderer.domElement );

	let plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(2000, 2000, 200, 200),
		new THREE.MeshStandardMaterial({
			// color: '#7CFC00',
			wireframe: true,
			side: THREE.DoubleSide
		})
	);

	let cage = new THREE.Mesh(
		new THREE.BoxBufferGeometry(100,100,100,200,200),
		new THREE.MeshStandardMaterial({
			color: 0x87ceeb,
			wireframe: true,
			side: THREE.DoubleSide
		})
	);
	cage.position.y = cage.geometry.parameters.height / 2;

	scene.add(cage);

	plane.rotateX( - Math.PI / 2);
	// scene.add(plane);

	vroom = new Car();
	spaceX = new Rocket();
	scene.add(vroom.car);
	scene.add(spaceX.ship);

	controls.update();
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();

	// spaceX.spin();
	// spaceX.flyUp();
	// camera.lookAt(spaceX.ship.position);

	renderer.render(scene, camera);
}

let keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.code] = true;
	if (event.code === 'Space' || event.code === 'ArrowUp') {
		spaceX.flyUp(true, true);
	}
	if (event.code === 'ArrowDown') {
		spaceX.flyDown();
	}

	complexCarMovement(keysPressed);
});

document.addEventListener('keyup', (event) => {
	keysPressed[event.code] = false;
});

function cameraLookAtObject(object) {
	camera.lookAt(object.position);
}

function moveCameraRelativeToObject(object) {
	let { x, y, z } = object.position;
	camera.position.set((x + 20), (y + 20), (z + 70));
	renderer.render(scene, camera);

}

function complexCarMovement(keys) {
	if (!(keys.ArrowRight || keys.ArrowLeft || keys.ArrowDown || keys.ArrowUp)) return;
	if (keys.ArrowRight && keys.ArrowUp) {
		vroom.moveRight();
	} else if (keys.ArrowLeft && keys.ArrowUp) {
		vroom.moveLeft();
	} else if (keys.ArrowRight) {
		vroom.rotateFrontWheels('Right');
	} else if (keys.ArrowLeft) {
		vroom.rotateFrontWheels('Left');
	} else if (keys.ArrowUp) {
		vroom.moveForward();
	} else if (keys.ArrowDown) {
		vroom.moveBackward();
	}
	cameraLookAtObject(vroom.car);
	moveCameraRelativeToObject(vroom.car);
	renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

init();
renderer.render(scene, camera);
animate(spaceX.ship);