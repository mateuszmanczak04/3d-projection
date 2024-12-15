const translation = [400, 300];
const scale = 2;
const camera = [50, 50, -100];
const screenCenter = [50, 50, -50];
const canvas = document.getElementById('app-canvas');
const ctx = canvas.getContext('2d');

const vertices = [
	[0, 0, 0],
	[100, 0, 0],
	[100, 100, 0],
	[0, 100, 0],
	[0, 0, 100],
	[100, 0, 100],
	[100, 100, 100],
	[0, 100, 100],
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
	const projectedVertices = vertices.map(([x, y, z]) => {
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

draw();
