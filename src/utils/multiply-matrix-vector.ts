/**
 * Multiplies a 3x3 matrix by a 3-dimensional vector.
 *
 * @param {number[][]} matrix - A 3x3 matrix represented as an array of arrays.
 * @param {number[]} vector - A 3-dimensional vector represented as an array.
 * @returns {number[]} The resulting 3-dimensional vector after multiplication.
 * @throws {Error} If the number of columns in the matrix does not match the length of the vector.
 */
export const multiplyMatrixVector = (matrix: number[][], vector: number[]): number[] => {
    if (matrix[0].length !== vector.length) {
        throw new Error('Matrix columns must match vector length');
    }

    return [
        matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
        matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
        matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2],
    ];
}