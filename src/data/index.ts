import { Block, Camera } from '../types';
import { generateRandomBlocks } from '../utils/generate-random-blocks';

export const BLOCKS: Block[] = generateRandomBlocks(25);

export const CAMERA: Camera = {
	position: [0, 0, 0],
	yaw: 0,
	pitch: 0,
	roll: 0,
	fov: 1,
	aspectRatio: window.innerHeight / window.innerWidth, // Canvas aspect ratio
	nearPlane: 1, // Near plane distance
};

export const MOUSE_SPEED: number = 0.3;
export const MOVEMENT_SPEED: number = 0.01;
