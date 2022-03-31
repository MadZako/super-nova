import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { Car, Rocket } from './three-elements.js';

let camera, scene, renderer, vroom, spaceX, controls;

function init(mode) {
	// scene
	scene = new THREE.Scene();
	// ambient light
	const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
	scene.add( light );
	// renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	if (mode === 'dev') {
		// axis
		const axesHelper = new THREE.AxesHelper( 15 );
		scene.add( axesHelper );
		// environment
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
	}
	
	
	

	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set(10, 10, 40);
	camera.lookAt(0,0,0);
	scene.add(camera);

	thirdPerson = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	thirdPerson.position.set(10, 10, 40);
	thirdPerson.lookAt(0,0,0);

	const spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 10, 10, 10 );
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;
	scene.add( spotLight );

	
	
	
	
	
	controls = new OrbitControls( thirdPerson, renderer.domElement );
	// controls = new TransformControls(thirdPerson, renderer.domElement)
	// controls.attach(vroom)
	// controls.setMode('translate')
	scene.add(controls)

	let plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(2000, 2000, 200, 200),
		new THREE.MeshStandardMaterial({
			// color: '#7CFC00',
			wireframe: true,
			side: THREE.DoubleSide
		})
	);

	

	plane.rotateX( - Math.PI / 2);
	scene.add(plane);

	vroom = new Car();
	spaceX = new Rocket();
	scene.add(vroom.car);

}

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, thirdPerson);
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
		// vroom.shpot();
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

init('dev');
renderer.render(scene, camera);
animate();