/**
 * Multiplies two 3x3 matrices.
 *
 * @param a - The first 3x3 matrix.
 * @param b - The second 3x3 matrix.
 * @returns The resulting 3x3 matrix after multiplication.
 *
 * @example
 * ```typescript
 * const matrixA = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 * const matrixB = [
 *   [9, 8, 7],
 *   [6, 5, 4],
 *   [3, 2, 1]
 * ];
 * const result = multiplyMatrices(matrixA, matrixB);
 * console.log(result);
 * // Output:
 * // [
 * //   [30, 24, 18],
 * //   [84, 69, 54],
 * //   [138, 114, 90]
 * // ]
 * ```
 */
export const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
    const result = Array.from({ length: 3 }, () => Array(3).fill(0));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;
};
