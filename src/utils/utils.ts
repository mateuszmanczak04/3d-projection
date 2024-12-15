import { Block, BlockVertices, Coords2D, Coords3D } from '../types';

/**
 * Edges of the cube in 3D.
 */
export const cubeEdges = [
	[0, 1, 0, 1, 1, 0, 0, 0],
	[0, 0, 1, 0, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 1, 0, 1],
	[0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * Get positions of all vertices of cubic block.
 */
export const getBlockVertices = (block: Block): BlockVertices => [
	{ x: block.x, y: block.y, z: block.z },
	{ x: block.x + 1, y: block.y, z: block.z },
	{ x: block.x + 1, y: block.y + 1, z: block.z },
	{ x: block.x, y: block.y + 1, z: block.z },
	{ x: block.x, y: block.y, z: block.z + 1 },
	{ x: block.x + 1, y: block.y, z: block.z + 1 },
	{ x: block.x + 1, y: block.y + 1, z: block.z + 1 },
	{ x: block.x, y: block.y + 1, z: block.z + 1 },
];

/**
 * Get position of vertices on the screen after projection.
 */
export const getProjectedVertices = (
	vertices: BlockVertices,
	screenCenterPosition: Coords3D,
	cameraPosition: Coords3D,
): Coords2D[] =>
	vertices.map((vertex) => {
		const zDistanceFromCameraToScreen = Math.abs(screenCenterPosition.z - cameraPosition.z);
		const zDistanceFromScreenToVertex = Math.abs(vertex.z - screenCenterPosition.z);
		const ratio = zDistanceFromCameraToScreen / zDistanceFromScreenToVertex;

		const xDistance = cameraPosition.x - vertex.x;
		const projectedX = cameraPosition.x - xDistance * ratio;

		const yDistance = cameraPosition.y - vertex.y;
		const projectedY = cameraPosition.y + yDistance * ratio;

		return { x: projectedX, y: projectedY };
	});

export const getRandomHexColor = (): string => {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	return `#${randomColor.padStart(6, '0')}`;
};

/** Paint block vertices */
export const paintBlock = (
	block: Block,
	ctx: CanvasRenderingContext2D,
	screenCenterPosition: Coords3D,
	cameraPosition: Coords3D,
	renderScale: number,
	projectedTranslation: Coords2D,
) => {
	const vertices = getBlockVertices(block);
	const projectedVertices = getProjectedVertices(vertices, screenCenterPosition, cameraPosition);
	ctx.fillStyle = getRandomHexColor();

	// Draw vertices
	projectedVertices.forEach((vertex) => {
		ctx.beginPath();
		ctx.arc(
			vertex.x * renderScale + projectedTranslation.x,
			vertex.y * renderScale + projectedTranslation.y,
			4,
			0,
			Math.PI * 2,
		);
		ctx.fill();
	}, []);

	// Draw edges
	cubeEdges.forEach((edge, i) => {
		edge.forEach((connection, j) => {
			if (connection === 1) {
				const startPoint = projectedVertices[i];
				const endPoint = projectedVertices[j];
				ctx.moveTo(
					startPoint.x * renderScale + projectedTranslation.x,
					startPoint.y * renderScale + projectedTranslation.y,
				);
				ctx.lineTo(
					endPoint.x * renderScale + projectedTranslation.x,
					endPoint.y * renderScale + projectedTranslation.y,
				);
				ctx.stroke();
			}
		});
	});
};
