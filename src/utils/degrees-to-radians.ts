/**
 * Converts degrees to radians.
 *
 * @param degrees - The angle in degrees to be converted to radians.
 * @returns The angle in radians.
 */
export const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
}