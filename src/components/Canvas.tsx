import { useCallback, useEffect, useRef, useState } from 'react';
import {
	BLOCKS,
	CAMERA
} from '../data';
import { Block, Camera } from '../types';
import { render } from '../utils/render';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const [blocks] = useState<Block[]>(BLOCKS);
	const [camera] = useState<Camera>(CAMERA)

	const repaint = useCallback(
		(blocks: Block[]) => {
			const ctx = canvasRef.current.getContext('2d');
			if (!ctx) return;
			render(ctx, blocks, camera)
		},
		[camera],
	);

	useEffect(() => {
		repaint(blocks);
	}, [blocks, repaint]);

	return <canvas width={800} height={600} id='canvas'  ref={canvasRef}></canvas>;
};

export default Canvas;
