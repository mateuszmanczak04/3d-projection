import { BlockVertices, Vector2D, Vector3D } from "../types";
import { getProjectedVertex } from "./get-projected-vertex";

/**
 * Get position of vertices on the screen after projection.
 * Filter these which appear behind the viewport.
 */
export const getProjectedVertices = (
    vertices: BlockVertices, 
    cameraPosition: Vector3D,
    cameraRotation: Vector3D, 
    screenPosition: Vector3D, 
): Vector2D[] => vertices
    .filter((vertex) => vertex[2] - cameraPosition[2] > 0)
    .map((a) => getProjectedVertex(a, cameraPosition, cameraRotation, screenPosition));