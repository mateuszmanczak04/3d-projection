export type BlockId = 'dirt' | 'stone' | 'water' | 'wood' | 'sand'

export type Block = {
	id: BlockId;
	coordinates: Vector3D
};

export type BlockVertices = [
	Vector3D,
	Vector3D,
	Vector3D,
	Vector3D,
	Vector3D,
	Vector3D,
	Vector3D,
	Vector3D,
];

export type Vector3D = [number, number, number]

export type Vector2D = [number, number]

export type Matrix3x3 = [
	[number, number, number],
	[number, number, number],
	[number, number, number]
]

export type Camera = {
	position: [number, number, number],
	yaw: number,
	pitch: number,
	roll: number,
	fov: number,
	aspectRatio: number;
	nearPlane: number
}

