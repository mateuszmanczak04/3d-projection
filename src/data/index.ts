import { Block, Coords2D, Coords3D } from '../types';

export const DUMMY_BLOCKS: Block[] = [
	{
		id: 'dirt',
		x: 0,
		y: 0,
		z: 0,
	},
	{
		id: 'dirt',
		x: 1,
		y: 1,
		z: 0,
	},
	{
		id: 'dirt',
		x: 3,
		y: 0,
		z: 0,
	},
	{
		id: 'dirt',
		x: 0,
		y: 1,
		z: 0,
	},
	{
		id: 'dirt',
		x: -3,
		y: 0,
		z: 0,
	},
	{
		id: 'dirt',
		x: -2,
		y: 0,
		z: 1,
	},
	{
		id: 'dirt',
		x: -1,
		y: -1,
		z: 2,
	},
];

export const DUMMY_SCREEN_CENTER_POSITION: Coords3D = {
	x: 0,
	y: 0,
	z: -5,
};

export const DUMMY_CAMERA_POSITION: Coords3D = {
	x: 0,
	y: 0,
	z: -10,
};

export const DUMMY_PROJECTED_TRANSLATION: Coords2D = { x: 400, y: 300 };

export const DUMMY_RENDER_SCALE: number = 100;
