import { useCallback, useEffect, useRef, useState } from 'react';

type Block = {
	id: string;
	x: number;
	y: number;
	z: number;
};

type Coords3D = {
	x: number;
	y: number;
	z: number;
};

type Coords2D = {
	x: number;
	y: number;
};

type BlockVertices = [
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
	Coords3D,
];

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [scale] = useState<number>(100);
	const [translation] = useState<Coords2D>({ x: 400, y: 300 });
	const [camera, setCamera] = useState<Coords3D>({
		x: 0,
		y: 0,
		z: -10,
	});
	const [screenCenter, setScreenCenter] = useState<Coords3D>({
		x: 0,
		y: 0,
		z: -5,
	});
	const [blocks, setBlocks] = useState<Block[]>([
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
	]);

	/**
	 * Get positions of all vertices of cubic block.
	 */
	const getBlockVertices = (block: Block): BlockVertices => [
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
	const getProjectedVertices = useCallback(
		(vertices: BlockVertices): Coords2D[] =>
			vertices.map((vertex) => {
				const zDistanceFromCameraToScreen = Math.abs(screenCenter.z - camera.z);
				const zDistanceFromScreenToVertex = Math.abs(vertex.z - screenCenter.z);
				const ratio = zDistanceFromCameraToScreen / zDistanceFromScreenToVertex;

				const xDistance = camera.x - vertex.x;
				const projectedX = camera.x - xDistance * ratio;

				const yDistance = camera.y - vertex.y;
				const projectedY = camera.y + yDistance * ratio;

				return { x: projectedX, y: projectedY };
			}),
		[camera.x, camera.y, camera.z, screenCenter.z],
	);

	const getRandomHexColor = (): string => {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		return `#${randomColor.padStart(6, '0')}`;
	};

	/** Paint block vertices */
	const paintBlock = useCallback(
		(block: Block) => {
			const ctx = canvasRef.current!.getContext('2d');
			if (!ctx) return;
			const vertices = getBlockVertices(block);
			const projectedVertices = getProjectedVertices(vertices);
			console.table(projectedVertices);
			ctx.fillStyle = getRandomHexColor();
			projectedVertices.forEach((vertex) => {
				ctx.beginPath();
				ctx.arc(
					vertex.x * scale + translation.x,
					vertex.y * scale + translation.y,
					4,
					0,
					Math.PI * 2,
				);
				ctx.fill();
			}, []);
		},
		[getProjectedVertices, scale, translation],
	);

	const repaint = useCallback(
		(blocks: Block[]) => {
			const ctx = canvasRef.current!.getContext('2d');
			if (!ctx) return;
			ctx.clearRect(0, 0, 800, 600);
			blocks.forEach(paintBlock);
		},
		[paintBlock],
	);

	useEffect(() => {
		repaint(blocks);
	}, [blocks, repaint]);

	return <canvas width={800} height={600} id='canvas' ref={canvasRef}></canvas>;
};

export default Canvas;
