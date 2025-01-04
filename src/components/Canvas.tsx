import { useCallback, useEffect, useRef, useState } from 'react';
import {
	BLOCKS,
	CAMERA_POSITION,

	SCREEN_POSITION,
} from '../data';
import { Block, Vector3D } from '../types';
import { paintBlock } from '../utils/paint-block';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const [blocks] = useState<Block[]>(BLOCKS);
	const [cameraPosition] = useState<Vector3D>(CAMERA_POSITION);
	const [cameraRotation] = useState<Vector3D>(CAMERA_POSITION);
	const [screenPosition] = useState<Vector3D>(SCREEN_POSITION);

	// const repaint = useCallback(
	// 	(blocks: Block[]) => {
	// 		const ctx = canvasRef.current.getContext('2d');
	// 		if (!ctx) return;
	// 		ctx.clearRect(0, 0, 800, 600);
	// 		blocks.forEach((block) =>
	// 			paintBlock(
	// 				block,
	// 				ctx,
	// 				cameraPosition,
	// 				cameraRotation,
	// 				screenPosition,
	// 				[0, 0] // TODO
	// 			),
	// 		);
	// 	},
	// 	[cameraPosition, cameraRotation, screenPosition],
	// );

	// useEffect(() => {
	// 	repaint(blocks);
	// }, [blocks, repaint]);

	return <canvas width={800} height={600} id='canvas'  ref={canvasRef}></canvas>;
};

export default Canvas;
