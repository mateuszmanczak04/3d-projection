import { useEffect, useRef, useState } from 'react';
import { MOVEMENT_SPEED } from '../data';
import { Camera } from '../types';

const useCameraMovement = (
	camera: Camera,
	setCamera: React.Dispatch<React.SetStateAction<Camera>>,
) => {
	const [movementSpeed] = useState<number>(MOVEMENT_SPEED);

	const keys = useRef<{ w: boolean; s: boolean; a: boolean; d: boolean }>({
		w: false,
		s: false,
		a: false,
		d: false,
	});

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (['w', 's', 'a', 'd'].includes(e.key)) {
				keys.current[e.key as 'w' | 's' | 'a' | 'd'] = true;
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (['w', 's', 'a', 'd'].includes(e.key)) {
				keys.current[e.key as 'w' | 's' | 'a' | 'd'] = false;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		const updateCameraPosition = () => {
			let dx = 0,
				dz = 0;
			const dy = 0;

			if (keys.current.w) dz += movementSpeed;
			if (keys.current.s) dz -= movementSpeed;
			if (keys.current.a) dx -= movementSpeed;
			if (keys.current.d) dx += movementSpeed;

			if (dx !== 0 || dz !== 0) {
				setCamera((prev) => ({
					...prev,
					position: [prev.position[0] + dx, prev.position[1] + dy, prev.position[2] + dz],
				}));
			}

			requestAnimationFrame(updateCameraPosition);
		};

		updateCameraPosition();
	}, [movementSpeed, setCamera]);

	return camera;
};

export default useCameraMovement;
