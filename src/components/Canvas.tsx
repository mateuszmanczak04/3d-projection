import { useCallback, useEffect, useRef, useState } from 'react';
import {
	DUMMY_BLOCKS,
	DUMMY_CAMERA_POSITION,
	DUMMY_PROJECTED_TRANSLATION,
	DUMMY_RENDER_SCALE,
	DUMMY_SCREEN_CENTER_POSITION,
} from '../data';
import { Block, Coords2D, Coords3D } from '../types';
import { paintBlock } from '../utils/utils';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const [blocks] = useState<Block[]>(DUMMY_BLOCKS);
	const [renderScale] = useState<number>(DUMMY_RENDER_SCALE);
	const [cameraPosition] = useState<Coords3D>(DUMMY_CAMERA_POSITION);
	const [screenCenterPosition] = useState<Coords3D>(DUMMY_SCREEN_CENTER_POSITION);
	const [projectedTranslation] = useState<Coords2D>(DUMMY_PROJECTED_TRANSLATION);

	const repaint = useCallback(
		(blocks: Block[]) => {
			const ctx = canvasRef.current.getContext('2d');
			if (!ctx) return;
			ctx.clearRect(0, 0, 800, 600);
			blocks.forEach((block) =>
				paintBlock(
					block,
					ctx,
					screenCenterPosition,
					cameraPosition,
					renderScale,
					projectedTranslation,
				),
			);
		},
		[cameraPosition, projectedTranslation, renderScale, screenCenterPosition],
	);

	useEffect(() => {
		repaint(blocks);
	}, [blocks, repaint]);

	return <canvas width={800} height={600} id='canvas' ref={canvasRef}></canvas>;
};

export default Canvas;
