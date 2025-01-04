import { Vector3D } from '../types';
import { degreesToRadians } from './degrees-to-radians';
import { getRotationMatrix } from './get-rotation-matrix';
import { multiplyMatrixVector } from './multiply-matrix-vector';

/**
 * Rotates a point based on the given camera angles.
 * cameraAngles - [yaw, pitch, roll]
 */
export const rotatePoint = (point: Vector3D, cameraAngles: Vector3D): number[] => {
    const yaw = degreesToRadians(cameraAngles[0]);
    const pitch = degreesToRadians(cameraAngles[1]);
    const roll = degreesToRadians(cameraAngles[2]);

    const rotationMatrix = getRotationMatrix([yaw, pitch, roll]);
    return multiplyMatrixVector(rotationMatrix, point);
};
