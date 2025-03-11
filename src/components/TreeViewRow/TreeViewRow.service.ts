import type { CSSProperties } from 'react';
import { CONFIG } from '@src/constants/row';
import type { RowsThree } from '@src/@types';

function getAllDescendants(row: RowsThree): number {
	let count = 0;
	const stack: RowsThree[] = [...row.child];

	while (stack.length) {
		const current = stack.pop()!;
		count++;
		stack.push(...current.child);
	}

	return count;
}

function getChildrenCount(row: RowsThree): number {
	if (!row.child.length) return 0;

	const directChildrenCount = row.child.length;
	let extraCount = 0;

	for (let i = 0; i < row.child.length - 1; i++) {
		extraCount += getAllDescendants(row.child[i]);
	}

	return directChildrenCount + extraCount;
}

export function getLevelCellPudding(level: number, isChild: boolean) {
	const PUDDING_BETWEEN_PARENT_CHILD = CONFIG.PADDING_LEFT * 2;
	const CHILD_PADDING = isChild ? PUDDING_BETWEEN_PARENT_CHILD * level : 0;

	return CONFIG.PADDING_LEFT + CHILD_PADDING;
}

export function getLinesStyles(
	row: RowsThree,
	levelCellPudding: number,
	prevLevelCellPudding: number
) {
	const childrenCount = getChildrenCount(row);
	const LINE_X_SIZE = levelCellPudding - prevLevelCellPudding - CONFIG.BASE_ICON_SIZE / 2;
	const LINE_Y_SIZE = `calc(${
		childrenCount * CONFIG.ROW_HEIGHT + CONFIG.LINE_WIDTH
	}rem - 50% )`;

	const verticalLineStyle: CSSProperties = {
		width: `${CONFIG.LINE_WIDTH}rem`,
		top: '100%',
		height: LINE_Y_SIZE
	};

	const horizontalLineStyle: CSSProperties = {
		right: `100%`,
		width: `${LINE_X_SIZE}rem`,
		height: `${CONFIG.LINE_WIDTH}rem`
	};

	return { verticalLineStyle, horizontalLineStyle };
}
