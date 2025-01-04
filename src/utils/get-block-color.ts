import { BlockId } from "../types";

const colors: Record<BlockId, string> = {
    stone: '#a3a2a2',
    wood: '#ab7e65',
    water: '#297ee6',
    sand: '#e0e3bf',
    dirt: '#290409',
}

export const getBlockColor = (id: BlockId) => {
    return colors[id]
}