const translation = [400, 300];
const scale = 2;
const camera = [50, 50, -100];
const screenCenter = [50, 50, -50];
const canvas = document.getElementById('app-canvas');
const ctx = canvas.getContext('2d');

let points = [
	[0, 0, 100],
	[100, 0, 100],
	[100, 100, 100],
	[0, 100, 100],
	[0, 0, 200],
	[100, 0, 200],
	[100, 100, 200],
	[0, 100, 200],
];

const edges = [
	[0, 1, 0, 1, 1, 0, 0, 0],
	[0, 0, 1, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 1, 0, 1],
	[0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

const draw = () => {
	ctx.reset();

	// Calculate projected coordinates
	const projectedVertices = points.map(([x, y, z]) => {
		const fromCameraToScreen = Math.abs(screenCenter[2] - camera[2]);
		const fromScreenToPoint = Math.abs(z - screenCenter[2]);
		const ratio = fromCameraToScreen / fromScreenToPoint;

		const xDistance = camera[0] - x;
		const projectedX = camera[0] - xDistance * ratio;

		const yDistance = camera[1] - y;
		const projectedY = camera[1] + yDistance * ratio;

		return [projectedX, projectedY];
	});

	// Draw points
	projectedVertices.forEach(([x, y]) => {
		ctx.beginPath();
		ctx.arc(x * scale + translation[0], y * scale + translation[1], 4, 0, Math.PI * 2);
		ctx.fill();
	});

	// Draw lines
	edges.forEach((edge, i) => {
		edge.forEach((connection, j) => {
			if (connection === 1) {
				const startPoint = projectedVertices[i];
				const endPoint = projectedVertices[j];
				ctx.moveTo(
					startPoint[0] * scale + translation[0],
					startPoint[1] * scale + translation[1],
				);
				ctx.lineTo(
					endPoint[0] * scale + translation[0],
					endPoint[1] * scale + translation[1],
				);
				ctx.stroke();
			}
		});
	});
};

function getRotationMatrixXYZ(thetaX = 0, thetaY = 0, thetaZ = 0) {
	// Convert angles to radians
	const rx = (thetaX * Math.PI) / 180;
	const ry = (thetaY * Math.PI) / 180;
	const rz = (thetaZ * Math.PI) / 180;

	// Rotation matrices for each axis
	const Rx = [
		[1, 0, 0],
		[0, Math.cos(rx), -Math.sin(rx)],
		[0, Math.sin(rx), Math.cos(rx)],
	];

	const Ry = [
		[Math.cos(ry), 0, Math.sin(ry)],
		[0, 1, 0],
		[-Math.sin(ry), 0, Math.cos(ry)],
	];

	const Rz = [
		[Math.cos(rz), -Math.sin(rz), 0],
		[Math.sin(rz), Math.cos(rz), 0],
		[0, 0, 1],
	];

	// Multiply the matrices in ZYX order
	function multiplyMatrices(a, b) {
		const result = Array(3)
			.fill(null)
			.map(() => Array(3).fill(0));

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				for (let k = 0; k < 3; k++) {
					result[i][j] += a[i][k] * b[k][j];
				}
			}
		}
		return result;
	}

	// Final rotation matrix
	const rotationMatrix = multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);

	return rotationMatrix;
}

const rotate = (matrix, center = [50, 50, 100]) => {
	points = points.map(([x, y, z]) => {
		const [cx, cy, cz] = center;
		const tx = x - cx;
		const ty = y - cy;
		const tz = z - cz;

		const newX = matrix[0][0] * tx + matrix[0][1] * ty + matrix[0][2] * tz + cx;
		const newY = matrix[1][0] * tx + matrix[1][1] * ty + matrix[1][2] * tz + cy;
		const newZ = matrix[2][0] * tx + matrix[2][1] * ty + matrix[2][2] * tz + cz;

		return [newX, newY, newZ];
	});
};

const rotateByABit = () => {
	const rotationMatrix = getRotationMatrixXYZ(1, 1, 1);
	rotate(rotationMatrix);
	draw();
};

setInterval(rotateByABit, 10);
