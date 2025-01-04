import { Camera, Vector2D, Vector3D } from "../types";
import { getProjectedPoint } from "./get-projected-point";



// Function to detect if the point is within the viewport
const isPointInViewport = (point: Vector3D, camera: Camera, canvasWidth: number, canvasHeight: number): boolean => {
    // Apply rotation and projection to get 2D coordinates
    const projectedPoint = getProjectedPoint(point, camera);

    // Check if the projected point is within the canvas bounds
    const screenX = (canvasWidth / 2) + projectedPoint[0] * (canvasWidth / 2)
		const screenY = (canvasHeight / 2) - projectedPoint[1] * (canvasHeight / 2)

    // Return true if the point is inside the viewport bounds (canvas)
    return screenX >= -100 && screenX <= canvasWidth + 100 && screenY >= -100 && screenY <= canvasHeight + 100;
};

export const getProjectedPoints = (
    points: Vector3D[], camera: Camera, canvasWidth: number, canvasHeight: number
): Vector2D[] => {
    return points.filter((point) => isPointInViewport(point, camera, canvasWidth, canvasHeight)).map((point) => getProjectedPoint(point, camera))
};
