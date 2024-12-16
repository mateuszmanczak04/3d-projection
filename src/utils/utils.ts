import Matrix from 'ml-matrix';
import { Block, BlockVertices, Coords2D, Coords3D } from '../types';

/**
 * Edges of the cube in 3D.
 *    7-------6   // Back face
    /|      /|
    4-------5 |  
    | |     | |
    | 3-----|-2   // Front face
    |/      |/
    0-------1 
 */

/**
 * Get positions of all vertices of cubic block.
 */
export const getBlockVertices = (block: { x: number; y: number; z: number }): BlockVertices => [
	{ x: block.x, y: block.y, z: block.z }, // Vertex 0 (0, 0, 0)
	{ x: block.x + 1, y: block.y, z: block.z }, // Vertex 1 (1, 0, 0)
	{ x: block.x + 1, y: block.y, z: block.z - 1 }, // Vertex 2 (1, 1, 0)
	{ x: block.x, y: block.y, z: block.z - 1 }, // Vertex 3 (0, 1, 0)
	{ x: block.x, y: block.y + 1, z: block.z }, // Vertex 4 (0, 0, 1)
	{ x: block.x + 1, y: block.y + 1, z: block.z }, // Vertex 5 (1, 0, 1)
	{ x: block.x + 1, y: block.y + 1, z: block.z - 1 }, // Vertex 6 (1, 1, 1)
	{ x: block.x, y: block.y + 1, z: block.z - 1 }, // Vertex 7 (0, 1, 1)
];
/**
 * Get position of vertices on the screen after projection.
 */
export const getProjectedVertices = (
	vertices: BlockVertices, // Array of 3D vertex positions
	cameraPosition: Coords3D, // Camera position
	screenCenterPosition: Coords2D, // 2D screen center (e.g., { x: 400, y: 300 })
	focalLength: number, // Focal length for perspective projection
): Coords2D[] => {
	// Perspective projection matrix
	const projectionMatrix = new Matrix([
		[focalLength, 0, 0, 0],
		[0, focalLength, 0, 0],
		[0, 0, 1, 0],
	]);

	return vertices
		.filter((vertex) => vertex.z - cameraPosition.z > 0)
		.map((vertex) => {
			// Step 1: Translate vertex relative to camera
			const relativeVertex = new Matrix([
				[vertex.x - cameraPosition.x],
				[vertex.y - cameraPosition.y],
				[vertex.z - cameraPosition.z],
				[1],
			]);

			// Step 2: Apply projection matrix
			const projected = projectionMatrix.mmul(relativeVertex);

			// Step 3: Normalize coordinates (perspective divide)
			const xProjected = projected.get(0, 0) / projected.get(2, 0) + screenCenterPosition.x;
			const yProjected = projected.get(1, 0) / projected.get(2, 0) + screenCenterPosition.y;

			return { x: xProjected, y: yProjected };
		});
};

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
	const projectedVertices = getProjectedVertices(
		vertices,
		screenCenterPosition,
		cameraPosition,
		5, // Similar to FOV, the bigger, the closer
	);
	const randomColor = getRandomHexColor();
	ctx.fillStyle = randomColor;
	ctx.strokeStyle = randomColor;

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
			startPoint.x * renderScale + projectedTranslation.x,
			startPoint.y * renderScale + projectedTranslation.y,
		);
		ctx.lineTo(
			endPoint.x * renderScale + projectedTranslation.x,
			endPoint.y * renderScale + projectedTranslation.y,
		);
		ctx.stroke();
	});
};
