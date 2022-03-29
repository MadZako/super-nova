import * as THREE from 'three';
import { Car, Rocket } from './three-elements.js';

let camera, scene, renderer, vroom, spaceX;

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

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// let floor = new THREE.PlaneGeometry(50, 50);
	// let floorMaterial = new THREE.MeshBasicMaterial({ color: 0x009A17, side: THREE.DoubleSide});
	// let floorElement = new THREE.Mesh( floor, floorMaterial);
	// floorElement.rotation.x += 90;
	// // scene.add(floorElement);
	// let newWall = createWall();
	// newWall.position.y = 25;
	// newWall.position.z = -25;
	// // scene.add(newWall);

	// let crr = new Car();
	spaceX = new Rocket();
	// crr.rotateFrontWheels('Right');
	// scene.add(crr.car);
	spaceX.yabba();
	scene.add(spaceX.ship);
	// vroom = makeCar();
	// scene.add(vroom);


}

function makeCar() {
	let test = new THREE.Group();

	let frL = new THREE.Mesh(
		new THREE.BoxGeometry(1, 2, 2),
		new THREE.MeshBasicMaterial({ color: 0x28282B })
	);
	frL.name = 'FrontLeft';
	frL.position.y = 1;
	frL.position.x = -2;
	frL.position.z = -4;	
	let frR = new THREE.Mesh(
		new THREE.BoxGeometry(1, 2, 2),
		new THREE.MeshBasicMaterial({ color: 0x28282B })
	);
	frR.name = 'FrontRight';
	frR.position.y = 1;
	frR.position.x = 2;
	frR.position.z = -4;

	let reL = new THREE.Mesh(
		new THREE.BoxGeometry(1, 2, 2),
		new THREE.MeshBasicMaterial({ color: 0x28282B })
	);
	reL.name = 'RearLeft';
	reL.position.y = 1;
	reL.position.x = -2;
	reL.position.z = 4;
	let reR = new THREE.Mesh(
		new THREE.BoxGeometry(1, 2, 2),
		new THREE.MeshBasicMaterial({ color: 0x28282B })
	);
	reR.name = 'RearRight';
	reR.position.y = 1;
	reR.position.x = 2;
	reR.position.z = 4;

	let carBody = new THREE.Mesh(
		new THREE.BoxGeometry(4,3,12),
		new THREE.MeshBasicMaterial({ color: 0xEB7A08 }),
	);
	carBody.name = 'CarBody';
	carBody.position.y = 2;
	
	let carHead = new THREE.Mesh(
		new THREE.BoxGeometry(4,1.5,6),
		new THREE.MeshBasicMaterial({ color: 0xA5A0A0 }),
	);
	carHead.name = 'CarHead';
	carHead.position.y = 4.25;
	carHead.position.z = 1;


	test.add(frL);
	test.add(frR);
	test.add(reL);
	test.add(reR);
	test.add(carBody);
	test.add(carHead);
	
	return test;
}

function animate() {
	requestAnimationFrame(animate);

	spaceX.yabba();
	// object.position.z -= 0.05;

	renderer.render(scene, camera);
}

let keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.code] = true;
	console.log(keysPressed);
	// moveCamera(keysPressed);
	// complexCarMovement(keysPressed);
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
}

function moveCamera(keys) {
	if (keys.w) {
		camera.position.z -= 1;
	} else if (keys.s) {
		camera.position.z += 1;
	} else if (keys.a) {
		camera.position.x -= 1;
	} else if (keys.d) {
		camera.position.x += 1;
	}
	// cameraLookAtObject(vroom);

	renderer.render(scene, camera);
}

function complexCarMovement(keys) {
	if (keys) {
		spaceX.flyUp();
	}
	if (!(keys.ArrowRight || keys.ArrowLeft || keys.ArrowDown || keys.ArrowUp)) return;
	// let right = vroom.children.find(mesh => mesh.name === 'FrontRight');
	// let left = vroom.children.find(mesh => mesh.name === 'FrontLeft');
	if (keys.ArrowRight && keys.ArrowUp) {
		right.rotation.y = -1;
		left.rotation.y = -1;
		vroom.rotation.y += -0.1;
		vroom.position.z -= 1;
	} else if (keys.ArrowLeft && keys.ArrowUp) {
		right.rotation.y = 1;
		left.rotation.y = 1;
		vroom.rotation.y -= -0.1;
		vroom.position.z -= 1;
	} else if (keys.ArrowRight) {
		right.rotation.y = -1;
		left.rotation.y = -1;
	} else if (keys.ArrowLeft) {
		right.rotation.y = 1;
		left.rotation.y = 1;
	} else if (keys.ArrowUp) {
		spaceX.removeFlames();
		// right.rotation.y = 0;
		// left.rotation.y = 0;
		// vroom.position.z -= 1;
	} else if (keys.ArrowDown) {
		right.rotation.y = 0;
		left.rotation.y = 0;
		vroom.position.z += 1;
	}
	cameraLookAtObject(vroom);
	moveCameraRelativeToObject(vroom);
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