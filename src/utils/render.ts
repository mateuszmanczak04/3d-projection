import { Block, Camera } from "../types";
import { renderBlock } from "./render-block";

export const render = (
    context: CanvasRenderingContext2D,
    blocks: Block[],
    camera: Camera
) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    blocks.forEach((block) => renderBlock(context, block, camera))
}