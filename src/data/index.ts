import { Block, Camera } from '../types';
import { degreesToRadians } from '../utils/degrees-to-radians';

export const BLOCKS: Block[] = [
	{
		id: 'dirt',
		coordinates: [-0.5, 1, 5],
	},
	{
		id: 'stone',
		coordinates: [1.5, -1, 3],
	},
	{
		id: 'sand',
		coordinates: [-2, 0.5, 4],
	},
	{
		id: 'water',
		coordinates: [-2, -1, 3],
	},
	{
		id: 'wood',
		coordinates: [2, 1, 6],
	},
];

export const CAMERA: Camera = {
	position: [0, 0, 0],
	yaw: degreesToRadians(0),
	pitch: degreesToRadians(0),
	roll: degreesToRadians(0),
	fov: 1, 
	aspectRatio: 800 / 600, // Canvas aspect ratio
	nearPlane: 1, // Near plane distance
}