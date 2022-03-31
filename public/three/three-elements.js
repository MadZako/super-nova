import * as THREE from 'three';
import { MathUtils } from 'three';

class Car {
	car;

	constructor() {
		this.car = new THREE.Group();

		let front = new THREE.Mesh(
			new THREE.BoxGeometry(4, 0.1, 0.1),
			new THREE.MeshPhongMaterial({ color: 0x28282B })
		);
		front.position.set(0,1,-4);
		front.name = 'Front';
		this.car.add(front);

		let rear = new THREE.Mesh(
			new THREE.BoxGeometry(4, 0.1, 0.1),
			new THREE.MeshPhongMaterial({ color: 0x28282B })
		);
		rear.position.set(0,1,4);
		rear.name = 'Rear';
		this.car.add(rear);

		let frL = new THREE.Mesh(
			new THREE.BoxGeometry(1, 2, 2),
			new THREE.MeshPhongMaterial({ color: 0x28282B })
		);
		frL.name = 'FrontLeft';
		frL.position.y = 1;
		frL.position.x = -2;
		frL.position.z = -4;	
		let frR = new THREE.Mesh(
			new THREE.BoxGeometry(1, 2, 2),
			new THREE.MeshPhongMaterial({ color: 0x28282B })
		);
		frR.name = 'FrontRight';
		frR.position.y = 1;
		frR.position.x = 2;
		frR.position.z = -4;
	
		let reL = new THREE.Mesh(
			new THREE.BoxGeometry(1, 2, 2),
			new THREE.MeshPhongMaterial({ color: 0x28282B })
		);
		reL.name = 'RearLeft';
		reL.position.y = 1;
		reL.position.x = -2;
		reL.position.z = 4;
		let reR = new THREE.Mesh(
			new THREE.BoxGeometry(1, 2, 2),
			new THREE.MeshPhongMaterial({ color: 0x28282B })
		);
		reR.name = 'RearRight';
		reR.position.y = 1;
		reR.position.x = 2;
		reR.position.z = 4;
	
		let carBody = new THREE.Mesh(
			new THREE.BoxGeometry(4,3,12),
			new THREE.MeshPhongMaterial({ color: 0xEB7A08,wireframe:true }),
		);
		carBody.name = 'CarBody';
		carBody.position.y = 2;
		
		let carHead = new THREE.Mesh(
			new THREE.BoxGeometry(4,1.5,6),
			new THREE.MeshPhongMaterial({ color: 0xA5A0A0 }),
		);
		carHead.name = 'CarHead';
		carHead.position.y = 4.25;
		carHead.position.z = 1;
	
	
		this.car.add(frL);
		this.car.add(frR);
		this.car.add(reL);
		this.car.add(reR);
		this.car.add(carBody);
		this.car.add(carHead);
	}

	rotateFrontWheels(direction) {
		let right = this.car.children.find(mesh => mesh.name === 'FrontRight');
		let left = this.car.children.find(mesh => mesh.name === 'FrontLeft');
		if (direction === 'Straight') {
			right.rotation.y = 0;
			left.rotation.y = 0;
		} else if (direction === 'Right') {
			right.rotation.y = -1;
			left.rotation.y = -1;
		} else if (direction === 'Left') {
			right.rotation.y = 1;
			left.rotation.y = 1;
		}
	}

	moveForward() {
		this.rotateFrontWheels('Straight');

		// let newMatrix = this.car.matrix;
		// newMatrix.identity();
		// // newMatrix.multiplySelf(THREE.Matrix4.translation);
		// newMatrix.multiplySelf(THREE.Matrix4.translationMatrix(
		// 	this.car.position.x,
		// 	this.car.position.y,
		// 	this.car.position.z + 1));
		// this.car.updateMatrix();
		// // console.log(this.car.matrix);
		// // this.car.matrixWorld.position.z -= 1;
		this.car.position.z -= 1;
	}

	shpot() {
		let axels = this.getFrontAndRearPositions();
		console.log(axels.frontPosition);
		console.log(axels.rearPosition);


		let mid = new THREE.Vector3();
		mid.addVectors(axels.frontPosition, axels.rearPosition);
		mid.multiplyScalar(0.5);
		// mid.z = 10;
		// this.car.lookAt(mid);
		console.log(MathUtils.radToDeg(axels.rearPosition.angleTo(axels.frontPosition)));
		console.log(MathUtils.radToDeg(mid.angleTo(axels.frontPosition)));


		this.car.rotateY(1);
		// let norm = new THREE.Vector3()
		// norm.addVectors(axels.frontPosition, axels.rearPosition);
		// norm.multiplyScalar(0.5);
		// norm.applyAxisAngle(mid, Math.PI / 2);
		// norm.
// 
		// console.log(norm);

		let { x1, y1, z1} = axels.frontPosition;
		let { x2, y2, z2} = axels.rearPosition;

		// console.log(axels);
	}

	getFrontAndRearPositions() {
		let front = this.car.children.find(mesh => mesh.name === 'Front');
		let rear = this.car.children.find(mesh => mesh.name === 'Rear');
		let frontPosition = new THREE.Vector3();
		frontPosition.setFromMatrixPosition(front.matrixWorld);
		let rearPosition = new THREE.Vector3();
		rearPosition.setFromMatrixPosition(rear.matrixWorld);
		return { frontPosition , rearPosition };
	}

