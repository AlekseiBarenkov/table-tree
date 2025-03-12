import { useEffect, useRef } from 'react';

export const useOutsideAction = <T extends HTMLElement>(
	isActive: boolean,
	callback: () => void
) => {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!isActive) return;

		const controller = new AbortController();

		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		const handleKeyboard = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				callback();
			}
		};

		document.addEventListener('pointerdown', handleClick, { signal: controller.signal });
		document.addEventListener('keydown', handleKeyboard, { signal: controller.signal });

		return () => {
			controller.abort();
		};
	}, [isActive, callback]);

	return ref;
};
