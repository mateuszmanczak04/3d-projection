import { Block, Camera } from "../types";
import { getBlockVertices } from "./get-block-vertices";
import { getProjectedPoints } from "./get-projected-points";
import { getRandomHexColor } from "./get-random-hex-color";

/** Paint block vertices and edges */
export const renderBlock = (
	context: CanvasRenderingContext2D,
	block: Block,
	camera: Camera
) => {
    const screenCenterX = context.canvas.width / 2;
    const screenCenterY = context.canvas.height / 2;

	const vertices = getBlockVertices(block.coordinates);

	// Set styling for drawing
	const randomColor = getRandomHexColor();
	context.fillStyle = randomColor;
	context.strokeStyle = randomColor;

	const projectedVertices = getProjectedPoints(vertices, camera);

	// Draw vertices
	projectedVertices.forEach((projectedVertex) => {
		const screenX = screenCenterX + projectedVertex[0] * screenCenterX
		const screenY = screenCenterY - projectedVertex[1] * screenCenterY
		context.beginPath();
		context.arc(screenX, screenY, 5, 0, Math.PI * 2);
		context.fill();
	})

	// Draw edges
	const cubeEdges = [
		[0, 1],
		[1, 2],
		[2, 3],
		[3, 0], // Bottom face edges
		[4, 5],
		[5, 6],
		[6, 7],
		[7, 4], // Top face edges
		[0, 4],
		[1, 5],
		[2, 6],
		[3, 7], // Vertical edges
	];


	cubeEdges.forEach(([i, j]) => {
		const startPoint = projectedVertices[i];
		const endPoint = projectedVertices[j];
		context.beginPath();
		context.moveTo(
			screenCenterX + startPoint[0] * screenCenterX,
			screenCenterY- startPoint[1] * screenCenterY,
		);
		context.lineTo(
			screenCenterX + endPoint[0] * screenCenterX,
			screenCenterY - endPoint[1] * screenCenterY,
		);
		context.stroke();
	});
};
