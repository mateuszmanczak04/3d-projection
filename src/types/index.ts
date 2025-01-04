export type Block = {
	id: string;
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



