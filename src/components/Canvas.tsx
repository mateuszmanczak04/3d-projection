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
	const [camera, setCamera] = useState<Camera>(CAMERA)

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

	const rotateCamera = (yaw: number, pitch: number, roll: number) => {
		setCamera((prev) => ({...prev, yaw: prev.yaw + yaw, pitch: prev.pitch + pitch, roll: prev.roll + roll}))
	}

	return <div>
		<canvas width={800} height={600} id='canvas'  ref={canvasRef}></canvas>
		<div className='controls'>
			<div></div>
		<button onClick={() => rotateCamera(0, 5, 0)}>Rotate Top</button>
		<div></div>
		<button onClick={() => rotateCamera(5, 0, 0)}>Rotate Left</button>
		<div></div>
		<button onClick={() => rotateCamera(-5, 0, 0)}>Rotate Right</button>
		<div></div>
		<button onClick={() => rotateCamera(0, -5, 0)}>Rotate Bottom</button>
		</div>
		</div>
};

export default Canvas;
