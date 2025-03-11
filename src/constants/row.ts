import type { RowDataToView } from '@src/@types';
import type { CSSProperties } from 'react';

export const CONFIG = {
	ROW_HEIGHT: 4, // Высота строки
	BASE_ICON_SIZE: 1.7, // Базовый размер иконки
	LINE_WIDTH: 0.07, // Толщина линий
	PADDING_LEFT: 1 // Базовый отступ слева
} as const;

export const DATA_CELLS_STYLE: CSSProperties = {
	paddingLeft: `${CONFIG.PADDING_LEFT}rem`
};

export const CELLS_DATA_PARAMS_MAP: { [key in keyof RowDataToView]: string } = {
	rowName: 'Наименование работ',
	salary: 'Основная з/п',
	equipmentCosts: 'Оборудование',
	overheads: 'Накладные расходы',
	estimatedProfit: 'Сметная прибыль'
};

export const CELLS_DATA_PARAMS_KEYS = Object.keys(
	CELLS_DATA_PARAMS_MAP
) as (keyof RowDataToView)[];
