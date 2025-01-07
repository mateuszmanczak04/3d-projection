import { Block, BlockId, Vector3D } from '../types';

export const generateRandomBlocks = (count: number): Block[] => {
	const ids: BlockId[] = ['dirt', 'stone', 'water', 'wood', 'sand'];
	const blocks: Block[] = [];

	for (let i = 0; i < count; i++) {
		const id: BlockId = ids[Math.floor(Math.random() * ids.length)];
		const coordinates: Vector3D = [
			Math.floor(Math.random() * 10) - 5,
			Math.floor(Math.random() * 10) - 5,
			Math.floor(Math.random() * 10) + 5,
		];
		blocks.push({ id, coordinates });
	}

	return blocks;
};
