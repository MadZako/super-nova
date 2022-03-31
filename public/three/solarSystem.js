import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rocket } from './three-elements.js';
const devMode = false;
let space, renderer, camera, controls, spaceX;

function init() {
	// space
	space = new THREE.Scene();
	// ambient light
	const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
	space.add( light );
	// renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	if (devMode) {
		// axis
		const axesHelper = new THREE.AxesHelper( 15 );
		space.add( axesHelper );
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
		space.add(cage);
	} else {
		let plane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2000, 2000, 200, 200),
			new THREE.MeshStandardMaterial({
				color: '#7CFC00',
				side: THREE.DoubleSide
			})
		);
		plane.rotateX( - Math.PI / 2);
		space.add(plane);
	}
	
	// camera and controls
	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set(10, 10, 40);

	controls = new OrbitControls( camera, renderer.domElement );

	spaceX = new Rocket();
	space.add(spaceX.ship);
	controls.target = spaceX.ship.position;
	controls.update();
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(space, camera);
}

document.addEventListener('keydown', (event) => {
	if (event.code === 'Space' || event.code === 'ArrowUp') {
		spaceX.flyUp(true, true);
	}
	if (event.code === 'ArrowDown') {
		spaceX.flyDown();
	}
});

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(space, camera);
}

init();
renderer.render(space, camera);
animate();