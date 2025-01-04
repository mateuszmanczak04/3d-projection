import { Camera, Vector2D, Vector3D } from "../types";
import { getProjectedPoint } from "./get-projected-point";

export const getProjectedPoints = (
    points: Vector3D[], camera: Camera 
): Vector2D[] => points.map((point) => getProjectedPoint(point, camera))