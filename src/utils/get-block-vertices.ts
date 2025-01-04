import { BlockVertices, Vector3D } from "../types";

/**
 * Get positions of all vertices of cubic block.
 *    7-------6   // Back face
	/|      /|
	4-------5 |  
	| |     | |
	| 3-----|-2   // Front face
	|/      |/
	0-------1 
 */
export const getBlockVertices = (block: Vector3D): BlockVertices => [
	[block[0], block[1], block[2]], // Vertex 0 (0, 0, 0)
	[block[0] + 1, block[1], block[2]], // Vertex 1 (1, 0, 0)
	[block[0] + 1, block[1], block[2] - 1], // Vertex 2 (1, 1, 0)
	[block[0], block[1], block[2] - 1], // Vertex 3 (0, 1, 0)
	[block[0], block[1] + 1, block[2]], // Vertex 4 (0, 0, 1)
	[block[0] + 1, block[1] + 1, block[2]], // Vertex 5 (1, 0, 1)
	[block[0] + 1, block[1] + 1, block[2] - 1], // Vertex 6 (1, 1, 1)
	[block[0], block[1] + 1, block[2] - 1], // Vertex 7 (0, 1, 1)
];