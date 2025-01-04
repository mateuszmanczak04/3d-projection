import { Block, Vector2D, Vector3D } from "../types";
import { getBlockVertices } from "./get-block-vertices";
import { getProjectedVertices } from "./get-projected-vertices";
import { getRandomHexColor } from "./get-random-hex-color";

/** Paint block vertices */
export const paintBlock = (
	block: Block,
	ctx: CanvasRenderingContext2D,
	cameraPosition: Vector3D,
    cameraRotation: Vector3D,
	screenPosition: Vector3D,
	screenSize: Vector2D
) => {
	const vertices = getBlockVertices(block.coordinates);
	const projectedVertices = getProjectedVertices(
		vertices,
		cameraPosition,
        cameraRotation,
		screenPosition,
	);
	const randomColor = getRandomHexColor();
	ctx.fillStyle = randomColor;
	ctx.strokeStyle = randomColor;

	// Draw vertices
	projectedVertices.forEach((vertex) => {
		ctx.beginPath();
		ctx.arc(
			vertex[0] + screenSize[0] / 2,
			vertex[1] + screenSize[1] / 2,
			4,
			0,
			Math.PI * 2,
		);
		ctx.fill();
	});

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
		ctx.beginPath();
		ctx.moveTo(
			startPoint[0] + screenSize[0] / 2,
			startPoint[1] + screenSize[1] / 2,
		);
		ctx.lineTo(
			endPoint[0] + screenSize[0] / 2,
			endPoint[1] + screenSize[1] / 2,
		);
		ctx.stroke();
	});
};
