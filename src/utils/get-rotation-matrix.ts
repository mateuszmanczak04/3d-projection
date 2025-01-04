import { multiplyMatrices } from "./multiply-matrices";

/**
 * Generates a rotation matrix from the given yaw, pitch, and roll angles.
 *
 * @param yaw - The yaw angle (rotation around the Y-axis) in radians.
 * @param pitch - The pitch angle (rotation around the X-axis) in radians.
 * @param roll - The roll angle (rotation around the Z-axis) in radians.
 * @returns A 3x3 rotation matrix as a 2D array of numbers.
 */
export const getRotationMatrix = (yaw: number, pitch: number, roll: number): number[][] => {
    // Yaw (Y-axis)
    const yawMatrix = [
        [Math.cos(yaw), 0, Math.sin(yaw)],
        [0, 1, 0],
        [-Math.sin(yaw), 0, Math.cos(yaw)],
    ];

    // Pitch (X-axis)
    const pitchMatrix = [
        [1, 0, 0],
        [0, Math.cos(pitch), -Math.sin(pitch)],
        [0, Math.sin(pitch), Math.cos(pitch)],
    ];

    // Roll (Z-axis)
    const rollMatrix = [
        [Math.cos(roll), -Math.sin(roll), 0],
        [Math.sin(roll), Math.cos(roll), 0],
        [0, 0, 1],
    ];

    // Combine matrices: R = Yaw * Pitch * Roll
    const tempMatrix = multiplyMatrices(yawMatrix, pitchMatrix);
    return multiplyMatrices(tempMatrix, rollMatrix);
};

