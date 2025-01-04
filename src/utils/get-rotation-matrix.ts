import { Matrix3x3, Vector3D } from "../types";
import { multiplyMatrices } from "./multiply-matrices";

/**
 * Generates a rotation matrix from the given yaw, pitch, and roll angles.
 */
export const getRotationMatrix = ([yaw, pitch, roll]: Vector3D): Matrix3x3 => {
    // Yaw (Y-axis)
    const yawMatrix: Matrix3x3 = [
        [Math.cos(yaw), 0, Math.sin(yaw)],
        [0, 1, 0],
        [-Math.sin(yaw), 0, Math.cos(yaw)],
    ];

    // Pitch (X-axis)
    const pitchMatrix: Matrix3x3 = [
        [1, 0, 0],
        [0, Math.cos(pitch), -Math.sin(pitch)],
        [0, Math.sin(pitch), Math.cos(pitch)],
    ];

    // Roll (Z-axis)
    const rollMatrix: Matrix3x3 = [
        [Math.cos(roll), -Math.sin(roll), 0],
        [Math.sin(roll), Math.cos(roll), 0],
        [0, 0, 1],
    ];

    // Combine matrices: R = Yaw * Pitch * Roll
    const tempMatrix = multiplyMatrices(yawMatrix, pitchMatrix);
    return multiplyMatrices(tempMatrix, rollMatrix);
};

