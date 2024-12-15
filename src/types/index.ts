export type Block = {
	id: string;
	x: number;
	y: number;
	z: number;
};

export type Coords3D = {
	x: number;
	y: number;
	z: number;
};

export type Coords2D = {
	x: number;
	y: number;
};

export type BlockVertices = [
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
];
