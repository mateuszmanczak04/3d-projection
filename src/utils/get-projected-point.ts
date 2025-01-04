
import { Camera, Matrix3x3, Vector2D, Vector3D } from "../types";
import { getRotationMatrix } from "./get-rotation-matrix";
import { multiplyMatrixVector } from "./multiply-matrix-vector";

export const getProjectedPoint = (
    point: Vector3D, camera: Camera
): Vector2D => {
    const aTranslated: Vector3D = [
        point[0] - camera.position[0],
        point[1] - camera.position[1],
        point[2] - camera.position[2],
    ]

    const rotationMatrix: Matrix3x3 = getRotationMatrix(camera.yaw, camera.pitch, camera.roll);

    // Rotate point
    const [x, y, z]  = multiplyMatrixVector(rotationMatrix, aTranslated);

    const scale = camera.nearPlane / z;

    return [x * scale * camera.aspectRatio, y * scale]
};