import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rocket, Planet } from './three-elements.js';
const devMode = false;

let space, renderer, camera, controls, spaceX;
let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
let sunMesh, mercuryMesh, venusMesh, earthMesh, marsMesh, jupiterMesh, saturnMesh, texture, mesh, uranusMesh, neptuneMesh;

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

	// camera and controls
	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set(10, 10, 40);

	controls = new OrbitControls( camera, renderer.domElement );

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
		let cTexture = new THREE.TextureLoader().load( new URL("threeSrc/star2.webp", import.meta.url) );
		const cageSize = 800;
		let cage = new THREE.Mesh(
				new THREE.BoxBufferGeometry(cageSize, cageSize, cageSize,200,200),
				new THREE.MeshBasicMaterial({
						side: THREE.DoubleSide,
						map: cTexture
				})
		);
		space.add(cage);
	}

	//#region planets
	sun = new Planet(30, -70, new URL("threeSrc/sun-texture.jpeg", import.meta.url));
	sunMesh = sun.getMesh();
	space.add(sunMesh);
	
	mercury = new Planet(2, -10, new URL("threeSrc/mercury.png", import.meta.url));
	mercuryMesh = mercury.getMesh();
	space.add(mercuryMesh);
	
	venus = new Planet(3, 6, new URL("threeSrc/venus.jpeg", import.meta.url));
	venusMesh = venus.getMesh();
	space.add(venusMesh);
	
	earth = new Planet(4, 22, new URL("threeSrc/earth.jpeg", import.meta.url));
	earthMesh = earth.getMesh();
	space.add(earthMesh);
	
	mars = new Planet(3, 38, new URL("threeSrc/mars.jpeg", import.meta.url));
	marsMesh = mars.getMesh();
	space.add(marsMesh);
	
	jupiter = new Planet(8, 54, new URL("threeSrc/jupiter.jpeg", import.meta.url));
	jupiterMesh = jupiter.getMesh();
	space.add(jupiterMesh);
	
	saturn = new Planet(6, 75, new URL("threeSrc/saturn.webp", import.meta.url));
	saturnMesh = saturn.getMesh();
	space.add(saturnMesh);
	
	texture = new THREE.TextureLoader().load(new URL("threeSrc/saturn-ring.jpeg", import.meta.url));
	mesh = new THREE.Mesh( 
		new THREE.RingGeometry( 10, 12, 32, 60, 60 ),
		new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, wireframe: true, map: texture } )
	);
	mesh.position.set(75, 0, 0)
	mesh.rotateX(-Math.PI/1.5)
	space.add( mesh );
	
	uranus = new Planet(5, 100, new URL("threeSrc/uranus.jpeg", import.meta.url));
	uranusMesh = uranus.getMesh();
	space.add(uranusMesh);
	
	neptune = new Planet(5, 115, new URL("threeSrc/neptune.jpeg", import.meta.url));
	neptuneMesh = neptune.getMesh();
	space.add(neptuneMesh);
	//#endregion
	
	spaceX = new Rocket();
	space.add(spaceX.ship);
	controls.target = spaceX.ship.position;
	controls.update();
}

function rotatePlanets() {
	sunMesh.rotation.y += 0.001;
	mercuryMesh.rotation.y += 0.01;
	venusMesh.rotation.y += 0.01;
	earthMesh.rotation.y += 0.01;
	marsMesh.rotation.y += 0.01;
	jupiterMesh.rotation.y += 0.01;
	saturnMesh.rotation.y += 0.01;
	mesh.rotation.z += 0.01;
	uranusMesh.rotation.y += 0.01;
	neptuneMesh.rotation.y += 0.01;
}

function animate() {
	requestAnimationFrame(animate);
	rotatePlanets();
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