	moveRight() {
		this.rotateFrontWheels('Right');
		this.car.rotation.y += -0.1;
		let { x, y, z } = this.car.position;
		console.log(this.car.position);
		let turningPoint = new THREE.Vector3(x,y,z);
		this.car.rotateOnAxis(turningPoint,Math.PI)
		this.car.position.x -= -1;
		this.car.position.z -= 1;
	}

	moveLeft() {
		this.rotateFrontWheels('Left');
		this.car.rotation.y += 0.1;
		this.car.position.x -= 1;
		this.car.position.z -= 1;
	}

	moveBackward() {
		this.rotateFrontWheels('Straight');
		this.car.position.z += 1;
	}
}

class Rocket {
	ship;
	speed = 0.05;

	constructor() {
		this.ship = new THREE.Group();

		let body = new THREE.Mesh(
			new THREE.BoxGeometry(2,5,2,5,5),
			new THREE.MeshPhongMaterial({
				color: 0xeb7a08
			})
		);
		body.position.y = 3;

		let top = new THREE.Mesh(
			new THREE.ConeGeometry(1.414,1.5,4),
			new THREE.MeshPhongMaterial({
				color: 0xeb7a08
			})
		);
		top.position.y = 6.25;
		top.rotateY(Math.PI / 4);

		let finPositions = [
			{ x:1, y:1, z:1},
			{ x:1, y:1, z:-1},
			{ x:-1, y:1, z:1},
			{ x:-1, y:1, z:-1}
		];
		for (let f = 0; f < finPositions.length; f++) {
			let { x, y, z } = finPositions[f];
			let fin = new THREE.Mesh(
				new THREE.BoxGeometry(0.5,2,0.5),
				new THREE.MeshPhongMaterial({ color: 0x3a3b3c })
			)
			fin.position.set(x, y, z);
			this.ship.add(fin);
		}
		
		let windowPositions = [
			{ x:0, y:4, z:1.1},
			{ x:0, y:4, z:-1.1}
		];
		for (let f = 0; f < windowPositions.length; f++) {
			let { x, y, z } = windowPositions[f];
			let window = new THREE.Mesh(
				new THREE.BoxGeometry(1,1,0.25),
				new THREE.MeshPhongMaterial({ color: 0x7f7f7f })
			)
			window.position.set(x, y, z);
			this.ship.add(window);
		}

		this.ship.add(body);
		this.ship.add(top);
	}

	addFlames() {
		let yellowFlame = new THREE.Mesh(
			new THREE.BoxGeometry(1,0.5,1),
			new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
		)
		yellowFlame.name = 'yellowFlame';
		yellowFlame.position.y += 0.5;
		let orangeFlame = new THREE.Mesh(
			new THREE.BoxGeometry(0.8,0.5,0.8),
			new THREE.MeshBasicMaterial({ color: 0xFFA500 })
		)
		orangeFlame.name = 'orangeFlame';
		let redFlame = new THREE.Mesh(
			new THREE.BoxGeometry(0.6,0.5,0.6),
			new THREE.MeshBasicMaterial({ color: 0xFF0000 })
		);
		redFlame.name = 'redFlame';
		redFlame.position.y -= 0.5;
		this.ship.add(yellowFlame);
		this.ship.add(orangeFlame);
		this.ship.add(redFlame);
	}

	removeFlames() {
		let yellow = this.ship.children.find(mesh => mesh.name === 'yellowFlame');
		let orange = this.ship.children.find(mesh => mesh.name === 'orangeFlame');
		let red = this.ship.children.find(mesh => mesh.name === 'redFlame');
		// return [yellow, orange, red];
		this.ship.remove(yellow);
		this.ship.remove(orange);
		this.ship.remove(red);
	}

	spin(int) {
		let rate = int ?? 0.01
		this.ship.rotation.y += rate;
	}

	shake() {
		const shakeOffset = 0.04;
		let offsets = [ 
			{ x:shakeOffset, z:shakeOffset },
			{ x:-shakeOffset, z:shakeOffset },
			{ x:shakeOffset, z:-shakeOffset },
			{ x:-shakeOffset, z:-shakeOffset },
		];
		let random = Math.floor(Math.random() * offsets.length);
		let { x, z} = offsets[random];
		this.ship.position.x = x;
		this.ship.position.z = z;
	}

	returnToCenter() {
		this.ship.position.x = 0;
		this.ship.position.z = 0;
	}

	flyUp(shake, spin) {
		this.addFlames();
		if (shake) this.shake();
		if (spin) this.spin();

		const targetPosition = this.ship.position.clone();
		targetPosition.y += this.speed;

		this.ship.position.lerp(targetPosition, 0.1)
		this.ship.translateY(this.speed);
	}

	flyDown() {
		this.removeFlames();
		this.returnToCenter();

		const targetPosition = this.ship.position.clone();
		targetPosition.y -= this.speed;

		this.ship.position.lerp(targetPosition, 0.1)
		this.ship.translateY(-this.speed);
	}
}

export { Car, Rocket };