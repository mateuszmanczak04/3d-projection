import { Matrix3x3 } from "../types";


export const multiplyMatrices = (A: Matrix3x3, B: Matrix3x3): Matrix3x3 => {
    const result: Matrix3x3 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
};
