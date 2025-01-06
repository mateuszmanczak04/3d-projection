import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { BLOCKS, CAMERA, MOUSE_SPEED } from '../data';
import { Block, Camera } from '../types';
import { render } from '../utils/render';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const [blocks] = useState<Block[]>(BLOCKS);
	const [camera, setCamera] = useState<Camera>(CAMERA);
	const [isPointerLocked, setIsPointerLocked] = useState<boolean>(false);
	const [mouseSpeed] = useState<number>(MOUSE_SPEED);

	const repaint = useCallback(
		(blocks: Block[]) => {
			const ctx = canvasRef.current.getContext('2d');
			if (!ctx) return;
			render(ctx, blocks, camera);
		},
		[camera],
	);

	useEffect(() => {
		repaint(blocks);
	}, [blocks, repaint]);

	const rotateCamera = (yaw: number, pitch: number, roll: number) => {
		setCamera((prev) => ({
			...prev,
			yaw: prev.yaw + yaw,
			pitch: prev.pitch + pitch,
			roll: prev.roll + roll,
		}));
	};

	const handlePointerLock = async () => {
		await canvasRef.current.requestPointerLock({
			unadjustedMovement: true,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isPointerLocked) {
			rotateCamera(-e.movementX * mouseSpeed, -e.movementY * mouseSpeed, 0);
		}
	};

	useEffect(() => {
		const listener = () => {
			setIsPointerLocked(document.pointerLockElement === canvasRef.current);
		};
		document.addEventListener('pointerlockchange', listener);

		return () => document.removeEventListener('pointerlockchange', listener);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (canvasRef.current) {
				canvasRef.current.width = window.innerWidth;
				canvasRef.current.height = window.innerHeight;
				repaint(blocks);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [blocks, repaint]);

	return (
		<div>
			<div id='canvas-wrapper'>
				<canvas
					width={800}
					height={600}
					id='canvas'
					ref={canvasRef}
					onClick={handlePointerLock}
					onMouseMove={handleMouseMove}></canvas>
				<div id='crosshair'>
					<svg
						width='48'
						height='48'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<line x1='12' y1='6' x2='12' y2='18' stroke='black' strokeWidth='1' />
						<line x1='6' y1='12' x2='18' y2='12' stroke='black' strokeWidth='1' />
					</svg>
				</div>
			</div>

			<div className='coords'>
				<p>
					<strong>Coords</strong>
				</p>
				<p>X: {Math.round(camera.position[0] * 100) / 100}</p>
				<p>Y: {Math.round(camera.position[1] * 100) / 100}</p>
				<p>Z: {Math.round(camera.position[2] * 100) / 100}</p>
				<p>
					<strong>Camera rotation</strong>
				</p>
				<p>Yaw: {Math.round(camera.yaw * 100) / 100}</p>
				<p>Pitch: {Math.round(camera.pitch * 100) / 100}</p>
				<p>Roll: {Math.round(camera.roll * 100) / 100}</p>
			</div>
		</div>
	);
};

export default Canvas;
