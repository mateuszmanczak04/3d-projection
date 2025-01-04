
import { Matrix3x3, Vector2D, Vector3D } from "../types";
import { getRotationMatrix } from "./get-rotation-matrix";
import { multiplyMatrixVector } from "./multiply-matrix-vector";

export const getProjectedVertex = (
    a: Vector3D, // Point before projection
    c: Vector3D, // Camera position
    phi: Vector3D, // Camera orientation
    e: Vector3D, // Center of the screen
): Vector2D => {
    const aTranslated: Vector3D = [
        a[0] - c[0],
        a[1] - c[1],
        a[2] - c[2],
    ]

    const rotationMatrix: Matrix3x3 = getRotationMatrix(phi);

    const aCamera =multiplyMatrixVector(rotationMatrix, aTranslated);

    const xScreen = e[2] * aCamera[0] / aCamera[2]
    const yScreen = e[2] * aCamera[1] / aCamera[2]

    return [xScreen, yScreen]
};