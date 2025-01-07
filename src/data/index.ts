import { Block, Camera } from '../types';

export const BLOCKS: Block[] = [
	{
		id: 'dirt',
		coordinates: [-0.5, 1, 5],
	},
	{
		id: 'dirt',
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
	{
		id: 'water',
		coordinates: [0.5, -0.5, 3],
	},
	{
		id: 'dirt',
		coordinates: [-1.5, 2, 4],
	},
	{
		id: 'wood',
		coordinates: [1, -2, 5],
	},
	{
		id: 'wood',
		coordinates: [-1, 1.5, 6],
	},
	{
		id: 'sand',
		coordinates: [2.5, -1.5, 3],
	},
	{
		id: 'sand',
		coordinates: [-2.5, 0, 4],
	},
	{
		id: 'wood',
		coordinates: [1.5, 1, 5],
	},
	{
		id: 'dirt',
		coordinates: [-0.5, -2, 6],
	},
	{
		id: 'sand',
		coordinates: [0, 2.5, 3],
	},
	{
		id: 'wood',
		coordinates: [2, -2.5, 4],
	},
];

export const CAMERA: Camera = {
	position: [0, 0, 0],
	yaw: 0,
	pitch: 0,
	roll: 0,
	fov: 1,
	aspectRatio: 1, // Canvas aspect ratio
	nearPlane: 1, // Near plane distance
};

export const MOUSE_SPEED: number = 0.3;
export const MOVEMENT_SPEED: number = 0.01;
